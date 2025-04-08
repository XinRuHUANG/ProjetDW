<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookCategory;  // Si ton modèle pour les catégories est `BookCategory`
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Marquer un livre comme lu
     */
    public function markAsRead(Book $book)
    {
        auth()->user()->increment('books_read');
        event(new UserActivity(auth()->user())); // Assurez-vous que l'événement `UserActivity` existe

        return back()->with('success', 'Livre marqué comme lu');
    }

    /**
     * Afficher la liste des livres
     */
    public function index()
    {
        // Récupère tous les livres et leurs catégories
        $books = Book::select('id_book', 'title', 'author', 'cover_image_url', 'status', 'id_category')->get();
        $userFavorites = Favorites::where('id_user', auth()->id())->pluck('id_book'); // On récupère uniquement les IDs des livres favoris

        $categories = BookCategory::select('id_category', 'name')->get();

        // Retourne la vue Inertia avec les données
        return Inertia::render('Books/Index', [
            'books' => $books,
            'categories' => $categories,
            'userFavorites' => $userFavorites
        ]);
    }
}

