import firebase_app from "@/firebase/config";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function checkEmail(email: string) {
    try {
        const result = await fetchSignInMethodsForEmail(auth, email);
        if (result) {
            return [true, result];
        }
    } catch (e) {
        return [false, e];
    }
}
