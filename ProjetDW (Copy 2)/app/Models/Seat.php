<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    protected $primaryKey = 'id_seat';

    protected $fillable = [
        'seat_number',
        'zone',
        'features',
        'is_active',
    ];

    public $timestamps = false;
}

