export type ProfileFormData = {
    name: string;
    username: string;
    phone: string;
    email: string;
    avatar: File | null;
};

export type ProfileTextFieldName =
    | 'name'
    | 'username'
    | 'phone'
    | 'email';

export type CropPoint = {
    x: number;
    y: number;
};

export type PixelCrop = {
    x: number;
    y: number;
    width: number;
    height: number;
};
