export type IncomeType = 'permanent' | 'temporary';

export type PermanentType =
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly';

export interface Income {
    id: number;
    title: string;
    amount: number;
    type: IncomeType;
    permanent_type: PermanentType | null;
    permanent_day: number | null;
    permanent_month: number | null;
    permanent_time: string;
    temporary_at: string | null;
    description: string | null;
    created_at: string;
}
