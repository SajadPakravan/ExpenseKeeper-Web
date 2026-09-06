<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUsernameRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'username' => trim((string) $this->input('username')),
        ]);
    }

    public function rules(): array
    {
        $credentialId = $this->user()?->authCredential?->id;

        return [
            'username' => [
                'required',
                'string',
                'min:3',
                'max:100',
                'regex:/^[A-Za-z0-9#$._-]+$/',
                Rule::unique('users_auth', 'username')->ignore($credentialId),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'username.required' => 'نام کاربری را وارد کنید.',
            'username.min' => 'نام کاربری باید حداقل 3 کاراکتر باشد.',
            'username.regex' => 'نام کاربری فقط می‌تواند شامل حروف انگلیسی، عدد و کاراکترهای # $ . _ - باشد و نباید فاصله داشته باشد.',
            'username.unique' => 'این نام کاربری قبلاً توسط کاربر دیگری انتخاب شده است.',
        ];
    }
}
