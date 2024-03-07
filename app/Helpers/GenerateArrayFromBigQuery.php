<?php

namespace App\Helpers;

use App\Models\BigQueryDev;
use Google\Cloud\BigQuery\BigQueryClient;
use Illuminate\Support\Facades\DB;

class GenerateArrayFromBigQuery
{
    static function generate($documentos)
    {
        $documentosStr = '"' . implode('","', $documentos) . '"';

        $personasNube = env("BIGQUERY_ACTIVE")
            ?  GenerateArrayFromBigQuery::getPersonsFromBigQuery($documentosStr)
            :  GenerateArrayFromBigQuery::getPersonsFromBigQueryDev($documentosStr);

        return $personasNube;
    }

    static function getPersonsFromBigQuery(String $documentos = "")
    {

        $projectId = env('BIGQUERY_PROJECT_ID');
        $datasetId = env('BIGQUERY_DATASET_ID');
        $tableId = 'TB_PERFIL';

        $bigQuery = new BigQueryClient([
            'projectId' => $projectId,
        ]);

        if ($documentos == "") {
            $query = 'SELECT * FROM `' . $projectId . '.' . $datasetId . '.' . $tableId . '` LIMIT 100';
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

    static function getPersonsFromBigQueryDev(String $documentos = "")
    {
        $personas = BigQueryDev::select(
            DB::raw('DOCUMENTO, FH_NACIMIENTO, SEXO, ESTADO_CIVIL, UBIGEO, DEPARTAMENTO, PROVINCIA, DISTRITO')
        )
            ->whereRaw('DOCUMENTO IN (' . $documentos . ')')
            ->get();
        return $personas;
    }
}
