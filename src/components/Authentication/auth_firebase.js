import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup, signOut, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


export function initializeFirebase() {

    const app = firebase.initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });


    return getAuth(app);
}


export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const firebaseLogout = async (auth) => {
   return await signOut(auth)
};

export const firebaseSignInWithFacebook = async (auth) => {
    try {
        return  await signInWithPopup(auth, facebookProvider);
    } catch (error) {
        console.error(error);
        alert(error.message)
    }
    return {}
}

export const firebaseSignInWithGoogle = async (auth) => {
    try {
        return await signInWithPopup(auth, googleProvider);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
    return null
}


export const firebaseCreateUserEmailNPass = async (auth,email, password) => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {

        console.error(error);
        alert(error.message);
    }

    return null
}

export const firebaseSignInUserEmailNPass = async (auth,email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {

        console.error(error);
        alert(error.message);
    }
    return null
}

export const firebaseSendPasswordResetLink = async (auth,email) => {
    console.log(email)
    try {
        return await sendPasswordResetEmail(auth,email);
    } catch (error) {

        console.error(error);
        alert(error.message);
    }
    return null

}
