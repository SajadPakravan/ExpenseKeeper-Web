import { Link, router, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import ThemeToggle from '@/components/theme-toggle';
import UserMenu from '@/components/user-menu';
import type { SharedPageProps } from '@/types/shared';

export default function PublicLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<SharedPageProps>().props;
    const user = auth.user;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
            <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-slate-950/80">
                <div
                    dir="ltr"
                    className="relative mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
                >
                    <div dir="rtl" className="flex items-center gap-2">
                        {user ? (
                            <UserMenu user={user} />
                        ) : (
                            <>
                                <Link
                                    href="sign-in"
                                    className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:inline-flex dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white"
                                >
                                    ورود
                                </Link>

                                <Link
                                    href="sign-up"
                                    className="inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold whitespace-nowrap text-white shadow-sm shadow-emerald-500/20 transition hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300 dark:focus-visible:ring-offset-slate-950"
                                >
                                    شروع رایگان
                                </Link>
                            </>
                        )}
                    </div>

                    <nav
                        dir="rtl"
                        aria-label="ناوبری اصلی"
                        className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-sm font-bold text-slate-600 lg:flex dark:text-slate-300"
                    >
                        <a
                            href="#features"
                            className="transition hover:text-emerald-600 dark:hover:text-emerald-300"
                        >
                            امکانات
                        </a>
                        <a
                            href="#how-it-works"
                            className="transition hover:text-emerald-600 dark:hover:text-emerald-300"
                        >
                            نحوه کار
                        </a>
                        <a
                            href="#reviews"
                            className="transition hover:text-emerald-600 dark:hover:text-emerald-300"
                        >
                            نظرات کاربران
                        </a>
                    </nav>

                    <div dir="ltr" className="flex items-center gap-3">
                        <Link
                            href="/"
                            dir="rtl"
                            className="flex items-center gap-3"
                            aria-label="هزینه‌بان - صفحه اصلی"
                        >
                            <img
                                src="/images/logos/ExpenseKeeper-Logo-text.webp"
                                alt="هزینه بان | ExpenseKeeper"
                                className="h-auto w-[170px] shrink-0 sm:w-[190px]"
                            />
                        </Link>

                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main>{children}</main>

            <footer className="border-t border-slate-200 bg-white transition-colors dark:border-white/10 dark:bg-slate-950">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex size-1/5 items-center justify-center rounded-xl text-white dark:text-slate-950">
                                <img src="/images/logos/ExpenseKeeper-Logo.webp" />
                            </div>
                            <span className="text-lg font-bold text-slate-950 dark:text-white">
                                هزینه‌بان
                            </span>
                        </div>
                        <p className="max-w-sm text-sm leading-7 text-slate-500 dark:text-slate-400">
                            یک فضای ساده و یکپارچه برای مدیریت درآمد، هزینه،
                            بودجه و اهداف پس‌انداز
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 font-bold text-slate-900 dark:text-white">
                            دسترسی سریع
                        </h3>
                        <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            <a
                                href="#features"
                                className="block transition hover:text-emerald-600 dark:hover:text-emerald-300"
                            >
                                امکانات
                            </a>
                            <a
                                href="#how-it-works"
                                className="block transition hover:text-emerald-600 dark:hover:text-emerald-300"
                            >
                                نحوه کار
                            </a>
                            <a
                                href="#reviews"
                                className="block transition hover:text-emerald-600 dark:hover:text-emerald-300"
                            >
                                نظرات کاربران
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 font-bold text-slate-900 dark:text-white">
                            حساب کاربری
                        </h3>

                        {user ? (
                            <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                                <Link
                                    href="dashboard"
                                    className="block transition hover:text-emerald-600 dark:hover:text-emerald-300"
                                >
                                    داشبورد
                                </Link>
                                <Link
                                    href="profile"
                                    className="block transition hover:text-emerald-600 dark:hover:text-emerald-300"
                                >
                                    مشخصات فردی
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => router.post('/sign-out')}
                                    className="block transition hover:text-rose-600 dark:hover:text-rose-400"
                                >
                                    خروج از حساب
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                                <Link
                                    href="sign-in"
                                    className="block transition hover:text-emerald-600 dark:hover:text-emerald-300"
                                >
                                    ورود
                                </Link>
                                <Link
                                    href="sign-up"
                                    className="block transition hover:text-emerald-600 dark:hover:text-emerald-300"
                                >
                                    ایجاد حساب
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-slate-200 px-6 py-6 text-center text-xs text-slate-400 dark:border-white/10 dark:text-slate-500">
                    © {new Date().getFullYear()} هزینه‌بان — تمام حقوق محفوظ
                    است.
                </div>
            </footer>
        </div>
    );
}
