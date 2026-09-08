import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export default function FieldShell({
    label,
    icon: Icon,
    description,
    error,
    children,
}: {
    label: string;
    icon: LucideIcon;
    description?: string;
    error?: string;
    children: ReactNode;
}) {
    return (
        <div>
            <div className="mb-2 flex items-center gap-2">
                <Icon size={17} className="text-emerald-500" />
                <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {label}
                </label>
            </div>

            {description && (
                <p className="mb-3 text-xs leading-6 text-slate-400">{description}</p>
            )}

            {children}

            {error && (
                <p className="mt-2 text-xs font-bold leading-6 text-rose-600 dark:text-rose-400">
                    {error}
                </p>
            )}
        </div>
    );
}
