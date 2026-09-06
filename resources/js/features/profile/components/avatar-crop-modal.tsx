import Cropper from 'react-easy-crop';

import type { CropPoint, PixelCrop } from '../types';

type Props = {
    image: string;
    crop: CropPoint;
    zoom: number;
    processing: boolean;
    onCropChange: (crop: CropPoint) => void;
    onZoomChange: (zoom: number) => void;
    onCropComplete: (
        area: PixelCrop,
        pixels: PixelCrop,
    ) => void;
    onConfirm: () => void;
    onClose: () => void;
};

export default function AvatarCropModal({
    image,
    crop,
    zoom,
    processing,
    onCropChange,
    onZoomChange,
    onCropComplete,
    onConfirm,
    onClose,
}: Props) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="avatar-crop-title"
        >
            <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
                <div className="border-b border-slate-200 px-6 py-5 dark:border-white/10">
                    <h2
                        id="avatar-crop-title"
                        className="text-lg font-bold text-slate-900 dark:text-white"
                    >
                        تنظیم تصویر پروفایل
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        تصویر را جابه‌جا کنید و با بزرگ‌نمایی داخل قاب دایره‌ای تنظیم کنید.
                    </p>
                </div>

                <div className="relative h-[420px] bg-slate-950">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        minZoom={1}
                        maxZoom={3}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropComplete}
                    />
                </div>

                <div className="space-y-5 p-6">
                    <div>
                        <label
                            htmlFor="avatar-zoom"
                            className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
                        >
                            بزرگ‌نمایی
                        </label>

                        <input
                            id="avatar-zoom"
                            type="range"
                            min={1}
                            max={3}
                            step={0.01}
                            value={zoom}
                            onChange={(event) =>
                                onZoomChange(Number(event.target.value))
                            }
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                            className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 disabled:opacity-50 dark:border-white/10 dark:text-slate-200"
                        >
                            انصراف
                        </button>

                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={processing}
                            className="h-11 rounded-xl bg-emerald-500 px-6 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing
                                ? 'در حال پردازش...'
                                : 'تأیید برش'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
