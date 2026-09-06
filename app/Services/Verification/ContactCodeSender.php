<?php

namespace App\Services\Verification;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactCodeSender
{
    public function send(string $type, string $identifier, string $code): void
    {
        if ($type === 'email') {
            Mail::raw(
                "کد تأیید هزینه‌بان شما: {$code}\nاین کد تا 5 دقیقه معتبر است.",
                function ($message) use ($identifier): void {
                    $message
                        ->to($identifier)
                        ->subject('کد تأیید هزینه‌بان');
                }
            );

            return;
        }

        // SMS provider is intentionally isolated here.
        // When the account API is provided, replace this log with the real API call.
        Log::info('ExpenseKeeper SMS verification code', [
            'phone' => $identifier,
            'code' => $code,
        ]);
    }
}
