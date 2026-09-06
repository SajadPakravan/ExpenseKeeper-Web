import { Moon, Sun } from 'lucide-react';

import { useAppearance } from '@/hooks/use-appearance';

export default function ThemeToggle() {
    const { toggleAppearance } = useAppearance();

    return (
        <button
            type="button"
            onClick={toggleAppearance}
            aria-label="تغییر تم روشن و تاریک"
            title="تغییر تم"
            className="group flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:shadow-none dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950"
        >
            <Moon
                size={19}
                aria-hidden="true"
                className="block dark:hidden"
            />
            <Sun
                size={19}
                aria-hidden="true"
                className="hidden dark:block"
            />
        </button>
    );
}
