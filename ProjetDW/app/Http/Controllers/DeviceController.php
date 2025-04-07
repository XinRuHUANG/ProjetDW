<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DeviceController extends Controller
{
    public function index()
    {
        return Inertia::render('Devices/Index', [
            // Ajoutez vos données ici
        ]);
    }
}