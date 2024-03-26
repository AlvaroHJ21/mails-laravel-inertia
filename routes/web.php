<?php

use App\Http\Controllers\CampaniaController;
use App\Http\Controllers\CampaniasResultadosController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SegmentoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('perfiles.index');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/perfiles', [PerfilController::class, 'index'])->name('perfiles.index');
    Route::get('/perfiles/template/download', [PerfilController::class, 'downloadTemplate'])->name('perfiles.downloadTemplate');
    Route::post('/perfiles/generate', [PerfilController::class, 'generate'])->name('perfiles.generate');
    Route::get('/perfiles/{perfil}/download', [PerfilController::class, 'download'])->name('perfiles.download');
    Route::put('/perfiles/{perfil}/update', [PerfilController::class, 'update'])->name('perfiles.update');
    Route::delete('/perfiles/{perfil}/destroy', [PerfilController::class, 'destroy'])->name('perfiles.destroy');

    Route::get('/segmentos', [SegmentoController::class, "index"])->name('segmentos.index');
    Route::post('/segmentos', [SegmentoController::class, "store"])->name('segmentos.store');
    Route::get('/segmentos/{segmento}/download', [SegmentoController::class, 'download'])->name('segmentos.download');
    Route::put('/segmentos/{segmento}/update', [SegmentoController::class, 'update'])->name('segmentos.update');
    Route::delete('/segmentos/{segmento}/destroy', [SegmentoController::class, 'destroy'])->name('segmentos.destroy');

    Route::get('/programacion', [CampaniaController::class, "index"])->name('campanias.index');
    Route::post('/campanias', [CampaniaController::class, "store"])->name('campanias.store');
    Route::get('/campanias/{campania}/download', [CampaniaController::class, 'download'])->name('campanias.download');
    Route::put('/campanias/{campania}', [CampaniaController::class, "update"])->name('campanias.update');
    Route::delete('/campanias/{campania}', [CampaniaController::class, "destroy"])->name('campanias.destroy');
    Route::get('/campanias/adjunto', [CampaniaController::class, "downloadAttached"])->name('campanias.download_attached');
    Route::post('/campanias/by-perfil/{perfil}', [CampaniaController::class, "storeByPerfil"])->name('campanias.store_by_perfil');
    Route::post('/campanias/by-segmento/{segmento}', [CampaniaController::class, "storeBySegmento"])->name('campanias.store_by_segmento');
    Route::post('/campanias/{campania}/send', [CampaniaController::class, "send"])->name('campanias.send');
    Route::post('/campanias/{campania}/report', [CampaniaController::class, "report"])->name('campanias.report');
    Route::get("/campanias", [CampaniaController::class, "updateAndGet"])->name("campanias.update_and_get");


    Route::get('/resultados', [CampaniasResultadosController::class, "index"])->name('resultados.index');
    Route::get("/resultados/update-and-get", [CampaniasResultadosController::class, "updateAndGet"])->name("campanias.update_and_get");
    Route::get('/resultados/download', [CampaniasResultadosController::class, 'download'])->name('resultados.download');

    // Route::get('/test', [PerfilController::class, 'test'])->name('perfiles.test');
});

require __DIR__ . '/auth.php';
