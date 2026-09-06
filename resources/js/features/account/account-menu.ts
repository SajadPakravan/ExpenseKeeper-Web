import type { LucideIcon } from 'lucide-react';
import {
    BarChart3,
    CircleUserRound,
    Landmark,
    LayoutDashboard,
    ReceiptText,
    Settings,
    SlidersHorizontal,
    Target,
    WalletCards,
} from 'lucide-react';
import { dashboard, incomes, profile, expenses } from '@/routes';

export type accountMenuDefinition = {
    label: string;
    icon: LucideIcon;
    href: string;
};

export const ACCOUNT_MENU: readonly accountMenuDefinition[] = [
    { label: 'داشبورد', icon: LayoutDashboard, href: dashboard.url() },
    { label: 'مشخصات فردی', icon: CircleUserRound, href: profile.url() },
    { label: 'درآمدها', icon: Landmark, href: incomes.url() },
    { label: 'هزینه‌ها', icon: WalletCards, href: expenses.url() },
    { label: 'تراکنش‌ها', icon: ReceiptText, href: '/account/transactions' },
    { label: 'بودجه‌بندی', icon: SlidersHorizontal, href: '/account/budgets' },
    { label: 'اهداف پس‌انداز', icon: Target, href: '/account/savings' },
    { label: 'گزارش‌ها', icon: BarChart3, href: '/account/reports' },
    { label: 'انتقادات و پیشنهادات', icon: BarChart3, href: '/account/#' },
    { label: 'تنظیمات', icon: Settings, href: '/account/settings' },
];
