import {
    ArrowDownLeft,
    ArrowUpLeft,
    Landmark,
    PiggyBank,
    ReceiptText,
    WalletCards,
} from 'lucide-react';

import AccountLayout from '@/layouts/account-layout';

interface Summary {
    balance: number;
    income: number;
    expense: number;
    saving: number;
}

interface MonthlyItem {
    month: string;
    income: number;
    expense: number;
}

interface Category {
    label: string;
    percent: number;
}

interface Transaction {
    title: string;
    category: string;
    amount: number;
    date: string;
}

export default function Dashboard({
    summary,
    monthly,
    categories,
    transactions,
}: {
    summary: Summary;
    monthly: MonthlyItem[];
    categories: Category[];
    transactions: Transaction[];
}) {
    return (
        <AccountLayout title="داشبورد">
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    title="موجودی کل"
                    value={summary.balance}
                    icon={WalletCards}
                    note="نمایش آزمایشی"
                />
                <SummaryCard
                    title="درآمد این ماه"
                    value={summary.income}
                    icon={Landmark}
                    positive
                    note="+12٪ نسبت به ماه قبل"
                />
                <SummaryCard
                    title="هزینه این ماه"
                    value={summary.expense}
                    icon={ReceiptText}
                    note="-4٪ نسبت به ماه قبل"
                />
                <SummaryCard
                    title="پس‌انداز"
                    value={summary.saving}
                    icon={PiggyBank}
                    positive
                    note="39٪ از درآمد این ماه"
                />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="font-bold text-slate-900 dark:text-white">
                                درآمد و هزینه ماهانه
                            </h2>
                            <p className="mt-1 text-xs text-slate-400">
                                اعداد این نمودار فعلاً نمایشی هستند
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-2">
                                <i className="size-2 rounded-full bg-emerald-500" />
                                درآمد
                            </span>
                            <span className="flex items-center gap-2">
                                <i className="size-2 rounded-full bg-rose-400" />
                                هزینه
                            </span>
                        </div>
                    </div>

                    <MonthlyChart data={monthly} />
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
                    <div>
                        <h2 className="font-bold text-slate-900 dark:text-white">
                            ترکیب هزینه‌ها
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                            سهم دسته‌های مختلف از کل هزینه
                        </p>
                    </div>

                    <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row xl:flex-col">
                        <div
                            className="relative size-44 rounded-full"
                            style={{
                                background:
                                    'conic-gradient(#10b981 0 32%, #38bdf8 32% 59%, #f59e0b 59% 77%, #94a3b8 77% 100%)',
                            }}
                        >
                            <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white dark:bg-slate-900">
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                    ۱۴.۲
                                </span>
                                <span className="mt-1 text-xs text-slate-400">
                                    میلیون تومان
                                </span>
                            </div>
                        </div>

                        <div className="grid w-full grid-cols-2 gap-3">
                            {categories.map((category, index) => (
                                <div
                                    key={category.label}
                                    className="rounded-2xl bg-slate-50 p-3 dark:bg-white/[0.04]"
                                >
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`size-2 rounded-full ${
                                                [
                                                    'bg-emerald-500',
                                                    'bg-sky-400',
                                                    'bg-amber-500',
                                                    'bg-slate-400',
                                                ][index]
                                            }`}
                                        />
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            {category.label}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                                        {category.percent}٪
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-6 rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-6 dark:border-white/10">
                    <h2 className="font-bold text-slate-900 dark:text-white">
                        آخرین تراکنش‌ها
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                        داده‌های این جدول فعلاً آزمایشی هستند
                    </p>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-white/10">
                    {transactions.map((transaction) => (
                        <div
                            key={`${transaction.title}-${transaction.date}`}
                            className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div
                                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                                        transaction.amount > 0
                                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400'
                                            : 'bg-rose-50 text-rose-500 dark:bg-rose-400/10 dark:text-rose-400'
                                    }`}
                                >
                                    {transaction.amount > 0 ? (
                                        <ArrowDownLeft size={19} />
                                    ) : (
                                        <ArrowUpLeft size={19} />
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <div className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                                        {transaction.title}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-400">
                                        {transaction.category} · {transaction.date}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`shrink-0 text-sm font-bold ${
                                    transaction.amount > 0
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-slate-800 dark:text-slate-100'
                                }`}
                            >
                                {transaction.amount > 0 ? '+' : '-'}
                                {formatMoney(Math.abs(transaction.amount))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </AccountLayout>
    );
}

function SummaryCard({
    title,
    value,
    icon: Icon,
    positive = false,
    note,
}: {
    title: string;
    value: number;
    icon: typeof WalletCards;
    positive?: boolean;
    note: string;
}) {
    return (
        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
            <div className="flex items-start justify-between">
                <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
                    {title}
                </div>
                <div
                    className={`flex size-10 items-center justify-center rounded-xl ${
                        positive
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400'
                            : 'bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300'
                    }`}
                >
                    <Icon size={20} />
                </div>
            </div>

            <div className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
                {formatMoney(value)}
            </div>
            <div className="mt-2 text-[11px] text-slate-400">
                {note}
            </div>
        </div>
    );
}

function MonthlyChart({ data }: { data: MonthlyItem[] }) {
    const max = Math.max(...data.flatMap((item) => [item.income, item.expense]));

    return (
        <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
            {data.map((item) => (
                <div
                    key={item.month}
                    className="flex min-w-0 flex-1 flex-col items-center gap-3"
                >
                    <div className="flex h-48 w-full items-end justify-center gap-1.5">
                        <div
                            className="w-[32%] max-w-7 rounded-t-lg bg-emerald-500"
                            style={{
                                height: `${Math.max(12, (item.income / max) * 100)}%`,
                            }}
                            title={`درآمد: ${item.income} میلیون`}
                        />
                        <div
                            className="w-[32%] max-w-7 rounded-t-lg bg-rose-400"
                            style={{
                                height: `${Math.max(12, (item.expense / max) * 100)}%`,
                            }}
                            title={`هزینه: ${item.expense} میلیون`}
                        />
                    </div>
                    <span className="max-w-full truncate text-[10px] text-slate-400 sm:text-xs">
                        {item.month}
                    </span>
                </div>
            ))}
        </div>
    );
}

function formatMoney(value: number) {
    return `${new Intl.NumberFormat('fa-IR').format(value)} تومان`;
}
