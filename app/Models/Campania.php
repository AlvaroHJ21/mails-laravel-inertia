<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campania extends Model
{
    use HasFactory;

    protected $table = "campanias";

    protected $fillable = [
        "nombre",
        "correo_envio",
        "fecha_envio",
        "medio_envio",
        "link",
        "asunto",
        "contenido",
        "user_id",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function personas()
    {
        return $this->hasMany(CampaniaPersona::class);
    }
}
