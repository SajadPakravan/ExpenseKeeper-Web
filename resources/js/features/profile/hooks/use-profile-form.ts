import { useForm } from '@inertiajs/react';
import type { SyntheticEvent } from 'react';
import { useCallback, useMemo } from 'react';
import type { AuthUser } from '@/types/shared';
import type {ProfileFormData, ProfileTextFieldName,} from '../types';
import { useAvatarPreview } from './use-avatar-preview';

export function useProfileForm(user: AuthUser) {
    const form = useForm<ProfileFormData>({
        name: user.name ?? '',
        username: user.username ?? '',
        phone: user.phone ?? '',
        email: user.email ?? '',
        avatar: null,
    });

    const { preview, refresh } = useAvatarPreview(user.avatar, form.data.avatar);

    const hasChanges = useMemo(() => {
        return (
            form.data.avatar !== null ||
            form.data.name !== (user.name ?? '') ||
            form.data.username !== (user.username ?? '') ||
            form.data.phone !== (user.phone ?? '') ||
            form.data.email !== (user.email ?? '')
        );
    }, [
        form.data.avatar,
        form.data.name,
        form.data.username,
        form.data.phone,
        form.data.email,
        user.name,
        user.username,
        user.phone,
        user.email,
    ]);

    const setTextField = useCallback(
        (name: ProfileTextFieldName, value: string) => {
            form.setData(name, value);
        },
        [form],
    );

    const setAvatar = useCallback(
        (file: File) => {
            form.setData('avatar', file);
        },
        [form],
    );

    function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!hasChanges || form.processing) {
            return;
        }

        form.post('/account/profile', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.reset('avatar');
                refresh();
            },
        });
    }

    return {
        data: form.data,
        errors: form.errors,
        processing: form.processing,
        hasChanges,
        preview,
        setTextField,
        setAvatar,
        handleSubmit,
    };
}
