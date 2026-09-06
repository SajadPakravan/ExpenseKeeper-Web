import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { useState } from 'react';

export default function PasswordField({
    label,
    value,
    onChange,
    error,
    name = 'password',
    autoComplete = 'current-password',
    placeholder = 'رمز عبور',
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    name?: string;
    autoComplete?: string;
    placeholder?: string;
}) {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
            >
                {label}
            </label>

            <div className="relative">
                <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
                />
                <input
                    id={name}
                    name={name}
                    type={visible ? 'text' : 'password'}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    className={`h-13 w-full rounded-2xl border bg-white pr-11 pl-12 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:ring-4 dark:bg-white/[0.04] dark:text-white ${
                        error
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10 dark:border-rose-400/60'
                            : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-white/10 dark:focus:border-emerald-400'
                    }`}
                    dir="ltr"
                />
                <button
                    type="button"
                    onClick={() => setVisible((current) => !current)}
                    className="absolute top-1/2 left-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
                    aria-label={
                        visible ? 'مخفی کردن رمز عبور' : 'نمایش رمز عبور'
                    }
                >
                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            {error && (
                <p className="mt-2 text-xs leading-6 font-bold text-rose-600 dark:text-rose-400">
                    {error}
                </p>
            )}
        </div>
    );
}
