<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequests\LoginRequest;
use App\Services\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Routing\Controller;

class AuthController extends Controller
{
    use ApiResponse;

    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        $user = $this->authService->login($credentials);

        if (!$user) {
            return $this->error("Email atau password salah", 404);
        }
        $token = $user->createToken(
            name: 'auth-token',
            abilities: ['*'],
            expiresAt: now()->addMinutes(1440)
        )->plainTextToken;

        return $this->success(['user' => $user, 'token' => $token,], "Login berhasil", 200);
    }

    public function me()
    {
        $user = $this->authService->getAuthenticatedUser();
        if (!$user) {
            return $this->error("User tidak terautentikasi", 401);
        }
        return $this->success($user, "Data user berhasil ditemukan", 200);
    }
}
