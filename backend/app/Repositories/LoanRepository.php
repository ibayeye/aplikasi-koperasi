<?php

namespace App\Repositories;

use App\Models\Loan;
use App\Models\Loans;
use App\Repositories\Interfaces\LoanRepositoryInterface;

class LoanRepository implements LoanRepositoryInterface
{
    public function create($userId, array $data)
    {
        $data['user_id'] = $userId;

        // set remaining_amount sama dengan total amount saat pinjaman dibuat
        $data['remaining_amount'] = $data['amount'];

        // set status default (misalnya masih "applied" dulu)
        $data['status'] = $data['status'] ?? 'applied';

        return Loans::create($data);
    }


    public function getByUser($userId)
    {
        return Loans::where('user_id', $userId)->get();
    }

    public function getAll()
    {
        return Loans::with('user')->get();
    }

    public function updateStatus($id, $status)
    {
        $loan = Loans::findOrFail($id);
        $loan->status = $status;
        $loan->save();
        return $loan;
    }
}
