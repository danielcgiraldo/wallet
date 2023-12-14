import firebase_app from "@/firebase/config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);


export default async function signUp(email: string, password: string) {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        if (result) {
            return [true, result.user]
        }
    } catch (e) {
        return [false, e]
    }
}
