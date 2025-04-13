<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{

    /**
     * Nom de la table associée au modèle
     * @var string
     */
    protected $table = 'equipment';
    
    protected $primaryKey = 'id_equipment';

    protected $fillable = [
        'equipment_type',
        'model',
        'brand',
        'status',
        'location',
        'assigned_to',
        'notes',
    ];

    public $timestamps = true;
}

