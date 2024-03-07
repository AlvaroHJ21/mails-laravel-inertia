<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Segmento extends Model
{
    use HasFactory;

    protected $table = "segmentos";

    protected $fillable = [
        "nombre",
        "filtros",
        "user_id"
    ];

    public function personas()
    {
        return $this->hasMany(SegmentoPersona::class);
    }
}
