import { Construction } from 'lucide-react';

import AccountLayout from '@/layouts/account-layout';

export default function Placeholder({ title }: { title: string }) {
    return (
        <AccountLayout title={title}>
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="max-w-lg rounded-[32px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-white/15 dark:bg-slate-900 dark:shadow-none">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                        <Construction size={30} />
                    </div>
                    <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                        صفحه {title}
                    </h2>
                    <p className="mt-3 leading-8 text-slate-500 dark:text-slate-400">
                        جایگاه این بخش در پنل آماده شده است. منطق، دیتابیس و امکانات واقعی آن را در مراحل بعدی اضافه می‌کنیم.
                    </p>
                </div>
            </div>
        </AccountLayout>
    );
}
