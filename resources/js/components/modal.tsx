import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    maxWidth?: 'xl' | '2xl' | '3xl' | '4xl';
}

const WIDTH_CLASS: Record<NonNullable<ModalProps['maxWidth']>, string> = {
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
};

export default function Modal({
    open,
    onClose,
    children,
    maxWidth = '3xl',
}: ModalProps) {
    const [mounted, setMounted] = useState(open);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (open) {
            setMounted(true);
            setClosing(false);

            return;
        }

        if (!mounted) {
            return;
        }

        setClosing(true);

        const timer = window.setTimeout(() => {
            setMounted(false);
            setClosing(false);
        }, 200);

        return () => window.clearTimeout(timer);
    }, [open, mounted]);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape' && !closing) {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [mounted, closing, onClose]);

    if (!mounted) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 backdrop-blur-sm ${
                closing
                    ? 'animate-modalBackdropOut bg-black/0'
                    : 'animate-modalBackdropIn bg-black/55'
            }`}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !closing) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                className={`my-auto w-full ${WIDTH_CLASS[maxWidth]} rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-7 dark:border-white/10 dark:bg-slate-900 ${
                    closing ? 'animate-modalPanelOut' : 'animate-modalPanelIn'
                }`}
                onMouseDown={(event) => event.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
