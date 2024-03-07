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
        Schema::create('big_query_dev', function (Blueprint $table) {
            $table->id();
            $table->string("DOCUMENTO");
            $table->string("FH_NACIMIENTO");
            $table->string("SEXO");
            $table->string("ESTADO_CIVIL");
            $table->string("UBIGEO");
            $table->string("DEPARTAMENTO");
            $table->string("PROVINCIA");
            $table->string("DISTRITO");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('big_query_dev');
    }
};
