import type { PixelCrop } from '@/features/profile/types';

function loadImage(source: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = () =>
            reject(new Error('تصویر قابل پردازش نیست.'));

        image.src = source;
    });
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (result) => {
                if (!result) {
                    reject(
                        new Error(
                            'ساخت تصویر جدید ناموفق بود.',
                        ),
                    );
                    return;
                }

                resolve(result);
            },
            'image/webp',
            0.9,
        );
    });
}

export async function createCroppedAvatar(
    imageSource: string,
    crop: PixelCrop,
    userId: number,
): Promise<File> {
    const image = await loadImage(imageSource);

    const canvas = document.createElement('canvas');
    const size = 512;

    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error(
            'مرورگر امکان پردازش تصویر را ندارد.',
        );
    }

    context.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        size,
        size,
    );

    const blob = await canvasToBlob(canvas);

    return new File(
        [blob],
        `avatar-${userId}.webp`,
        { type: 'image/webp' },
    );
}
