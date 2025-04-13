<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipment;
use App\Models\EquipmentUsage;
use Inertia\Inertia;

class DeviceController extends Controller
{
    public function index()
        {
            $equipments = Equipment::all();
            return Inertia::render('Equipments', [
                'equipments' => $equipments
            ]);
        }

        public function requestUsage(Request $request)
        { $user = auth()->user();
            $request->validate([
                'id_equipment' => 'required|exists:equipment,id_equipment',
                'start_date_time' => 'required|date',
                'end_date_time' => 'required|date|after:start_date_time',
                'purpose' => 'nullable|string',
            ]);

            EquipmentUsage::create([
                'id_equipment' => $request->id_equipment,
                'id_user' => auth()->id(),
                'start_date_time' => $request->start_date_time,
                'end_date_time' => $request->end_date_time,
                'purpose' => $request->purpose,
                'status' => 'pending',
            ]);

            $user->increment('points', 5);

            return back()->with('success', 'Demande envoyée aux administrateurs.');
        }
}
