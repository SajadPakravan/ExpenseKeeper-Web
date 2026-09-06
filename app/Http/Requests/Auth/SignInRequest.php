<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class SignInRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['username' => trim((string) $this->input('username'))]);
    }

    public function rules(): array
    {
        return ['username' => ['required', 'string'], 'password' => ['required', 'string']];
    }

    public function messages(): array
    {
        return [
            'username.required' => 'نام کاربری را وارد کنید.',
            'password.required' => 'رمز عبور را وارد کنید.',
        ];
    }
}
