import { AtSign, Mail, Phone, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ProfileTextFieldName } from './types';

export type ProfileFieldDefinition = {
    name: ProfileTextFieldName;
    label: string;
    placeholder: string;
    icon: LucideIcon;
    dir?: 'rtl' | 'ltr';
    autoComplete?: string;
};

export const PROFILE_FIELDS: readonly ProfileFieldDefinition[] = [
    {
        name: 'name',
        label: 'نام',
        placeholder: 'نام شما',
        icon: UserRound,
    },
    {
        name: 'username',
        label: 'نام کاربری',
        placeholder: 'username',
        icon: AtSign,
        dir: 'ltr',
        autoComplete: 'username',
    },
    {
        name: 'phone',
        label: 'شماره همراه',
        placeholder: '09123456789',
        icon: Phone,
        dir: 'ltr',
        autoComplete: 'tel',
    },
    {
        name: 'email',
        label: 'ایمیل',
        placeholder: 'name@example.com',
        icon: Mail,
        dir: 'ltr',
        autoComplete: 'email',
    },
];
