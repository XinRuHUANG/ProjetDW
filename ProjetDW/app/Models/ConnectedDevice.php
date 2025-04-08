<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConnectedDevice extends Model
{
    protected $table = 'equipment';
    protected $primaryKey = 'id_equipment';
    public $timestamps = false;

    protected $fillable = [
        'equipment_type', 'model', 'brand', 'status','location'
    ];
}
