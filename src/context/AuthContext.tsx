import { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const authData = useAuth(); // Usamos el custom hook

    return (
        <AuthContext.Provider value={authData}>
        {children}
        </AuthContext.Provider>
    );
}
