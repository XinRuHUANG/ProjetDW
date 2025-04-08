<?php

namespace App\Providers;

use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Registered;
use App\Events\UserActivity;
use App\Listeners\UpdateUserPoints;
use App\Listeners\UpdateUserTypeOnLogin;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        // Événement de connexion → mise à jour du type utilisateur
        Login::class => [
            UpdateUserTypeOnLogin::class,
        ],

        // Événement d'inscription → email + points
        Registered::class => [
            SendEmailVerificationNotification::class,
            UpdateUserPoints::class,
        ],

        // Activité utilisateur → mise à jour des points
        UserActivity::class => [
            UpdateUserPoints::class,
        ],
    ];

    public function boot(): void
    {
        //
    }
}

