<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeruDepartment extends Model
{
    use HasFactory;

    protected $table = 'peru_departments';

    protected $casts = [
        'id' => 'string',
    ];
}
