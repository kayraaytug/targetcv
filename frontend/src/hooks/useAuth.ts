import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCnb-w7hLAluNmUm-l6KV45das2EwH7yvQ",
    authDomain: "targetcv1.firebaseapp.com",
    projectId: "targetcv1",
    storageBucket: "targetcv1.firebasestorage.app",
    messagingSenderId: "547766356973",
    appId: "1:547766356973:web:61fe3a4871e354a0a7f5e4",
    measurementId: "G-7VG9S82FDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Auth functions
export const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const onAuthChange = (callback: (user: any) => void) =>
    onAuthStateChanged(auth, callback);

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
