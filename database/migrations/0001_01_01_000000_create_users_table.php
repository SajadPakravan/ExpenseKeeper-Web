<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email', 100)->unique()->nullable();
            $table->string('phone', 13)->unique()->nullable();
            $table->string('avatar')->default('/images/icons/avatar.webp');
            $table->enum('role', ['admin', 'user', 'accountant', 'editor'])->default('user');
            $table->timestamps();
            $table->softDeletes();
            $table->index('role');
            $table->engine = 'InnoDB';
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
