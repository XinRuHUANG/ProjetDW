<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\{Request, JsonResponse};
use Illuminate\Support\Facades\Log;
<<<<<<< HEAD
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
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
            'books' => $books
        ]);
    }
}
=======

class BookController extends Controller
{
    /**
     * Basculer l'état favori d'un livre
     */
    public function index()
    {
        $books = books::select('id_book', 'title', 'author', 'cover_image_url', 'status', 'id_category')->get();
        $categories = book_category::select('id_category', 'name')->get();

        return Inertia::render('BooksIndex', [
            'books' => $books,
            'categories' => $categories,
            'userFavorites' => $userFavorites
        ]);
    }
}
>>>>>>> bf8e38b (dernier modif)
