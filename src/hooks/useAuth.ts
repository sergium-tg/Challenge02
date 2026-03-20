import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

export function useAuth() {
    const [user, setUser] = useState<any>(null);

    const login = async (email: string, pass: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        setUser(userCredential.user);
    };

    const register = async (email: string, pass: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        setUser(userCredential.user);
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return { user, login, register, logout };
}
