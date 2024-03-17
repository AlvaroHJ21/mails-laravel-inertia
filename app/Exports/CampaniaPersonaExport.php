<?php

namespace App\Exports;

use App\Models\CampaniaPersona;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CampaniaPersonaExport implements FromQuery, WithHeadings
{
    use Exportable;

    private $campaniaId;

    public function __construct(int $campaniaId)
    {
        $this->campaniaId = $campaniaId;
    }

    public function query()
    {
        return CampaniaPersona::select(
            'documento',
            'correo',
        )
            ->where('campania_id', $this->campaniaId);
    }

    public function headings(): array
    {
        return [
            'documento',
            'correo',
        ];
    }
}
