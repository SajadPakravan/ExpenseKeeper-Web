<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignUpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username' => [
                'required',
                'string',
                'min:3',
                'max:30',
                'regex:/^[A-Za-z0-9#$._-]+$/',
                'not_regex:/\s/',
                'unique:users_auth,username',
            ],
            'password' => [
                'required',
                'string',
                Password::min(8)
//                    ->mixedCase()
//                    ->numbers()
//                    ->symbols()
                    ->uncompromised(3),
                'not_regex:/\s/',
                'confirmed',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'username.required' => 'نام کاربری را وارد کنید.',
            'username.min' => 'نام کاربری باید حداقل 3 کاراکتر باشد.',
            'username.max' => 'نام کاربری نمی‌تواند بیشتر از 30 کاراکتر باشد.',
            'username.regex' => 'نام کاربری نباید حروف فارسی، @ و فاصله داشته باشد.',
            'username.unique' => 'این نام کاربری قبلاً ثبت شده است. یک نام کاربری دیگر انتخاب کنید.',
            'username.not_regex' => 'نام کاربری نباید فاصله داشته باشد.',
            'password.required' => 'رمز عبور را وارد کنید.',
            'password.min' => 'رمز عبور باید حداقل 8 کاراکتر باشد.',
            'password.mixed' => 'رمز عبور باید حداقل یک حرف بزرگ و یک حرف کوچک انگلیسی داشته باشد.',
            'password.numbers' => 'رمز عبور باید حداقل یک عدد داشته باشد.',
            'password.symbols' => 'رمز عبور باید حداقل یک کاراکتر خاص مانند # یا $ داشته باشد.',
            'password.uncompromised' => 'رمز عبور ضعیف است.',
            'password.not_regex' => 'رمز عبور نباید فاصله داشته باشد.',
            'password.confirmed' => 'رمز عبور و تکرار رمز عبور یکسان نیستند.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['username' => trim((string) $this->input('username'))]);
    }
}
