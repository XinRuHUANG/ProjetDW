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
        $user = $request->user();

        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id_user . ',id_user',
            'photo_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'birthday' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'points' => 'required|integer',
        ]);

<<<<<<< HEAD
        $histories = $user->pointHistories()->orderBy('created_at', 'desc')->get();

        return Inertia::render('Profile/Show', [
            'user' => $user,
            'stats' => [
                'favoritesCount' => $user->favoriteBooks->count(),
                'borrowedCount' => $user->borrowedBooks->count(),
                'reservationsCount' => $user->computers->count() + 
                                      $user->tablets->count() +
                                      $user->seats->count() +
                                      $user->rooms->count()
            ],
            'pointHistories' => $histories
        ]);
=======
        if ($request->hasFile('photo_url')) {
            // Supprimer l'ancienne photo si elle existe
            if ($user->photo_url && Storage::exists('public/' . $user->photo_url)) {
                Storage::delete('public/' . $user->photo_url);
            }

            // Sauvegarder la nouvelle
            $data['photo_url'] = $request->file('photo_url')->store('profile-photos', 'public');
        }

        $user->update($data);
        
        $this->updateUserTypeBasedOnPoints($user);

        return redirect()->route('profile.edit')->with('status', 'Profil mis à jour avec succès.');
>>>>>>> bf8e38b (dernier modif)
    }

}

