import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { createCroppedAvatar } from '@/tools/crop-image';
import type { CropPoint, PixelCrop } from '../types';

export function useAvatarCrop(
    userId: number,
    onCropped: (file: File) => void,
) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [crop, setCrop] = useState<CropPoint>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] =
        useState<PixelCrop | null>(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (!selectedImage) {
            return;
        }

        return () => {
            URL.revokeObjectURL(selectedImage);
        };
    }, [selectedImage]);

    const handleFileSelect = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            event.target.value = '';

            if (!file) {
                return;
            }

            const imageUrl = URL.createObjectURL(file);

            setSelectedImage(imageUrl);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setCroppedAreaPixels(null);
        },
        [],
    );

    const onCropComplete = useCallback(
        (_area: PixelCrop, areaPixels: PixelCrop) => {
            setCroppedAreaPixels(areaPixels);
        },
        [],
    );

    const close = useCallback(() => {
        setSelectedImage(null);
        setCroppedAreaPixels(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    }, []);

    const confirm = useCallback(async () => {
        if (!selectedImage || !croppedAreaPixels || processing) {
            return;
        }

        setProcessing(true);

        try {
            const file = await createCroppedAvatar(
                selectedImage,
                croppedAreaPixels,
                userId,
            );

            onCropped(file);
            close();
        } finally {
            setProcessing(false);
        }
    }, [
        selectedImage,
        croppedAreaPixels,
        processing,
        userId,
        onCropped,
        close,
    ]);

    return {
        selectedImage,
        crop,
        setCrop,
        zoom,
        setZoom,
        processing,
        handleFileSelect,
        onCropComplete,
        confirm,
        close,
    };
}
