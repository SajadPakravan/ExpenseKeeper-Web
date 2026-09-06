import {useIncomes} from "@/features/incomes/hooks/use-incomes";
import { persianDigit, persianMoney} from '@/tools/formating';
import type { Income } from '../types';
import IncomeTypeBadge from './income-type-badge';

export default function IncomeTable({ incomes }: { incomes: Income[] }) {
    const inc = useIncomes();

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
            <table className="w-full text-right">
                <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr>
                        <th className="p-4">ردیف</th>
                        <th className="p-4">عنوان</th>
                        <th className="p-4">مبلغ</th>
                        <th className="p-4">نوع</th>
                        <th className="p-4">زمان</th>
                        <th className="p-4">توضیحات</th>
                    </tr>
                </thead>
                <tbody>
                    {incomes.map((income, index) => (
                        <tr
                            key={income.id}
                            className="border-t border-slate-100 dark:border-white/10"
                        >
                            <td className="p-4">
                                {persianDigit((index + 1).toString())}
                            </td>
                            <td className="p-4">{income.title}</td>
                            <td className="p-4">
                                {persianMoney(income.amount)} تومان
                            </td>
                            <td className="p-4">
                                <IncomeTypeBadge
                                    type={income.type}
                                    permanentType={income.permanent_type}
                                />
                            </td>
                            <td className="p-4">{inc.getTime(income)}</td>
                            <td className="p-4">{income.description ?? '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
