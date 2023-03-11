import {
    getAuth,
    sendPasswordResetEmail,
    sendEmailVerification,
    applyActionCode,
    updatePassword,
} from "firebase/auth";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import { firebaseApp } from "../../utils/firebase";

export function initializeFirebase() {
    return getAuth(firebaseApp);
}

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const firebaseLogout = async (auth) => {
    return await signOut(auth);
};

export const firebaseSignInWithFacebook = async (auth) => {
    try {
        return await signInWithPopup(auth, facebookProvider);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
    return {};
};

export const firebaseSignInWithGoogle = async (auth) => {
    try {
        return await signInWithPopup(auth, googleProvider);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
    return null;
};

export const firebaseCreateUserEmailNPass = async (auth, email, password) => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }

    return null;
};

export const firebaseSignInUserEmailNPass = async (auth, email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
    return null;
};

export const firebaseSendPasswordResetLink = async (auth, email) => {
    console.log(email);
    try {
        return await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
    return null;
};

export const firebaseGetConfirmEmailLink = async (auth) => {
    try {
        return await sendEmailVerification(auth.currentUser);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
    return null;
};

export const firebaseAfterConfirmApplyCode = async (auth, code) => {
    try {
        return await applyActionCode(auth, code);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
    return null;
};

export const firebaseChangePassword = async (user, password) => {
    try {
        return await updatePassword(user, password);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
    return null;
};
