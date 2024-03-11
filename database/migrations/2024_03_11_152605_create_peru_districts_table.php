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
        Schema::create('peru_districts', function (Blueprint $table) {
            $table->string('id', 6)->primary();
            $table->string('name', 100);
            $table->string('province_id', 4);
            $table->string('department_id', 2);
            $table->foreign('province_id')->references('id')->on('peru_provinces');
            $table->foreign('department_id')->references('id')->on('peru_departments');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peru_districts');
    }
};
