import { CalendarDays, Clock3, Save, X } from 'lucide-react';
import { formatAmountInput } from '@/tools/formating';
import { PERSIAN_DAYS } from '@/tools/values';
import { useCreateIncomeForm } from '../hooks/use-create-income-form';
import {
    INCOME_FIELDS,
    INCOME_TYPE_OPTIONS,
    PERMANENT_TYPE_OPTIONS,
} from '../income-fields';
import ChoiceCards from './choice-cards';
import ConditionalField from './conditional-field';
import DayOfMonthField from './day-of-month-field';
import FieldShell from './field-shell';
import MonthField from './month-field';
import PersianDateTimePicker from './persian-date-time-picker';

export default function CreateIncomeForm({
    onCancel,
    onSuccess,
}: {
    onCancel: () => void;
    onSuccess?: () => void;
}) {
    const form = useCreateIncomeForm(() => {
        onSuccess?.();
        onCancel();
    });

    const isPermanent = form.data.type === 'permanent';
    const isTemporary = form.data.type === 'temporary';
    const showWeeklyDay = isPermanent && form.data.permanent_type === 'weekly';
    const showMonthDay =
        isPermanent &&
        (form.data.permanent_type === 'monthly' ||
            form.data.permanent_type === 'yearly');
    const showYearMonth = isPermanent && form.data.permanent_type === 'yearly';
    const showPermanentTime = isPermanent && form.data.permanent_type !== '';

    return (
        <form onSubmit={form.submit} className="space-y-1">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                        افزودن درآمد
                    </h2>
                    <p className="mt-1 text-xs leading-6 text-slate-400">
                        اطلاعات درآمد را وارد کنید. فیلدهای زمان‌بندی بر اساس
                        نوع درآمد به‌صورت خودکار نمایش داده می‌شوند.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-white/10 dark:hover:border-rose-400/20 dark:hover:bg-rose-400/10 dark:hover:text-rose-300"
                    aria-label="بستن فرم"
                >
                    <X size={19} />
                </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <FieldShell
                    label={INCOME_FIELDS.title.label}
                    icon={INCOME_FIELDS.title.icon}
                    error={form.errors.title}
                >
                    <input
                        name="title"
                        type="text"
                        value={form.data.title}
                        onChange={(event) =>
                            form.setData('title', event.target.value)
                        }
                        placeholder={INCOME_FIELDS.title.placeholder}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 transition outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                    />
                </FieldShell>

                <FieldShell
                    label={INCOME_FIELDS.amount.label}
                    icon={INCOME_FIELDS.amount.icon}
                    error={form.errors.amount}
                >
                    <div className="relative">
                        <input
                            name="amount"
                            type="text"
                            inputMode="numeric"
                            dir="ltr"
                            value={formatAmountInput(form.data.amount)}
                            onChange={(event) =>
                                form.setAmount(event.target.value)
                            }
                            placeholder={INCOME_FIELDS.amount.placeholder}
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pl-16 text-sm text-slate-900 transition outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                        />
                        <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-xs font-bold text-slate-400">
                            تومان
                        </span>
                    </div>
                </FieldShell>
            </div>

            <div className="pt-5">
                <FieldShell
                    label={INCOME_FIELDS.type.label}
                    icon={INCOME_FIELDS.type.icon}
                    description={INCOME_FIELDS.type.description}
                    error={form.errors.type}
                >
                    <ChoiceCards
                        value={form.data.type}
                        options={INCOME_TYPE_OPTIONS}
                        onChange={form.setType}
                    />
                </FieldShell>
            </div>

            <ConditionalField show={isPermanent}>
                <FieldShell
                    label={INCOME_FIELDS.permanent_type.label}
                    icon={INCOME_FIELDS.permanent_type.icon}
                    error={form.errors.permanent_type}
                >
                    <ChoiceCards
                        value={form.data.permanent_type}
                        options={PERMANENT_TYPE_OPTIONS}
                        onChange={form.setPermanentType}
                        columns={4}
                    />
                </FieldShell>
            </ConditionalField>

            <ConditionalField show={showWeeklyDay}>
                <FieldShell
                    label="روز هفته"
                    icon={CalendarDays}
                    description="روزی را انتخاب کنید که این درآمد هر هفته دریافت می‌شود."
                    error={form.errors.permanent_day}
                >
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                        {PERSIAN_DAYS.map((day, index) => {
                            const selected = form.data.permanent_day === index;

                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() =>
                                        form.setData('permanent_day', index)
                                    }
                                    className={`rounded-xl border px-2 py-3 text-xs font-bold transition ${
                                        selected
                                            ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm dark:border-emerald-400 dark:bg-emerald-400 dark:text-slate-950'
                                            : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300'
                                    }`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </FieldShell>
            </ConditionalField>

            <ConditionalField show={showMonthDay || showYearMonth}>
                <div className="grid gap-5 sm:grid-cols-2">
                    <ConditionalField show={showYearMonth}>
                        <FieldShell
                            label={INCOME_FIELDS.permanent_month.label}
                            icon={INCOME_FIELDS.permanent_month.icon}
                            error={form.errors.permanent_month}
                        >
                            <MonthField
                                value={form.data.permanent_month}
                                onChange={(value) =>
                                    form.setData('permanent_month', value)
                                }
                            />
                        </FieldShell>
                    </ConditionalField>

                    <ConditionalField show={showMonthDay}>
                        <FieldShell
                            label={INCOME_FIELDS.permanent_day.label}
                            icon={INCOME_FIELDS.permanent_day.icon}
                            description="می‌توانید روز را از فهرست انتخاب کنید یا عددی بین ۱ تا ۳۱ تایپ کنید."
                            error={form.errors.permanent_day}
                        >
                            <DayOfMonthField
                                value={form.data.permanent_day}
                                onChange={(value) =>
                                    form.setData('permanent_day', value)
                                }
                            />
                        </FieldShell>
                    </ConditionalField>
                </div>
            </ConditionalField>

            <ConditionalField show={showPermanentTime}>
                <FieldShell
                    label={INCOME_FIELDS.permanent_time.label}
                    icon={Clock3}
                    description="فقط ساعت و دقیقه ثبت می‌شود؛ ثانیه به صورت ۰۰ ذخیره خواهد شد."
                    error={form.errors.permanent_time}
                >
                    <input
                        name="permanent_time"
                        type="time"
                        step={60}
                        value={form.data.permanent_time.slice(0, 5)}
                        onChange={(event) =>
                            form.setData(
                                'permanent_time',
                                event.target.value
                                    ? `${event.target.value}:00`
                                    : '',
                            )
                        }
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 transition outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                    />
                </FieldShell>
            </ConditionalField>

            <ConditionalField show={isTemporary}>
                <FieldShell
                    label={INCOME_FIELDS.temporary_at.label}
                    icon={INCOME_FIELDS.temporary_at.icon}
                    description="تاریخ را از تقویم شمسی انتخاب کنید یا با فرمت نمایش‌داده‌شده تایپ کنید."
                    error={form.errors.temporary_at}
                >
                    <PersianDateTimePicker
                        value={form.data.temporary_at}
                        onChange={(value) =>
                            form.setData('temporary_at', value)
                        }
                    />
                </FieldShell>
            </ConditionalField>

            <div className="pt-5">
                <FieldShell
                    label={INCOME_FIELDS.description.label}
                    icon={INCOME_FIELDS.description.icon}
                    error={form.errors.description}
                >
                    <textarea
                        name="description"
                        value={form.data.description}
                        onChange={(event) =>
                            form.setData('description', event.target.value)
                        }
                        placeholder={INCOME_FIELDS.description.placeholder}
                        rows={4}
                        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-900 transition outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                    />
                </FieldShell>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end dark:border-white/10">
                <button
                    type="button"
                    onClick={onCancel}
                    className="h-12 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
                >
                    لغو
                </button>

                <button
                    type="submit"
                    disabled={!form.canSubmit || form.processing}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300 dark:disabled:bg-white/10 dark:disabled:text-slate-500"
                >
                    <Save size={18} />
                    {form.processing ? 'در حال ذخیره...' : 'ذخیره درآمد'}
                </button>
            </div>

            {!form.canSubmit && form.data.type !== '' && (
                <p className="mt-3 text-center text-xs text-slate-400">
                    برای فعال شدن دکمه ذخیره، فیلدهای ضروری را کامل کنید.
                </p>
            )}
        </form>
    );
}
