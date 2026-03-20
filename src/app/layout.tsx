// src/app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yogeshkadam.com"),
    title: "Yogesh Kadam — Frontend Engineer · Chicago, IL",
    description:
        "UI-focused full-stack developer crafting fast, polished, production-ready web experiences. Next.js, React, TypeScript.",
    openGraph: {
        title: "Yogesh Kadam — Frontend Engineer · Chicago, IL",
        description:
            "UI-focused full-stack developer crafting fast, polished, production-ready web experiences. Next.js, React, TypeScript.",
        type: "website",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Yogesh Kadam — Frontend Engineer · Chicago, IL",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Yogesh Kadam — Frontend Engineer · Chicago, IL",
        description:
            "UI-focused full-stack developer crafting fast, polished, production-ready web experiences.",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${sora.variable}`}>
        <body className="min-h-dvh bg-background text-foreground antialiased font-sans">
        <ThemeProvider>
        <LenisProvider>
            <a
                href="#main"
                className="absolute -top-full left-4 z-[100] rounded-xl bg-brand px-4 py-2 text-brand-foreground transition-transform focus-visible:top-4 focus-visible:outline-none"
            >
                Skip to content
            </a>
            <SiteHeader />
            <main id="main" className="min-h-[calc(100dvh-4rem)]">{children}</main>
            <SiteFooter />
        </LenisProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
