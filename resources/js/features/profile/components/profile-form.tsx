import type { AuthUser } from '@/types/shared';
import { useAvatarCrop } from '../hooks/use-avatar-crop';
import { useProfileForm } from '../hooks/use-profile-form';
import { PROFILE_FIELDS } from '../profile-fields';
import AvatarCropModal from './avatar-crop-modal';
import AvatarSection from './avatar-section';
import ProfileField from './profile-field';
import SaveProfileButton from './save-profile-button';

type Props = { user: AuthUser; };

export default function ProfileForm({ user }: Props) {
    const profile = useProfileForm(user);
    const cropper = useAvatarCrop(user.id, profile.setAvatar);

    return (
        <>
            <form
                onSubmit={profile.handleSubmit}
                className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark:border-white/10 dark:bg-slate-900 dark:shadow-none"
            >
                <AvatarSection
                    preview={profile.preview}
                    error={profile.errors.avatar}
                    onSelect={cropper.handleFileSelect}
                />

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                    {PROFILE_FIELDS.map((field) => (
                        <ProfileField
                            key={field.name}
                            {...field}
                            value={profile.data[field.name]}
                            error={profile.errors[field.name]}
                            onValueChange={profile.setTextField}
                        />
                    ))}
                </div>

                <div className="mt-8 flex justify-end border-t border-slate-100 pt-6 dark:border-white/10">
                    <SaveProfileButton
                        processing={profile.processing}
                        disabled={!profile.hasChanges}
                    />
                </div>
            </form>

            {cropper.selectedImage && (
                <AvatarCropModal
                    image={cropper.selectedImage}
                    crop={cropper.crop}
                    zoom={cropper.zoom}
                    processing={cropper.processing}
                    onCropChange={cropper.setCrop}
                    onZoomChange={cropper.setZoom}
                    onCropComplete={cropper.onCropComplete}
                    onConfirm={cropper.confirm}
                    onClose={cropper.close}
                />
            )}
        </>
    );
}
