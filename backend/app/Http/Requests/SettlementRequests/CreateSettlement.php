<?php

namespace App\Http\Requests\SettlementRequests;

use App\Traits\ApiResponse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateSettlement extends FormRequest
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
            'loan_id' => 'required|exists:loans,id',
            'amount' => 'required|numeric|min:1000',
            'proof' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'date' => 'required|date',
        ];
    }

    public function messages(): array
    {
        return [
            'loan_id.required' => 'Pinjaman wajib dipilih',
            'loan_id.exists' => 'Pinjaman tidak ditemukan',
            'amount.required' => 'Jumlah pembayaran pinjaman wajib diisi',
            'amount.numeric' => 'Jumlah pembayaran pinjaman harus berupa angka',
            'amount.min' => 'Jumlah pembayaran pinjaman minimal Rp 1000',
            'proof.required' => 'Bukti wajib diisi',
            'proof.file' => 'Bukti harus berupa file',
            'proof.mimes' => 'Bukti harus berupa file jpg/jpeg/png/pdf',
            'proof.max' => 'Bukti maksimal 2MB',
            'date.required' => 'Tanggal wajib diisi',
            'date.date' => 'Tanggal harus berupa tanggal',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(
            $this->error("Data tidak valid", 400, $validator->errors())
        );
    }
}
