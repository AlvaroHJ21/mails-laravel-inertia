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

            //from nube
            $table->string("documento");
            $table->date("fh_nacimiento");
            $table->string("sexo");
            $table->string("estado_civil");
            $table->string("ubigeo");
            $table->string("departamento");
            $table->string("provincia");
            $table->string("distrito");

            //calculated
            $table->string("edad_grupo");
            $table->string("generacion");

            //from excel
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
