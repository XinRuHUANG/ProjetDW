<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConnectedDevice extends Model
{
    protected $table = 'equipment';
    protected $primaryKey = 'idEquipment';
    public $timestamps = false;

    protected $fillable = [
        'equipmentType', 'model', 'brand', 'serialNumber',
        'purchaseDate', 'warrantyExpiry', 'status',
        'lastMaintenanceDate', 'notes',
    ];
}
