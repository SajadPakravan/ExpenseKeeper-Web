<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserSessionsFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'ip_address' => fake()->ipv4(),
            'device' => fake()->word(),
            'active' => fake()->boolean(),
            'login_at' => fake()->dateTime(),
            'logout_at' => fake()->dateTime(),
        ];
    }
}
