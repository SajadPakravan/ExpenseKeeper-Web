<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignInRequest;
use App\Http\Requests\Auth\SignUpRequest;
use App\Models\User;
use App\Services\Authentication\AuthenticationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthenticationController extends Controller
{
    public function __construct(
        private readonly AuthenticationService $authentication,
    ) {
    }

    public function signUp(SignUpRequest $request): JsonResponse
    {
        $user = $this->authentication->register(
            $request->string('username')->toString(),
            $request->string('password')->toString(),
        );

        $this->authentication->markLogin($user);

        $tokenName = (string) $request->input('device_name', 'android');
        $token = $user->createToken($tokenName)->plainTextToken;

        return response()->json([
            'message' => 'حساب با موفقیت ساخته شد.',
            'token' => $token,
            'user' => $this->serializeUser($user),
        ], 201);
    }

    public function signIn(SignInRequest $request): JsonResponse
    {
        $user = $this->authentication->signIn(
            $request->string('username')->toString(),
            $request->string('password')->toString(),
        );

        if (!$user) {
            return response()->json([
                'message' => 'نام کاربری یا رمز عبور صحیح نیست.',
            ], 422);
        }

        $this->authentication->markLogin($user);

        $tokenName = (string) $request->input('device_name', 'android');
        $token = $user->createToken($tokenName)->plainTextToken;

        return response()->json([
            'message' => 'ورود موفق بود.',
            'token' => $token,
            'user' => $this->serializeUser($user),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $this->serializeUser($request->user()),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user) {
            $this->authentication->markLogout($user);
            $user->currentAccessToken()?->delete();
        }

        return response()->json([
            'message' => 'خروج با موفقیت انجام شد.',
        ]);
    }

    private function serializeUser(User $user): array
    {
        $user->loadMissing('authCredential');

        return [
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->authCredential?->username,
            'email' => $user->email,
            'phone' => $user->phone,
            'avatar' => $user->avatar,
            'role' => $user->role,
        ];
    }
}
