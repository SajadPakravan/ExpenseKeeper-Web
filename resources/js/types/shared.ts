export interface AuthUser {
    id: number;
    name: string | null;
    username: string | null;
    email: string | null;
    phone: string | null;
    avatar: string;
    role: 'admin' | 'user' | 'accountant' | 'editor';
}

export interface SharedPageProps {
    [key: string]: unknown;
    name: string;
    auth: { user: AuthUser | null };
    flash: {
        success?: string | null;
        error?: string | null;
    };
}
