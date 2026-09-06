export type Appearance = 'light' | 'dark';

const STORAGE_KEY = 'expensekeeper-theme';

function applyAppearance(appearance: Appearance): void {
    if (typeof document === 'undefined') {
        return;
    }

    const root = document.documentElement;

    root.classList.toggle('dark', appearance === 'dark');
    root.style.colorScheme = appearance;
}

function getCurrentAppearance(): Appearance {
    if (typeof document === 'undefined') {
        return 'light';
    }

    return document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
}

export function useAppearance() {
    function updateAppearance(appearance: Appearance): void {
        if (typeof window === 'undefined') {
            return;
        }

        localStorage.setItem(STORAGE_KEY, appearance);
        applyAppearance(appearance);
    }

    function toggleAppearance(): void {
        const nextAppearance: Appearance =
            getCurrentAppearance() === 'dark' ? 'light' : 'dark';

        updateAppearance(nextAppearance);
    }

    return {
        updateAppearance,
        toggleAppearance,
    };
}
