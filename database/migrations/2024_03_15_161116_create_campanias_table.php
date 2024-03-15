<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('campanias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string("correo_envio");
            $table->dateTime('fecha_envio');
            $table->unsignedSmallInteger("medio_envio");
            $table->string("link");
            $table->string("asunto");
            $table->text("contenido");
            $table->foreignId('user_id')->constrained("users");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campanias');
    }
};
