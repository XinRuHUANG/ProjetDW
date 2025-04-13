<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RoomReservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminRoomReservationController extends Controller
{
    public function index()
    {
        $reservations = RoomReservation::with(['user', 'room', 'seats'])
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Admin/RoomRequests', [
            'reservations' => $reservations,
        ]);
    }

    public function approve($id)
    {
        $reservation = RoomReservation::findOrFail($id);
        $reservation->status = 'approved';
        $reservation->save();

        return back()->with('success', 'Réservation confirmée ✅');
    }

    public function reject($id)
    {
        $reservation = RoomReservation::findOrFail($id);
        $reservation->status = 'rejected';
        $reservation->save();

        return back()->with('success', 'Réservation rejetée ❌');
    }
}

