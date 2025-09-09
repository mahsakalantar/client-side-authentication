import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@/providers";

const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
    display: "swap",
});

const robotoMono = Roboto_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Dekamond Auth Task",
    description: "Dekamond Auth Task",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <QueryClientProvider>{children}</QueryClientProvider>
        <Toaster />
        </body>
        </html>
    );
}