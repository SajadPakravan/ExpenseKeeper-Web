import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { PERSIAN_MONTHS } from '@/tools/values';

export default function MonthField({
    value,
    onChange,
}: {
    value: number | null;
    onChange: (value: number) => void;
}) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleOutside(event: MouseEvent) {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 transition hover:border-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
            >
                <span>{value === null ? 'ماه را انتخاب کنید' : PERSIAN_MONTHS[value]}</span>
                <ChevronDown size={17} className="text-slate-400" />
            </button>

            {open && (
                <div className="absolute z-40 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-slate-900">
                    <div className="grid grid-cols-3 gap-1">
                        {PERSIAN_MONTHS.map((month, index) => (
                            <button
                                key={month}
                                type="button"
                                onClick={() => {
                                    onChange(index);
                                    setOpen(false);
                                }}
                                className={`rounded-lg px-2 py-2.5 text-sm transition ${
                                    value === index
                                        ? 'bg-emerald-500 font-bold text-white dark:bg-emerald-400 dark:text-slate-950'
                                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300'
                                }`}
                            >
                                {month}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
