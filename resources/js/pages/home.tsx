import { Head, Link } from '@inertiajs/react';

import {
    ArrowLeft,
    BarChart3,
    Check,
    CircleDollarSign,
    PiggyBank,
    Quote,
    ReceiptText,
    ShieldCheck,
    Sparkles,
    Target,
    TrendingDown,
    TrendingUp,
    WalletCards,
} from 'lucide-react';

import PublicLayout from '@/layouts/public-layout';

const features = [
    {
        icon: ReceiptText,
        title: 'ثبت سریع هزینه‌ها',
        description:
            'هزینه‌های روزانه را در چند ثانیه ثبت و بر اساس دسته‌بندی‌های دلخواه مرتب کن',
    },
    {
        icon: CircleDollarSign,
        title: 'مدیریت درآمد',
        description:
            'حقوق، درآمد جانبی و سایر ورودی‌های مالی را یکجا ببین و تصویر دقیق‌تری از دخل ماهانه داشته باش',
    },
    {
        icon: Target,
        title: 'بودجه‌بندی هوشمند',
        description:
            'برای خوراک، خرید، تفریح و سایر بخش‌ها بودجه مشخص کن و قبل از عبور از سقف هزینه مطلع شو',
    },
    {
        icon: PiggyBank,
        title: 'اهداف پس‌انداز',
        description:
            'برای سفر، خرید یا آینده هدف مالی تعریف کن و میزان پیشرفت پس‌اندازت را مرحله‌به‌مرحله دنبال کن',
    },
    {
        icon: BarChart3,
        title: 'گزارش‌های قابل فهم',
        description:
            'به‌جای اعداد پراکنده، الگوی خرج‌کردن و وضعیت مالی خودت را با گزارش‌های ساده و کاربردی ببین',
    },
    {
        icon: ShieldCheck,
        title: 'فضای مالی شخصی',
        description:
            'هر کاربر فضای اختصاصی خودش را دارد تا اطلاعات و برنامه‌ریزی مالی او به‌صورت منظم مدیریت شود',
    },
];

const steps = [
    {
        number: '01',
        title: 'حسابت را بساز',
        description:
            'ثبت‌نام کن و در چند لحظه وارد فضای شخصی خودت در هزینه‌بان شو',
    },
    {
        number: '02',
        title: 'دخل و خرجت را ثبت کن',
        description:
            'درآمدها و هزینه‌ها را با دسته‌بندی مناسب ثبت کن تا اطلاعات مالی‌ات همیشه مرتب باشد',
    },
    {
        number: '03',
        title: 'تصمیم مالی بهتری بگیر',
        description:
            'از بودجه‌ها، گزارش‌ها و اهداف پس‌انداز استفاده کن تا کنترل بیشتری روی پولت داشته باشی',
    },
];

const reviews = [
    'وقتی هزینه‌ها را منظم می‌بینم، خیلی راحت‌تر متوجه می‌شوم پولم در طول ماه کجا خرج شده است.',
    'داشتن سقف بودجه برای هر دسته کمک می‌کند قبل از خریدهای غیرضروری تصمیم منطقی‌تری بگیرم.',
    'برای من مهم‌ترین ویژگی یک ابزار مالی این است که ثبت درآمد و هزینه سریع و بدون پیچیدگی باشد.',
];

