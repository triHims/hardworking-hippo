import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import {GoogleAuthProvider, signInWithPopup, signOut,FacebookAuthProvider } from 'firebase/auth';



const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const logout = (afterAction = () => {}) => {
  signOut(auth).then(r => afterAction(null));
};

export const signInWithFacebook = async () =>{
    try {
        const result = await signInWithPopup(auth,facebookProvider);
    } catch (error) {
        console.error(error);
        alert(error.message)
    }
}

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
