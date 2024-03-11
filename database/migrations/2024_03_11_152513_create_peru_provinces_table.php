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
        Schema::create('peru_provinces', function (Blueprint $table) {
            $table->string('id', 4)->primary();
            $table->string('name', 100);
            $table->string('department_id', 2);
            $table->foreign('department_id')->references('id')->on('peru_departments');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peru_provinces');
    }
};
