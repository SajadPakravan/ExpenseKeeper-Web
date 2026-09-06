import { Save } from 'lucide-react';

type Props = {
    processing: boolean;
    disabled: boolean;
};

export default function SaveProfileButton({
    processing,
    disabled,
}: Props) {
    return (
        <button
            type="submit"
            disabled={disabled || processing}
            className="inline-flex h-12 min-w-44 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:opacity-100 dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300 dark:disabled:bg-white/10 dark:disabled:text-slate-500"
        >
            <Save size={18} />

            {processing
                ? 'در حال ذخیره...'
                : 'ذخیره تغییرات'}
        </button>
    );
}
