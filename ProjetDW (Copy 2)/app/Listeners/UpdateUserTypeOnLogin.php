<?php

namespace App\Listeners;

use App\Models\User;
use Illuminate\Auth\Events\Login;

class UpdateUserTypeOnLogin
{
    /**
     * Handle the event.
     *
     * @param  \Illuminate\Auth\Events\Login  $event
     * @return void
     */
    public function handle(Login $event)
    {
        // Récupérer l'utilisateur connecté
        $user = $event->user;

        // Vérifier si les points de l'utilisateur sont supérieurs à 80
        if ($user->points > 80) {
            // Mettre à jour le type d'utilisateur
            $user->id_user_type = 3;
            $user->save();
        }
    }
}

