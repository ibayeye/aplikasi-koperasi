<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettlementRequests\CreateSettlement;
use App\Models\Loans;
use App\Services\SettlementService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettlementController
{
    use ApiResponse;

    protected $settlementService;

    public function __construct(SettlementService $settlementService)
    {
        $this->settlementService = $settlementService;
    }
    // Admin: GET /api/settlement
    public function index()
    {
        // return response()->json($this->settlementService->getAll());
        $settlement = $this->settlementService->getAll();
        return $this->success($settlement, "Settlement berhasil didapatkan", 200);
    }
    public function store(CreateSettlement $request)
    {
        $data = $request->validated();
        $userId = Auth::id();

        $loan = Loans::findOrFail($data['loan_id']);

        // Validasi status loan
        if (!in_array($loan->status, ['approved', 'ongoing'])) {
            return $this->error("Pinjaman belum bisa dilunasi (status: {$loan->status})", 400);
        }

        // Validasi jumlah bayar
        if ($data['amount'] > $loan->remaining_amount) {
            return $this->error("Jumlah pelunasan melebihi sisa pinjaman", 400);
        }

        // Upload bukti pembayaran
        $path = $request->file('proof')->store('proofs', 'public');
        $data['proof'] = asset('storage/' . $path); 


        $data['user_id'] = $userId;
        $data['amount']  = $data['amount'];
        $data['status']  = 'applied';
        $data['date']    = now();

        $settlement = $this->settlementService->create($userId, $data);

        return $this->success($settlement, "Pengajuan pelunasan berhasil dibuat", 201);
    }



    public function approve($id)
    {
        $settlement = $this->settlementService->approve($id);
        // return response()->json(['message' => 'Settlement approved', 'data' => $settlement]);
        return $this->success($settlement, "Settlement berhasil diapprove", 200);
    }
    public function reject($id)
    {
        $settlement = $this->settlementService->reject($id);
        // return response()->json(['message' => 'Settlement rejected', 'data' => $settlement]);
        return $this->success($settlement, "Settlement ditolak", 200);
    }
}
