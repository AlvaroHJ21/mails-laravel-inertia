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
    private $documentos;

    public function __construct(int $id, $documentos)
    {
        $this->id = $id;
        $this->documentos = $documentos;
    }
    public function query()
    {
        $query = SegmentoPersona::query();

        //select
        $query->select(
            'documento',
            'correo',
            'var1',
            'var2',
            'var3'
        );

        //filtrar por los documentos
        $query->whereIn('documento', $this->documentos);

        return $query->where('segmento_id', $this->id);
    }

    public function headings(): array
    {
        return [
            'documento',
            'correo',
            'var1',
            'var2',
            'var3',
        ];
    }
}
