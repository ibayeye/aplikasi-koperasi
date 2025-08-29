<?php

namespace App\Services;

use App\Repositories\Interfaces\SavingRepositoryInterface;

class SavingService
{
    protected $savingRepository;

    public function __construct(SavingRepositoryInterface $savingRepository)
    {
        $this->savingRepository = $savingRepository;
    }

    private function calculateBagiHasil($value)
    {
        return ((($value * 0.93) * 0.1) / 12) * 0.6;
    }
    public function create($userId, array $data)
    {
        $results = [];

        if (isset($data['wajib'])) {
            $results[] = $this->savingRepository->create($userId, [
                'value' => $data['wajib'],
                'date' => $data['date'],
                'type' => 'wajib',
                'bagi_hasil' => $this->calculateBagiHasil($data['wajib']),
            ]);
        }

        if (isset($data['pokok'])) {
            $results[] = $this->savingRepository->create($userId, [
                'value' => $data['pokok'],
                'date' => $data['date'],
                'type' => 'pokok',
                'bagi_hasil' => $this->calculateBagiHasil($data['pokok']),
            ]);
        }

        return $results;
    }
    public function getAll()
    {
        return $this->savingRepository->getAll();
    }
    public function update($id, array $data)
    {
        // hitung ulang bagi hasil
        $data['bagi_hasil'] = $this->calculateBagiHasil($data['value']);

        return $this->savingRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->savingRepository->delete($id);
    }

    public function getById($id)
    {
        return $this->savingRepository->getById($id);
    }
}
