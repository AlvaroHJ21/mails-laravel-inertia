<?php

namespace App\Http\Controllers;

use App\Models\Segmento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SegmentoController extends Controller
{
    public function index()
    {
        $segmentos = Segmento::with("personas")->where('user_id', Auth::user()->id)->get();
        return Inertia::render('Segmentos/Index', compact('segmentos'));
    }
}
