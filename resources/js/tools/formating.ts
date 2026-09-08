export function formatTime(time: string | null): string {
    if (!time) {
        return '-';
    }

    const shortTime = time.slice(0, 5);

    return shortTime.replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
}

export function persianDigit(number: string): string {
    if (!number) {
        return '';
    }

    return number.replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
}

export function englishDigit(value: string): string {
    return value
        .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
        .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));
}

export function digitsOnly(value: string): string {
    return englishDigit(value).replace(/\D/g, '');
}

export function formatAmountInput(value: string): string {
    const digits = digitsOnly(value);

    if (!digits) {
        return '';
    }

    return Number(digits).toLocaleString('en-US');
}

export function persianMoney(number: number): string {
    if (!number) {
        return '';
    }

    return number.toLocaleString('fa-IR');
}

export function formatDateTime(
    value: string,
    timezone: string,
    locale: string,
): string {
    return new Intl.DateTimeFormat(locale, {
        timeZone: timezone,

        year: 'numeric',
        month: 'long',
        day: 'numeric',

        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(value));
}
