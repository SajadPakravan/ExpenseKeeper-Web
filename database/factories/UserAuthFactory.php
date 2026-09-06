<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserAuthFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'username' => fake()->userName(),
            'password' => Hash::make('12345678'),
            'logged' => fake()->boolean(),
        ];
    }
}
