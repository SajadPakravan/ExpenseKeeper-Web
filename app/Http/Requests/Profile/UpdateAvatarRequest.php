<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAvatarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'avatar' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'avatar.required' => 'یک تصویر برای پروفایل انتخاب کنید.',
            'avatar.image' => 'فایل انتخاب‌شده باید تصویر باشد.',
            'avatar.mimes' => 'فرمت تصویر باید JPG، JPEG، PNG یا WEBP باشد.',
            'avatar.max' => 'حجم تصویر پروفایل نباید بیشتر از 2 مگابایت باشد.',
        ];
    }
}
