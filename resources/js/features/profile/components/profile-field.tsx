import type { LucideIcon } from 'lucide-react';

import type { ProfileTextFieldName } from '../types';

type Props = {
    name: ProfileTextFieldName;
    label: string;
    value: string;
    placeholder: string;
    error?: string;
    icon: LucideIcon;
    dir?: 'rtl' | 'ltr';
    autoComplete?: string;
    onValueChange: (
        name: ProfileTextFieldName,
        value: string,
    ) => void;
};

export default function ProfileField({
    name,
    label,
    value,
    placeholder,
    error,
    icon: Icon,
    dir = 'rtl',
    autoComplete,
    onValueChange,
}: Props) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200"
            >
                <Icon size={17} className="text-emerald-500" />
                {label}
            </label>

            <input
                id={name}
                name={name}
                type="text"
                value={value}
                placeholder={placeholder}
                dir={dir}
                autoComplete={autoComplete}
                onChange={(event) =>
                    onValueChange(name, event.target.value)
                }
                className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 transition outline-none focus:ring-4 dark:bg-white/[0.04] dark:text-white ${
                    error
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-white/10 dark:focus:border-emerald-400'
                }`}
            />

            {error && (
                <p className="mt-2 text-xs leading-6 font-bold text-rose-600 dark:text-rose-400">
                    {error}
                </p>
            )}
        </div>
    );
}
