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
        Schema::create('perfil_personas', function (Blueprint $table) {
            $table->id();
            $table->string("dni");
            $table->string("nombre");
            $table->string("apellido");
            $table->date("fecha_nacimiento");
            $table->string("correo")->nullable();
            $table->string("var1")->nullable();
            $table->string("var2")->nullable();
            $table->string("var3")->nullable();
            $table->foreignId("perfil_id")->constrained("perfiles")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perfil_personas');
    }
};
