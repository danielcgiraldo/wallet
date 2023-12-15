import firebase_app from "@/lib/firebase/config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(
    email: string,
    password: string
): Promise<[boolean, any]> {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return [true, result.user];
    } catch (e) {
        return [false, e];
    }
}
