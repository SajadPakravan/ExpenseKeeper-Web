import { Link } from '@inertiajs/react';
import type { LayoutDashboard } from 'lucide-react';
import { ACCOUNT_MENU } from '@/features/account/account-menu';
import type {useAccount} from "@/features/account/hooks/use-account";
import { dashboard } from '@/routes';

type MenuSectionProps = {
    account: ReturnType<typeof useAccount>;
};

export default function MenuSection({ account }: MenuSectionProps) {
    return (
        <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
                {ACCOUNT_MENU.map((item) => (
                    <NavItem
                        key={item.href}
                        {...item}
                        currentUrl={account.page.url.split('?')[0]}
                        onClick={() => account.setSidebarOpen(false)}
                    />
                ))}
            </div>
        </nav>
    );

    function NavItem({
        href,
        label,
        icon: Icon,
        onClick,
        currentUrl,
    }: {
        href: string;
        label: string;
        icon: typeof LayoutDashboard;
        onClick: () => void;
        currentUrl: string;
    }) {
        const active =
            currentUrl === href ||
            (href !== dashboard.url() && currentUrl.startsWith(`${href}/`));

        return (
            <Link
                href={href}
                onClick={onClick}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    active
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white'
                }`}
            >
                <Icon size={19} />
                {label}
            </Link>
        );
    }
}
