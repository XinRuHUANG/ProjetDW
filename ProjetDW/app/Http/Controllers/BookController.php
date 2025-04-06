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
}