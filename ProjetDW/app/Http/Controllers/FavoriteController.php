<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\{Request, JsonResponse};
use Illuminate\Support\Facades\Log;

class FavoriteController extends Controller
{
    /**
     * Basculer l'état favori d'un livre
     */
    public function toggle(Request $request, Book $book): JsonResponse
    {
        try {
            $request->user()->favoriteBooks()->toggle($book->idBook);
            
            $isFavorite = $request->user()->favoriteBooks()
                ->where('idBook', $book->idBook)
                ->exists();
                
            return response()->json([
                'status' => 'success',
                'isFavorite' => $isFavorite,
                'message' => $isFavorite 
                    ? 'Livre ajouté aux favoris' 
                    : 'Livre retiré des favoris'
            ]);

        } catch (\Exception $e) {
            Log::error('Favorite toggle error: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue'
            ], 500);
        }
    }

    /**
     * Lister les favoris paginés
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $favorites = $request->user()
                ->favoriteBooks()
                ->with(['author', 'category'])
                ->paginate(10);
                
            return response()->json($favorites);
            
        } catch (\Exception $e) {
            Log::error('Favorites list error: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Impossible de charger les favoris'
            ], 500);
        }
    }
}