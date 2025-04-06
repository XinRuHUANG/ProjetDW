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

// Routes protégées (auth et email vérifié)
Route::middleware(['auth', 'verified'])->group(function () {

    // Routes pour les objets connectés et salles
    Route::get('/objets-connectes', [ObjetConnecteController::class, 'index'])->name('objets.connectes');
    Route::get('/salles', fn () => Inertia::render('Rooms/Index'))->name('salles.index');
    Route::get('/livres', fn () => Inertia::render('Books/Index'))->name('livres.index');

    // Dashboard principal
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
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
    Route::get('/profile', [ProfileController::class, 'show'])->middleware('auth');
    Route::post('/books/{book}/mark-read', [BookController::class, 'markAsRead'])->middleware('auth');
    Route::post('/record-attendance', [LibraryAttendanceController::class, 'recordAttendance'])->middleware('auth');
    Route::post('/record-print', [PrintingController::class, 'recordPrint'])->middleware('auth');
});

// Routes d'authentification (login, register, etc.)
require __DIR__.'/auth.php';
?>
