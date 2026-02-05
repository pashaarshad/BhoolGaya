'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase/config';
import { User, UserSettings, DEFAULT_USER_SETTINGS } from '@/lib/types';

interface AuthContextType {
    user: User | null;
    firebaseUser: FirebaseUser | null;
    loading: boolean;
    error: string | null;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Convert Firebase user to our User type
    const convertFirebaseUser = (fbUser: FirebaseUser): User => ({
        id: fbUser.uid,
        email: fbUser.email || '',
        displayName: fbUser.displayName || 'User',
        photoURL: fbUser.photoURL || undefined,
        createdAt: new Date(),
    });

    // Create user document in Firestore
    const createUserDocument = async (fbUser: FirebaseUser) => {
        const userRef = doc(db, 'users', fbUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            // Create new user document
            await setDoc(userRef, {
                email: fbUser.email,
                displayName: fbUser.displayName || 'User',
                photoURL: fbUser.photoURL,
                createdAt: serverTimestamp(),
            });

            // Create default settings
            const settingsRef = doc(db, 'settings', fbUser.uid);
            await setDoc(settingsRef, {
                userId: fbUser.uid,
                ...DEFAULT_USER_SETTINGS,
            } as UserSettings);
        }
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
            if (fbUser) {
                setFirebaseUser(fbUser);
                setUser(convertFirebaseUser(fbUser));
            } else {
                setFirebaseUser(null);
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Sign in with email and password
    const signInWithEmail = async (email: string, password: string) => {
        try {
            setError(null);
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to sign in';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Sign up with email and password
    const signUpWithEmail = async (email: string, password: string, displayName: string) => {
        try {
            setError(null);
            setLoading(true);
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update profile with display name
            await updateProfile(result.user, { displayName });

            // Create user document
            await createUserDocument(result.user);

            // Update local state
            setUser(convertFirebaseUser(result.user));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create account';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            setError(null);
            setLoading(true);
            const result = await signInWithPopup(auth, googleProvider);

            // Create user document if new
            await createUserDocument(result.user);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to sign in with Google';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const logout = async () => {
        try {
            setError(null);
            await signOut(auth);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to sign out';
            setError(errorMessage);
            throw err;
        }
    };

    // Clear error
    const clearError = () => setError(null);

    const value: AuthContextType = {
        user,
        firebaseUser,
        loading,
        error,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        logout,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
