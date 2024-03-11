<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeruDistrict extends Model
{
    use HasFactory;

    protected $table = 'peru_districts';

    protected $casts = [
        'id' => 'string',
    ];
}
