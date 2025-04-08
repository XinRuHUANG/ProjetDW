<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && auth()->user()->id_user_type === 3) {
            return $next($request);
        }

        abort(403, 'Accès réservé aux administrateurs.');
    }
}

