<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\AuthRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AuthRepository implements AuthRepositoryInterface
{
    // public function getAll()
    // {
    //     return User::all();
    // }

    // public function findByFullname(string $fullname)
    // {
    //     return User::where("fullname", "like", "%{$fullname}%")->get();
    // }

    // public function create(array $data)
    // {
    //     return User::create($data);
    // }

    public function findByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }

    // public function update($id, array $data)
    // {
    //     $user = User::findOrFail($id);
    //     $user->update($data);
    //     return $user;
    // }

    // public function delete($id)
    // {
    //     $user = User::findOrFail($id);
    //     return $user->delete();
    // }

    // public function restore($id)
    // {
    //     $user = User::withTrashed()->find($id);

    // if (!$user) {
    //     throw new ModelNotFoundException("User tidak ditemukan");
    // }

    // $user->restore();
    // return $user;
    // }
}
