<?php

namespace App\Http\Controllers\Web\Account;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class IncomeController extends Controller
{
    public function index(): Response
    {
        $incomes = auth()->user()->incomes()->latest()->get();

        return Inertia::render('account/incomes/incomes', ['incomes' => $incomes]);
    }

    public function create()
    {
        Log::info('CCCCCCC - create');
    }

    public function update(string $income) {}
}
