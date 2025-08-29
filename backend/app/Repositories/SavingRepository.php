<?php

namespace App\Repositories;

use App\Models\Savings;
use App\Repositories\Interfaces\SavingRepositoryInterface;

class SavingRepository implements SavingRepositoryInterface
{
    public function create($userId, array $data)
    {
        $data['user_id'] = $userId;
        return Savings::create($data);
    }
    public function getAll()
    {
        return Savings::all();
    }
    public function update($id, array $data)
    {
        $saving = Savings::findOrFail($id);
        $saving->update($data);
        return $saving;
    }
    public function delete($id)
    {
        $saving = Savings::findOrFail($id);
        $saving->delete();
        return true;
    }
    public function getById($id)
    {
        return Savings::findOrFail($id);
    }
}
