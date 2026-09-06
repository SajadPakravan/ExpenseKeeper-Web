<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class IncomeFactory extends Factory
{
    public function definition(): array
    {
        $type = fake()->randomElement(['permanent', 'temporary']);

        $permanentType = $type === 'permanent' ? fake()->randomElement(['daily', 'weekly', 'monthly', 'yearly']) : null;

        $permanentDay = null;
        $permanentMonth = null;
        $permanentTime = null;
        $temporaryAt = null;

        if ($type === 'permanent') {
            $permanentTime = fake()->time('H:i:s');

            switch ($permanentType) {
                case 'daily':
                    $permanentDay = null;
                    $permanentMonth = null;
                    break;

                case 'weekly':
                    $permanentDay = fake()->numberBetween(0, 6);
                    $permanentMonth = null;
                    break;

                case 'monthly':
                    $permanentDay = fake()->numberBetween(1, 28);
                    $permanentMonth = null;
                    break;

                case 'yearly':
                    $permanentDay = fake()->numberBetween(1, 28);
                    $permanentMonth = fake()->numberBetween(0, 11);
                    break;
            }
        }

        if ($type === 'temporary') {
            $temporaryAt = fake()->dateTimeBetween('-6 months', '+6 months', 'UTC');
        }

        return [
            'user_id' => 11,
            'title' => fake()->randomElement([
                'حقوق ماهانه',
                'درآمد پروژه طراحی سایت',
                'پاداش شرکت',
                'فروش محصول',
                'درآمد فریلنسری',
                'سود سرمایه‌گذاری',
                'حق‌الزحمه مشاوره',
                'درآمد آموزش',
                'فروش تجهیزات',
                'درآمد جانبی',
            ]),
            'amount' => fake()->numberBetween(100_000, 50_000_000),
            'type' => $type,
            'permanent_type' => $permanentType,
            'permanent_day' => $permanentDay,
            'permanent_month' => $permanentMonth,
            'permanent_time' => $permanentTime,
            'temporary_at' => $temporaryAt,
            'description' => fake()->randomElement([
                'مبلغ مربوط به درآمد ثبت‌شده کاربر.',
                'این درآمد جهت آزمایش سیستم ایجاد شده است.',
                'واریزی مربوط به فعالیت کاری کاربر.',
                'مبلغ دریافتی بابت انجام پروژه.',
                'درآمد ثبت‌شده برای آزمایش گزارش‌های مالی.',
                'مبلغ به حساب کاربر واریز شده است.',
                null,
            ]),
        ];
    }
}
