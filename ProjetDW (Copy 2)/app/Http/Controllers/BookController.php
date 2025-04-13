<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\{Request, JsonResponse};
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    /**
     * Basculer l'état favori d'un livre
     */

    
    public function index()
    {
        $books = Book::with('category')->get();
        $categories = Category::select('id_category', 'name')->get();

        return Inertia::render('Books/Index', [
            'books' => $books,
            'categories' => $categories,
        ]);
    }
}
