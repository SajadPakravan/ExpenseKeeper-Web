<?php

use App\Http\Controllers\Api\AuthenticationController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::prefix('auth')->group(function (): void {
        Route::post('/signup', [AuthenticationController::class, 'signUp'])
            ->middleware('throttle:5,1');

        Route::post('/signin', [AuthenticationController::class, 'signIn'])
            ->middleware('throttle:10,1');

        Route::post('/logout', [AuthenticationController::class, 'logout'])
            ->middleware('auth:sanctum');
    });

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::get('/user', [AuthenticationController::class, 'me']);
    });
});
