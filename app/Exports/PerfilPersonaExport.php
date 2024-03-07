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
            'documento',
            // 'fh_nacimiento',
            // 'sexo',
            // 'estado_civil',
            // 'ubigeo',
            // 'departamento',
            // 'provincia',
            // 'distrito',
            // 'correo',
            // 'var1',
            // 'var2',
            // 'var3'
        )
            ->where('perfil_id', $this->perfilId);
    }

    public function headings(): array
    {
        return [
            'documento',
            // 'DOCUMENTO',
            // 'FH_NACIMIENTO',
            // 'SEXO',
            // 'ESTADO_CIVIL',
            // 'UBIGEO',
            // 'DEPARTAMENTO',
            // 'PROVINCIA',
            // 'DISTRITO',
            // 'CORREO',
            // 'VAR1',
            // 'VAR2',
            // 'VAR3',
        ];
    }
}
