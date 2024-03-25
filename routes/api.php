<?php

use App\Http\Controllers\CampaniasResultadosController;
use App\Http\Controllers\HTMLController;
use App\Http\Controllers\UploadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post("/html/inline", [HTMLController::class, "inline"])->name("inline");
Route::post("/upload/image", [UploadController::class, "image"])->name("upload.image");
