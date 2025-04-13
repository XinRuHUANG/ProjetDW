<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EquipmentUsage;
use App\Models\Equipment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentUsageController extends Controller
{
    // Voir toutes les demandes d'utilisation
    public function index()
    {
        $usages = EquipmentUsage::with(['equipment', 'user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/EquipmentUsageRequests', [
            'usages' => $usages,
        ]);
    }

    // Approuver une demande
    public function approve($id)
    {
        $usage = EquipmentUsage::findOrFail($id);
        $usage->status = 'approved';
        $usage->save();

        return back()->with('success', 'Demande approuvée avec succès.');
    }

    // Refuser une demande
    public function reject($id)
    {
        $usage = EquipmentUsage::findOrFail($id);
        $usage->status = 'rejected';
        $usage->save();

        return back()->with('success', 'Demande rejetée.');
    }
}
