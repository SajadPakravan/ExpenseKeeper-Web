import { usePage } from '@inertiajs/react';
import ProfileForm from '@/features/profile/components/profile-form';
import AccountLayout from '@/layouts/account-layout';
import type { SharedPageProps } from '@/types/shared';

export default function Profile() {
    const { auth } = usePage<SharedPageProps>().props;

    return (
        <AccountLayout title="مشخصات فردی">
            <ProfileForm user={auth.user!} />
        </AccountLayout>
    );
}
