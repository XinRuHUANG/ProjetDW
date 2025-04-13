<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{

    /**
     * Nom de la table associée au modèle
     * @var string
     */
    protected $table = 'rooms';

    protected $primaryKey = 'id_room';

    protected $fillable = [
        'room_name',
        'capacity',
        'features',
        'is_active',
    ];

    public $timestamps = true;
}

