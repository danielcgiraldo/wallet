import { LoaderIcon } from "lucide-react";

const LoadingComponent = () => {
    return (
        <div className="w-screen h-screen grid place-items-center">
            <LoaderIcon size={30} className="animate-spin text-gray-400" />
        </div>
    );
};

export default LoadingComponent;