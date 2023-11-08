import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { auth } from "../FIrebase/firebase.config";
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [photoURL, setPhotoURL] = useState(user?.photoURL)
    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignIn = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider).then((res) => { toast.success('Logged In Successfully') })
    }
    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }
    const updateProfileInfo = (name, imgUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: imgUrl
        })

    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            // console.log(currentUser);
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [])
    const authInfo = {
        user,
        loading,
        registerUser,
        login,
        googleSignIn,
        logout, updateProfileInfo, setPhotoURL, photoURL
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;