<?php

namespace App\Http\Controllers;

use App\Http\Requests\SavingRequests\CreateSaving;
use App\Http\Requests\SavingRequests\UpdateSaving;
use App\Services\SavingService;
use App\Traits\ApiResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class SavingController extends Controller
{
    use ApiResponse;

    protected $savingService;

    public function __construct(SavingService $savingService)
    {
        $this->savingService = $savingService;
    }
    public function create(CreateSaving $request)
    {
        $userId = Auth::id();
        $createSaving = $this->savingService->create($userId, $request->validated());
        return $this->success($createSaving, "Saving berhasil ditambahkan", 200);
    }
    public function getAll()
    {
        $saving = $this->savingService->getAll();
        if ($saving->isEmpty()) {
            return $this->error("Data tidak ditemukan", 404);
        }
        return $this->success($saving, "Data berhasil diambil");
    }
    public function update(UpdateSaving $request, $id)
    {
        $update = $this->savingService->update($id, $request->validated());
        return $this->success($update, "Saving berhasil diupdate", 200);
    }
    public function delete($id)
    {
        $this->savingService->delete($id);
        return $this->success(null, "Saving berhasil dihapus", 200);
    }
    public function getById($id)
    {
        $saving = $this->savingService->getById($id);
        if (!$saving) {
            return $this->error("Data tidak ditemukan", 404);
        }
        return $this->success($saving, "Data berhasil diambil");
    }
}
