<?php

namespace App\Services;

use App\Repositories\Interfaces\SettlementRepositoryInterface;

class SettlementService
{
    protected $settlementRepository;

    public function __construct(SettlementRepositoryInterface $settlementRepository)
    {
        $this->settlementRepository = $settlementRepository;
    }

    public function create($userId, array $data)
    {
        return $this->settlementRepository->create($userId, $data);
    }

    public function getAll()
    {
        return $this->settlementRepository->getAll();
    }

    public function approve($id)
    {
        $settlement = $this->settlementRepository->findById($id);
        $loan = $settlement->loan;

        // Cek status pinjaman
        if (!in_array($loan->status, ['approved'])) {
            throw new \Exception("Pinjaman belum bisa dilunasi karena statusnya masih {$loan->status}");
        }

        // Cek jumlah
        if ($loan->remaining_amount < $settlement->amount) {
            throw new \Exception("Jumlah pelunasan melebihi sisa pinjaman");
        }

        // Update loan
        $loan->remaining_amount -= $settlement->amount;
        if ($loan->remaining_amount == 0) {
            $loan->status = 'applied';
        }
        $loan->save();

        // Update settlement
        $settlement->status = 'approved';
        $settlement->save();

        return $settlement;
    }

    public function reject($id)
    {
        $settlement = $this->settlementRepository->findById($id);

        if ($settlement->status === 'approved') {
            throw new \Exception("Settlement sudah diapprove, tidak bisa ditolak");
        }

        $settlement->status = 'rejected'; // sesuai dokumen test
        $settlement->save();

        return $settlement;
    }
}
