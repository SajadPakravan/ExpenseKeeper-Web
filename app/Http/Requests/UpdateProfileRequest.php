<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => trim((string) $this->input('name')),
            'username' => trim((string) $this->input('username')),
            'email' => trim((string) $this->input('email')),
            'phone' => trim((string) $this->input('phone')),
        ]);
    }

    public function rules(): array
    {
        $user = $this->user();

        return [
            'name' => [
                'required',
                'string',
                'max:30',
            ],

            'username' => [
                'required',
                'string',
                'min:3',
                'max:30',
                'regex:/^[A-Za-z0-9#$._-]+$/',
                Rule::unique('users_auth', 'username')->ignore($user->authCredential->id),
            ],

            'email' => [
                'nullable',
                'email',
                'max:255',
                'not_regex:/\s/',
                Rule::unique('users', 'email')->ignore($user->id),
            ],

            'phone' => [
                'required',
                'string',
                'max:20',
                'not_regex:/\s/',
                Rule::unique('users', 'phone')->ignore($user->id),
            ],

            'avatar' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'avatar.mimes' => 'فرمت تصویر نامعتبر است.',
            'password.required' => 'رمز عبور را وارد کنید.',
        ];
    }
}
