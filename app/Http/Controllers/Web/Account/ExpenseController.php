<?php

namespace App\Http\Controllers\Web\Account;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('account/expenses');
    }

    public function create()
    {

    }

    public function update(string $id)
    {

    }
}
