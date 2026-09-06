<?php

namespace App\Http\Controllers\Web\Account;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('account/dashboard', [
            'summary' => [
                'balance' => 48300000,
                'income' => 23500000,
                'expense' => 14200000,
                'saving' => 9300000,
            ],
            'monthly' => [
                ['month' => 'فروردین', 'income' => 18, 'expense' => 12],
                ['month' => 'اردیبهشت', 'income' => 22, 'expense' => 15],
                ['month' => 'خرداد', 'income' => 19, 'expense' => 13],
                ['month' => 'تیر', 'income' => 25, 'expense' => 17],
                ['month' => 'مرداد', 'income' => 23, 'expense' => 14],
                ['month' => 'شهریور', 'income' => 28, 'expense' => 16],
            ],
            'categories' => [
                ['label' => 'خوراک', 'percent' => 32],
                ['label' => 'خرید', 'percent' => 27],
                ['label' => 'حمل و نقل', 'percent' => 18],
                ['label' => 'سایر', 'percent' => 23],
            ],
            'transactions' => [
                ['title' => 'خرید فروشگاه', 'category' => 'خرید', 'amount' => -860000, 'date' => 'امروز'],
                ['title' => 'حقوق ماهانه', 'category' => 'درآمد', 'amount' => 23500000, 'date' => 'امروز'],
                ['title' => 'اینترنت', 'category' => 'قبوض', 'amount' => -420000, 'date' => 'دیروز'],
                ['title' => 'تاکسی', 'category' => 'حمل و نقل', 'amount' => -185000, 'date' => 'دیروز'],
            ],
        ]);
    }
}
