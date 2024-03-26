<?php

namespace App\Http\Controllers;

use App\Exports\CampaniaReporteExport;
use App\Helpers\SendCampania;
use App\Models\Campania;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CampaniasResultadosController extends Controller
{
    public function index()
    {
        return Inertia::render('Resultados/Index');
    }

    public function updateAndGet()
    {
        $campanias = Campania::where('user_id', Auth::user()->id)
            ->where('enviado', true)
            ->get();

        foreach ($campanias as $campania) {

            //* actualizar solo las campañas con fecha de envio mayor al inicio del dia de hoy

            if (Carbon::parse($campania->fecha_envio)->gt(Carbon::now()->startOfDay())) {
                SendCampania::report($campania);
            }
        }

        return response()->json($campanias);
    }

    public function download(Request $request)
    {
        $request->validate([
            'campanias' => 'required|array'
        ]);

        $ids = array_map(function ($campania) {
            return $campania['id'];
        }, $request->campanias);

        return (new CampaniaReporteExport($ids))->download('Reporte_' . now() . '.xlsx');
    }
}
