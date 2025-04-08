<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\{Request, JsonResponse};
use Illuminate\Support\Facades\Log;

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
            'categories' => $categories
        ]);
    }
}
