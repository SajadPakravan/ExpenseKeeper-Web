import { usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/components/modal';
import CreateIncomeForm from '@/features/incomes/components/create-income-form';
import IncomeTable from '@/features/incomes/components/income-table';
import type { Income } from '@/features/incomes/types';
import AccountLayout from '@/layouts/account-layout';

type Props = { incomes: Income[]; };

export default function Incomes() {
    const { incomes } = usePage<Props>().props;
    const [open, setOpen] = useState(false);

    return (
        <AccountLayout title="درآمدها">
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md active:translate-y-0 dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300"
                    >
                        <Plus size={19} />
                        افزودن درآمد
                    </button>
                </div>

                <IncomeTable incomes={incomes} />
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="4xl"
            >
                <CreateIncomeForm onCancel={() => setOpen(false)}/>
            </Modal>
        </AccountLayout>
    );
}
