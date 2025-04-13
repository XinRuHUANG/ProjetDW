<?php
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\MemberDashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RoomReservationController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\BorrowController;
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



Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

// Routes protégées (auth et email vérifié)
Route::middleware(['auth', 'verified'])->group(function () {

    // Routes pour les objets connectés et salles
    Route::get('/objets-connectes', [ObjetConnecteController::class, 'index'])->name('objets.connectes');
    Route::get('/salles', [RoomReservationController::class, 'index'])->name('salles.index');
    //favoris
    
    Route::post('/favoris', [FavoriteController::class, 'store'])->name('favoris.store');
    Route::post('/borrow', [BorrowController::class, 'store'])->name('borrow.store');
    
    //livre
    Route::get('/livres', [BookController::class, 'index'])->name('livres.index');
    

    
    //objet connecté
    Route::get('/objets-connectes', [DeviceController::class, 'index'])->name('equipments.index');
    Route::post('/objets-connectes/usage', [DeviceController::class, 'requestUsage'])->name('equipments.usage.request');



    // Dashboard principal
    Route::get('/dashboard', [MemberDashboardController::class, 'index'])->name('dashboard');
    Route::delete('/favoris/{id}', [MemberDashboardController::class, 'destroy'])->name('favoris.destroy');


    // Gestion du profil utilisateur
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Gestion des membres
    Route::prefix('members')->group(function () {
        Route::get('/', [MemberController::class, 'index'])->name('members.index');
        Route::get('/{user}', [MemberController::class, 'show'])->name('members.show');
    });

    // Room
    Route::post('/admin/rooms', [AdminController::class, 'storeRoom'])->name('admin.rooms.store');
    Route::post('/salles/reserver', [RoomReservationController::class, 'store'])->name('salles.reserver');

    // Book
    Route::post('/admin/books', [AdminController::class, 'storeBook'])->name('admin.books.store');


    // Seat
    Route::post('/admin/seats', [AdminController::class, 'storeSeat'])->name('admin.seats.store');

    // Equipment
    Route::post('/admin/equipments', [AdminController::class, 'storeEquipment'])->name('admin.equipments.store');


     
    

});

 


    //admin page
    Route::middleware(['auth', 'is_admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::patch('/admin/users/update', [AdminController::class, 'updateUserType'])->name('admin.users.update');
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');
    Route::get('/admin/equipment-requests', [\App\Http\Controllers\Admin\EquipmentUsageController::class, 'index'])->name('admin.equipment.requests');
    Route::patch('/admin/equipment-requests/{id}/approve', [\App\Http\Controllers\Admin\EquipmentUsageController::class, 'approve'])->name('admin.equipment.approve');
    Route::patch('/admin/equipment-requests/{id}/reject', [\App\Http\Controllers\Admin\EquipmentUsageController::class, 'reject'])->name('admin.equipment.reject');
    Route::get('/admin/room-requests', [\App\Http\Controllers\Admin\AdminRoomReservationController::class, 'index'])->name('admin.rooms.requests');
    Route::patch('/admin/room-requests/{id}/approve', [\App\Http\Controllers\Admin\AdminRoomReservationController::class, 'approve'])->name('admin.rooms.approve');
    Route::patch('/admin/room-requests/{id}/reject', [\App\Http\Controllers\Admin\AdminRoomReservationController::class, 'reject'])->name('admin.rooms.reject');
});

// Routes d'authentification (login, register, etc.)
require __DIR__.'/auth.php';
?>
