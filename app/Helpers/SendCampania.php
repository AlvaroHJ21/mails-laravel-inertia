<?php

namespace App\Helpers;

use App\DTO\CampainReportResponse;
use App\DTO\CampainReportSyncResponse;
use App\DTO\SendCampaniaResponse;
use App\Models\Campania;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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
                $text .= $persona->correo . ',var1,var2,var3,var4,var5,var6,var7,var8,var9,var10,var1,var1,var1,var1,var1,var1,var1,var1,var1,var1,var1,var1,var1,var1,var1' . "\n";
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
                        "nombre" => "Datalabs", //TODO: Cambiar por la empresa que envia la campaña
                    ],
                ]
            ];

            //* 5. Enviar campania
            $response = Http::withHeaders($header)->post(env("INTICO_MAILING_API") . "EnviarMailingMasivo", $body);
            $data = SendCampaniaResponse::make($response->json());

            if ($data->estado === "0") {
                throw new \Exception("Error al enviar la campaña");
            }

            //* 6. Actualizar codigo de campania
            $campania->update(
                [
                    "codigo_envio" => $data->data,
                    "enviado" => true,
                    "n_registros" => $campania->personas->count(),
                    "n_validados" => 0,
                    "n_abiertos" => 0,
                ]
            );

            //TODO: 6. Tratar respuesta
            Log::info("Campaña " . $campania->nombre . " enviada");
            return ["ok" => true, "data" => $data];
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return ["ok" => false, "message" => $th->getMessage()];
        }
    }

    static function report(Campania $campania)
    {
        try {
            $header = [
                "apikey" => env("INTICO_API_KEY"),
                "user" => env("INTICO_USER"),
            ];

            /*
            * PASO 1: Sinconizar reporte
            */
            $body = [
                "data" => [
                    "code" => $campania->codigo_envio,
                    "socket" => "response25812",
                    "idcampaign" => $campania->id,
                ]
            ];


            $response = Http::withHeaders($header)->post(env("INTICO_MAILING_API") . "FeedbackCampaign", $body);
            $data = CampainReportSyncResponse::make($response->json());

            if ($data->estado === "0") {
                return ["ok" => false, "message" => "Error al sincronizar el reporte"];
            }

            /*
             * PASO 2: Obtener reporte
             */
            $body = [
                "data" => [
                    "idcampaign" => $campania->codigo_envio,
                    "pag" => "1",
                    "count" => "10",
                ]
            ];
            $response = Http::withHeaders($header)->post(env("INTICO_MAILING_API") . "ReportCampaign", $body);
            $data = CampainReportResponse::make($response->json());

            if ($data->estado === "0") {
                return ["ok" => false, "message" => "Error al obtener el reporte"];
            }

            $campania->update(
                [
                    "n_registros" => $data->n_cant,
                    "n_validados" => $data->n_cant_entr,
                    "n_abiertos" => $data->n_cant_visu,
                ]
            );

            Log::info("Reporte de la campaña " . $campania->id . " " . $campania->nombre . " actualizado");
            return ["ok" => true, "data" => $data];
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return ["ok" => false, "message" => $th->getMessage()];
        }
    }
}
