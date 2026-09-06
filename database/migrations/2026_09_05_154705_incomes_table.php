<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->string('title', 100);
            $table->unsignedBigInteger('amount');
            $table->enum('type', ['permanent', 'temporary']);
            $table->enum('permanent_type', ['daily', 'weekly', 'monthly', 'yearly'])->nullable();
            $table->unsignedTinyInteger('permanent_day')->nullable();
            $table->unsignedTinyInteger('permanent_month')->nullable();
            $table->time('permanent_time')->nullable();
            $table->timestamp('temporary_at')->nullable();
            $table->string('description', 255)->nullable();
            $table->timestamps();
            $table->index('user_id');
            $table->index('type');
            $table->index(['user_id', 'type']);
            $table->engine = 'InnoDB';
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('incomes');
    }
};
