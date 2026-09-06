import type { IncomeType, PermanentType } from '../types';

export default function IncomeTypeBadge({
    type,
    permanentType,
}: {
    type: IncomeType;
    permanentType: PermanentType | null;
}) {
    function permanent_type() {
        switch (permanentType) {
            case 'daily':
                return 'روزانه';
            case 'weekly':
                return 'هفتگی';
            case 'monthly':
                return 'ماهانه';
            case 'yearly':
                return 'سالانه';
        }
    }

    return (
        <span
            className={
                type === 'permanent'
                    ? 'rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700'
                    : 'rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700'
            }
        >
            {type === 'permanent' ? `دائمی (${permanent_type()})` : 'موقت'}
        </span>
    );
}
