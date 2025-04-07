<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'firstName' => $this->faker->firstName(),
            'lastName' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'), // mot de passe par défaut
            'userType' => 'Member1',
            'age' => $this->faker->numberBetween(18, 65),
            'birthDate' => $this->faker->date('Y-m-d'),
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'points' => $this->faker->numberBetween(0, 1000),
            'remember_token' => Str::random(10),
        ];
    }
}
