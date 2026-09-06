import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, UserRound } from 'lucide-react';
import type { SyntheticEvent } from 'react';

import PasswordField from '@/components/password-field';
import AuthLayout from '@/layouts/auth-layout';

export default function SignIn() {
    const form = useForm({username: '', password: ''});

    function submit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        form.post('sign-in', {
            preserveScroll: true,
            onFinish: () => form.reset('password'),
        });
    }

    return (
        <AuthLayout
            title="ورود به حساب"
            subtitle="نام کاربری و رمز عبور خود را وارد کنید تا وارد پنل هزینه‌بان شوید"
        >
            <Head title="ورود" />

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label
                        htmlFor="username"
                        className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
                    >
                        نام کاربری
                    </label>

                    <div className="relative">
                        <UserRound
                            size={18}
                            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
                        />
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
                            className={`h-13 w-full rounded-2xl border bg-white pr-11 pl-4 text-left text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:ring-4 dark:bg-white/[0.04] dark:text-white ${
                                form.errors.username
                                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                                    : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-white/10 dark:focus:border-emerald-400'
                            }`}
                            dir="ltr"
                        />
                    </div>

                    {form.errors.username && (
                        <p className="mt-2 text-xs leading-6 font-bold text-rose-600 dark:text-rose-400">
                            {form.errors.username}
                        </p>
                    )}
                </div>

                <PasswordField
                    label="رمز عبور"
                    value={form.data.password}
                    onChange={(value) => form.setData('password', value)}
                    error={form.errors.password}
                />

                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center text-sm text-slate-600 dark:bg-white/[0.04] dark:text-slate-400">
                    ثبت‌نام نکرده‌اید؟{' '}
                    <Link href="sign-up"
                        className="font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                        ثبت‌نام کنید
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={form.processing}
                    className="flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600 disabled:opacity-60 dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300"
                >
                    {form.processing ? 'در حال ورود...' : 'ورود به حساب'}
                    {!form.processing && <ArrowLeft size={18} />}
                </button>
            </form>
        </AuthLayout>
    );
}
