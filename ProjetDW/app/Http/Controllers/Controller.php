<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function favorite(Book $book)
    {
        auth()->user()->favoriteBooks()->syncWithoutDetaching([$book->id]);
        return back()->with('success', 'Livre ajouté aux favoris !');
    }

    public function unfavorite(Book $book)
    {
        auth()->user()->favoriteBooks()->detach($book->id);
        return back()->with('success', 'Livre retiré des favoris.');
    }
}
