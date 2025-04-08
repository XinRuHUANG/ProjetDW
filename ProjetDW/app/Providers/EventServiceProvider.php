<?php
<<<<<<< HEAD
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
=======
namespace App\Providers;

use Illuminate\Auth\Events\Login;
use App\Listeners\UpdateUserTypeOnLogin;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Login::class => [
            UpdateUserTypeOnLogin::class,
        ],
    ];

    public function boot(): void
    {
        //
    }
}

>>>>>>> bf8e38b (dernier modif)
