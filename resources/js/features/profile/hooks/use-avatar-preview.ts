import { useCallback, useEffect, useMemo, useState } from 'react';

function addVersion(url: string, version: number): string {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${version}`;
}

export function useAvatarPreview(
    originalAvatar: string,
    avatarFile: File | null,
) {
    const [version, setVersion] = useState(() => Date.now());

    const preview = useMemo(() => {
        if (avatarFile) {
            return URL.createObjectURL(avatarFile);
        }

        return addVersion(originalAvatar, version);
    }, [avatarFile, originalAvatar, version]);

    useEffect(() => {
        if (!avatarFile) {
            return;
        }

        return () => {
            URL.revokeObjectURL(preview);
        };
    }, [avatarFile, preview]);

    const refresh = useCallback(() => {
        setVersion(Date.now());
    }, []);

    return { preview, refresh };
}
