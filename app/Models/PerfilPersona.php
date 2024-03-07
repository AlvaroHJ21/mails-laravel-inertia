<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerfilPersona extends Model
{
    use HasFactory;

    protected $fillable = [
        "dni",
        "nombre",
        "apellido",
        "fecha_nacimiento",
        "correo",
        "var1",
        "var2",
        "var3",
        "perfil_id"
    ];
}
