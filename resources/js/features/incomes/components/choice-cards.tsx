import { Check } from 'lucide-react';

export default function ChoiceCards<T extends string>({
    value,
    options,
    onChange,
    columns = 2,
}: {
    value: T | '';
    options: readonly {
        value: T;
        label: string;
        description: string;
    }[];
    onChange: (value: T) => void;
    columns?: 2 | 4;
}) {
    return (
        <div
            role="radiogroup"
            className={`grid gap-3 ${
                columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'
            }`}
        >
            {options.map((option) => {
                const selected = value === option.value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => onChange(option.value)}
                        className={`relative min-h-24 rounded-2xl border p-4 text-right transition-all duration-200 ${
                            selected
                                ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-500/10 dark:border-emerald-400 dark:bg-emerald-400/10'
                                : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-400/30'
                        }`}
                    >
                        {selected && (
                            <span className="absolute left-3 top-3 flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white dark:bg-emerald-400 dark:text-slate-950">
                                <Check size={14} />
                            </span>
                        )}

                        <div className="font-bold text-slate-900 dark:text-white">
                            {option.label}
                        </div>
                        <p className="mt-2 text-xs leading-5 text-slate-400">
                            {option.description}
                        </p>
                    </button>
                );
            })}
        </div>
    );
}
