<?php

namespace App\Http\Controllers;   

use App\Models\Book;
use App\Models\User;
use App\Models\Equipment;
use App\Models\Room;
use Inertia\Inertia;


class WelcomeController extends Controller
{
    public function index()
    {
        // Récupérer les livres de la base de données
        $books = book::all(); // ou vous pouvez ajouter des filtres, des tris, etc.
        $rooms = room::all();
        $equipments = equipment::all();
        // Passer les livres à la vue React via Inertia
        return Inertia::render('Welcome', [
            
            'auth' => ['user' => auth()->user(),], // Si vous voulez aussi passer les données d'authentification
            'laravelVersion' => app()->version(),
            'phpVersion' => PHP_VERSION,
            'books' => $books,
            'rooms'=>$rooms,
            'equipments'=>$equipments,
        ]);
    }
}
?>
