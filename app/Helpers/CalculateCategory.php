<?php

namespace App\Helpers;

class CalculateCategory
{
    static function grupoEdad($fh_nacimiento)
    {
        $fechaNacimiento = new \DateTime($fh_nacimiento);
        $hoy = new \DateTime();
        $edad = $hoy->diff($fechaNacimiento)->y;

        if ($edad >= 0 && $edad <= 4) {
            return "BEBÉ";
        } else if ($edad >= 5 && $edad <= 9) {
            return "NIÑO";
        } else if ($edad >= 10 && $edad <= 14) {
            return "PRE-ADOLESCENTE";
        } else if ($edad >= 15 && $edad <= 24) {
            return "JOVEN";
        } else if ($edad >= 25 && $edad <= 44) {
            return "ADULTO";
        } else if ($edad >= 45 && $edad <= 59) {
            return "ADULTO MAYOR";
        } else {
            return "TERCERA EDAD";
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

        if ($anio >= 1920 && $anio <= 1945) {
            return "GENERACIÓN SILENCIOSA";
        } else if ($anio >= 1946 && $anio <= 1964) {
            return "BOOMERS";
        } else if ($anio >= 1965 && $anio <= 1980) {
            return "GENERACIÓN X";
        } else if ($anio >= 1981 && $anio <= 1996) {
            return "MILLENNIALS";
        } else if ($anio >= 1997 && $anio <= 2010) {
            return "GENERACIÓN Z";
        } else if ($anio >= 2011 && $anio <= 2025) {
            return "GENERACIÓN ALPHA";
        } else {
            return "";
        }
    }
}
