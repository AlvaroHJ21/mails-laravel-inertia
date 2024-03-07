<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerfilPersona extends Model
{
    use HasFactory;

    protected $fillable = [
        "documento",
        "fh_nacimiento",
        "sexo",
        "estado_civil",
        "ubigeo",
        "departamento",
        "provincia",
        "distrito",
        "correo",
        "var1",
        "var2",
        "var3",
        "perfil_id",
    ];
}
