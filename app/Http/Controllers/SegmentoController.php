<?php

namespace App\Http\Controllers;

use App\Helpers\CalculateCategory;
use App\Helpers\GenerateArrayFromBigQuery;
use App\Helpers\GenerateArrayFromExcel;
use App\Models\Segmento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SegmentoController extends Controller
{
    public function index()
    {
        $segmentos = Segmento::with("personas")->where('user_id', Auth::user()->id)->get();
        return Inertia::render('Segmentos/Index', compact('segmentos'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'input_excel' => 'required|mimes:xlsx,xls',
            'nombre' => 'nullable|string|max:255'
        ]);

        //1. Extraer los datos del excel
        $data = GenerateArrayFromExcel::generate($request->file('input_excel'));
        $documentosStr = $data[0];
        $personasExcel = $data[1];

        try {
            DB::beginTransaction();
            //2. Extraer los datos de la nube
            $personasNube = GenerateArrayFromBigQuery::generate($documentosStr);

            //3. Crear el segmento
            $segmento = Segmento::create([
                "nombre" => $request->nombre ??  "Segmento " . time(), //TODO: cambiar por un nombre mas descriptivo
                "user_id" => Auth::user()->id
            ]);

            //4. Asociar las personas al segmento
            $personasDelSegmento = [];
            foreach ($personasNube as $persona) {
                $personasDelSegmento[] = [
                    "segmento_id" => $segmento->id,

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

            $segmento->personas()->createMany($personasDelSegmento);

            $segmento->load('personas');

            DB::commit();

            return to_route('segmentos.index');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return redirect()->back()->withErrors(
                $th->getMessage()
            );
        }
    }
}
