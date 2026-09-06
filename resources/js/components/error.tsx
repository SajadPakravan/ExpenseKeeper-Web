import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

type ErrorProps = {
    message?: string | null;
    dismissible?: boolean;
};

export default function ErrorAlert({
    message,
    dismissible = true,
}: ErrorProps) {
    const [visible, setVisible] = useState(true);

    if (!message || !visible) {
        return null;
    }

    return (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 shadow-sm dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-300">
            <AlertCircle className="mt-0.5 shrink-0" size={20} />
            <p className="flex-1 leading-6">{message}</p>
            {dismissible && (
                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    aria-label="بستن"
                    className="rounded-lg p-1 hover:bg-rose-200/50 dark:hover:bg-rose-400/20"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}
