<?php

namespace App\Helpers;

use App\Models\Campania;
use Illuminate\Support\Facades\Http;

class SendCampania
{
    static function send(Campania $campania)
    {
        try {
            //* 1. Configurar header
            $header = [
                "apikey" => env("INTICO_API_KEY"),
                "user" => env("INTICO_USER"),
            ];

            //* 2. Generar html con css en linea
            $html = ConvertHTML::convertCSSInline($campania->correo_contenido);

            //* 3. Generar fileContent
            $text = "";
            foreach ($campania->personas as $persona) {
                $text .= $persona->correo . "\n";
                // $text .= $persona->documento . ',' . $persona->correo . "\n";
            }
            $fileContent = base64_encode($text);

            //* 4. Construir body
            $body = [
                "data" => [
                    "name_campaign" => $campania->nombre,
                    "subject" => $campania->correo_asunto,
                    "html" => $html,
                    "delimiter" => ",",
                    "fileContent" => $fileContent,
                    "remitente" => [
                        "correo" => $campania->correo_envio,
                        "nombre" => ""
                    ],
                ]
            ];

            //* 5. Enviar campania
            $response = Http::withHeaders($header)->post("https://mailingperu.intico.com.pe/mailing/v1/demo/EnviarMailingMasivo", $body);
            $data = $response->json();


            //TODO: 6. Tratar respuesta
            return ["ok" => true, "data" => $body];
        } catch (\Throwable $th) {
            return ["ok" => false, "message" => $th->getMessage()];
        }
    }
}
