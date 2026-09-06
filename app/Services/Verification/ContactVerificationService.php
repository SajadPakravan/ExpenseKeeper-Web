<?php

namespace App\Services\Verification;

use App\Models\AuthenticationCode;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ContactVerificationService
{
    public function __construct(
        private readonly ContactCodeSender $sender,
    ) {
    }

    public function sendCode(User $user, string $type, string $identifier): void
    {
        if ($user->{$type} === $identifier) {
            throw ValidationException::withMessages([
                'value' => 'این مقدار همین حالا برای حساب شما ثبت شده است.',
            ]);
        }

        AuthenticationCode::query()
            ->where('user_id', $user->id)
            ->where('type', $type)
            ->whereNull('used_at')
            ->delete();

        $code = (string) random_int(100000, 999999);

        AuthenticationCode::create([
            'user_id' => $user->id,
            'type' => $type,
            'identifier' => $identifier,
            'code_hash' => Hash::make($code),
            'expires_at' => now()->addMinutes(5),
        ]);

        $this->sender->send($type, $identifier, $code);
    }

    public function verify(
        User $user,
        string $type,
        string $identifier,
        string $code,
    ): void {
        $record = AuthenticationCode::query()
            ->where('user_id', $user->id)
            ->where('type', $type)
            ->where('identifier', $identifier)
            ->whereNull('used_at')
            ->latest('id')
            ->first();

        if (!$record) {
            throw ValidationException::withMessages([
                'code' => 'کد تأییدی برای این مقدار پیدا نشد. دوباره درخواست کد بدهید.',
            ]);
        }

        if ($record->expires_at->isPast()) {
            throw ValidationException::withMessages([
                'code' => 'زمان اعتبار کد به پایان رسیده است. یک کد جدید دریافت کنید.',
            ]);
        }

        if ($record->attempts >= 5) {
            throw ValidationException::withMessages([
                'code' => 'تعداد تلاش‌های ناموفق بیش از حد مجاز است. یک کد جدید دریافت کنید.',
            ]);
        }

        if (!Hash::check($code, $record->code_hash)) {
            $record->increment('attempts');

            throw ValidationException::withMessages([
                'code' => 'کد واردشده صحیح نیست.',
            ]);
        }

        DB::transaction(function () use ($user, $type, $identifier, $record): void {
            $user->update([
                $type => $identifier,
            ]);

            $record->update([
                'used_at' => now(),
            ]);
        });
    }
}
