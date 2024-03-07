<?php

namespace App\Exports;

use App\Models\PerfilPersona;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PerfilPersonaExport implements FromQuery, WithHeadings
{
    use Exportable;

    private $perfilId;

    public function __construct(int $perfilId)
    {
        $this->perfilId = $perfilId;
    }

    public function query()
    {
        return PerfilPersona::select(
            'dni',
            'nombre',
            'apellido',
        )
            ->where('perfil_id', $this->perfilId);
    }

    public function headings(): array
    {
        return [
            'DNI',
            'NOMBRE',
            'APELLIDO',
        ];
    }
}
