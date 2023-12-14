import { AppleIcon } from "@/lib/icons";

const AuthPage = () => {
    return (
        <main className="w-screen h-screen grid place-items-center">
            <div className="max-w-lg px-8 w-full flex flex-col items-center">
                <h1 className="font-semibold text-4xl mb-2 text-gray-700">Wallet</h1>
                <p className="text-gray-700 text-lg">Manage your finances smart</p>
                <form action="" className="w-full mt-12 mb-3">
                    <div className="relative w-full flex items-center">
                        <label className="absolute top-2 text-xs left-4 text-gray-400" htmlFor="">Email or Phone</label>
                        <input type="text" className="w-full pl-4 pt-6 rounded-lg border border-gray-400 pr-8 pb-1 text-lg leading-6" />
                    </div>
                </form>
                <button className="flex gap-2 justify-center w-full rounded-lg border border-gray-400 text-lg px-4 py-2"><AppleIcon className="mt-1" />Continue with Google</button>
            </div>
        </main>
    );
}

export default AuthPage;
