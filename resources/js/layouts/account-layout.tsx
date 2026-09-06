import { Head } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import ErrorAlert from '@/components/error';
import SuccessAlert from '@/components/success';
import ThemeToggle from '@/components/theme-toggle';
import AsideSection from '@/features/account/components/aside-section';
import { useAccount } from '@/features/account/hooks/use-account';

export default function AccountLayout({
    children,
    title,
}: PropsWithChildren<{ title: string }>) {
    const account = useAccount();

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <Head title={title} />

            {account.sidebarOpen && (
                <button
                    type="button"
                    aria-label="بستن منو"
                    onClick={() => account.setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm lg:hidden"
                />
            )}

            <AsideSection account={account} />

            <div className="min-h-screen lg:mr-72">
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/85 px-4 backdrop-blur-xl sm:px-6 dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => account.setSidebarOpen(true)}
                            className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 lg:hidden dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-slate-950 sm:text-xl dark:text-white">
                                {title}
                            </h1>
                            <p className="mt-1 hidden text-xs text-slate-400 sm:block">
                                مدیریت حساب و اطلاعات مالی شما
                            </p>
                        </div>
                    </div>

                    <ThemeToggle />
                </header>

                <main className="p-4 sm:p-6 lg:p-8">
                    <SuccessAlert message={account.flash?.success} />
                    <ErrorAlert message={account.flash?.error} />

                    {children}
                </main>
            </div>
        </div>
    );
}
