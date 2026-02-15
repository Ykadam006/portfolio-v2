// src/app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Yogesh Kadam — Portfolio",
    description:
        "Frontend Engineer / Full-Stack (UI-focused). Building clean, accessible dashboards and web apps with Next.js, React, TypeScript.",
    openGraph: {
        title: "Yogesh Kadam — Full-Stack Developer",
        description: "Building clean, scalable web apps with premium UI. React · Next.js · TypeScript.",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${sora.variable}`}>
        <body className="min-h-dvh bg-background text-foreground antialiased font-sans">
        <ThemeProvider>
            <a
                href="#main"
                className="absolute -top-full left-4 z-[100] rounded-xl bg-brand px-4 py-2 text-brand-foreground transition-transform focus-visible:top-4 focus-visible:outline-none"
            >
                Skip to content
            </a>
            <SiteHeader />
            <main id="main" className="min-h-[calc(100dvh-4rem)]">{children}</main>
            <SiteFooter />
        </ThemeProvider>
        </body>
        </html>
    );
}
