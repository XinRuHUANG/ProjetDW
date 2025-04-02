<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\DeviceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route publique d'accueil
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Routes d'authentification (login, register, etc.)
require __DIR__.'/auth.php';

// Routes protégées (nécessitent d'être connecté et vérifié)
Route::middleware(['auth', 'verified'])->group(function () {
    // Route pour les objets connectés
    Route::inertia('/objets-connectes', 'ObjetConnectes')->name('objets.connectes');
    Route::inertia('/salles', 'Rooms/Index')->name('salles.index');
    Route::inertia('/livres', 'Books/Index')->name('livres.index');
    
    
    
    // Dashboard principal
    Route::get('/dashboard', function () {
        return Inertia::render('MemberDashboard');
    })->name('dashboard');

    // Gestion du profil utilisateur
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/public', [ProfileController::class, 'updatePublic'])->name('profile.update.public');
        Route::patch('/private', [ProfileController::class, 'updatePrivate'])->name('profile.update.private');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // Gestion des membres
    Route::prefix('members')->group(function () {
        Route::get('/', [MemberController::class, 'index'])->name('members.index');
        Route::get('/{user}', [MemberController::class, 'show'])->name('members.show');
    });

    // Ressources pour les livres et appareils
    Route::resource('books', BookController::class)->except(['create', 'edit']);
    Route::resource('devices', DeviceController::class)->except(['create', 'edit']);
});
