"use client";
import {
    GoogleReCaptchaProvider,
    useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { Wallet } from "lucide-react";
import Image from "next/image";
import { ArrowRight } from "@/lib/icons";
import { useCallback } from "react";

const AuthPage = () => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        >
            <main className="w-screen h-screen grid place-items-center">
                <div className="max-w-lg px-8 w-full flex flex-col items-center">
                    <h1 className="font-semibold text-4xl mb-2 text-gray-700 flex gap-2 items-center">
                        Wallet <Wallet size={35} />
                    </h1>
                    <LoginForm />
                    <button className="flex gap-2 justify-center w-full rounded-lg border border-gray-400 px-4 py-3 items-center ">
                        <Image
                            src="/g-logo.png"
                            alt="Continue with Google"
                            width={20}
                            height={20}
                        />
                        Continue with Google
                    </button>

                    <div className="mt-20 text-sm text-gray-600 flex gap-2 items-center">
                        <input
                            id="save-session"
                            type="checkbox"
                            className="h-3.5 cursor-pointer w-3.5 rounded-lg border-gray-400 text-blue-500"
                        />
                        <label
                            htmlFor="save-session"
                            className="cursor-pointer select-none"
                        >
                            Mantener sesión iniciada
                        </label>
                    </div>
                    <hr className="bg-gray-400 w-1/2 my-2" />
                    <button className="text-blue-500 text-sm hover:underline">
                        ¿Olvídaste tu contraseña?
                    </button>
                </div>
            </main>
        </GoogleReCaptchaProvider>
    );
};

export default AuthPage;

const LoginForm = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Create an event handler so you can call the verification on button click event or form submit
    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }

        const token = await executeRecaptcha("submit");
        
        console.log("submit");
        // Do whatever you want with the token
    }, [executeRecaptcha]);

    return (
        <form onSubmit={handleSubmit} className="w-full mt-12 mb-3">
            <div className="relative w-full flex items-center">
                <label
                    className="absolute top-2 text-xs left-4 text-gray-400"
                    htmlFor=""
                >
                    Email or Phone
                </label>
                <input
                    type="text"
                    className="w-full pl-4 pt-6 rounded-lg border border-gray-400 pr-8 pb-1.5 text-lg leading-6 outline-blue-500"
                />
                <button
                    className="absolute right-3 text-gray-400 rounded-full w-7 h-7 border border-gray-400 grid place-items-center"
                >
                    <ArrowRight className="-mr-0.5 h-3.5" />
                </button>
            </div>
        </form>
    );
};
