"use client";

import LoadingComponent from "@/components/loading";
import { useAuthContext } from "@/lib/firebase/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const { user } = useAuthContext() as any;

    useEffect(() => {
        if (user == null) router.push("/login");
        else setLoading(false);
    }, [user, router]);

    ("use client");

    if (loading) return <LoadingComponent />
    return children;
}
