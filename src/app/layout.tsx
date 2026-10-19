// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { GeistSans } from "geist/font/sans";
import { Big_Shoulders } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReadingProgress } from "@/components/motion/reading-progress";
import { ResumeDrawer } from "@/components/resume-drawer";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site-url";

const bigShoulders = Big_Shoulders({
    subsets: ["latin"],
    variable: "--font-big-shoulders",
    display: "swap",
    /* next/font has no metrics for this face; the metric-matched fallback
       lives in globals.css so the swap doesn't reflow headings. */
    adjustFontFallback: false,
    fallback: ["Big Shoulders Fallback", "Arial", "sans-serif"],
});

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#e9e3d7" },
        { media: "(prefers-color-scheme: dark)", color: "#0c1838" },
    ],
};

const TITLE = "Yogesh Kadam — Full-Stack Software Engineer · Chicago";
const DESCRIPTION =
    "Full-stack software engineer in Chicago. React, Next.js, TypeScript, Node, and PostgreSQL day to day, plus Spring Boot, Go, and Kafka in projects I built to learn them.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description: DESCRIPTION,
    /* "./" resolves against each route's path — one line, per-page canonicals */
    alternates: { canonical: "./" },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        siteName: "Yogesh Kadam",
        type: "website",
        url: "./",
        images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: TITLE }],
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
        <html
            lang="en"
            suppressHydrationWarning
            className={`${GeistSans.variable} ${bigShoulders.variable}`}
        >
            <body suppressHydrationWarning className="min-h-dvh bg-background font-sans text-foreground antialiased">
                <JsonLd />
                <ThemeProvider>
                        <a
                            href="#main"
                            className="absolute -top-full left-4 z-[100] rounded-[var(--radius)] bg-brand px-4 py-2 text-brand-foreground focus-visible:top-4"
                        >
                            Skip to content
                        </a>
                        <ReadingProgress />
                        <SiteHeader />
                        <main id="main" className="min-h-[calc(100dvh-4rem)]">
                            {/* Page cuts: the old page dips out, the new one rises in (globals.css) */}
                            <ViewTransition default="page">{children}</ViewTransition>
                        </main>
                        <SiteFooter />
                        <ResumeDrawer />
                </ThemeProvider>
            </body>
        </html>
    );
}
