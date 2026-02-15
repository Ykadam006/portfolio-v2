"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/command-palette";
import { site } from "@/lib/site-data";
import { Menu, X } from "lucide-react";

const nav = [
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
];

function openCommandPalette() {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
}

export function SiteHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <Container className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
                    <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card shadow-sm">
                        <span className="text-sm font-semibold tracking-tight">YK</span>
                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand ring-2 ring-background" />
                    </span>
                    <span className="font-medium tracking-tight">{site.name}</span>
                </Link>

                <div className="flex items-center gap-2 sm:gap-3">
                    <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
                        {nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="hover:text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:rounded-lg"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        type="button"
                        onClick={openCommandPalette}
                        className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                        aria-label="Open command palette (⌘K)"
                    >
                        <span className="hidden lg:inline">Command</span>
                        <span className="text-xs">⌘K</span>
                    </button>

                    <a
                        href={site.links.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:inline-flex rounded-xl border border-border bg-card px-3 py-2 text-sm hover:shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                    >
                        Resume
                    </a>

                    <button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card hover:shadow-sm transition"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>

                    <ThemeToggle />
                </div>
            </Container>

            {/* Mobile nav overlay */}
            {mobileOpen && (
                <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-lg">
                    <Container className="py-4 flex flex-col gap-1">
                        {nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted transition"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button
                            type="button"
                            onClick={() => { openCommandPalette(); setMobileOpen(false); }}
                            className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted transition text-left flex items-center gap-2"
                        >
                            Command palette <span className="text-xs text-muted-foreground">⌘K</span>
                        </button>
                        <Link
                            href={site.links.resume}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted transition"
                        >
                            Resume
                        </Link>
                    </Container>
                </div>
            )}

            <CommandPalette />
        </header>
    );
}
