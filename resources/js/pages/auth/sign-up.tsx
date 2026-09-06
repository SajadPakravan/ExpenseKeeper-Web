import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, UserRound } from 'lucide-react';
import type { SyntheticEvent } from 'react';

import PasswordField from '@/components/password-field';
import AuthLayout from '@/layouts/auth-layout';

export default function SignUp() {
    const form = useForm({username: '', password: '', password_confirmation: '',});

    function submit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post('sign-up', {preserveScroll: true,});
    }

    return (
        <AuthLayout title="ساخت حساب جدید" subtitle="برای شروع فقط یک نام کاربری و رمز عبور امن انتخاب کنید">
            <Head title="ثبت‌نام" />

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="username" className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        نام کاربری
                    </label>

                    <div className="relative">
                        <UserRound size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                        <input
                            id="username"
                            type="text"
                            value={form.data.username}
                            onChange={(event) =>
                                form.setData('username', event.target.value)
                            }
                            autoComplete="username"
                            autoFocus
                            placeholder="UserName"
                            className={`h-13 w-full rounded-2xl border bg-white pr-11 pl-4 text-left text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 dark:bg-white/[0.04] dark:text-white
                            ${
                                form.errors.username
                                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                                    : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-white/10 dark:focus:border-emerald-400'
                            }`}
                            dir="ltr"
                        />
                    </div>

                    {form.errors.username && (
                        <p className="mt-2 text-xs font-bold leading-6 text-rose-600 dark:text-rose-400">
                            {form.errors.username}
                        </p>
                    )}
                </div>

                <PasswordField
                    label="رمز عبور"
                    value={form.data.password}
                    onChange={(value) => form.setData('password', value)}
                    error={form.errors.password}
                    autoComplete="new-password"
                    placeholder="حداقل 8 کاراکتر"
                />

                <PasswordField
                    label="تکرار رمز عبور"
                    name="password_confirmation"
                    value={form.data.password_confirmation}
                    onChange={(value) => form.setData('password_confirmation', value)}
                    autoComplete="new-password"
                    placeholder="رمز عبور را دوباره وارد کنید"
                />

                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-500
                dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
                    <Rule text="حداقل 8 کاراکتر" />
                    <Rule text="حرف بزرگ انگلیسی" />
                    <Rule text="حرف کوچک انگلیسی" />
                    <Rule text="حداقل یک عدد" />
                    <Rule text="حداقل یک نماد خاص" />
                    <Rule text="تکرار دقیق رمز عبور" />
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center text-sm text-slate-600 dark:bg-white/[0.04] dark:text-slate-400">
                    قبلاً ثبت‌نام کرده‌اید؟{' '}
                    <Link href="sign-in"
                        className="font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
                        وارد شوید
                    </Link>
                </div>

                <button type="submit" disabled={form.processing} className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl
                cursor-pointer bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600
                disabled:opacity-60 dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300">
                    {form.processing ? 'در حال ساخت حساب...' : 'ثبت‌نام و ورود'}
                    {!form.processing && <ArrowLeft size={18} />}
                </button>
            </form>
        </AuthLayout>
    );
}

function Rule({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="shrink-0 text-emerald-500"/>
            <span>{text}</span>
        </div>
    );
}
