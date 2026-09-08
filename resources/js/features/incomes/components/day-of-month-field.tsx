import { ChevronDown } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { persianDigit } from '@/tools/formating';

function normalizeDigits(value: string): string {
    return value
        .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
        .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
        .replace(/\D/g, '');
}

export default function DayOfMonthField({
    value,
    onChange,
}: {
    value: number | null;
    onChange: (value: number | null) => void;
}) {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState(value ? String(value) : '');
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setText(value ? String(value) : '');
    }, [value]);

    useEffect(() => {
        function handleOutside(event: MouseEvent) {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);

    function handleInput(raw: string) {
        const normalized = normalizeDigits(raw).slice(0, 2);
        setText(normalized);
        setOpen(true);

        if (!normalized) {
            onChange(null);
            return;
        }

        const day = Number(normalized);
        onChange(day >= 1 && day <= 31 ? day : null);
    }

    return (
        <div ref={rootRef} className="relative">
            <div className="relative">
                <input
                    type="text"
                    inputMode="numeric"
                    value={text}
                    onFocus={() => setOpen(true)}
                    onChange={(event) => handleInput(event.target.value)}
                    placeholder="مثلاً 21"
                    dir="ltr"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pl-11 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                />
                <button
                    type="button"
                    onClick={() => setOpen((current) => !current)}
                    className="absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
                    aria-label="نمایش روزهای ماه"
                >
                    <ChevronDown size={17} />
                </button>
            </div>

            {open && (
                <div className="absolute z-40 mt-2 max-h-56 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-slate-900">
                    <div className="grid grid-cols-4 gap-1 sm:grid-cols-5">
                        {days.map((day) => (
                            <button
                                key={day}
                                type="button"
                                onClick={() => {
                                    onChange(day);
                                    setText(String(day));
                                    setOpen(false);
                                }}
                                className={`rounded-lg px-2 py-2 text-sm transition ${
                                    value === day
                                        ? 'bg-emerald-500 font-bold text-white dark:bg-emerald-400 dark:text-slate-950'
                                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300'
                                }`}
                            >
                                {persianDigit(String(day))}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
