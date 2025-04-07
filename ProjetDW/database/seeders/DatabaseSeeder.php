<?php

namespace Database\Seeders;

use App\Models\{User, Book, Computer, Tablet, Seat, Room, BookCategory};
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Désactiver les événements de modèle pour éviter certains triggers
        User::withoutEvents(function () {
            // Admin
            User::create([
                'lastName' => 'System',
                'firstName' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password123'),
                'userType' => 'Admin',
                'age' => 30,
                'birthDate' => '1990-01-01',
                'gender' => 'Male',
                'points' => 1000
            ]);

            // Utilisateur test
            User::create([
                'lastName' => 'User',
                'firstName' => 'Test',
                'email' => 'user@example.com',
                'password' => Hash::make('password123'),
                'userType' => 'Member1',
                'age' => 25,
                'birthDate' => '1995-05-15',
                'gender' => 'Female',
                'points' => 500
            ]);

            // Utilisateurs aléatoires via factory
            User::factory(10)->create();
        });

        // Appel aux autres seeders
        $this->call([
            BookSeeder::class,
           
        ]);
    }
}
