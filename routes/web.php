<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PanelPageController;
use App\Http\Controllers\Web\Account\DashboardController;
use App\Http\Controllers\Web\Account\ExpenseController;
use App\Http\Controllers\Web\Account\IncomeController;
use App\Http\Controllers\Web\Account\ProfileController;
use App\Http\Controllers\Web\Authentication\AuthenticationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware('guest')->group(function (): void {
    Route::get('sign-in', [AuthenticationController::class, 'showSignIn'])->name('signIn.show');
    Route::get('sign-up', [AuthenticationController::class, 'showSignUp'])->name('signUp.show');
    Route::post('sign-in', [AuthenticationController::class, 'signIn'])->middleware('throttle:10,1')->name('signIn');
    Route::post('sign-up', [AuthenticationController::class, 'signUp'])->middleware('throttle:5,1')->name('signup.store');
});

Route::middleware('auth')->group(function (): void {
    Route::post('sign-out', [AuthenticationController::class, 'signOut'])->name('signOut');

    Route::prefix('account')->group(function (): void {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('profile', [ProfileController::class, 'index'])->name('profile');
        Route::post('profile', [ProfileController::class, 'update'])->name('profile.update');

        //        Route::prefix('profile')->group(function (): void {
        //            Route::patch('name', [ProfileController::class, 'updateName'])->name('profile.name.update');
        //            Route::patch('username', [ProfileController::class, 'updateUsername'])->name('profile.username.update');
        //            Route::post('avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
        //            Route::post('contact/request-code', [ProfileController::class, 'requestContactCode'])->middleware('throttle:3,1')
        //                ->name('profile.contact.request-code');
        //            Route::post('contact/verify', [ProfileController::class, 'verifyContact'])->middleware('throttle:10,1')
        //                ->name('profile.contact.verify');
        //        });

        Route::get('incomes', [IncomeController::class, 'index'])->name('incomes');
        Route::post('incomes', [IncomeController::class, 'create'])->name('incomes.create');
        Route::put('incomes/{id}', [IncomeController::class, 'update'])->name('incomes.update');

        Route::get('expenses', [ExpenseController::class, 'index'])->name('expenses');
        Route::post('expenses', [ExpenseController::class, 'create'])->name('expenses.create');
        Route::put('expenses/{id}', [ExpenseController::class, 'update'])->name('expenses.update');

        Route::get('{section}', [PanelPageController::class, 'show'])
            ->whereIn('section', ['transactions', 'budgets', 'savings', 'reports', 'settings'])
            ->name('account.section');
    });
});
