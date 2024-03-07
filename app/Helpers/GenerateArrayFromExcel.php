<?php

namespace App\Helpers;

use App\Imports\ExcelImport;

class GenerateArrayFromExcel
{
    static function generate($file)
    {
        $array = (new ExcelImport)->toArray($file);

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


        return [$dniArray, $personasExcel];
    }
}
