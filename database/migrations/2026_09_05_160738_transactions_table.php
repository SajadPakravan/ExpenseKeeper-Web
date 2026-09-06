<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->string('title', 100);
            $table->bigInteger('amount');
            $table->string('bank', 100);
            $table->enum('type', ['deposit', 'withdraw']);
            $table->timestamp('transaction_date');
            $table->string('description', 255)->nullable();
            $table->timestamps();
            $table->index('user_id');
            $table->index('bank');
            $table->index('transaction_date');
            $table->index(['user_id', 'type']);
            $table->engine = 'InnoDB';
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
