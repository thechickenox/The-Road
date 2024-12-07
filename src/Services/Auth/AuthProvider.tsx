import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, signInWithGoogle, signOut as googleSignOut, loginFacebook } from '../../Services/Auth/FirebaseConfig'; // Importar auth y signInWithGoogle desde el archivo correcto
import { onAuthStateChanged, signInWithEmailAndPassword, User, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
  googleSignOut: () => Promise<void>; // Agrega googleSignOut a AuthContextType
  facebookLogin: () => Promise<void>; // Función para iniciar sesión con Facebook
  register: (email: string, password: string) => Promise<any>; 
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
      setIsLoggedIn(false);
      throw new Error('Failed to log in');
    }
  };
  const register = async (email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log('respuesta de firebase al register',res);
      return res
    } catch (error) {
      console.error('Error al registrar un usuario ', error)
      return { status: 400, error: error };
    }

  }
  const googleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in with Google:', error);
      setIsLoggedIn(false);
      throw new Error('Failed to log in with Google');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
      throw new Error('Failed to log out');
    }
  };
  const googleSignOut = async () => {
    try {
      await googleSignOut(); // Llama a googleSignOut que llama a la función signOut de Google
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out with Google:', error);
      throw new Error('Failed to log out with Google');
    }
  };
  const facebookLogin = async () => {
    try {
      const result = await loginFacebook();
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in with Facebook:', error);
      setIsLoggedIn(false);
      throw new Error('Failed to log in with Facebook');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, login, googleLogin, logout, googleSignOut, facebookLogin, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
