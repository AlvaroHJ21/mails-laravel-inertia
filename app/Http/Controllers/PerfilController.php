<?php

namespace App\Http\Controllers;

use App\Exports\PerfilPersonaExport;
use App\Helpers\CalculateCategory;
use App\Helpers\GenerateArrayFromBigQuery;
use App\Helpers\GenerateArrayFromExcel;
use App\Models\Perfil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PerfilController extends Controller
{
    //

    public function index()
    {
        $perfiles = Perfil::with("personas")->where('user_id', Auth::user()->id)->get();
        return Inertia::render('Perfiles/Index', compact('perfiles'));
    }

    public function downloadTemplate()
    {

        $path = storage_path("app/excel/template.xlsx");

        // Verificar si el archivo existe
        if (file_exists($path)) {
            // Descargar el excel
            return response()->download($path, 'perfil-formato.xlsx');
        } else {
            // El archivo no existe
            return redirect()->back()->with('error', 'El archivo no existe');
        }
    }

    public function generate(Request $request)
    {
        $request->validate([
            'perfilamiento' => 'required|mimes:xlsx,xls',
            'nombre' => 'nullable|string|max:255'
        ]);

        try {
            //1. Extraer los datos del excel
            $data = GenerateArrayFromExcel::generate($request->file('perfilamiento'));

            $documentos = $data[0];
            $personasExcel = $data[1];

            //2. Extraer los datos de la nube
            $personasNube = GenerateArrayFromBigQuery::generate($documentos);

            DB::beginTransaction();
            //3. Crear el perfil
            $perfil = Perfil::create([
                "nombre" => $request->nombre ??  "Perfil " . time(),
                "user_id" => Auth::user()->id,
            ]);

            //4. Asociar las personas al perfil
            $personasDelPerfil = [];
            foreach ($personasNube as $persona) {
                $personasDelPerfil[] = [
                    "perfil_id" => $perfil->id,

                    //Información de la nube
                    "documento" => $persona['DOCUMENTO'],
                    "fh_nacimiento" => $persona['FH_NACIMIENTO'],
                    "sexo" => $persona['SEXO'],
                    "estado_civil" => $persona['ESTADO_CIVIL'],
                    "ubigeo" => $persona["UBIGEO"],
                    "departamento" => $persona["DEPARTAMENTO"],
                    "provincia" => $persona["PROVINCIA"],
                    "distrito" => $persona["DISTRITO"],

                    "edad_grupo" => CalculateCategory::grupoEdad($persona['FH_NACIMIENTO']),
                    "generacion" => CalculateCategory::generacion($persona['FH_NACIMIENTO']),

                    //Información del excel
                    "correo" => $personasExcel[$persona['DOCUMENTO']]['correo'],
                    "var1" => $personasExcel[$persona['DOCUMENTO']]['var1'],
                    "var2" => $personasExcel[$persona['DOCUMENTO']]['var2'],
                    "var3" => $personasExcel[$persona['DOCUMENTO']]['var3'],
                ];
            }

            $perfil->personas()->createMany($personasDelPerfil);

            $perfil->load('personas');

            DB::commit();

            return to_route('perfiles.index');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return redirect()->back()->withErrors(
                $th->getMessage()
            );
        }
    }

    public function test()
    {
        $personas = GenerateArrayFromBigQuery::generate("");

        return response()->json($personas);
    }

    public function update(Request $request, Perfil $perfil)
    {

        $request->validate([
            'nombre' => 'required|string',
        ]);

        $perfil->update([
            "nombre" => $request->nombre
        ]);

        return to_route('perfiles.index');
    }

    public function destroy(Perfil $perfil)
    {
        $perfil->delete();

        return redirect()->route('perfiles.index');
    }

    public function download(Perfil $perfil)
    {
        return (new PerfilPersonaExport($perfil->id))->download($perfil->nombre . '.xlsx');
    }
}
