<?php

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
    Route::delete('/perfiles/{perfil}/destroy', [PerfilController::class, 'destroy'])->name('perfiles.destroy');

    Route::get('/segmentos', [SegmentoController::class, "index"])->name('segmentos.index');
    Route::post('/segmentos', [SegmentoController::class, "store"])->name('segmentos.store');

    Route::get('/programacion', function () {
        return Inertia::render('Programacion/Index');
    })->name('programacion.index');
    Route::get('/resultados', function () {
        return Inertia::render('Resultados/Index');
    })->name('resultados.index');

    // Route::get('/test', [PerfilController::class, 'test'])->name('perfiles.test');
});

require __DIR__ . '/auth.php';
