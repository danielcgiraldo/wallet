"use client";

import { AuthContextProvider } from '@/lib/firebase/auth/AuthContext'
import { ReactNode, useEffect } from 'react';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import firebase_app from '@/lib/firebase/config';

export default function AppLayout({
    children,
}: {
    children: ReactNode;
}) {
    useEffect(() => {
        const appCheck = initializeAppCheck(firebase_app, {
            provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHAV3_SITE_KEY!),
            isTokenAutoRefreshEnabled: true
          });
    }, [])
    return <AuthContextProvider>{children}</AuthContextProvider>
}
