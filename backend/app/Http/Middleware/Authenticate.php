<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Override method bawaan untuk request tanpa autentikasi.
     */
    protected function redirectTo($request): ?string
    {
        if ($request->expectsJson()) {
            abort(response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401));
        }

        return null; // Jangan redirect ke route('login')
    }
}
