import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from 'lucide-react';
import FloatingPopover from '@/components/floating-popover';
import TimePicker from '@/components/time-picker';
import { useEffect, useMemo, useRef, useState } from 'react';
import { englishDigit, persianDigit } from '@/tools/formating';
import { isValidJalaliDate, jalaliMonthLength, toGregorian, toJalali } from '@/tools/jalali';
import { PERSIAN_DAYS, PERSIAN_MONTHS, TIMEZONE } from '@/tools/values';

type SelectedJalaliDate = {
    year: number;
    month: number;
    day: number;
};

function pad(value: number): string {
    return String(value).padStart(2, '0');
}

function formatDisplay(date: SelectedJalaliDate, time: string): string {
    const value = `${date.year}/${pad(date.month)}/${pad(date.day)} ${time}`;

    return persianDigit(value);
}

function dateToDisplay(value: string): string {
    if (!value) {
        return '';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const jalali = toJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());

    return formatDisplay(
        {
            year: jalali.jy,
            month: jalali.jm,
            day: jalali.jd,
        },
        `${pad(date.getHours())}:${pad(date.getMinutes())}`,
    );
}

function parseDisplay(value: string): {
    date: SelectedJalaliDate;
    time: string;
} | null {
    const normalized = englishDigit(value.trim());
    const match = normalized.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{2})$/);

    if (!match) {
        return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const hour = Number(match[4]);
    const minute = Number(match[5]);

    if (!isValidJalaliDate(year, month, day) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        return null;
    }

    return {
        date: { year, month, day },
        time: `${pad(hour)}:${pad(minute)}`,
    };
}

function toUtcIso(date: SelectedJalaliDate, time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const gregorian = toGregorian(date.year, date.month, date.day);

    const localDate = new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd, hour, minute, 0, 0);

    return localDate.toISOString();
}

