// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
    title: "Yogesh Kadam — Portfolio",
    description: "Full-stack / front-end developer building clean, scalable web apps with premium UI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="min-h-dvh bg-background text-foreground antialiased">
        <ThemeProvider>
            <SiteHeader />
            <main className="min-h-[calc(100dvh-4rem)]">{children}</main>
            <SiteFooter />
        </ThemeProvider>
        </body>
        </html>
    );
}
