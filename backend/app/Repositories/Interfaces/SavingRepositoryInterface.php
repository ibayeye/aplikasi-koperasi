<?php

namespace App\Repositories\Interfaces;

interface SavingRepositoryInterface
{
    public function create($userId, array $data);
    public function getAll();
    public function getById($id);
    public function update($id, array $data);
    public function delete($id);
}
