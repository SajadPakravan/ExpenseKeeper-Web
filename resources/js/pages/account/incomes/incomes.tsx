import { usePage } from '@inertiajs/react';
import IncomeTable from '@/features/incomes/components/income-table';
import type { Income } from '@/features/incomes/types';
import AccountLayout from '@/layouts/account-layout';

type Props = { incomes: Income[]; };

export default function Incomes() {
    const { incomes } = usePage<Props>().props;

    return (
        <AccountLayout title="درآمدها">
            <div className="space-y-6">
                <button className="rounded-xl cursor-pointer bg-emerald-600 px-5 py-3 text-white">
                    اضافه کردن درآمد
                </button>

                <IncomeTable incomes={incomes}/>
            </div>
        </AccountLayout>
    );
}
