import { Camera } from 'lucide-react';
import type { ChangeEventHandler } from 'react';

type Props = {
    preview: string;
    error?: string;
    onSelect: ChangeEventHandler<HTMLInputElement>;
};

export default function AvatarSection({
    preview,
    error,
    onSelect,
}: Props) {
    return (
        <div className="border-b border-slate-100 pb-7 dark:border-white/10">
            <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    تصویر پروفایل
                </h2>

                <p className="mt-1 text-xs leading-6 text-slate-400">
                    تصویر شما در سایت و پنل کاربری نمایش داده می‌شود.
                </p>
            </div>

            <div className="flex flex-col items-center gap-5 sm:flex-row">
                <img
                    src={preview}
                    alt="تصویر پروفایل"
                    className="size-28 rounded-full object-cover ring-4 ring-slate-100 dark:ring-white/10"
                />

                <div>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                        <Camera size={18} />
                        انتخاب تصویر جدید

                        <input
                            name="avatar"
                            type="file"
                            accept="image/jpg,image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={onSelect}
                        />
                    </label>

                    <p className="mt-2 text-xs text-slate-400">
                        JPG، PNG یا WEBP تا حداکثر 2 مگابایت
                    </p>

                    {error && (
                        <p className="mt-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
