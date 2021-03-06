import { createContext } from 'react';
import { User } from '../../types/User';

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string, keepLogged: boolean) => Promise<boolean>;
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);