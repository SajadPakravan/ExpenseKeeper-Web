<div align="center">

<img src="public/images/logos/ExpenseKeeper-Logo.webp" alt="ExpenseKeeper Logo" width="420" />

# 💰 هزینه‌بان | ExpenseKeeper

### سامانه مدرن مدیریت مالی شخصی

<p>
ExpenseKeeper یک پروژه مدیریت مالی شخصی برای مدیریت درآمدها، هزینه‌ها، تراکنش‌ها،
بودجه، پس‌انداز و گزارش‌های مالی است که با معماری مدرن و رابط کاربری فارسی و RTL توسعه داده می‌شود.
</p>

<p>
<img src="https://img.shields.io/badge/Laravel-13.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
<img src="https://img.shields.io/badge/React-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="React TypeScript" />
<img src="https://img.shields.io/badge/Inertia.js-Enabled-9553E9?style=for-the-badge" alt="Inertia.js" />
<img src="https://img.shields.io/badge/Tailwind_CSS-UI-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p>
<img src="https://img.shields.io/badge/Status-In_Development-F59E0B?style=flat-square" alt="Status" />
<img src="https://img.shields.io/badge/RTL-Persian-success?style=flat-square" alt="RTL Persian" />
<img src="https://img.shields.io/badge/Theme-Light%20%2F%20Dark-111827?style=flat-square" alt="Theme" />
</p>

</div>

---

<div dir="rtl">

## ✨ درباره پروژه

**هزینه‌بان (ExpenseKeeper)** یک سامانه مدیریت مالی شخصی است که با هدف ساده‌تر کردن کنترل دخل‌وخرج کاربران طراحی شده است.

در توسعه این پروژه علاوه بر ظاهر حرفه‌ای، روی ساختار فنی تمیز، توسعه‌پذیری، امنیت و جداسازی مسئولیت‌ها تمرکز شده و بخش‌های مختلف با رویکردهای **SOLID**، **Separation of Concerns** و Component-Based Architecture ساخته می‌شوند.

---

## 🎯 قابلیت‌های اصلی

- 🏠 داشبورد مالی
- 👤 مدیریت پروفایل و تصویر کاربر
- 💵 ثبت و مدیریت درآمدها
- 💸 ثبت و مدیریت هزینه‌ها
- 🔄 مدیریت تراکنش‌ها
- 📊 بودجه‌بندی
- 🎯 اهداف پس‌انداز
- 📈 گزارش‌ها و تحلیل‌های مالی
- ⚙️ تنظیمات حساب
- 🌙 پشتیبانی از Light / Dark Mode
- 🌍 مدیریت زمان بر اساس Timezone کاربر
- 🔐 احراز هویت وب و آماده‌سازی برای API

---

## 💵 ساختار درآمدها

در ExpenseKeeper درآمدها به دو نوع اصلی تقسیم می‌شوند:

### درآمد موقت — `temporary`

برای درآمدهایی که فقط یک‌بار یا در یک زمان مشخص رخ می‌دهند؛ مانند:

- درآمد یک پروژه
- فروش یک محصول
- پاداش یک‌باره
- درآمد اتفاقی

### درآمد دائمی — `permanent`

برای درآمدهایی که طبق یک برنامه مشخص تکرار می‌شوند:

| نوع | مثال |
|---|---|
| `daily` | هر روز ساعت 09:00 |
| `weekly` | هر پنجشنبه ساعت 18:00 |
| `monthly` | روز 12 هر ماه ساعت 08:30 |
| `yearly` | هر سال در روز و ماه مشخص |

---

## 🛠️ تکنولوژی‌ها

### Backend
- PHP
- Laravel 13
- Eloquent ORM
- Laravel Validation / Form Request
- Laravel Session Authentication
- Laravel Sanctum
- MySQL / MariaDB

### Frontend
- React
- TypeScript
- Inertia.js
- Vite
- Tailwind CSS
- Lucide React
- React Easy Crop

---

## 🔐 احراز هویت

ساختار اطلاعات کاربر و اطلاعات ورود از هم جدا شده‌اند:

```text
users
    ↓
اطلاعات شخصی

users_auth
    ↓
username
password
وضعیت حساب
```

برای وب از Session Authentication استفاده می‌شود و ساختار پروژه برای API با Laravel Sanctum نیز در نظر گرفته شده است.

---

## 🎨 رابط کاربری

ExpenseKeeper با تمرکز بر موارد زیر طراحی شده است:

- فارسی و RTL
- Responsive Design
- Light Mode
- Dark Mode
- طراحی مینیمال و مالی
- کامپوننت‌های قابل استفاده مجدد
- پیام‌های خطا و موفقیت یکپارچه
- Sidebar اختصاصی پنل کاربری

---

## 🚀 اجرای پروژه

ابتدا Repository را Clone کنید:

```bash
git clone <repository-url>
```

وارد پروژه شوید:

```bash
cd ExpenseKeeper
```

وابستگی‌های PHP:

```bash
composer install
```

وابستگی‌های Frontend:

```bash
npm install
```

ایجاد فایل Environment:

```bash
cp .env.example .env
```

ساخت کلید برنامه:

```bash
php artisan key:generate
```

اجرای Migrationها:

```bash
php artisan migrate
```

ساخت لینک Storage:

```bash
php artisan storage:link
```

اجرای محیط توسعه:

```bash
composer run dev
```

---

<div align="center">

### 💚 ExpenseKeeper

**Manage smarter. Spend better. Save more.**

ساخته‌شده با تمرکز بر سادگی، توسعه‌پذیری و مدیریت بهتر امور مالی.

</div>

</div>
