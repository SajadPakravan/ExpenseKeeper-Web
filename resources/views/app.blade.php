<!DOCTYPE html>
<html lang="fa" dir="rtl">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <script>
            (() => {
                const storageKey = 'expensekeeper-theme';
                const savedTheme = localStorage.getItem(storageKey);

                const initialTheme =
                    savedTheme === 'light' || savedTheme === 'dark'
                        ? savedTheme
                        : window.matchMedia('(prefers-color-scheme: dark)').matches
                          ? 'dark'
                          : 'light';

                document.documentElement.classList.toggle(
                    'dark',
                    initialTheme === 'dark',
                );
                document.documentElement.style.colorScheme = initialTheme;
            })();
        </script>

        <title inertia>{{ config('app.name', 'هزینه‌بان') }}</title>

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
