<?php
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\DeviceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Page d'accueil avec redirection vers le Dashboard si connecté
Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
})->name('home');

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

    // Routes pour les objets connectés et salles
   // Favoris
    Route::get('/favoris', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favoris/toggle', [FavoriteController::class, 'toggle'])->name('favorites.toggle');
    Route::get('/api/favoris', function () {
        $favorites = Auth::user()->favoriteBooks()->pluck('books.idBook');
        return response()->json(['favorites' => $favorites]);
    })->middleware('auth');
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
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Gestion du profil utilisateur
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Gestion des membres
    Route::prefix('members')->middleware(['auth', 'verified'])->group(function () {
        Route::get('/', [MemberController::class, 'index'])->name('members.index');
        Route::get('/{user}', [MemberController::class, 'show'])->name('members.show'); });
    

    // Ressources pour les livres et appareils
    Route::resource('books', BookController::class)->except(['create', 'edit']);
    Route::resource('devices', DeviceController::class)->except(['create', 'edit']);
    Route::get('/books', [BookController::class, 'index'])->name('books.index')->middleware(['auth', 'verified']);

    // Gestion des points
    Route::post('/books/{book}/mark-read', [BookController::class, 'markAsRead'])->middleware('auth');
    Route::post('/record-attendance', [LibraryAttendanceController::class, 'recordAttendance'])->middleware('auth');
    Route::post('/record-print', [PrintingController::class, 'recordPrint'])->middleware('auth');

    
});

// Routes d'authentification (login, register, etc.)
require __DIR__.'/auth.php';
?>
