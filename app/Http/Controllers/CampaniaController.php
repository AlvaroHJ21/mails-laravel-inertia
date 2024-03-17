<?php

namespace App\Http\Controllers;

use App\Exports\CampaniaPersonaExport;
use App\Helpers\GenerateArrayFromExcel;
use App\Http\Requests\Campania\StoreRequest;
use App\Http\Requests\Campania\UpdateRequest;
use App\Models\Campania;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CampaniaController extends Controller
{
    public function index()
    {
        $campanias = Campania::with("personas")->where('user_id', Auth::user()->id)->get();
        return Inertia::render('Programacion/Index', compact("campanias"));
    }

    public function store(StoreRequest $request)
    {
        try {
            DB::beginTransaction();
            $data = $request->validated();
            $data['user_id'] = Auth::user()->id;

            $campania = Campania::create($data);

            $personas = GenerateArrayFromExcel::generateOnlyMails($request->file('personas'));

            $campania->personas()->createMany($personas);

            DB::commit();
            return to_route('campanias.index');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return redirect()->back()->withErrors(
                $th->getMessage()
            );
        }
    }

    public function update(UpdateRequest $request, Campania $campania)
    {
        try {
            DB::beginTransaction();
            if ($request->hasFile('personas')) {
                $personas = GenerateArrayFromExcel::generateOnlyMails($request->file('personas'));
                $campania->personas()->delete();
                $campania->personas()->createMany($personas);
            }

            $campania->update($request->validated());
            DB::commit();
            return redirect()->route('campanias.index');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return redirect()->back()->withErrors(
                $th->getMessage()
            );
        }
    }

    public function destroy(Campania $campania)
    {
        $campania->delete();
        return redirect()->route('campanias.index');
    }

    public function download(Campania $campania)
    {
        return (new CampaniaPersonaExport($campania->id))->download($campania->nombre . '.xlsx');
    }
}
