<?php

namespace App\Http\Controllers;

use App\Exports\PerfilPersonaExport;
use App\Imports\PerfilamientoImport;
use App\Models\BigQueryDev;
use App\Models\Perfil;
use Google\Cloud\BigQuery\BigQueryClient;
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
        //1. Validar el archivo
        $request->validate([
            'perfilamiento' => 'required|mimes:xlsx,xls'
        ]);

        $excel = $request->file('perfilamiento');

        $array = (new PerfilamientoImport)->toArray($excel);

        //2. Extraer array de DNI's
        //2.1 buscar en la primera fila el titulo de la columna dni
        $documentoColumnIdx = array_search('documento', array_map('strtolower', $array[0][0]));
        $correoColumnIdx = array_search('correo', array_map('strtolower', $array[0][0]));
        $var1ColumnIdx = array_search('var1', array_map('strtolower', $array[0][0]));
        $var2ColumnIdx = array_search('var2', array_map('strtolower', $array[0][0]));
        $var3ColumnIdx = array_search('var3', array_map('strtolower', $array[0][0]));

        //2.2 si no se encuentran los titulos de las columnas se retorna un error
        if (
            $documentoColumnIdx === false
            || $correoColumnIdx === false
            || $var1ColumnIdx === false
            || $var2ColumnIdx === false
            || $var3ColumnIdx === false
        ) {
            return redirect()->back()->withErrors(
                "El archivo no tiene las columnas requeridas"
            );
        }

        //2.3 si se encuentra el titulo de la columna dni se extraen los dni's
        $dniArray = [];
        foreach ($array[0] as $key => $row) {
            if ($key == 0) continue;
            $dniArray[] = $row[$documentoColumnIdx];
        }

        //2.4 extraer los datos del excel
        $personasExcel = [];
        foreach ($array[0] as $key => $row) {
            if ($key == 0) continue;
            $personasExcel[$row[$documentoColumnIdx]] = [
                "correo" => $row[$correoColumnIdx],
                "var1" => $row[$var1ColumnIdx],
                "var2" => $row[$var2ColumnIdx],
                "var3" => $row[$var3ColumnIdx],
            ];
        }

        try {
            //3. Buscar los DNI's en BigQuery
            $documentosStr = '"' . implode('","', $dniArray) . '"';

            $personasNube = env("BIGQUERY_ACTIVE") ? $this->getPersonsFromBigQuery($documentosStr) : $this->getPersonsFromBigQueryDev($documentosStr);

            DB::beginTransaction();

            //4. Crear un perfil en la tabla perfil
            $perfil = Perfil::create([
                "nombre" => "Perfil " . time(), //TODO: cambiar por un nombre mas descriptivo
                "user_id" => Auth::user()->id
            ]);

            //5. Crear las personas en la tabla perfil_personas
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
            DB::rollBack();
            // throw $th;
            return redirect()->back()->withErrors(
                // "Ocurrio un error al procesar el archivo"
                $th->getMessage()
            );
        }
    }

    public function getPersonsFromBigQuery(String $documentos = "")
    {

        $projectId = env('BIGQUERY_PROJECT_ID');
        $datasetId = env('BIGQUERY_DATASET_ID');
        $tableId = 'prueba';

        $bigQuery = new BigQueryClient([
            'projectId' => $projectId,
        ]);

        if ($documentos == "") {
            $query = 'SELECT * FROM `' . $projectId . '.' . $datasetId . '.' . $tableId . '`';
        } else {
            $query = 'SELECT * FROM `' . $projectId . '.' . $datasetId . '.' . $tableId . '` WHERE DOCUMENTO IN (' . $documentos . ')';
        }

        // Run the query
        $jobConfig = $bigQuery->query($query);
        $queryJob = $bigQuery->startQuery($jobConfig);

        // Wait for the query to complete
        $queryJob->waitUntilComplete();

        // Get the results
        $queryResults = $queryJob->queryResults();

        $data = [];
        foreach ($queryResults as $row) {
            $data[] = $row;
        }

        return $data;
    }

    public function getPersonsFromBigQueryDev(String $documentos = "")
    {
        $personas = BigQueryDev::select(
            DB::raw('DOCUMENTO, FH_NACIMIENTO, SEXO, ESTADO_CIVIL, UBIGEO, DEPARTAMENTO, PROVINCIA, DISTRITO')
        )
            ->whereRaw('DOCUMENTO IN (' . $documentos . ')')
            ->get();
        return $personas;
    }

    public function test()
    {
        $personas = $this->getPersonsFromBigQuery();

        return response()->json($personas);
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
