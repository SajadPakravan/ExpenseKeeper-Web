import { usePage } from '@inertiajs/react';
import AccountLayout from "@/layouts/account-layout";
import type {SharedPageProps} from "@/types/shared";

export default function Incomes() {
    const { auth } = usePage<SharedPageProps>().props;

    return (
        <AccountLayout title="هزینه‌ها">

        </AccountLayout>
    );
}
