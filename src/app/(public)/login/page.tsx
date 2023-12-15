"use client";
import { LoaderIcon, Wallet } from "lucide-react";
import Image from "next/image";
import { ArrowRight } from "@/lib/icons";
import { useEffect, useState } from "react";
import checkEmail from "@/lib/firebase/auth/checkEmail";
import signIn from "@/lib/firebase/auth/email/signin";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/firebase/auth/AuthContext";
import LoadingComponent from "@/components/loading";

const AuthPage = () => {
    const [form, setForm] = useState("check-email");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const { user } = useAuthContext() as any;

    useEffect(() => {
        if (user != null) router.push("/dashboard");
        else setLoading(false);
    }, [user, router]);

    if (loading) return <LoadingComponent />;
    return (
        <main className="w-screen h-screen grid place-items-center">
            <div className="max-w-lg px-8 w-full flex flex-col items-center">
                <h1 className="font-semibold text-4xl mb-2 text-gray-700 flex gap-2 items-center">
                    Wallet <Wallet size={35} />
                </h1>
                {form === "check-email" && (
                    <CheckEmailForm setForm={setForm} setEmail={setEmail} />
                )}
                {form === "signin" && (
                    <SignInForm
                        setForm={setForm}
                        email={email}
                        router={router}
                    />
                )}
                {form === "signup" && (
                    <SignUpForm
                        setForm={setForm}
                        email={email}
                        router={router}
                    />
                )}

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
    );
};

export default AuthPage;

const CheckEmailForm = ({
    setForm,
    setEmail,
}: {
    setForm: any;
    setEmail: any;
}) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const form = e.target as HTMLFormElement;
            const email = form.email.value;
            const authMethods = await checkEmail(email);
            if (authMethods[0]) {
                setEmail(email);
                if (
                    authMethods[1].length > 0 &&
                    authMethods[1].includes("password")
                )
                    setForm("signin");
                else setForm("signup");
            } else {
                alert("Error en el sistema, intente más tarde");
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }

        
    };

    return (
        <form
            className="w-full mt-12 flex flex-col gap-3"
            onSubmit={handleSubmit}
        >
            <div className="relative w-full flex items-center">
                <label
                    className="absolute top-2 text-xs left-4 text-gray-400"
                    htmlFor=""
                >
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    name="email"
                    className="w-full pl-4 pt-6 rounded-lg border border-gray-400 pr-8 pb-1.5 text-lg leading-6 outline-blue-500"
                    required
                />
                <button
                    disabled={loading}
                    className={`absolute right-3 text-gray-400 rounded-full w-7 h-7 ${!loading && ("border border-gray-400")} grid place-items-center`}
                >
                    {loading ? (
                        <LoaderIcon className="h-6 animate-spin" />
                    ) : (
                        <ArrowRight className="-mr-0.5 h-3.5" />
                    )}
                </button>
            </div>
            <div className="gap-2 w-1/2 text-sm mx-auto text-gray-400 flex items-center after:bg-gray-400 after:w-full after:h-px before:bg-gray-400 before:w-full before:h-px">
                <span>ó</span>
            </div>
            <button type="button" className="flex gap-2 justify-center w-full rounded-lg border border-gray-400 px-4 py-3 items-center ">
                <Image
                    src="/g-logo.png"
                    alt="Google Logo"
                    width={20}
                    height={20}
                />
                Continuar con Google
            </button>
        </form>
    );
};

const SignInForm = ({
    setForm,
    email,
    router,
}: {
    setForm: any;
    email: string;
    router: any;
}) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const password = form.password.value;

        const sign = await signIn(email, password);
        if (sign[0]) {
            router.push("/dashboard");
        } else {
            if (sign[1] === "auth/wrong-password") {
                alert("Contraseña incorrecta");
            }
        }
    };

    return (
        <form
            className="w-full mt-12"
            onSubmit={handleSubmit}
        >
            <div className="relative w-full flex items-center">
                <label
                    className="absolute top-2 text-xs left-4 text-gray-400"
                    htmlFor=""
                >
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    name="email"
                    readOnly
                    value={email}
                    onClick={() => setForm("check-email")}
                    className="w-full pl-4 pt-6 rounded-t-lg border border-gray-400 pr-8 pb-1.5 text-lg leading-6 outline-blue-500"
                    required
                />
            </div>
            <div className="relative w-full flex items-center -mt-px">
                <label
                    className="absolute top-2 text-xs left-4 text-gray-400"
                    htmlFor=""
                >
                    Contraseña
                </label>
                <input
                    type="password"
                    name="password"
                    className="w-full pl-4 pt-6 rounded-b-lg border border-gray-400 pr-8 pb-1.5 text-lg leading-6 outline-blue-500"
                    required
                />
                <button className="absolute right-3 text-gray-400 rounded-full w-7 h-7 border border-gray-400 grid place-items-center">
                    <ArrowRight className="-mr-0.5 h-3.5" />
                </button>
            </div>
        </form>
    );
};

const SignUpForm = ({
    setForm,
    email,
    router,
}: {
    setForm: any;
    email: string;
    router: any;
}) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setForm("check-password");
    };

    return (
        <form
            className="w-full mt-12 flex flex-col gap-3"
            onSubmit={handleSubmit}
        >
            <div className="relative w-full flex items-center">
                <label
                    className="absolute top-2 text-xs left-4 text-gray-400"
                    htmlFor=""
                >
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    name="email"
                    readOnly
                    value={email}
                    onClick={() => setForm("check-email")}
                    className="cursor-pointer w-full pl-4 pt-6 rounded-lg border border-gray-400 pr-8 pb-1.5 text-lg leading-6 outline-blue-500"
                    required
                />
            </div>
            <div className="relative w-full flex items-center">
                <label
                    className="absolute top-2 text-xs left-4 text-gray-400"
                    htmlFor=""
                >
                    Contraseña
                </label>
                <input
                    type="email"
                    name="email"
                    className="w-full pl-4 pt-6 rounded-lg border border-gray-400 pr-8 pb-1.5 text-lg leading-6 outline-blue-500"
                    required
                />
                <button className="absolute right-3 text-gray-400 rounded-full w-7 h-7 border border-gray-400 grid place-items-center">
                    <ArrowRight className="-mr-0.5 h-3.5" />
                </button>
            </div>
        </form>
    );
};
