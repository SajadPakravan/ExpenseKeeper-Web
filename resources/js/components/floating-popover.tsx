import type { ReactNode, RefObject } from 'react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type FloatingPopoverProps = {
    open: boolean;
    anchorRef: RefObject<HTMLElement | null>;
    children: ReactNode;
    onClose: () => void;
    popoverWidth?: number;
    minWidth?: number;
    maxHeight?: number;
    className?: string;
};

type Position = {
    left: number;
    width: number;
    top?: number;
    bottom?: number;
    maxHeight: number;
};

export default function FloatingPopover({
    open,
    anchorRef,
    children,
    onClose,
    popoverWidth,
    minWidth = 0,
    maxHeight = 320,
    className = '',
}: FloatingPopoverProps) {
    const popoverRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<Position | null>(null);

    const updatePosition = useCallback(() => {
        const anchor = anchorRef.current;

        if (!anchor) {
            return;
        }

        const rect = anchor.getBoundingClientRect();
        const gap = 8;
        const viewportPadding = 12;
        const viewportWidth = window.innerWidth;

        const desiredWidth = popoverWidth ?? Math.max(rect.width, minWidth);
        const width = Math.min(desiredWidth, viewportWidth - viewportPadding * 2);

        // Keep the floating panel completely inside the viewport.
        const left = Math.min(
            Math.max(rect.left, viewportPadding),
            viewportWidth - width - viewportPadding,
        );

        const availableBelow = window.innerHeight - rect.bottom - viewportPadding;
        const availableAbove = rect.top - viewportPadding;
        const preferAbove = availableBelow < 220 && availableAbove > availableBelow;

        const availableHeight = preferAbove ? availableAbove - gap : availableBelow - gap;
        const computedMaxHeight = Math.max(120, Math.min(maxHeight, availableHeight));

        if (preferAbove) {
            setPosition({
                left,
                width,
                bottom: window.innerHeight - rect.top + gap,
                maxHeight: computedMaxHeight,
            });

            return;
        }

        setPosition({
            left,
            width,
            top: rect.bottom + gap,
            maxHeight: computedMaxHeight,
        });
    }, [anchorRef, maxHeight, minWidth, popoverWidth]);

    useLayoutEffect(() => {
        if (!open) {
            return;
        }

        updatePosition();

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [open, updatePosition]);

    useEffect(() => {
        if (!open) {
            return;
        }

        function handlePointerDown(event: PointerEvent) {
            const target = event.target as Node;
            const targetElement = target instanceof Element ? target : target.parentElement;

            if (anchorRef.current?.contains(target)) {
                return;
            }

            if (popoverRef.current?.contains(target)) {
                return;
            }

            // A nested popover (for example the time list inside the calendar)
            // must not close its parent popover before its option receives click.
            if (targetElement?.closest('[data-floating-popover="true"]')) {
                return;
            }

            onClose();
        }

        document.addEventListener('pointerdown', handlePointerDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [open, anchorRef, onClose]);

    if (!open || !position || typeof document === 'undefined') {
        return null;
    }

    return createPortal(
        <div
            ref={popoverRef}
            data-floating-popover="true"
            dir="rtl"
            style={{
                position: 'fixed',
                left: position.left,
                width: position.width,
                top: position.top,
                bottom: position.bottom,
                maxHeight: position.maxHeight,
            }}
            className={`z-[9999] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-950/20 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/50 ${className}`}
        >
            {children}
        </div>,
        document.body,
    );
}
