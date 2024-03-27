<?php

namespace App\Exports;

use App\Models\CampaniaPersona;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CampaniaReporteExport implements FromCollection, WithHeadings
{
    use Exportable;

    private $campaniaIds;

    public function __construct(array $campaniaIds)
    {
        $this->campaniaIds = $campaniaIds;
    }

    public function collection()
    {
        $datos = CampaniaPersona::select(
            'campanias.nombre as nombre_campania',
            'documento',
            'correo',
            'estado_mail',
        )
            ->whereIn('campania_id', $this->campaniaIds)
            ->join('campanias', 'campanias.id', '=', 'campania_personas.campania_id')
            ->get();


        $datos->map(function ($item) {
            $item->estado_mail = $this->formatEstadoMail($item->estado_mail);
            return $item;
        });

        return $datos;
    }

    public function headings(): array
    {
        return [
            'campaña',
            'documento',
            'correo',
            'estado',
        ];
    }

    public function formatEstadoMail($estado)
    {
        // 1 Rebotado
        // 2 Cola de Envio
        // 3 Ignorado
        // 4 Rebotado soft
        // 5 Entregado
        // 6 Entregado No reviso
        // 7 Entregado Visualizo
        // 8 Entregado clicks
        // 9 Rebotado invalida
        // 10 Rebotado saturado
        // 11 Fallado
        // 12 Duplicado
        // 13 Blacklist
        // 14 Desuscrito
        switch ($estado) {
            case "1":
                return 'Rebotado';
            case "2":
                return 'Cola de Envio';
            case "3":
                return 'Ignorado';
            case "4":
                return 'Rebotado Soft';
            case "5":
                return 'Entregado';
            case "6":
                return 'Entregado No reviso';
            case "7":
                return 'Entregado Visualizo';
            case "8":
                return 'Entregado Clicks';
            case "9":
                return 'Rebotado Invalida';
            case "10":
                return 'Rebotado Saturado';
            case "11":
                return 'Fallado';
            case "12":
                return 'Duplicado';
            case "13":
                return 'Blacklist';
            case "14":
                return 'Desuscrito';
            default:
                return 'Desconocido';
        }
    }
}
