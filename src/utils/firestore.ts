import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoreHandle } from "./firebase";

const paymentsRef = collection(firestoreHandle, "Payments");

export const getDataFromPaymentsCollection = async (userEmail: string) => {
    const q = query(paymentsRef, where("userEmail", "==", userEmail));
    return getDocs(q);
};
