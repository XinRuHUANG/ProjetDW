<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\{User, Book, Computer, Tablet, Seat, Room};
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\{RedirectResponse, Request, JsonResponse};
use Illuminate\Support\Facades\{Auth, Redirect, Storage};
use Inertia\{Inertia, Response};

class ProfileController extends Controller
{
    /**
     * Affiche le formulaire de profil utilisateur
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
           // 'user' => Auth::user(), // ✅ Ajout de l'utilisateur
            'userData' => $request->user()->only([
                'first_name', 
                'last_name', 
                'email', 
                'photo_url', 
                'birthDate'
            ]),
        ]);
    }

    /**
     * Met à jour les informations du profil
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $data = $request->validated();

        // Gestion de l'image de profil
        if ($request->hasFile('photo')) {
            // Supprimer l'ancienne image si elle existe
            if ($user->photo_url) {
                Storage::disk('public')->delete($user->photo_url);
            }
            $data['photo_url'] = $request->file('photo')->store('profiles', 'public');
        }

        // Gestion spéciale pour l'email
        if ($user->isDirty('email')) {
            $data['email_verified_at'] = null;
        }

        $user->update($data);

        if ($user->wasChanged('email')) {
            $user->sendEmailVerificationNotification();
        }

        return Redirect::route('profile.edit')->with('status', 'Profil mis à jour!');
    }

    /**
     * Supprime le compte utilisateur
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // Nettoyage des relations avant suppression
        $user->favorites()->detach();
        $user->borrowedBooks()->update(['id_user' => null]);
        
        // Suppression de la photo de profil
        if ($user->photo_url) {
            Storage::disk('public')->delete($user->photo_url);
        }

        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/')->with('status', 'Votre compte a été supprimé.');
    }

    /**
     * Affiche le profil utilisateur avec toutes ses données
     */
    public function show(): Response
    {
        $user = auth()->user()->load([
            'favoriteBooks' => fn($query) => $query->select(['idBook', 'title', 'author']),
            'borrowedBooks' => fn($query) => $query->select(['idBook', 'title', 'author']),
            'computers',
            'tablets',
            'seats',
            'rooms'
        ]);

        return Inertia::render('Profile/Show', [
            'user' => $user,
            'stats' => [
                'favoritesCount' => $user->favoriteBooks->count(),
                'borrowedCount' => $user->borrowedBooks->count(),
                'reservationsCount' => $user->computers->count() + 
                                      $user->tablets->count() +
                                      $user->seats->count() +
                                      $user->rooms->count()
            ]
        ]);
    }
}
