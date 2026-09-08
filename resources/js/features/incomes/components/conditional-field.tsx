import type { ReactNode } from 'react';

export default function ConditionalField({
    show,
    children,
}: {
    show: boolean;
    children: ReactNode;
}) {
    return (
        <div
            className={`grid transition-all duration-300 ease-out ${
                show
                    ? 'grid-rows-[1fr] translate-y-0 opacity-100'
                    : 'pointer-events-none grid-rows-[0fr] -translate-y-2 opacity-0'
            }`}
        >
            <div className="overflow-hidden">
                <div className="pt-5">{children}</div>
            </div>
        </div>
    );
}
