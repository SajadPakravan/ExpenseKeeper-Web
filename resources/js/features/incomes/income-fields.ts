import type { LucideIcon } from 'lucide-react';
import {
    CalendarClock,
    CalendarDays,
    CircleDollarSign,
    Clock3,
    FileText,
    Repeat2,
    Tags,
    Type,
} from 'lucide-react';

import type { IncomeFieldName, IncomeType, PermanentType } from './types';

export type IncomeFieldDefinition = {
    name: IncomeFieldName;
    label: string;
    placeholder: string;
    icon: LucideIcon;
    description?: string;
    dir?: 'rtl' | 'ltr';
};

export const INCOME_FIELDS: Record<IncomeFieldName, IncomeFieldDefinition> = {
    title: {
        name: 'title',
        label: 'عنوان درآمد',
        placeholder: 'مثلاً حقوق کارمندی',
        icon: Type,
    },
    amount: {
        name: 'amount',
        label: 'مبلغ درآمد',
        placeholder: 'مثلاً 30,000,000',
        icon: CircleDollarSign,
        dir: 'ltr',
    },
    type: {
        name: 'type',
        label: 'نوع درآمد',
        placeholder: 'نوع درآمد را انتخاب کنید',
        icon: Tags,
        description: 'مشخص کنید درآمد دائمی است یا فقط در یک زمان مشخص دریافت می‌شود.',
    },
    permanent_type: {
        name: 'permanent_type',
        label: 'برنامه درآمد دائمی',
        placeholder: 'نوع تکرار را انتخاب کنید',
        icon: Repeat2,
    },
    permanent_day: {
        name: 'permanent_day',
        label: 'روز دریافت',
        placeholder: 'روز را انتخاب کنید',
        icon: CalendarDays,
    },
    permanent_month: {
        name: 'permanent_month',
        label: 'ماه دریافت',
        placeholder: 'ماه را انتخاب کنید',
        icon: CalendarDays,
    },
    permanent_time: {
        name: 'permanent_time',
        label: 'ساعت دریافت',
        placeholder: 'مثلاً 09:30',
        icon: Clock3,
        dir: 'ltr',
    },
    temporary_at: {
        name: 'temporary_at',
        label: 'تاریخ و ساعت دریافت',
        placeholder: 'مثلاً 1405/06/17 18:30',
        icon: CalendarClock,
        dir: 'ltr',
    },
    description: {
        name: 'description',
        label: 'توضیحات',
        placeholder: 'در صورت نیاز توضیحی درباره این درآمد بنویسید...',
        icon: FileText,
    },
};

export const INCOME_TYPE_OPTIONS: readonly {
    value: IncomeType;
    label: string;
    description: string;
}[] = [
    {
        value: 'permanent',
        label: 'دائمی',
        description: 'درآمدی که طبق برنامه روزانه، هفتگی، ماهانه یا سالانه تکرار می‌شود.',
    },
    {
        value: 'temporary',
        label: 'موقت',
        description: 'درآمدی که فقط در یک تاریخ و ساعت مشخص دریافت می‌شود.',
    },
];

export const PERMANENT_TYPE_OPTIONS: readonly {
    value: PermanentType;
    label: string;
    description: string;
}[] = [
    { value: 'daily', label: 'روزانه', description: 'هر روز در ساعت مشخص' },
    {
        value: 'weekly',
        label: 'هفتگی',
        description: 'هر هفته در روز و ساعت مشخص',
    },
    {
        value: 'monthly',
        label: 'ماهانه',
        description: 'هر ماه در روز و ساعت مشخص',
    },
    {
        value: 'yearly',
        label: 'سالانه',
        description: 'هر سال در ماه، روز و ساعت مشخص',
    },
];
