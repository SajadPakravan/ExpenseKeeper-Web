import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

import FloatingPopover from '@/components/floating-popover';
import { PERSIAN_MONTHS } from '@/tools/values';

export default function MonthField({
    value,
    onChange,
}: {
    value: number | null;
    onChange: (value: number) => void;
}) {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="w-fit">
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setOpen((current) => !current)}
                className="flex h-11 w-36 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
            >
                <span className="truncate">{value === null ? 'ماه' : PERSIAN_MONTHS[value]}</span>
                <ChevronDown size={15} className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <FloatingPopover
                open={open}
                anchorRef={buttonRef}
                onClose={() => setOpen(false)}
                popoverWidth={280}
                maxHeight={250}
                className="p-2"
            >
                <div className="grid grid-cols-2 gap-1">
                    {PERSIAN_MONTHS.map((month, index) => (
                        <button
                            key={month}
                            type="button"
                            onClick={() => {
                                onChange(index);
                                setOpen(false);
                            }}
                            className={`rounded-lg px-3 py-2.5 text-sm font-bold transition ${
                                value === index
                                    ? 'bg-emerald-500 text-white dark:bg-emerald-400 dark:text-slate-950'
                                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300'
                            }`}
                        >
                            {month}
                        </button>
                    ))}
                </div>
            </FloatingPopover>
        </div>
    );
}
