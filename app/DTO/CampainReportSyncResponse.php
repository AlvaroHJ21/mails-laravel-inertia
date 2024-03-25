<?php

namespace App\DTO;

class CampainReportSyncResponse
{
    public function __construct(
        public string $data,
        public string $estado
    ) {
    }

    public static function make(array $from): self
    {
        return new static(
            $from['data'],
            $from['estado'],
        );
    }
}
