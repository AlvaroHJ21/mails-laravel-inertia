<?php

namespace App\Http\Controllers;

use App\Exports\CampaniaPersonaExport;
use App\Helpers\GenerateArrayFromExcel;
use App\Helpers\SendCampania;
use App\Http\Requests\Campania\StoreRequest;
use App\Http\Requests\Campania\UpdateRequest;
use App\Models\Campania;
use App\Models\Perfil;
use App\Models\Segmento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CampaniaController extends Controller
{
    public function index()
    {
        $campanias = Campania::with("personas")->where('user_id', Auth::user()->id)->get();

        //decodificar archivos adjuntos string -> array(string)
        $campanias->map(function ($campania) {
            $campania->archivos_adjuntos = json_decode($campania->archivos_adjuntos);
            return $campania;
        });

        return Inertia::render('Programacion/Index', compact("campanias"));
    }

    public function downloadTemplate()
    {

        $path = storage_path("app/excel/template-campaign.xlsx");

        // Verificar si el archivo existe
        if (file_exists($path)) {
            // Descargar el excel
            return response()->download($path, 'formato.xlsx');
        } else {
            // El archivo no existe
            return redirect()->back()->with('error', 'El archivo no existe');
        }
    }

    public function store(StoreRequest $request)
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();
            $data['user_id'] = Auth::user()->id;

            //si existen archivos adjuntos
            if ($request->hasFile('archivos_adjuntos')) {
                //subir archivos
                $files = $request->file('archivos_adjuntos');
                $archivos = [];
                foreach ($files as $file) {
                    $archivos[] = $file->store('adjuntos');
                }
                $data['archivos_adjuntos'] = json_encode($archivos);
            }

            $campania = Campania::create($data);

            $personas = GenerateArrayFromExcel::generateOnlyMails($request->file('datos'));

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

    public function storeByPerfil(Perfil $perfil)
    {
        try {
            DB::beginTransaction();

            $personas = $perfil->personas;
            $personasWithCorreos = $personas
                ->filter(function ($persona) {
                    return $persona->correo;
                })
                ->map(function ($persona) {
                    return [
                        "documento" => $persona->documento,
                        "correo" => $persona->correo
                        //TODO: agregar mas campos
                    ];
                });

            $campania = new Campania();
            $campania->nombre = "Campaña por perfil: " . $perfil->nombre;
            $campania->user_id = Auth::user()->id;
            $campania->medio_envio = 0;
            $campania->fecha_envio = now()->addDays(1);
            $campania->save();

            $campania->personas()->createMany($personasWithCorreos->toArray());

            DB::commit();

            return redirect()->route('campanias.index')->with('message', 'Campaña creada con éxito');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->withErrors(
                $th->getMessage()
            );
        }
    }

    public function storeBySegmento(Segmento $segmento)
    {
        try {
            DB::beginTransaction();

            $personas = $segmento->personas;
            $personasWithCorreos = $personas
                ->filter(function ($persona) {
                    return $persona->correo;
                })
                ->map(function ($persona) {
                    return [
                        "documento" => $persona->documento,
                        "correo" => $persona->correo
                        //TODO: agregar mas campos
                    ];
                });

            $campania = new Campania();
            $campania->nombre = "Campaña por segmento: " . $segmento->nombre;
            $campania->user_id = Auth::user()->id;
            $campania->medio_envio = 0;
            $campania->fecha_envio = now()->addDays(1);
            $campania->save();

            $campania->personas()->createMany($personasWithCorreos->toArray());

            DB::commit();
            return redirect()->route('campanias.index')->with('message', 'Campaña creada con éxito');
        } catch (\Throwable $th) {
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

            $data = $request->validated();

            if ($request->hasFile('datos')) {
                $personas = GenerateArrayFromExcel::generateOnlyMails($request->file('datos'));
                $campania->personas()->delete();
                $campania->personas()->createMany($personas);
            }

            //si existen archivos adjuntos
            if ($request->hasFile('archivos_adjuntos')) {

                //eliminar archivos anteriores
                if ($campania->archivos_adjuntos) {
                    $archivos = json_decode($campania->archivos_adjuntos);
                    foreach ($archivos as $archivo) {
                        Storage::delete($archivo);
                    }
                }

                //subir archivos nuevos
                $files = $request->file('archivos_adjuntos');
                $archivos = [];
                foreach ($files as $file) {
                    $archivos[] = $file->store('adjuntos');
                }
                $data["archivos_adjuntos"] = json_encode($archivos);
            }

            $campania->update($data);

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

    public function downloadAttached(Request $request)
    {

        // dd($request->all());

        $request->validate([
            "adjunto" => "required|string",
            "campania_id" => "required|integer"
        ]);

        $campania = Campania::find($request->campania_id);

        //si se encuentra el archivo en la campania y el usuario es el dueño
        if ($campania && $campania->user_id == Auth::user()->id) {
            $archivos = json_decode($campania->archivos_adjuntos);
            if (in_array($request->adjunto, $archivos)) {
                return Storage::download($request->adjunto);
            }
        } else {
            return redirect()->back()->withErrors("No se encontró el archivo");
        }
    }

    public function send(Campania $campania)
    {
        $resp = SendCampania::send($campania);

        if ($resp["ok"]) {
            return redirect()->route('campanias.index')
                ->with('message', 'Campaña enviada con éxito')
                ->with('data', $resp["data"]);
        } else {
            return redirect()->back()->withErrors($resp["message"]);
        }
    }

    public function syncReport(Campania $campania)
    {
        $resp = SendCampania::report($campania);

        if ($resp["ok"]) {
            return redirect()->route('campanias.index')
                ->with('message', 'Reporte de campaña actualizado')
                ->with('data', $resp["data"]);
        } else {
            return redirect()->back()->withErrors($resp["message"]);
        }
    }

    public function report(Campania $campania)
    {
        // return redirect()->route('campanias.index')
        //     ->with('message', 'Campaña creada con éxito');
        return redirect()->route('resultados.index')
            ->with('data', $campania);
    }
}
