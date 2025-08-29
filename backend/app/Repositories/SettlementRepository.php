<?php

namespace App\Repositories;

use App\Models\Settlements;
use App\Repositories\Interfaces\SettlementRepositoryInterface;

class SettlementRepository implements SettlementRepositoryInterface
{
    public function create($userId, array $data)
    {
        return Settlements::create([
            'user_id' => $userId,
            'loan_id' => $data['loan_id'],
            'amount'  => $data['amount'],
            'proof'   => $data['proof'],
            'status'  => $data['status'] ?? 'applied',
            'date'    => $data['date'],
        ]);
    }

    public function getAll()
    {
        return Settlements::with(['user', 'loan'])->get();
    }

    public function findById($id)
    {
        return Settlements::with(['user', 'loan'])->findOrFail($id);
    }
}
