import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import FloatingPopover from '@/components/floating-popover';
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
    const anchorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setText(value ? String(value) : '');
    }, [value]);

    const days = useMemo(() => Array.from({ length: 31 }, (_, index) => index + 1), []);

    function setDay(day: number) {
        const normalizedDay = Math.min(31, Math.max(1, day));

        setText(String(normalizedDay));
        onChange(normalizedDay);
    }

    function changeDay(amount: -1 | 1) {
        const current = value ?? 1;
        setDay(current + amount);
    }

    function handleInput(raw: string) {
        const normalized = normalizeDigits(raw).slice(0, 2);

        setText(normalized);

        if (!normalized) {
            onChange(null);
            return;
        }

        const day = Number(normalized);
        onChange(day >= 1 && day <= 31 ? day : null);
    }

    return (
        <div className="w-fit">
            <div
                ref={anchorRef}
                className="flex h-11 w-[7.25rem] items-stretch overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04]"
            >
                <button
                    type="button"
                    onClick={() => changeDay(-1)}
                    disabled={(value ?? 1) <= 1}
                    className="flex w-8 items-center justify-center border-l border-slate-200 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/10 dark:hover:bg-white/10 dark:hover:text-white"
                    aria-label="کاهش روز"
                >
                    <ChevronDown size={16} />
                </button>

                <input
                    type="text"
                    inputMode="numeric"
                    value={persianDigit(text)}
                    onFocus={() => setOpen(true)}
                    onClick={() => setOpen(true)}
                    onChange={(event) => handleInput(event.target.value)}
                    dir="ltr"
                    aria-label="روز ماه"
                    className="min-w-0 flex-1 bg-transparent px-1 text-center text-sm font-bold tabular-nums text-slate-800 outline-none dark:text-white"
                />

                <button
                    type="button"
                    onClick={() => changeDay(1)}
                    disabled={(value ?? 31) >= 31}
                    className="flex w-8 items-center justify-center border-r border-slate-200 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/10 dark:hover:bg-white/10 dark:hover:text-white"
                    aria-label="افزایش روز"
                >
                    <ChevronUp size={16} />
                </button>
            </div>

            <FloatingPopover
                open={open}
                anchorRef={anchorRef}
                onClose={() => setOpen(false)}
                popoverWidth={286}
                maxHeight={250}
                className="p-2"
            >
                <div className="grid grid-cols-7 gap-1">
                    {days.map((day) => (
                        <button
                            key={day}
                            type="button"
                            onClick={() => {
                                setDay(day);
                                setOpen(false);
                            }}
                            className={`flex aspect-square items-center justify-center rounded-lg text-xs font-bold tabular-nums transition ${
                                value === day
                                    ? 'bg-emerald-500 text-white dark:bg-emerald-400 dark:text-slate-950'
                                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300'
                            }`}
                        >
                            {persianDigit(String(day))}
                        </button>
                    ))}
                </div>
            </FloatingPopover>
        </div>
    );
}
