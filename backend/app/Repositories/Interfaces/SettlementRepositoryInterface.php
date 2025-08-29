<?php

namespace App\Repositories\Interfaces;

interface SettlementRepositoryInterface
{
    public function create($userId, array $data);
    public function getAll();
    public function findById($id);
}