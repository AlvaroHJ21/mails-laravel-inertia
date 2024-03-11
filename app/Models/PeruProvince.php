<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeruProvince extends Model
{
    use HasFactory;

    protected $table = 'peru_provinces';

    protected $casts = [
        'id' => 'string',
    ];
}
