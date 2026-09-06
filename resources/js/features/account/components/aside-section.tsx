import { Link } from '@inertiajs/react';
import { LogOut, X } from 'lucide-react';
import MenuSection from '@/features/account/components/menu-section';
import type { useAccount } from '@/features/account/hooks/use-account';

type MenuSectionProps = {
    account: ReturnType<typeof useAccount>;
};

export default function AsideSection({ account }: MenuSectionProps) {
    return (
        <aside
            className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-slate-200 bg-white transition-transform duration-300 dark:border-white/10 dark:bg-slate-900 ${
                account.sidebarOpen
                    ? 'translate-x-0'
                    : 'translate-x-full lg:translate-x-0'
            }`}
        >
            <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5 dark:border-white/10">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex size-3/5 items-center justify-center">
                        <img
                            src="/images/logos/ExpenseKeeper-Logo-text.webp"
                            alt="هزینه بان"
                        />
                    </div>
                </Link>

                <button
                    type="button"
                    onClick={() => account.setSidebarOpen(false)}
                    className="flex size-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-white/10"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="border-b border-slate-100 px-5 py-5 dark:border-white/10">
                <div className="flex items-center gap-3">
                    <img
                        src={account.user.avatar}
                        alt={
                            account.user.name ||
                            account.user.username ||
                            'کاربر'
                        }
                        className="size-12 rounded-full object-cover ring-4 ring-slate-200 dark:ring-white/10"
                    />
                    <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-slate-900 dark:text-white">
                            {account.user.name || account.user.username}
                        </div>
                        <div className="mt-1 truncate text-xs text-slate-400">
                            {account.user.username}@
                        </div>
                    </div>
                </div>
            </div>

            <MenuSection account={account} />

            <div className="border-t border-slate-100 p-3 dark:border-white/10">
                <button
                    type="button"
                    onClick={account.logOut}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-400/10"
                >
                    <LogOut size={19} />
                    خروج از حساب
                </button>
            </div>
        </aside>
    );
}
