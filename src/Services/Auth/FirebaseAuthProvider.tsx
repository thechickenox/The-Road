import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Asegúrate de importar auth correctamente desde FirebaseConfig
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, UserCredential, User } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqUx6K_72hs3LdSdDtMDM-LFdx7c1I0GQ",
  authDomain: "the-road-coding-ecc7b.firebaseapp.com",
  projectId: "the-road-coding-ecc7b",
  storageBucket: "the-road-coding-ecc7b.firebasestorage.app",
  messagingSenderId: "1063441098202",
  appId: "1:1063441098202:web:6fdffeb1d4ee6769344ce3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);
interface AuthContextProps {
  createUser: (email: string, password: string) => Promise<UserCredential>;
  user: User | null;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue: AuthContextProps = {
    createUser,
    user,
    loginUser,
    logOut,
    loading,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;