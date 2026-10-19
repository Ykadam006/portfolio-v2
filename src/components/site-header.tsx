"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/command-palette";
import { ResumeLink } from "@/components/resume-drawer";

const nav = [
    { href: "/projects", label: "Work" },
    { href: "/experience", label: "Experience" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Writing" },
];

/** In the mobile menu only. */
const more = [
    { href: "/skills", label: "Skills" },
    { href: "/uses", label: "Uses" },
    { href: "/contact", label: "Contact" },
];

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

/** A plain bar: wordmark, a few links, one action. */
export function SiteHeader() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 bg-background">
            <div className="frame flex h-[4.5rem] items-center justify-between gap-6">
                <Link href="/" className="whitespace-nowrap font-display text-2xl font-bold uppercase leading-none" aria-label="Yogesh Kadam, home">
                    <span className="sm:hidden">YK</span>
                    <span className="hidden sm:inline">Yogesh Kadam</span>
                </Link>

                <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
                    {nav.map((item) => (
                        <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined} className="nav-link">
                            {item.label}
                        </Link>
                    ))}
                    <ResumeLink className="nav-link">Resume</ResumeLink>
                </nav>

                <div className="flex items-center gap-2">
                    <Link href="/contact" className="btn-primary !min-h-11">
                        Contact
                    </Link>
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] bg-foreground/[0.07] md:hidden"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {open && (
                <nav id="mobile-nav" aria-label="Mobile" className="absolute inset-x-0 top-full bg-background pb-6 md:hidden">
                    <ul className="frame">
                        {[...nav, ...more].map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                                    className="flex min-h-14 items-center font-display text-3xl font-bold uppercase aria-[current=page]:text-brand"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <ResumeLink onClick={() => setOpen(false)} className="flex min-h-14 items-center font-display text-3xl font-bold uppercase">
                                Resume
                            </ResumeLink>
                        </li>
                    </ul>
                </nav>
            )}

            <CommandPalette />
        </header>
    );
}
