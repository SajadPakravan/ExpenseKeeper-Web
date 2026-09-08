<?php

namespace App\Services\Authentication;

use App\Models\User;
use App\Models\UserAuth;
use App\Models\UserSessions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthenticationService
{
    public function signUp(Request $request, string $username, string $password): User
    {
        return DB::transaction(function () use ($request, $username, $password): User {
            $user = User::create(['name' => $username]);

            $user->authCredential()->create(['user_id' => $user->id, 'username' => $username, 'password' => Hash::make($password)]);

            $user->sessionCredential()->create(['user_id' => $user->id, 'ip_address' => $request->ip(), 'device' => $request->userAgent(),
                'platform' => $this->platformInfo($request), 'login_at' => now()]);

            return $user;
        });
    }

    private function platformInfo(Request $request): string
    {
        if ($request->is('api/*')) {
            return 'APP';
        }

        return 'Site';
    }

    public function signIn(Request $request, string $username, string $password): ?User
    {
        $credential = UserAuth::query()->with('user')->where('username', $username)->first();

        if (! $credential) {
            return null;
        }

        $user = $credential->user;

        if (! $user || ! Hash::check($password, $credential->password)) {
            return null;
        }

        UserSessions::create(['user_id' => $user->id, 'ip_address' => $request->ip(), 'device' => $request->userAgent(),
            'platform' => $this->platformInfo($request), 'login_at' => now()]);

        return $user;
    }

    //    public function markLogin(User $user): void
    //    {
    //        $user->authCredential()->update([
    //            'last_login_at' => now(),
    //        ]);
    //    }
    //
    //    public function markLogout(User $user): void
    //    {
    //        $user->authCredential()->update([
    //            'last_logout_at' => now(),
    //        ]);
    //    }
}
