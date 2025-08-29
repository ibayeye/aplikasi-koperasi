<?php

namespace App\Repositories\Interfaces;

interface AuthRepositoryInterface
{
    // public function getAll();
    // public function findByFullname(string $fullname);
    // public function create(array $data);
    public function findByEmail(string $email);
    // public function update($id, array $data);
    // public function delete($id);
    // public function restore($id);
}
