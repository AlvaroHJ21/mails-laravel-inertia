<?php

namespace App\Http\Controllers;

use App\Helpers\SendCampania;
use App\Models\Campania;
use Carbon\Carbon;
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
}
