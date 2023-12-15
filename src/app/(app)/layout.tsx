"use client";

import { AuthContextProvider } from '@/lib/firebase/auth/AuthContext'
import { ReactNode } from 'react';

export default function AppLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <AuthContextProvider>{children}</AuthContextProvider>
}
