<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $primaryKey = 'id_room';

    protected $fillable = [
        'room_name',
        'capacity',
        'features',
        'is_active',
    ];

    public $timestamps = true;
}

