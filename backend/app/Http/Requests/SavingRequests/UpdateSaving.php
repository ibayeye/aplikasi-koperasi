<?php

namespace App\Http\Requests\SavingRequests;

use App\Traits\ApiResponse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateSaving extends FormRequest
{
    use ApiResponse;

    public function authorize(): bool
    {
        return true; // admin-only check ada di middleware
    }

    public function rules(): array
    {
        return [
            'value' => 'required|numeric',
            'date' => 'required|date',
            'type' => 'required|in:wajib,pokok'
        ];
    }

    public function messages(): array
    {
        return [
            'value.required' => 'Nominal simpanan wajib diisi',
            'date.required' => 'Tanggal wajib diisi',
            'type.required' => 'Jenis simpanan wajib dipilih'
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(
            $this->error("Data tidak valid", 400, $validator->errors())
        );
    }
}
