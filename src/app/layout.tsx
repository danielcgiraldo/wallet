"use client";
import { Inter } from "next/font/google";
import { AuthContextProvider } from '@/lib/firebase/auth/AuthContext'
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <head></head>
            <body className={inter.className}>
                <AuthContextProvider>{children}</AuthContextProvider>
                <div id="recaptcha"></div>
            </body>
        </html>
    );
}
