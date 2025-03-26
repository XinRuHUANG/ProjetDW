<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FavoriteController; // N'oubliez pas cet import
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    // Routes du profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Routes des favoris
    Route::get('/profile/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/books/{book}/favorite', [FavoriteController::class, 'toggle'])->name('favorites.toggle');
    // Route unique pour la gestion des favoris
    Route::post('/books/{book}/favorite', [BookController::class, 'favorite'])->name('favorites.store');
    Route::delete('/books/{book}/favorite', [BookController::class, 'unfavorite'])->name('favorites.destroy');

    // Route pour la liste des favoris
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
});

require __DIR__.'/auth.php';