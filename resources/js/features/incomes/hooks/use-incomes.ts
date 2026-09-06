import type { Income } from '@/features/incomes/types';
import { formatDateTime, formatTime, persianDigit } from '@/tools/formating';
import { PERSIAN_DAYS, PERSIAN_MONTHS, TIMEZONE } from '@/tools/values';

export function useIncomes() {
    function getTime(income: Income): string {
        if (income.type === 'permanent') {
            switch (income.permanent_type) {
                case 'daily':
                    return 'ساعت ' + formatTime(income.permanent_time);

                case 'weekly':
                    return (
                        PERSIAN_DAYS[income.permanent_day!] +
                        ' ساعت ' +
                        formatTime(income.permanent_time)
                    );

                case 'monthly':
                    return (
                        persianDigit(income.permanent_day!.toString()) +
                        ' هر ماه ساعت ' +
                        formatTime(income.permanent_time)
                    );

                case 'yearly':
                    return (
                        persianDigit(income.permanent_day!.toString()) +
                        ' ' +
                        PERSIAN_MONTHS[income.permanent_month!] +
                        ' ساعت ' +
                        formatTime(income.permanent_time)
                    );
            }
        }

        return formatDateTime(income.temporary_at!, TIMEZONE, 'fa-IR');
    }

    return {
        getTime,
    };
}
