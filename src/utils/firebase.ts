import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
export const firebaseApp = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const firestoreHandle = getFirestore(firebaseApp);
