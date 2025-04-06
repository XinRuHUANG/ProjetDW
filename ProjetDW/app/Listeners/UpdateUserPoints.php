<?php

namespace App\Listeners;

use App\Events\UserActivity;
use App\Models\PointHistory;

class UpdateUserPoints
{
    public function handle($event)
    {
        $user = $event->user;
        
        // Points pour l'inscription
        if ($event instanceof Registered) {
            $user->addPoints(10, 'Inscription');
        }
        
        // Points pour la lecture
        if ($user->books_read % 3 === 0) {
            $user->addPoints(10, 'Lecture de 3 livres');
        }
        
        // Points pour présence
        if ($user->library_hours >= 2) {
            $user->addPoints(5, 'Présence à la bibliothèque');
        }
        
        // Points mensuels
        if ($user->books_read >= 3 && $user->library_hours >= 15) {
            $user->addPoints(5, 'Utilisateur actif du mois');
        }
        
        // Déduction impression
        if ($user->printed_pages > 0) {
            $deduction = $user->printed_pages * 10;
            $user->addPoints(-$deduction, 'Utilisation imprimante');
        }
    }
}