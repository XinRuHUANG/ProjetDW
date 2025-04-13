<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Affiche le profil de l'utilisateur connecté
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Profile/Edit', [
            'user' => [
                'id'            => $user->id,
                'first_name'    => $user->first_name,
                'last_name'     => $user->last_name,
                'age'           => $user->age,
                'gender'        => $user->gender,
                'birthday'      => $user->birthday,
                'email'         => $user->email,
                'points'        => $user->points,
                'photo_url'     => $user->photo_url,
                'is_active'     => $user->is_active,
                'id_user_type'  => $user->id_user_type,
            ],
        ]);
    }

    /**
     * Déconnecter et supprimer le compte utilisateur
     */
    public function destroy(Request $request)
    {
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
    
        public function update(Request $request): RedirectResponse
{
    // Validation des données envoyées
    $validated = $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:users,email,' . $request->user()->id_user . ',id_user',
        'birthday' => 'nullable|date',
        'gender' => 'nullable|in:male,female,other',
        'photo_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $user = $request->user();

    // Si une nouvelle photo est envoyée, on gère le téléchargement
    if ($request->hasFile('photo_url')) {
        // Supprimer l'ancienne photo si elle existe
        if ($user->photo_url && Storage::exists('public/' . $user->photo_url)) {
            Storage::delete('public/' . $user->photo_url);
        }

        // Sauvegarder la nouvelle photo
        $validated['photo_url'] = $request->file('photo_url')->store('profile-photos', 'public');
    }

    // Mettre à jour les informations de l'utilisateur
    $user->update($validated);

    // Mettre à jour le type d'utilisateur en fonction des points (si nécessaire)
    //$this->updateUserTypeBasedOnPoints($user);

    // Rediriger avec un message de succès
    return back()->with('status', 'Profil mis à jour avec succès.');
}


}

