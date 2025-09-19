export interface UserData {
    user: User;
    token: string;
}

export interface User {
    id: number;
    entriesCount: number;
    username: string;
    email: string;
    about: string;
    created_at: string;
    isLoaded: boolean;
}

export const getInitialUser = (): User => ({
    id: 0,
    entriesCount: 0,
    username: '',
    email: '',
    about: '',
    created_at: '',
    isLoaded: false,
});