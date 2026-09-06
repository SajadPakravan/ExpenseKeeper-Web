import { Link, router } from '@inertiajs/react';
import {
    CircleUserRound,
    LayoutDashboard,
    LogOut,
    ReceiptText,
    Settings,
    WalletCards,
} from 'lucide-react';

import type { AuthUser } from '@/types/shared';
import {dashboard, profile} from "@/routes";

export default function UserMenu({ user }: { user: AuthUser }) {
    function logout() {
        router.post('/sign-out');
    }

    return (
        <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition hover:border-emerald-300 sm:min-w-[220px] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-none dark:hover:border-emerald-400/30">
                <img
                    src={user.avatar}
                    alt={user.name ?? user.username ?? 'کاربر'}
                    className="size-10 rounded-full object-cover ring-4 ring-slate-200 dark:ring-white/10"
                />
                <div className="hidden flex-1 text-right sm:block">
                    <div className="text-sm font-bold whitespace-nowrap text-slate-800 dark:text-slate-100">
                        {user.name || user.username}
                    </div>
                    <div className="mt-0.5 text-xs whitespace-nowrap text-slate-400">
                        @{user.username}
                    </div>
                </div>
            </summary>

            <div
                dir="rtl"
                className="absolute left-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/30"
            >
                <div className="border-b border-slate-100 px-3 py-3 dark:border-white/10">
                    <div className="truncate text-sm font-bold text-slate-900 dark:text-white">
                        {user.name || user.username}
                    </div>
                    <div className="mt-1 truncate text-xs text-slate-400">
                        {user.email || user.phone || `@${user.username}`}
                    </div>
                </div>

                <div className="py-2">
                    <MenuLink
                        href={dashboard.url()}
                        icon={LayoutDashboard}
                        label="داشبورد"
                    />
                    <MenuLink
                        href={profile.url()}
                        icon={CircleUserRound}
                        label="مشخصات فردی"
                    />
                    <MenuLink
                        href="/account/transactions"
                        icon={ReceiptText}
                        label="تراکنش‌ها"
                    />
                    <MenuLink
                        href="/account/expenses"
                        icon={WalletCards}
                        label="هزینه‌ها"
                    />
                    <MenuLink
                        href="/account/settings"
                        icon={Settings}
                        label="تنظیمات"
                    />
                </div>

                <div className="border-t border-slate-100 pt-2 dark:border-white/10">
                    <button
                        type="button"
                        onClick={logout}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-400/10"
                    >
                        <LogOut size={18} />
                        خروج از حساب
                    </button>
                </div>
            </div>
        </details>
    );
}

function MenuLink({
    href,
    icon: Icon,
    label,
}: {
    href: string;
    icon: typeof LayoutDashboard;
    label: string;
}) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white"
        >
            <Icon size={18} />
            {label}
        </Link>
    );
}
