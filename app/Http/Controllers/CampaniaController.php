<?php

namespace App\Http\Controllers;

use App\Http\Requests\Campania\StoreRequest;
use App\Models\Campania;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CampaniaController extends Controller
{
    public function index()
    {
        $campanias = Campania::where('user_id', Auth::user()->id)->get();
        return Inertia::render('Programacion/Index', compact("campanias"));
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;
        Campania::create($data);
        return redirect()->route('campanias.index');
    }

    public function update(StoreRequest $request, Campania $campania)
    {
        $campania->update($request->validated());
        return redirect()->route('campanias.index');
    }

    public function destroy(Campania $campania)
    {
        $campania->delete();
        return redirect()->route('campanias.index');
    }
}
