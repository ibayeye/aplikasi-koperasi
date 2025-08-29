<?php

namespace App\Http\Requests\LoanRequests;

use App\Traits\ApiResponse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateLoan extends FormRequest
{
    use ApiResponse;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'amount' => 'required|numeric|min:1000',
            'phone' => 'required|string',
            'address' => 'required|string',
            'date' => 'required|date',
        ];
    }

    public function messages(): array
    {
        return [
            'amount.required' => 'Jumlah pinjaman wajib diisi',
            'amount.numeric' => 'Jumlah pinjaman harus berupa angka',
            'amount.min' => 'Jumlah pinjaman minimal Rp 1000',
            'phone.required' => 'Nomor telepon wajib diisi',
            'address.required' => 'Alamat wajib diisi',
            'date.required' => 'Tanggal pinjaman wajib diisi',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(
            $this->error("Data tidak valid", 400, $validator->errors())
        );
    }
}
