<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VerifyContactRequest extends FormRequest
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
        return [
            'type' => ['required', Rule::in(['email', 'phone'])],
            'value' => ['required', 'string', 'max:150'],
            'code' => ['required', 'digits:6'],
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'کد تأیید را وارد کنید.',
            'code.digits' => 'کد تأیید باید دقیقاً 6 رقم باشد.',
        ];
    }
}
