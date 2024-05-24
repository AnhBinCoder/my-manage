import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, UserCredential, User, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from "../../firebase";
import { FC } from "react";

type Props = {
    children?: React.ReactNode
}
type Context = {
    googleSignIn: () => void,
    logOut: () => void,
    user: User | null
}
interface AuthContextModel {
    user: User | null
    googleSignIn: void
    logOut?: void
}
const AuthContext = createContext<Context>(
    {} as Context,
);

export const AuthContextProvider = ({ children }: Props): JSX.Element => {
    const [user, setUser] = useState<User | null>(null)

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    function signIn(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('User', currentUser);
        });
        return () => {
            unSubscribe();
        }
    }, []);
    const values = {
        user,
        googleSignIn,
        logOut
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
export const UserAuth = () : Context => {
    return useContext(AuthContext)
} 
