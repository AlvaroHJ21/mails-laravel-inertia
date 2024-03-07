<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    use HasFactory;

    protected $table = "perfiles";

    protected $fillable = [
        "nombre",
        "user_id"
    ];

    public function personas()
    {
        return $this->hasMany(PerfilPersona::class);
    }
}
