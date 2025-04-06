<?php
use App\Events\UserActivity;
use App\Listeners\UpdateUserPoints;

class EventServiceProvider extends ServiceProvider{
    protected $listen = [
        UserActivity::class => [
            UpdateUserPoints::class,
        ],
        Registered::class => [
            SendEmailVerificationNotification::class,
            // Ajoutez ceci pour les points d'inscription
            UpdateUserPoints::class,
        ],
    ];
}