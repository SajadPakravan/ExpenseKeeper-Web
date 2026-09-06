<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->string('ip_address');
            $table->string('device');
            $table->enum('platform', ['Site', 'APP'])->default('Site');
            $table->boolean('active')->default(true);
            $table->timestamp('login_at');
            $table->timestamp('logout_at')->nullable();
            $table->index('user_id');
            $table->index('platform');
            $table->index('device');
            $table->engine = 'InnoDB';
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users_sessions');
    }
};
