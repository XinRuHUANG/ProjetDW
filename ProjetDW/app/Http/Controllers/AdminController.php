<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::select('id_user', 'first_name', 'email', 'id_user_type')->get();

        return Inertia::render('Admin/Dashboard', [
            'users' => $users
        ]);
    }

    public function updateUserType(Request $request)
    {
        $request->validate([
            'id_user' => 'required|exists:users,id_user',
            'id_user_type' => 'required|integer|min:1|max:3',
        ]);

        $user = User::where('id_user', $request->id_user)->first();
        $user->id_user_type = $request->id_user_type;
        $user->save();

        return Redirect::back()->with('message', 'Type d’utilisateur mis à jour');
    }
    
    
    
    public function deleteUser($id_user)
    {
        $user = User::where('id_user', $id_user)->firstOrFail();
        $user->delete();

        return Redirect::back()->with('message', 'Utilisateur supprimé');
    }
    
    public function storeRoom(Request $request)
    {
        $request->validate([
            'room_name' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'features' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        \App\Models\Room::create([
            'room_name' => $request->room_name,
            'capacity' => $request->capacity,
            'features' => $request->features,
            'is_active' => $request->is_active ?? 1,
        ]);

        return Redirect::back()->with('message', 'Salle ajoutée');
    }
    
    public function storeBook(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'isbn' => 'nullable|string',
            'year' => 'nullable|integer',
            'id_category' => 'required|exists:categories,id_category',
            'summary' => 'nullable|string',
            'stock' => 'required|integer',
            'status' => 'required|string',
            'cover_image_url' => 'nullable|string',
        ]);

        \App\Models\Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'isbn' => $request->isbn,
            'year' => $request->year,
            'id_category' => $request->id_category,
            'summary' => $request->summary,
            'stock' => $request->stock,
            'status' => $request->status,
            'cover_image_url' => $request->cover_image_url,
        ]);

        return Redirect::back()->with('message', 'Livre ajouté');
    }

    public function storeSeat(Request $request)
{
    $request->validate([
        'seat_number' => 'required|string',
        'zone' => 'required|string',
        'features' => 'nullable|string',
        'is_active' => 'boolean',
    ]);

    \App\Models\Seat::create([
        'seat_number' => $request->seat_number,
        'zone' => $request->zone,
        'features' => $request->features,
        'is_active' => $request->is_active ?? 1,
    ]);

    return Redirect::back()->with('message', 'Siège ajouté');
}


    public function storeEquipment(Request $request)
{
    $request->validate([
        'equipment_type' => 'required|string',
        'model' => 'nullable|string',
        'brand' => 'nullable|string',
        'status' => 'required|string',
        'location' => 'nullable|string',
        'assigned_to' => 'nullable|integer',
        'notes' => 'nullable|string',
    ]);

    \App\Models\Equipment::create([
        'equipment_type' => $request->equipment_type,
        'model' => $request->model,
        'brand' => $request->brand,
        'status' => $request->status,
        'location' => $request->location,
        'assigned_to' => $request->assigned_to,
        'notes' => $request->notes,
    ]);

    return Redirect::back()->with('message', 'Équipement ajouté');
}


}

