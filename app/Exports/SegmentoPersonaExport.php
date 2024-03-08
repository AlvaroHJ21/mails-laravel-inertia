<?php

namespace App\Exports;

use App\Models\SegmentoPersona;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SegmentoPersonaExport implements FromQuery, WithHeadings
{
    use Exportable;

    private $id;

    public function __construct(int $id)
    {
        $this->id = $id;
    }
    public function query()
    {
        return SegmentoPersona::select(
            'documento',
        )
            ->where('segmento_id', $this->id);
    }

    public function headings(): array
    {
        return [
            'documento'
        ];
    }
}
