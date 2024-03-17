<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaniaPersona extends Model
{
    use HasFactory;

    protected $table = 'campania_personas';

    protected $fillable = ['documento', 'correo'];
}
