<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\{Request, JsonResponse};
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller{
    public function markAsRead(Book $book)
    {
        auth()->user()->increment('books_read');
        event(new UserActivity(auth()->user()));
        
        return back()->with('success', 'Livre marqué comme lu');
    }

    public function index()
    {
        // Récupère tous les livres
        $books = Book::all();
        
        // Retourne la vue Inertia avec les données
        return Inertia::render('Books/Index', [
            'books' => $books
        ]);
    }
    
    /**
     * Basculer l'état favori d'un livre
     */
    public function index()
    {
        $books = books::select('id_book', 'title', 'author', 'cover_image_url', 'status', 'id_category')->get();
        $categories = book_category::select('id_category', 'name')->get();

        return Inertia::render('BooksIndex', [
            'books' => $books,
            'categories' => $categories
        ]);
    }
}
