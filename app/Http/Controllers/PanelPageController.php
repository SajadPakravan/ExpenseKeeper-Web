<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PanelPageController extends Controller
{
    private const array SECTIONS = [
        'transactions' => 'تراکنش‌ها',
        'expenses' => 'هزینه‌ها',
        'incomes' => 'درآمدها',
        'budgets' => 'بودجه‌بندی',
        'savings' => 'اهداف پس‌انداز',
        'reports' => 'گزارش‌ها',
        'settings' => 'تنظیمات',
    ];

    public function show(Request $request, string $section): Response
    {
        abort_unless(array_key_exists($section, self::SECTIONS), 404);

        return Inertia::render('account/placeholder', [
            'section' => $section,
            'title' => self::SECTIONS[$section],
        ]);
    }
}
