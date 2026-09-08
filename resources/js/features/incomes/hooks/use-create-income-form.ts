import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

import { digitsOnly } from '@/tools/formating';

import type {
    IncomeFormData,
    IncomeType,
    PermanentType,
} from '../types';

const INITIAL_DATA: IncomeFormData = {
    title: '',
    amount: '',
    type: '',
    permanent_type: '',
    permanent_day: null,
    permanent_month: null,
    permanent_time: '',
    temporary_at: '',
    description: '',
};

export function useCreateIncomeForm(onSuccess: () => void) {
    const form = useForm<IncomeFormData>(INITIAL_DATA);

    function setType(type: IncomeType) {
        form.setData((data) => ({
            ...data,
            type,
            permanent_type: '',
            permanent_day: null,
            permanent_month: null,
            permanent_time: '',
            temporary_at: '',
        }));
    }

    function setPermanentType(type: PermanentType) {
        form.setData((data) => ({
            ...data,
            permanent_type: type,
            permanent_day: null,
            permanent_month: null,
            permanent_time: data.permanent_time,
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
            (form.data.permanent_type === 'weekly' &&
                form.data.permanent_day !== null) ||
            (form.data.permanent_type === 'monthly' &&
                form.data.permanent_day !== null) ||
            (form.data.permanent_type === 'yearly' &&
                form.data.permanent_day !== null &&
                form.data.permanent_month !== null));

    const temporaryReady =
        form.data.type === 'temporary' &&
        form.data.temporary_at !== '';

    const canSubmit =
        form.data.title.trim() !== '' &&
        Number(form.data.amount) > 0 &&
        form.data.type !== '' &&
        (permanentReady || temporaryReady);

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!canSubmit || form.processing) {
            return;
        }

        form.post('/account/incomes', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                onSuccess();
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