export default function Home() {
    return (
        <PublicLayout>
            <Head title="هزینه‌بان | مدیریت ساده دخل و خرج" />

            <section className="relative overflow-hidden">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10"
                >
                    <div className="absolute top-0 -right-40 size-[520px] rounded-full bg-emerald-300/25 blur-[120px] dark:bg-emerald-500/10" />
                    <div className="absolute bottom-0 -left-40 size-[480px] rounded-full bg-cyan-300/20 blur-[120px] dark:bg-cyan-500/10" />
                </div>

                <div className="mx-auto grid min-h-[700px] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-24">
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                            <Sparkles size={16} />
                            مدیریت مالی، ساده‌تر از همیشه
                        </div>

                        <h1 className="max-w-2xl text-4xl leading-[1.45] font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.45rem] dark:text-white">
                            پولت کجا می‌رود؟
                            <span className="mt-2 block text-emerald-600 dark:text-emerald-400">
                                هزینه‌بان بهت نشان می‌دهد
                            </span>
                        </h1>

                        <p className="mt-7 max-w-xl text-base leading-9 text-slate-600 sm:text-lg dark:text-slate-400">
                            درآمدها، هزینه‌های روزانه، بودجه‌ها و اهداف
                            پس‌اندازت را در یک فضای ساده مدیریت کن و برای
                            تصمیم‌های مالی بعدی، تصویر واضح‌تری داشته باش
                        </p>

                        <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
                            <Link
                                href="/signup"
                                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:px-7 sm:py-4 dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300 dark:focus-visible:ring-offset-slate-950"
                            >
                                شروع رایگان
                                <ArrowLeft size={19} />
                            </Link>

                            <a
                                href="#how-it-works"
                                className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:px-7 sm:py-4 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:shadow-none dark:hover:bg-white/[0.08]"
                            >
                                ببین چطور کار می‌کند
                            </a>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                            <HeroCheck text="ثبت‌نام سریع" />
                            <HeroCheck text="رابط کاملاً فارسی" />
                            <HeroCheck text="مدیریت یکپارچه" />
                        </div>
                    </div>

                    <DashboardPreview />
                </div>
            </section>

            <section className="border-y border-slate-200 bg-white py-8 transition-colors dark:border-white/10 dark:bg-white/[0.02]">
                <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-3">
                    <TrustItem
                        title="یک نمای واحد"
                        text="درآمد، هزینه و پس‌انداز کنار هم"
                    />
                    <TrustItem
                        title="تمرکز روی عادت مالی"
                        text="اعداد را به تصمیم قابل اجرا تبدیل کن"
                    />
                    <TrustItem
                        title="ساده و قابل فهم"
                        text="بدون جدول‌ها و اصطلاحات گیج‌کننده"
                    />
                </div>
            </section>

            <section id="features" className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <SectionTitle
                        smallTitle="امکانات هزینه‌ بان"
                        title="ابزارهایی برای کنترل بهتر پولت"
                        description="هزینه‌بان قرار نیست مدیریت مالی را پیچیده‌تر کند؛ هدف این است که اطلاعات مهم را ساده، مرتب و قابل استفاده در اختیارت بگذارد."
                    />

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <article
                                    key={feature.title}
                                    className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none dark:hover:border-emerald-400/30 dark:hover:bg-white/[0.055]"
                                >
                                    <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-400 dark:group-hover:bg-emerald-400/15">
                                        <Icon size={24} />
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 leading-8 text-slate-600 dark:text-slate-400">
                                        {feature.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section
                id="how-it-works"
                className="border-y border-slate-200 bg-white py-24 transition-colors dark:border-white/10 dark:bg-white/[0.02]"
            >
                <div className="mx-auto max-w-7xl px-6">
                    <SectionTitle
                        smallTitle="شروع کار"
                        title="سه قدم تا یک تصویر مالی روشن‌تر"
                        description="برای شروع لازم نیست حسابدار باشی. چند اطلاعات ساده را ثبت کن و اجازه بده هزینه‌بان آن‌ها را برایت مرتب کند."
                    />

                    <div className="mt-16 grid gap-6 md:grid-cols-3">
                        {steps.map((step) => (
                            <article
                                key={step.number}
                                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-white/10 dark:bg-slate-950/60"
                            >
                                <div
                                    aria-hidden="true"
                                    className="absolute top-2 left-5 text-7xl font-bold text-slate-100 dark:text-white/[0.025]"
                                >
                                    {step.number}
                                </div>

                                <div className="mb-8 flex size-12 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 font-bold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
                                    {step.number}
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {step.title}
                                </h3>

                                <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">
                                    {step.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="overflow-hidden rounded-[36px] border border-emerald-200 bg-gradient-to-l from-emerald-50 via-white to-cyan-50 p-8 shadow-sm md:p-14 dark:border-emerald-400/20 dark:from-emerald-400/10 dark:via-white/[0.025] dark:to-cyan-400/[0.06] dark:shadow-none">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <div>
                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                    از ثبت عدد تا تصمیم بهتر
                                </span>

                                <h2 className="mt-4 text-3xl leading-relaxed font-bold text-slate-950 md:text-4xl dark:text-white">
                                    فقط دانستن مبلغ هزینه کافی نیست؛ باید الگوی
                                    پولت را بشناسی
                                </h2>

                                <p className="mt-5 max-w-xl leading-8 text-slate-600 dark:text-slate-400">
                                    وقتی درآمد، هزینه و بودجه را کنار هم
                                    می‌بینی، تشخیص خرج‌های غیرضروری و
                                    برنامه‌ریزی برای هدف بعدی خیلی ساده‌تر
                                    می‌شود.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Benefit
                                    icon={TrendingDown}
                                    title="کاهش خرج اضافی"
                                    text="دسته‌هایی که بیشتر از انتظار هزینه می‌برند سریع‌تر پیدا کن."
                                />
                                <Benefit
                                    icon={TrendingUp}
                                    title="برنامه‌ریزی بهتر"
                                    text="رفتار مالی ماه‌های مختلف را با هم مقایسه کن."
                                />
                                <Benefit
                                    icon={PiggyBank}
                                    title="پس‌انداز هدفمند"
                                    text="پیشرفت هر هدف پس‌انداز را واضح و قابل اندازه‌گیری ببین."
                                />
                                <Benefit
                                    icon={BarChart3}
                                    title="گزارش واضح"
                                    text="اعداد پراکنده را به یک نمای قابل فهم از وضعیت مالی تبدیل کن."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="reviews"
                className="border-y border-slate-200 bg-white py-24 transition-colors dark:border-white/10 dark:bg-white/[0.02]"
            >
                <div className="mx-auto max-w-7xl px-6">
                    <SectionTitle
                        smallTitle="تجربه کاربران"
                        title="جایی برای تجربه‌های واقعی کاربران هزینه‌بان"
                        description="این کارت‌ها فعلاً نمونه نمایشی طراحی هستند. بعد از انتشار برنامه، این بخش را با نظرات تأییدشده کاربران واقعی جایگزین می‌کنیم."
                    />

                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {reviews.map((review) => (
                            <article
                                key={review}
                                className="rounded-3xl border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-slate-950/60"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <Quote
                                        size={29}
                                        className="text-emerald-500 dark:text-emerald-400"
                                    />
                                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
                                        نمونه نمایشی
                                    </span>
                                </div>

                                <p className="mt-6 leading-8 text-slate-700 dark:text-slate-300">
                                    «{review}»
                                </p>

                                <div className="mt-7 border-t border-slate-200 pt-5 text-sm font-bold text-slate-400 dark:border-white/10 dark:text-slate-500">
                                    کاربر نمونه
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="relative overflow-hidden rounded-[36px] bg-slate-950 px-8 py-14 text-center text-white shadow-2xl shadow-slate-900/10 md:px-14 dark:bg-emerald-400 dark:text-slate-950 dark:shadow-none">
                        <div
                            aria-hidden="true"
                            className="absolute -top-20 -right-20 size-64 rounded-full bg-emerald-400/20 blur-3xl dark:bg-white/20"
                        />

                        <WalletCards
                            size={42}
                            className="relative mx-auto mb-6 text-emerald-400 dark:text-slate-950"
                        />

                        <h2 className="relative text-3xl leading-relaxed font-bold md:text-4xl">
                            اولین قدم برای کنترل بهتر پولت را بردار
                        </h2>

                        <p className="relative mx-auto mt-5 max-w-2xl leading-8 text-slate-300 dark:text-slate-800">
                            حساب هزینه‌بانت را بساز و دخل و خرج، بودجه و هدف‌های
                            مالی‌ات را در یک فضای منظم مدیریت کن
                        </p>

                        <Link
                            href="sign-up"
                            className="relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-emerald-300 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800"
                        >
                            ایجاد حساب رایگان
                            <ArrowLeft size={19} />
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

function DashboardPreview() {
    return (
        <div className="relative mx-auto w-full max-w-xl">
            <div
                aria-hidden="true"
                className="absolute inset-8 translate-y-8 rounded-[40px] bg-emerald-400/20 blur-3xl dark:bg-emerald-400/10"
            />

            <div className="relative rounded-[32px] border border-slate-200 bg-white/90 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-7 dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/30">
                <div className="mb-7 flex items-center justify-between">
                    <div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            نمونه نمایشی پنل
                        </span>
                        <h3 className="mt-1 font-bold text-slate-900 dark:text-white">
                            نمای کلی این ماه
                        </h3>
                    </div>

                    <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                        <WalletCards />
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <StatCard
                        title="درآمد این ماه"
                        amount="۳۵,۸۰۰,۰۰۰"
                        positive
                    />
                    <StatCard title="هزینه این ماه" amount="۱۵,۴۵۰,۰۰۰" />
                </div>

                <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035]">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                            بودجه ماهانه
                        </span>
                        <span className="text-sm font-bold text-slate-800 dark:text-white">
                            ۶۷٪
                        </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div className="h-full w-2/3 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    </div>

                    <div className="mt-4 flex justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
                        <span>مصرف‌شده: ۱۵.۴ میلیون</span>
                        <span>بودجه: ۲۰ میلیون</span>
                    </div>
                </div>

                <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035]">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">
                                هدف پس‌انداز
                            </div>
                            <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                                سفر تابستانی
                            </div>
                        </div>
                        <Target className="text-cyan-500 dark:text-cyan-400" />
                    </div>

                    <div className="mt-6 flex items-end justify-between gap-4">
                        <div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">
                                ۱۰,۵۰۰,۰۰۰
                            </span>
                            <span className="mr-2 text-xs text-slate-400 dark:text-slate-500">
                                تومان
                            </span>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            ۴۱٪ هدف
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    title,
    amount,
    positive = false,
}: {
    title: string;
    amount: string;
    positive?: boolean;
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035]">
            <div className="text-sm font-bold text-slate-400 dark:text-slate-500">
                {title}
            </div>
            <div
                className={`mt-3 text-xl font-bold ${
                    positive
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-900 dark:text-white'
                }`}
            >
                {amount}
            </div>
            <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                تومان
            </div>
        </div>
    );
}

function HeroCheck({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                <Check size={13} />
            </div>
            {text}
        </div>
    );
}

function TrustItem({ title, text }: { title: string; text: string }) {
    return (
        <div className="rounded-2xl px-4 py-3 text-center">
            <div className="font-bold text-slate-900 dark:text-white">
                {title}
            </div>
            <div className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {text}
            </div>
        </div>
    );
}

function SectionTitle({
    smallTitle,
    title,
    description,
}: {
    smallTitle: string;
    title: string;
    description: string;
}) {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {smallTitle}
            </div>
            <h2 className="mt-4 text-3xl leading-relaxed font-bold text-slate-950 md:text-4xl dark:text-white">
                {title}
            </h2>
            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-400">
                {description}
            </p>
        </div>
    );
}

function Benefit({
    icon: Icon,
    title,
    text,
}: {
    icon: typeof TrendingUp;
    title: string;
    text: string;
}) {
    return (
        <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 dark:border-white/10 dark:bg-slate-950/45">
            <Icon
                size={23}
                className="mb-4 text-emerald-600 dark:text-emerald-400"
            />
            <h3 className="font-bold text-slate-900 dark:text-white">
                {title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {text}
            </p>
        </div>
    );
}
