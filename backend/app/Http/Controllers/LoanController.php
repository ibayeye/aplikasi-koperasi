<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoanRequests\CreateLoan;
use App\Services\LoanService;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;

class LoanController extends Controller
{
    use ApiResponse;
    protected $loanService;

    public function __construct(LoanService $loanService)
    {
        $this->loanService = $loanService;
    }

    public function index()
    {
        $loans = $this->loanService->getLoans(Auth::user());
        return $this->success($loans, "Pinjaman berhasil didapatkan", 200);
    }

    public function store(CreateLoan $request)
    {
        $loan = $this->loanService->create(Auth::id(), $request->validated());
        return $this->success($loan, "Pinjaman berhasil ditambahkan", 201);
    }

    public function approve($id)
    {
        $loan = $this->loanService->approve($id);
        return $this->success($loan, "Pinjaman berhasil diapprove", 200);
    }

    public function reject($id)
    {
        $loan = $this->loanService->reject($id);
        return $this->success($loan, "Pinjaman ditolak", 200);
    }
}
