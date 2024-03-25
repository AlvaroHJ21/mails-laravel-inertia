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
        "fecha_envio",
        "medio_envio",
        "correo_envio",
        "correo_asunto",
        "correo_contenido",
        "archivos_adjuntos",
        "whatsapp_envio",
        "whatsapp_contenido",

        "enviado",
        "codigo_envio",
        "n_registros",
        "n_validados",
        "n_abiertos",

        "user_id",
    ];

    protected $casts = [
        "n_registros" => "integer",
        "n_validados" => "integer",
        "n_abiertos" => "integer",
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
