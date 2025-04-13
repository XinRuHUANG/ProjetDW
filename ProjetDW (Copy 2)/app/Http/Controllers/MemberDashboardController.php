<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\BorrowRecord;
use App\Models\RoomReservation;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MemberDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $usage = $user->usage()->with('equipment')->get();
        $favoris = Favorite::with('book')->where('id_user', auth()->id())->get();
        $reservations = RoomReservation::with('room')->where('id_user', auth()->id())->get();
        $emprunts = BorrowRecord::with('book')->where('id_user', auth()->id())->get();

        return Inertia::render('MemberDashboard', [
            'favoris' => $favoris      ,
            'emprunts' => $emprunts,
            'reservations' => $reservations,
            'usage' => $usage, // si usage est bien une relation
        ]);
    }

    public function destroy($id)
    {
        $favori = Favorite::findOrFail($id);

        if ($favori->id_user !== auth()->id()) {
            abort(403);
        }

        $favori->delete();

        return back()->with('success', 'Favori supprimé avec succès.');
    }
}

