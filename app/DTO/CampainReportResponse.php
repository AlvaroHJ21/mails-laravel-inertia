<?php

namespace App\DTO;

class CampainReportResponse
{
    public function __construct(
        public string $estado,
        public string $n_cant,
        public string $n_envi,
        public string $n_cant_entr,
        public string $n_cant_visu,
        public string $n_cant_igno,
        /** @var Feedback[] $feedback */
        public array $feedback
    ) {
    }

    public static function make(array $from): self
    {
        return new static(
            $from['estado'],
            $from["list"][0]['n_cant'],
            $from["list"][0]['n_envi'],
            $from["list"][0]['n_cant_entr'],
            $from["list"][0]['n_cant_visu'],
            $from["list"][0]['n_cant_igno'],
            array_map(fn ($feedback) => Feedback::make($feedback), $from['feedback'])
        );
    }
}

class Feedback
{
    public function __construct(
        public string $id_mail,
        public string $email,
        public string $estado_mail
    ) {
    }

    public static function make(array $from): self
    {
        return new static(
            $from['IDEMAIL'],
            $from['DESEMAIL'],
            $from['pk_cms_m_estado_mail']
        );
    }
}
