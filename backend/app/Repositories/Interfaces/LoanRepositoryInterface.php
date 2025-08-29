<?php

namespace App\Repositories\Interfaces;

interface LoanRepositoryInterface
{
    public function create($userId, array $data);
    public function getByUser($userId);
    public function getAll();
    public function updateStatus($id, $status);
}
