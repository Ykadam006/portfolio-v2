"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/command-palette";
import { site } from "@/lib/site-data";

const nav = [
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
            <Container className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card shadow-sm">
            <span className="text-sm font-semibold tracking-tight">YK</span>
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-brand" />
          </span>
                    <span className="font-medium tracking-tight">{site.name}</span>
                </Link>

                <div className="flex items-center gap-3">
                    <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
                        {nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="hover:text-foreground transition"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        type="button"
                        className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:shadow-sm transition"
                        onClick={() =>
                            window.dispatchEvent(
                                new KeyboardEvent("keydown", { key: "k", metaKey: true })
                            )
                        }
                        aria-label="Open command palette"
                    >
                        Command <span className="text-xs">⌘K</span>
                    </button>

                    <a
                        href={site.links.resume}
                        className="hidden sm:inline-flex rounded-xl border border-border bg-card px-3 py-2 text-sm hover:shadow-sm transition"
                    >
                        Resume
                    </a>

                    <ThemeToggle />
                </div>
            </Container>

            {/* Mounted once; opens via ⌘K / Ctrl+K */}
            <CommandPalette />
        </header>
    );
}
