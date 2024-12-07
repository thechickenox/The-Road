// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDqUx6K_72hs3LdSdDtMDM-LFdx7c1I0GQ",
    authDomain: "the-road-coding-ecc7b.firebaseapp.com",
    projectId: "the-road-coding-ecc7b",
    storageBucket: "the-road-coding-ecc7b.firebasestorage.app",
    messagingSenderId: "1063441098202",
    appId: "1:1063441098202:web:6fdffeb1d4ee6769344ce3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const provider2 = new FacebookAuthProvider();


const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
};
const signOut = () => {
    return firebaseSignOut(auth);
};

const loginFacebook = () => {
    return signInWithPopup(auth, provider2);
}




export { auth, signInWithGoogle, signOut, loginFacebook };
