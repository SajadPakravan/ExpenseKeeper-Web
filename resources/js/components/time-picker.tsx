import { useRef, useState } from 'react';

import FloatingPopover from '@/components/floating-popover';
import { persianDigit } from '@/tools/formating';

type TimePickerProps = {
    value: string;
    onChange: (value: string) => void;
};

const HOURS = Array.from({ length: 24 }, (_, index) => index.toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, '0'));

export default function TimePicker({ value, onChange }: TimePickerProps) {
    const [hour = '00', minute = '00'] = value ? value.split(':') : ['00', '00'];
    const [hourOpen, setHourOpen] = useState(false);
    const [minuteOpen, setMinuteOpen] = useState(false);
    const hourRef = useRef<HTMLButtonElement>(null);
    const minuteRef = useRef<HTMLButtonElement>(null);

    function setHour(newHour: string) {
        onChange(`${newHour}:${minute || '00'}`);
        setHourOpen(false);
    }

    function setMinute(newMinute: string) {
        onChange(`${hour || '00'}:${newMinute}`);
        setMinuteOpen(false);
    }

    return (
        <div
            dir="ltr"
            className="inline-flex h-11 items-center rounded-xl border border-slate-200 bg-white px-1.5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
        >
            <button
                ref={hourRef}
                type="button"
                onClick={() => {
                    setHourOpen((current) => !current);
                    setMinuteOpen(false);
                }}
                className="flex h-8 w-11 items-center justify-center rounded-lg text-sm font-bold text-slate-800 tabular-nums transition hover:bg-slate-100 focus:bg-emerald-50 focus:text-emerald-700 focus:outline-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-emerald-400/10 dark:focus:text-emerald-300"
                aria-label="انتخاب ساعت"
            >
                {persianDigit(hour)}
            </button>

            <span className="px-0.5 text-base font-black text-slate-400">:</span>

            <button
                ref={minuteRef}
                type="button"
                onClick={() => {
                    setMinuteOpen((current) => !current);
                    setHourOpen(false);
                }}
                className="flex h-8 w-11 items-center justify-center rounded-lg text-sm font-bold text-slate-800 tabular-nums transition hover:bg-slate-100 focus:bg-emerald-50 focus:text-emerald-700 focus:outline-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-emerald-400/10 dark:focus:text-emerald-300"
                aria-label="انتخاب دقیقه"
            >
                {persianDigit(minute)}
            </button>

            <FloatingPopover open={hourOpen} anchorRef={hourRef} onClose={() => setHourOpen(false)} popoverWidth={68} maxHeight={230} className="p-1">
                <div className="space-y-0.5">
                    {HOURS.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setHour(item)}
                            className={`flex h-9 w-full items-center justify-center rounded-lg text-sm font-bold tabular-nums transition ${
                                hour === item
                                    ? 'bg-emerald-500 text-white dark:bg-emerald-400 dark:text-slate-950'
                                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'
                            }`}
                        >
                            {persianDigit(item)}
                        </button>
                    ))}
                </div>
            </FloatingPopover>

            <FloatingPopover open={minuteOpen} anchorRef={minuteRef} onClose={() => setMinuteOpen(false)} popoverWidth={68} maxHeight={230} className="p-1">
                <div className="space-y-0.5">
                    {MINUTES.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setMinute(item)}
                            className={`flex h-9 w-full items-center justify-center rounded-lg text-sm font-bold tabular-nums transition ${
                                minute === item
                                    ? 'bg-emerald-500 text-white dark:bg-emerald-400 dark:text-slate-950'
                                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'
                            }`}
                        >
                            {persianDigit(item)}
                        </button>
                    ))}
                </div>
            </FloatingPopover>
        </div>
    );
}
