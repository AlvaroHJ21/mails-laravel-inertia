<?php

namespace App\Http\Controllers;

use App\Models\Campania;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CampaniasResultadosController extends Controller
{
    //

    public function index()
    {
        $campanias = Campania::with("personas")->where('user_id', Auth::user()->id)->get();
        return Inertia::render('Resultados/Index', compact("campanias"));
    }
}
