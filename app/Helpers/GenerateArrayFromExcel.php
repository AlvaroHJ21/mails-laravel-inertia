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
            throw new \Exception("No se encontraron las columnas necesarias en el archivo excel");
        }

        //2.4 extraer los datos del excel
        $personasExcel = [];
        foreach ($array[0] as $key => $row) {
            if ($key == 0) continue;

            //si la logitud del documento es menor a 8 se le agregan ceros a la izquierda hasta completar 8 caracteres
            $documento = str_pad($row[$documentoColumnIdx], 8, "0", STR_PAD_LEFT);

            $personasExcel[$documento] = [
                "correo" => $row[$correoColumnIdx],
                "var1" => $row[$var1ColumnIdx],
                "var2" => $row[$var2ColumnIdx],
                "var3" => $row[$var3ColumnIdx],
            ];
        }

        $dniArray = array_keys($personasExcel);

        return [$dniArray, $personasExcel];
    }

    static function generateOnlyMails($file)
    {
        $array = (new ExcelImport)->toArray($file);

        //2. Extraer array de DNI's
        //2.1 buscar en la primera fila
        // $documentoColumnIdx = array_search('documento', array_map('strtolower', $array[0][0]));
        $correoColumnIdx = array_search('correo', array_map('strtolower', $array[0][0]));

        //2.2 si no se encuentran los titulos de las columnas se retorna un error
        if (
            $correoColumnIdx === false
        ) {
            throw new \Exception("Formato de archivo incorrecto, columna de correo no encontrada");
        }

        //2.4 extraer los datos del excel
        $personasExcel = [];
        foreach ($array[0] as $key => $row) {
            if ($key == 0) continue;

            //si tiene un correo o un teléfono se agrega al array
            if (!empty($row[$correoColumnIdx]))
                $personasExcel[] = [
                    "correo" => $row[$correoColumnIdx],
                ];
        }

        return $personasExcel;
    }

    static function generateOnlyPhones($file)
    {
        $array = (new ExcelImport)->toArray($file);

        //2. Extraer array de DNI's
        //2.1 buscar en la primera fila
        // $documentoColumnIdx = array_search('documento', array_map('strtolower', $array[0][0]));
        $telefonoColumnIdx = array_search('telefono', array_map('strtolower', $array[0][0]));

        //2.2 si no se encuentran los titulos de las columnas se retorna un error
        if (
            $telefonoColumnIdx === false
        ) {
            throw new \Exception("Formato de archivo incorrecto, columna de telefono no encontrada");
        }

        //2.4 extraer los datos del excel
        $personasExcel = [];
        foreach ($array[0] as $key => $row) {
            if ($key == 0) continue;

            //si tiene un correo o un teléfono se agrega al array
            if (!empty($row[$telefonoColumnIdx]))
                $personasExcel[] = [
                    "telefono" => $row[$telefonoColumnIdx],
                ];
        }

        return $personasExcel;
    }
}
