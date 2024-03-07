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
        Schema::create('segmento_personas', function (Blueprint $table) {
            $table->id();
            $table->string("documento");
            $table->date("fh_nacimiento");
            $table->string("sexo");
            $table->string("estado_civil");
            $table->string("ubigeo");
            $table->string("departamento");
            $table->string("provincia");
            $table->string("distrito");
            $table->string("correo")->nullable();
            $table->string("var1")->nullable();
            $table->string("var2")->nullable();
            $table->string("var3")->nullable();
            $table->foreignId("segmento_id")->constrained("segmentos")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('segmento_personas');
    }
};
