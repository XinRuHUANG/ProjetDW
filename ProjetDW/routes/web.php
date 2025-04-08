<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ConnectedDeviceController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LibraryAttendanceController;
use App\Http\Controllers\PrintingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

// Page d'accueil avec redirection vers le Dashboard si connecté
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Route d'accueil publique
Route::get('/accueil', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome.public');

// Routes protégées (auth et email vérifié)
Route::middleware(['auth', 'verified'])->group(function () {

    // Favoris
    Route::get('/favoris', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favoris/toggle', [FavoriteController::class, 'toggle'])->name('favorites.toggle');
    Route::get('/api/favoris', function () {
        $favorites = Auth::user()->favoriteBooks()->pluck('books.idBook');
        return response()->json(['favorites' => $favorites]);
    });

    // Livres
    Route::get('/livres', [BookController::class, 'index'])->name('books.index');

    // Dashboard spécifique membre
    Route::get('/membre/dashboard', function () {
        return Inertia::render('MemberDashboard');
    })->name('member.dashboard');

    // Objets connectés
    Route::get('/objets-connectes', [ConnectedDeviceController::class, 'index'])->name('devices.index');

    // Salles
    Route::get('/salles', fn () => Inertia::render('Rooms/Index'))->name('salles.index');

    // Dashboard principal
    Route::get('/dashboard', function () {
        return Inertia::render('MemberDashboard');
    })->name('dashboard');

    // Gestion du profil utilisateur
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Gestion des membres
    Route::prefix('members')->group(function () {
        Route::get('/', [MemberController::class, 'index'])->name('members.index');
        Route::get('/{user}', [MemberController::class, 'show'])->name('members.show');
    });

    // Ressources pour les livres et appareils
    Route::resource('books', BookController::class)->except(['create', 'edit']);
    Route::resource('devices', DeviceController::class)->except(['create', 'edit']);

    // Gestion des points
    Route::post('/books/{book}/mark-read', [BookController::class, 'markAsRead']);
    Route::post('/record-attendance', [LibraryAttendanceController::class, 'recordAttendance']);
    Route::post('/record-print', [PrintingController::class, 'recordPrint']);
});

Route::get('/livres', fn () => Inertia::render('Books/Index'))->name('livres.index');
    
    // Objets connectés
    // Objets connectés
            Route::get('/objets-connectes', [ConnectedDeviceController::class, 'index'])->name('objets-connectes.index');



// Routes administrateur
Route::middleware(['auth', 'is_admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::patch('/admin/users/update', [AdminController::class, 'updateUserType'])->name('admin.users.update');
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');

    // Routes d'administration pour la gestion des salles, livres, sièges et équipements
    Route::post('/admin/rooms', [AdminController::class, 'storeRoom'])->name('admin.rooms.store');
    Route::post('/admin/books', [AdminController::class, 'storeBook'])->name('admin.books.store');
    Route::post('/admin/seats', [AdminController::class, 'storeSeat'])->name('admin.seats.store');
    Route::post('/admin/equipments', [AdminController::class, 'storeEquipment'])->name('admin.equipments.store');
});

// Routes d'authentification (login, register, etc.)
require __DIR__.'/auth.php';
?>

