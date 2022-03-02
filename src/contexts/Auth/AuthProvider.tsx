import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<User | null>(null);
    const api = useApi();

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if (storageData) {
                const data = await api.validateToken(storageData);

                if (data.user) {
                    setUser(data.user);
                }
            }
        }

        validateToken();
    }, []);

    const signin = async (email: string, password: string, keepLogged: boolean) => {
        const data = await api.signin(email, password);
        if (data.user && data.token) {
            setUser(data.user);
            setToken(data.token, keepLogged);
            return true;
        }
        return false;
    }

    const signout = async () => {
        await api.logout();
        setUser(null);
        clearToken();
    }

    const setToken = (token: string, keepLogged: boolean) => {
        if (keepLogged == true) {
            localStorage.setItem('authToken', token);
        }
    }

    const clearToken = () => {
        localStorage.removeItem('authToken');
        setToken('', true);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}