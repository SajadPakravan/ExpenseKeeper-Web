<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RequestContactVerificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $type = (string) $this->input('type');
        $value = trim((string) $this->input('value'));

        if ($type === 'email') {
            $value = mb_strtolower($value);
        }

        $this->merge([
            'type' => $type,
            'value' => $value,
        ]);
    }

    public function rules(): array
    {
        $type = (string) $this->input('type');
        $userId = $this->user()?->id;

        $valueRules = ['required', 'string', 'max:150'];

        if ($type === 'email') {
            $valueRules[] = 'email:rfc';
            $valueRules[] = Rule::unique('users', 'email')->ignore($userId);
        }

        if ($type === 'phone') {
            $valueRules[] = 'regex:/^09\d{9}$/';
            $valueRules[] = Rule::unique('users', 'phone')->ignore($userId);
        }

        return [
            'type' => ['required', Rule::in(['email', 'phone'])],
            'value' => $valueRules,
        ];
    }

    public function messages(): array
    {
        return [
            'type.required' => 'نوع اطلاعات تماس مشخص نشده است.',
            'value.required' => 'مقدار جدید را وارد کنید.',
            'value.email' => 'آدرس ایمیل واردشده معتبر نیست.',
            'value.regex' => 'شماره همراه باید 11 رقم و با 09 شروع شود.',
            'value.unique' => 'این ایمیل یا شماره همراه قبلاً برای حساب دیگری ثبت شده است.',
        ];
    }
}
