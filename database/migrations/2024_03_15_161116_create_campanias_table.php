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
            $table->dateTime('fecha_envio');

            $table->unsignedSmallInteger("medio_envio");

            $table->string("correo_envio")->nullable();
            $table->string("correo_asunto")->nullable();
            $table->text("correo_contenido")->nullable();
            $table->json("archivos_adjuntos")->nullable();

            $table->string("whatsapp_envio")->nullable();
            $table->text("whatsapp_contenido")->nullable();

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
