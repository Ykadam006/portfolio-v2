// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCTA } from "@/components/mobile-cta";
import { ScrollProgress } from "@/components/scroll-progress";
import { CardGlowEffect } from "@/components/card-glow-effect";
import { Achievements } from "@/components/achievements";
import { ResumeDrawer } from "@/components/resume-drawer";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site-url";
const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
    display: "swap",
});

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#fdf4f7" },
        { media: "(prefers-color-scheme: dark)",  color: "#0d0d14" },
    ],
};

const TITLE = "Yogesh Kadam — Frontend & Full-Stack Engineer · React/Next.js · Chicago";
const DESCRIPTION =
    "Frontend & full-stack engineer in Chicago. I build fast, accessible web apps with React, Next.js, TypeScript, and Tailwind — shipped products, internships, and UI-focused case studies.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description: DESCRIPTION,
    /* "./" resolves against each route's path — one line, per-page canonicals */
    alternates: { canonical: "./" },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        siteName: "Yogesh Kadam | Frontend Engineer",
        type: "website",
        url: "./",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: TITLE,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: ["/opengraph-image"],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${sora.variable}`}>
        <body suppressHydrationWarning className="min-h-dvh bg-background text-foreground antialiased font-sans">
        <JsonLd />
        <ThemeProvider>
        <LenisProvider>
            <a
                href="#main"
                className="absolute -top-full left-4 z-[100] rounded-xl bg-brand px-4 py-2 text-brand-foreground transition-transform focus-visible:top-4 focus-visible:outline-none"
            >
                Skip to content
            </a>
            <ScrollProgress />
            <SiteHeader />
            <main id="main" className="min-h-[calc(100dvh-4rem)]">{children}</main>
            <SiteFooter />
            <MobileCTA />
            <CardGlowEffect />
            <Achievements />
            <ResumeDrawer />
        </LenisProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
