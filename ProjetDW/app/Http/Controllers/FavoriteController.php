<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function index()
    {
        $favorites = Auth::user()->favoriteBooks()->get();

        return inertia('Favorites/Index', [
            'favorites' => $favorites,
        ]);
    }

    public function toggle(Request $request)
    {
        $bookId = $request->input('idBook');
        $user = Auth::user();

        // Correction : on précise bien "books.idBook"
        if ($user->favoriteBooks()->where('books.idBook', $bookId)->exists()) {
            $user->favoriteBooks()->detach($bookId);
        } else {
            $user->favoriteBooks()->attach($bookId);
        }

        return response()->json(['success' => true]);
    }
}
