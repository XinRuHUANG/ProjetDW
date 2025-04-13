<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentUsage extends Model
{
    protected $table = 'equipment_usage';
    
    protected $primaryKey = 'id_usage';

    protected $fillable = [
        'id_equipment',
        'id_user',
        'purpose',
        'status',
        'start_date_time',
        'end_date_time',
        'status',
    ];

    public $timestamps = true;
    
    public function equipment()
        {
            return $this->belongsTo(Equipment::class, 'id_equipment', 'id_equipment');
        }
            
        public function user()
        {
            return $this->belongsTo(User::class, 'id_user', 'id_user');
        }
}
