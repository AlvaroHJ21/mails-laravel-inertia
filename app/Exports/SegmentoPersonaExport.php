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
    private $filtros;

    public function __construct(int $id, String $filtros)
    {
        $this->id = $id;
        $this->filtros = json_decode($filtros);
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

        foreach ($this->filtros as $grupo) {
            if (count($grupo->filters) > 0) {
                /**
                 * añadir los filtros, donde el grupo tiene el attr(atributo) y
                 * cada filtro tiene un value por el cual filtrar
                 * los filtros de un grupo se aplican con un OR
                 */
                $query->where(function ($query) use ($grupo) {
                    foreach ($grupo->filters as $filtro) {
                        $query->orWhere($grupo->attr, "=", $filtro->value);
                    }
                });
            }
        }

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
