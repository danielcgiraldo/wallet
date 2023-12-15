import firebase_app from "@/lib/firebase/config";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function checkEmail(
    email: string
): Promise<[boolean, any]> {
    try {
        const result = await fetchSignInMethodsForEmail(auth, email);
        return [true, result];
    } catch (e) {
        return [false, e];
    }
}
