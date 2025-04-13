<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Seat;
use App\Models\RoomReservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomReservationController extends Controller
{
    public function index()
    {
        $rooms = Room::where('is_active', 1)->get();
        $seats = Seat::where('is_active', 1)->get();

        return Inertia::render('Rooms/Index', [
            'rooms' => $rooms,
            'seats' => $seats,
        ]);
    }

    public function store(Request $request)
    { $user = auth()->user();
        $request->validate([
            'id_room' => 'required|exists:rooms,id_room',
            'reservation_date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
            'purpose' => 'nullable|string|max:255',
            'seats' => 'nullable|array',
            'seats.*' => 'exists:seats,id_seat'
        ]);

        $reservation = RoomReservation::create([
            'id_user' => auth()->id(),
            'id_room' => $request->id_room,
            'reservation_date' => $request->reservation_date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'purpose' => $request->purpose,
            'status' => 'pending'
        ]);

        // Attacher les sièges
        if ($request->has('seats')) {
            $reservation->seats()->sync($request->seats);
        }

        $user->increment('points', 5);

        return redirect()->route('dashboard')->with('success', 'Réservation envoyée à l\'admin pour validation.');
    }
}

