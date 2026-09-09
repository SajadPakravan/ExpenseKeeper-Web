import { useForm } from '@inertiajs/react';
import type { SyntheticEvent } from 'react';

import { digitsOnly } from '@/tools/formating';
import { toJalali } from '@/tools/jalali';

import type { IncomeFormData, IncomeType, PermanentType } from '../types';

function pad(value: number): string {
    return String(value).padStart(2, '0');
}

function currentScheduleValues() {
    const now = new Date();
    const jalali = toJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());

    return {
        dayOfMonth: jalali.jd,
        monthIndex: jalali.jm - 1,
        weekDayIndex: (now.getDay() + 1) % 7,
        time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    };
}

function createInitialData(): IncomeFormData {
    const current = currentScheduleValues();

    return {
        title: '',
        amount: '',
        type: '',
        permanent_type: '',
        permanent_day: current.dayOfMonth,
        permanent_month: current.monthIndex,
        permanent_time: current.time,
        temporary_at: '',
        description: '',
    };
}

export function useCreateIncomeForm(afterCreate: () => void) {
    const form = useForm<IncomeFormData>(createInitialData());

    function setType(type: IncomeType) {
        const current = currentScheduleValues();

        form.setData((data) => ({
            ...data,
            type,
            permanent_type: '',
            permanent_day: current.dayOfMonth,
            permanent_month: current.monthIndex,
            permanent_time: current.time,
            temporary_at: '',
        }));
    }

    function setPermanentType(type: PermanentType) {
        const current = currentScheduleValues();

        form.setData((data) => ({
            ...data,
            permanent_type: type,
            permanent_day:
                type === 'daily'
                    ? null
                    : type === 'weekly'
                      ? current.weekDayIndex
                      : current.dayOfMonth,
            permanent_month: type === 'yearly' ? current.monthIndex : null,
            permanent_time: data.permanent_time || current.time,
        }));
    }

    function setAmount(value: string) {
        form.setData('amount', digitsOnly(value));
    }

    const permanentReady =
        form.data.type === 'permanent' &&
        form.data.permanent_type !== '' &&
        form.data.permanent_time !== '' &&
        (form.data.permanent_type === 'daily' ||
            (form.data.permanent_type === 'weekly' && form.data.permanent_day !== null) ||
            (form.data.permanent_type === 'monthly' && form.data.permanent_day !== null) ||
            (form.data.permanent_type === 'yearly' && form.data.permanent_day !== null && form.data.permanent_month !== null));

    const temporaryReady = form.data.type === 'temporary' && form.data.temporary_at !== '';

    const canSubmit = form.data.title.trim() !== '' && Number(form.data.amount) > 0 && form.data.type !== '' && (permanentReady || temporaryReady);

    function submit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!canSubmit || form.processing) {
            return;
        }

        form.post('/account/incomes', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                afterCreate();
            },
        });
    }

    return {
        data: form.data,
        errors: form.errors,
        processing: form.processing,
        canSubmit,
        setData: form.setData,
        setType,
        setPermanentType,
        setAmount,
        submit,
    };
}
