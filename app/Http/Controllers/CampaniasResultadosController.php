<?php

namespace App\Http\Controllers;

use App\Helpers\SendCampania;
use App\Models\Campania;
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
            ->whereDate('fecha_envio', now())
            ->get();

        foreach ($campanias as $campania) {
            SendCampania::report($campania);
        }

        return response()->json($campanias);
    }
}
