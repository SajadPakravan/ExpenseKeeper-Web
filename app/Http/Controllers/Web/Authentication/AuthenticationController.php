<?php

namespace App\Http\Controllers\Web\Authentication;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignInRequest;
use App\Http\Requests\Auth\SignUpRequest;
use App\Models\UserAuth;
use App\Models\UserSessions;
use App\Services\Authentication\AuthenticationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticationController extends Controller
{
    public function __construct(
        private readonly AuthenticationService $authentication,
    ) {}

    public function showSignIn(): Response
    {
        return Inertia::render('auth/sign-in');
    }

    public function showSignUp(): Response
    {
        return Inertia::render('auth/sign-up');
    }

    public function signUp(SignUpRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $user = $this->authentication->signUp(
            $request,
            $validated['username'],
            $validated['password']
        );

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('dashboard')
            ->with('success', 'حساب شما با موفقیت ساخته شد. خوش آمدید!');
    }

    public function signIn(SignInRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $user = $this->authentication->signIn(
            $request,
            $validated['username'],
            $validated['password']
        );

        if (! $user) {
            throw ValidationException::withMessages(['username' => 'نام کاربری یا رمز عبور صحیح نیست']);
        }

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended(route('dashboard'))
            ->with('success', 'با موفقیت وارد حساب خود شدید');
    }

    public function signOut(Request $request): RedirectResponse
    {
        $user = $request->user();

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        UserAuth::query()->where('user_id', $user->id)->update(['logged' => '0']);
        UserSessions::query()->where('user_id', $user->id)->update(['active' => '0', 'logout_at' => now()]);

        return redirect()->route('home')->with('success', 'از حساب کاربری خارج شدید');
    }
}
