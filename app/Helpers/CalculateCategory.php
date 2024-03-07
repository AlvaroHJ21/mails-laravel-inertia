<?php

namespace App\Helpers;

class CalculateCategory
{
    static function grupoEdad($fh_nacimiento)
    {
        $fechaNacimiento = new \DateTime($fh_nacimiento);
        $hoy = new \DateTime();
        $edad = $hoy->diff($fechaNacimiento)->y;

        if ($edad >= 18 && $edad <= 30) {
            return "JOVEN";
        } else if ($edad > 30 && $edad <= 60) {
            return "ADULTO";
        } else if ($edad > 60) {
            return "ADULO MAYOR";
        } else {
            return "";
        }
    }

    static function generacion($fh_nacimiento)
    {
        // Generación silenciosa: 1928-1945.
        // Boomers: 1946-1964.
        // Generación X: 1965-1980.
        // Millennials: 1981-1996.
        // Generación Z: 1997-2012.
        $fechaNacimiento = new \DateTime($fh_nacimiento);
        $anio = $fechaNacimiento->format("Y");

        // if ($anio >= 1928 && $anio <= 1945) {
        //     return "GENERACIÓN SILENCIOSA";
        // } else if ($anio >= 1946 && $anio <= 1964) {
        //     return "BOOMERS";
        if ($anio >= 1965 && $anio <= 1980) {
            return "GENERACIÓN X";
        } else if ($anio >= 1981 && $anio <= 1996) {
            return "MILLENNIALS";
        } else if ($anio >= 1997 && $anio <= 2012) {
            return "GENERACIÓN Z";
        } else {
            return "";
        }
    }
}
