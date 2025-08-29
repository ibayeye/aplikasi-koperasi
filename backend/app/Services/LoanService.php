<?php

namespace App\Services;

use App\Repositories\Interfaces\LoanRepositoryInterface;

class LoanService
{
    protected $loanRepository;

    public function __construct(LoanRepositoryInterface $loanRepository)
    {
        $this->loanRepository = $loanRepository;
    }

    public function create($userId, array $data)
    {
        return $this->loanRepository->create($userId, $data);
    }

    public function getLoans($user)
    {
        if ($user->role === 'admin') {
            return $this->loanRepository->getAll();
        }
        return $this->loanRepository->getByUser($user->id);
    }

    public function approve($id)
    {
        return $this->loanRepository->updateStatus($id, 'approved');
    }

    public function reject($id)
    {
        return $this->loanRepository->updateStatus($id, 'rejected');
    }
}
