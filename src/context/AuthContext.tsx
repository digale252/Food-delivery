import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useToast } from './ToastContext';
import { auth } from '../firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';

interface User {
    uid: string;
    name: string | null;
    email: string | null;
}

interface AuthContextType {
    currentUser: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (user: { name: string; email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser({
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email
                });
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            showToast('Logged in successfully!', 'success');
            return true;
        } catch (error: any) {
            console.error("Login Error:", error);
            showToast(error.message || 'Failed to login', 'error');
            return false;
        }
    };

    const signup = async ({ name, email, password }: { name: string; email: string; password: string }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Update profile with name
            await updateProfile(userCredential.user, {
                displayName: name
            });
            // Force update local state immediately or wait for onAuthStateChanged
            setCurrentUser({
                uid: userCredential.user.uid,
                name: name,
                email: email
            });
            showToast('Account created successfully!', 'success');
        } catch (error: any) {
            console.error("Signup Error:", error);
            showToast(error.message || 'Failed to sign up', 'error');
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            showToast('Logged out successfully', 'info');
        } catch (error: any) {
            showToast('Failed to logout', 'error');
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
