<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserAuth;
use App\Models\UserSessions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->count(10)->create();
        UserAuth::factory()->count(10)->create();
        UserSessions::factory()->count(10)->create();
    }
}
