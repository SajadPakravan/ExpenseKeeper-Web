import { Link } from '@inertiajs/react';
import {
    BarChart3,
    PiggyBank,
    ShieldCheck,
} from 'lucide-react';
import type { PropsWithChildren } from 'react';

import ThemeToggle from '@/components/theme-toggle';

export default function AuthLayout({
    children,
    title,
    subtitle,
}: PropsWithChildren<{
    title: string;
    subtitle: string;
}>) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-52 -right-52 size-[520px] rounded-full bg-emerald-300/25 blur-[130px] dark:bg-emerald-500/10" />
                <div className="absolute -bottom-64 -left-44 size-[560px] rounded-full bg-cyan-300/20 blur-[140px] dark:bg-cyan-500/10" />
            </div>

            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-6">
                <div
                    dir="ltr"
                    className="flex items-center justify-between"
                >
                    <Link
                        href="/"
                        className="shrink-0"
                        aria-label="هزینه‌بان - صفحه اصلی"
                    >
                        <img
                            src="/images/logos/ExpenseKeeper-Logo-text.webp"
                            alt="هزینه بان | ExpenseKeeper"
                            className="h-auto w-[180px] sm:w-[210px]"
                        />
                    </Link>

                    <ThemeToggle />
                </div>

                <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1fr_1.05fr] lg:py-16">
                    <section className="mx-auto w-full max-w-md lg:order-2">
                        <div className="rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-2xl shadow-slate-900/8 backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/25">
                            <div className="mb-8">
                                <div className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                                    حساب کاربری هزینه‌بان
                                </div>
                                <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl dark:text-white">
                                    {title}
                                </h1>
                                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {subtitle}
                                </p>
                            </div>

                            {children}
                        </div>
                    </section>

                    <section className="hidden lg:order-1 lg:block">
                        <div className="max-w-xl">
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                یک حساب، تمام مدیریت مالی شما
                            </span>
                            <h2 className="mt-4 text-4xl leading-[1.6] font-bold text-slate-950 dark:text-white">
                                دخل و خرجت را مرتب کن و تصویر روشن‌تری از پولت
                                داشته باش
                            </h2>
                            <p className="mt-5 max-w-lg leading-8 text-slate-600 dark:text-slate-400">
                                بعد از ورود، داشبورد شخصی تو آماده است تا
                                درآمدها، هزینه‌ها، بودجه‌ها و اهداف مالی را در
                                یک فضای واحد مدیریت کنی
                            </p>

                            <div className="mt-10 grid grid-cols-3 gap-4">
                                <Feature icon={BarChart3} title="گزارش" />
                                <Feature icon={PiggyBank} title="پس‌انداز" />
                                <Feature icon={ShieldCheck} title="حساب امن" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function Feature({
    icon: Icon,
    title,
}: {
    icon: typeof BarChart3;
    title: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
            <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                <Icon size={20} />
            </div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {title}
            </div>
        </div>
    );
}
