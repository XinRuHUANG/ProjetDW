<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipmentSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('equipment')->insert([
            [
                'equipmentType' => 'Computer',
                'model' => 'ThinkPad X1',
                'brand' => 'Lenovo',
                'serialNumber' => 'SN123456',
                'status' => 'Available',
                'purchaseDate' => '2023-01-01',
                'warrantyExpiry' => '2025-01-01',
                'notes' => 'Ordinateur rapide'
            ],
            [
                'equipmentType' => 'Tablet',
                'model' => 'iPad Air',
                'brand' => 'Apple',
                'serialNumber' => 'SN654321',
                'status' => 'In Use',
                'purchaseDate' => '2022-05-10',
                'warrantyExpiry' => '2024-05-10',
                'notes' => 'En prêt'
            ],
            [
                'equipmentType' => 'Computer',
                'model' => 'MacBook Pro',
                'brand' => 'Apple',
                'serialNumber' => 'SN789123',
                'status' => 'Maintenance',
                'purchaseDate' => '2021-03-15',
                'warrantyExpiry' => '2023-03-15',
                'notes' => 'À réparer'
            ],
        ]);
    }
}
