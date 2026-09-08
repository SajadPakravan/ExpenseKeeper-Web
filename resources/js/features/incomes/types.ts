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

export type IncomeFieldName =
    | 'title'
    | 'amount'
    | 'type'
    | 'permanent_type'
    | 'permanent_day'
    | 'permanent_month'
    | 'permanent_time'
    | 'temporary_at'
    | 'description';

export type IncomeFormData = {
    title: string;
    amount: string;
    type: IncomeType | '';
    permanent_type: PermanentType | '';
    permanent_day: number | null;
    permanent_month: number | null;
    permanent_time: string;
    temporary_at: string;
    description: string;
};
