import firebase_app from "@/firebase/config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email: string, password: string) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        if (result) {
            return [true, result.user];
        }
    } catch (e) {
        return [false, e];
    }
}
