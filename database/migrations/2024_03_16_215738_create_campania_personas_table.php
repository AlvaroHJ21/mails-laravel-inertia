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
        Schema::create('campania_personas', function (Blueprint $table) {
            $table->id();

            //from excel
            $table->string("documento");
            $table->string("correo");

            //from reporte de envio
            $table->string("id_mail")->nullable();
            $table->string("estado_mail")->nullable();

            $table->foreignId("campania_id")->constrained("campanias")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campania_personas');
    }
};