export default function PersianDateTimePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    const now = new Date();
    const todayJalali = toJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());

    const [open, setOpen] = useState(false);
    const [display, setDisplay] = useState(() => dateToDisplay(value));
    const [calendarYear, setCalendarYear] = useState(todayJalali.jy);
    const [calendarMonth, setCalendarMonth] = useState(todayJalali.jm);
    const [selectedDate, setSelectedDate] = useState<SelectedJalaliDate | null>(null);
    const [time, setTime] = useState(`${pad(now.getHours())}:${pad(now.getMinutes())}`);
    const rootRef = useRef<HTMLDivElement>(null);
    const inputAnchorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!value) {
            setDisplay('');

            return;
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return;
        }

        const jalali = toJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());

        const nextDate = {
            year: jalali.jy,
            month: jalali.jm,
            day: jalali.jd,
        };

        const nextTime = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

        setSelectedDate(nextDate);
        setCalendarYear(nextDate.year);
        setCalendarMonth(nextDate.month);
        setTime(nextTime);
        setDisplay(formatDisplay(nextDate, nextTime));
    }, [value]);

    const monthLength = jalaliMonthLength(calendarYear, calendarMonth);

    const firstWeekday = useMemo(() => {
        const gregorian = toGregorian(calendarYear, calendarMonth, 1);

        const jsDay = new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd).getDay();

        // JavaScript: Sunday=0 ... Saturday=6
        // UI: Saturday=0 ... Friday=6
        return (jsDay + 1) % 7;
    }, [calendarYear, calendarMonth]);

    function commit(date: SelectedJalaliDate, selectedTime: string) {
        setSelectedDate(date);
        setTime(selectedTime);
        setDisplay(formatDisplay(date, selectedTime));
        onChange(toUtcIso(date, selectedTime));
    }

    function selectCurrent() {
        const current = new Date();
        const jalali = toJalali(current.getFullYear(), current.getMonth() + 1, current.getDate());
        const nextDate = {
            year: jalali.jy,
            month: jalali.jm,
            day: jalali.jd,
        };
        const nextTime = `${pad(current.getHours())}:${pad(current.getMinutes())}`;

        setCalendarYear(nextDate.year);
        setCalendarMonth(nextDate.month);
        commit(nextDate, nextTime);
        setOpen(false);
    }

    function changeMonth(direction: -1 | 1) {
        let year = calendarYear;
        let month = calendarMonth + direction;

        if (month < 1) {
            month = 12;
            year -= 1;
        }

        if (month > 12) {
            month = 1;
            year += 1;
        }

        setCalendarYear(year);
        setCalendarMonth(month);
    }

    function handleTypedValue(raw: string) {
        setDisplay(raw);

        const parsed = parseDisplay(raw);

        if (!parsed) {
            onChange('');

            return;
        }

        setSelectedDate(parsed.date);
        setCalendarYear(parsed.date.year);
        setCalendarMonth(parsed.date.month);
        setTime(parsed.time);
        onChange(toUtcIso(parsed.date, parsed.time));
    }

    return (
        <div ref={rootRef} className="relative">
            <div className="flex flex-col gap-2 sm:flex-row">
                <div ref={inputAnchorRef} className="relative flex-1">
                    <input
                        type="text"
                        value={display}
                        onChange={(event) => handleTypedValue(event.target.value)}
                        onFocus={() => setOpen(true)}
                        placeholder="۱۴۰۵/۰۶/۱۷ ۱۸:۳۰"
                        dir="ltr"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pl-11 text-sm transition outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                    />
                    <button
                        type="button"
                        onClick={() => setOpen((current) => !current)}
                        className="absolute top-1/2 left-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
                        aria-label="باز کردن تقویم شمسی"
                    >
                        <CalendarDays size={17} />
                    </button>
                </div>

                <button
                    type="button"
                    onClick={selectCurrent}
                    className="h-12 shrink-0 cursor-pointer rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:hover:bg-emerald-400/15"
                >
                    تاریخ و زمان فعلی
                </button>
            </div>

            <p className="mt-2 text-xs text-slate-400">فرمت ورود دستی: ۱۴۰۵/۰۶/۱۷ ۱۸:۳۰ — زمان محلی: {TIMEZONE}</p>

            <FloatingPopover
                open={open}
                anchorRef={inputAnchorRef}
                onClose={() => setOpen(false)}
                popoverWidth={390}
                maxHeight={520}
                className="rounded-3xl p-4"
            >
                    <div className="mb-4 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => changeMonth(-1)}
                            className="flex size-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
                            aria-label="ماه قبل"
                        >
                            <ChevronRight size={18} />
                        </button>

                        <div className="text-sm font-bold text-slate-800 dark:text-white">
                            {PERSIAN_MONTHS[calendarMonth - 1]} {persianDigit(String(calendarYear))}
                        </div>

                        <button
                            type="button"
                            onClick={() => changeMonth(1)}
                            className="flex size-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
                            aria-label="ماه بعد"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    </div>

                    <div className="mb-2 grid grid-cols-7 gap-1">
                        {PERSIAN_DAYS.map((day) => (
                            <div key={day} className="py-1 text-center text-[11px] font-bold text-slate-400">
                                {day.slice(0, 1)}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: firstWeekday }).map((_, index) => (
                            <span key={`blank-${index}`} />
                        ))}

                        {Array.from({ length: monthLength }, (_, i) => i + 1).map((day) => {
                            const selected = selectedDate?.year === calendarYear && selectedDate?.month === calendarMonth && selectedDate?.day === day;

                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() =>
                                        commit(
                                            {
                                                year: calendarYear,
                                                month: calendarMonth,
                                                day,
                                            },
                                            time,
                                        )
                                    }
                                    className={`aspect-square rounded-xl text-xs transition ${
                                        selected
                                            ? 'bg-emerald-500 font-bold text-white dark:bg-emerald-400 dark:text-slate-950'
                                            : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300'
                                    }`}
                                >
                                    {persianDigit(String(day))}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-4 border-t border-slate-100 pt-4 dark:border-white/10">
                        <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                            <Clock3 size={15} className="text-emerald-500" />
                            ساعت و دقیقه
                        </label>
                        <TimePicker
                            value={time}
                            onChange={(nextTime) => {
                                setTime(nextTime);

                                if (selectedDate && nextTime) {
                                    commit(selectedDate, nextTime);
                                }
                            }}
                        />
                    </div>
            </FloatingPopover>
        </div>
    );
}