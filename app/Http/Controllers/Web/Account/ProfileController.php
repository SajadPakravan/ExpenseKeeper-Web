<?php

namespace App\Http\Controllers\Web\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\RequestContactVerificationRequest;
use App\Http\Requests\Profile\UpdateAvatarRequest;
use App\Http\Requests\Profile\UpdateNameRequest;
use App\Http\Requests\Profile\UpdateUsernameRequest;
use App\Http\Requests\Profile\VerifyContactRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use App\Services\Verification\ContactVerificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('account/profile');
    }

    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $user = $request->user();

        $oldAvatar = $user->avatar;
        $newPath = null;
        $newAvatar = null;

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->extension();
            $fileName = $user->id.'.'.$extension;

            $newPath = $file->storeAs('uploads/avatars', $fileName, 'public');
            $newAvatar = Storage::disk('public')->url($newPath);
        }

        DB::transaction(function () use ($user, $validated, $newAvatar) {
            $userData = [
                'name' => $validated['name'],
                'email' => $validated['email'] ?: null,
                'phone' => $validated['phone'] ?: null,
            ];

            if ($newAvatar !== null) {
                $userData['avatar'] = $newAvatar;
            }

            $user->update($userData);

            $user->authCredential()->update(['username' => $validated['username']]);
        });

        if ($newPath !== null && $oldAvatar && $oldAvatar !== User::DEFAULT_AVATAR && str_starts_with($oldAvatar, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $oldAvatar);

            if ($oldPath !== $newPath) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        return back()->with('success', 'مشخصات کاربری با موفقیت ذخیره شد.');
    }

    public function updateName(UpdateNameRequest $request): RedirectResponse
    {
        $request->user()->update([
            'name' => $request->string('name')->toString(),
        ]);

        return back()->with('success', 'نام شما با موفقیت تغییر کرد.');
    }

    public function updateUsername(UpdateUsernameRequest $request): RedirectResponse
    {
        $request->user()->authCredential()->update([
            'username' => $request->string('username')->toString(),
        ]);

        return back()->with('success', 'نام کاربری با موفقیت تغییر کرد.');
    }

    public function updateAvatar(UpdateAvatarRequest $request): RedirectResponse
    {
        $user = $request->user();
        $oldAvatar = $user->avatar;
        $file = $request->file('avatar');
        $extension = $file->extension();
        $fileName = $user->id.'.'.$extension;

        $newPath = $file->storeAs('uploads/avatars', $fileName, 'public');

        $newAvatarUrl = Storage::disk('public')->url($newPath);

        $user->update(['avatar' => $newAvatarUrl]);

        if ($oldAvatar && str_starts_with($oldAvatar, '/storage/')
        ) {
            $oldPath = str_replace('/storage/', '', $oldAvatar);

            if ($oldPath !== $newPath) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        return back()->with('success', 'تصویر پروفایل با موفقیت تغییر کرد.');
    }

    public function requestContactCode(
        RequestContactVerificationRequest $request,
        ContactVerificationService $verification,
    ): RedirectResponse {
        $verification->sendCode(
            $request->user(),
            $request->string('type')->toString(),
            $request->string('value')->toString(),
        );

        return back()->with(
            'success',
            'کد تأیید ارسال شد. در محیط توسعه، کد در storage/logs/laravel.log ثبت می‌شود.',
        );
    }

    public function verifyContact(
        VerifyContactRequest $request,
        ContactVerificationService $verification,
    ): RedirectResponse {
        $verification->verify(
            $request->user(),
            $request->string('type')->toString(),
            $request->string('value')->toString(),
            $request->string('code')->toString(),
        );

        return back()->with(
            'success',
            $request->string('type')->toString() === 'email'
                ? 'ایمیل شما تأیید و ذخیره شد'
                : 'شماره همراه شما تأیید و ذخیره شد',
        );
    }
}
