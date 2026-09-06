import { CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';

type SuccessProps = {
    message?: string | null;
    dismissible?: boolean;
};

export default function SuccessAlert({
    message,
    dismissible = true,
}: SuccessProps) {
    const [visible, setVisible] = useState(true);

    if (!message || !visible) {
        return null;
    }

    return (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
            <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
            <p className="flex-1 leading-6">{message}</p>
            {dismissible && (
                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    aria-label="بستن"
                    className="rounded-lg p-1 hover:bg-emerald-200/50 dark:hover:bg-emerald-400/20"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}
