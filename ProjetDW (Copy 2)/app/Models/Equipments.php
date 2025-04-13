<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipments extends Model
    {
        protected $table = 'equipment';
        protected $primaryKey = 'id_equipment';
        public $timestamps = true;

        protected $fillable = [
            'equipment_type',
            'model',
            'brand',
            'status',
            'location',
            'assigned_to',
            'notes',
        ];

        // Relation avec les usages (si tu veux récupérer les utilisations)
        public function usages()
        {
            return $this->hasMany(EquipmentUsage::class, 'id_equipment');
        }
}

