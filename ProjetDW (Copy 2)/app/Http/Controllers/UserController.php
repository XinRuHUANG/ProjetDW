<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function addPoints(Request $request, User $user)
    {
        // Ajoutez 5 points à l'utilisateur
        $user->addPoints(5);

        // Retournez une réponse JSON
        return response()->json(['message' => '5 points ajoutés avec succès!']);
    }
}

