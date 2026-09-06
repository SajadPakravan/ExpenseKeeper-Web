import { router, usePage } from '@inertiajs/react';
import {useState} from "react";
import {signOut} from "@/routes";
import type {SharedPageProps} from "@/types/shared";

export function useAccount() {
    const page = usePage<SharedPageProps>();
    const { auth, flash } = page.props;
    const user = auth.user!;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function logOut() {
        router.post(signOut.url());
    }

    return {
        page,
        auth,
        flash,
        user,
        sidebarOpen,
        setSidebarOpen,
        logOut,
    };
}
