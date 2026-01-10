import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";

interface AuthContextType {
    id: String | null;
    login: (signInData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    id: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("auth");
        if (stored) {
            const parsed: { id: string } = JSON.parse(stored);
            setId(parsed.id);
        }
    }, []);

    const login = async (signinData: RequestSigninDto) => {
        setId(signinData.id);
        localStorage.setItem("auth", JSON.stringify({ id: signinData.id }));
    };

    const logout = async () => {
        setId(null);
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider value={{ id, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};