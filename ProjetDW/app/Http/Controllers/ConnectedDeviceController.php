<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConnectedDeviceController extends Controller
{
    public function index(Request $request)
    {
        $query = Equipment::query();

        if ($request->has('type') && $request->type !== '') {
            $query->where('equipment_type', $request->type);
        }

        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        $devices = $query->get();

        return Inertia::render('ConnectedDevices/Index', [
            'devices' => $devices,
            'filters' => $request->only('type', 'status')
        ]);
    }
}
