import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="es">
            <head></head>
            <body className={inter.className}>
                {children}
                <div id="recaptcha"></div>
            </body>
        </html>
    );
}
