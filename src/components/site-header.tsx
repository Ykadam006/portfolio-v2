"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/command-palette";
import { site } from "@/lib/site-data";
import { Menu, X } from "lucide-react";

const nav = [
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/experience", label: "Experience" },
    { href: "/skills", label: "Skills" },
    { href: "/uses", label: "Uses" },
    { href: "/contact", label: "Contact" },
];

function openCommandPalette() {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
}

export function SiteHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY, scrollYProgress } = useScroll();
    const [scrolledPast60, setScrolledPast60] = useState(false);
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolledPast60(latest > 60);
    });

    return (
        <>
            {/* Scroll progress bar — 2px pink line at top */}
            <motion.div
                className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-brand origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <header
                className={`sticky top-0 z-50 border-b transition-all duration-300 bg-background/75 backdrop-blur-[20px] ${
                    scrolledPast60
                        ? "border-border/70 shadow-sm shadow-border/10 saturate-180"
                        : "border-transparent"
                }`}
                style={{ WebkitBackdropFilter: "blur(20px) saturate(180%)" }}
            >
                <Container className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
                        {site.assets?.avatar ? (
                            <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={site.assets.avatar}
                                    alt=""
                                    className="h-9 w-9 rounded-full object-cover border border-border shadow-sm"
                                />
                                <span className="font-medium tracking-tight">{site.name}</span>
                            </>
                        ) : (
                            <>
                                <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card shadow-sm group/badge">
                                    <span className="text-sm font-semibold tracking-tight">YK</span>
                                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand ring-2 ring-background group-hover/badge:animate-ping transition-none" />
                                </span>
                                <span className="font-medium tracking-tight">{site.name}</span>
                            </>
                        )}
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
                            {nav.map((item) => {
                                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                                return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`nav-link hover:text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:rounded-lg ${isActive ? "text-foreground font-medium" : ""}`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-active"
                                            className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-brand"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                        />
                                    )}
                                </Link>
                                );
                            })}
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

                {/* Mobile nav overlay — staggered slide-in */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="md:hidden border-t border-border bg-card/95 backdrop-blur-lg overflow-hidden"
                        >
                            <Container className="py-4 flex flex-col gap-1">
                                {[...nav, { href: "/resume", label: "Resume", _isResume: true }].map((item, i) => {
                                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                                    const isResume = "_isResume" in item;
                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: -12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04, duration: 0.2, ease: "easeOut" }}
                                        >
                                            {isResume ? (
                                                <a
                                                    href={site.links.resume}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={() => setMobileOpen(false)}
                                                    className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted transition"
                                                >
                                                    Resume ↗
                                                </a>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className={`block rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted transition flex items-center justify-between ${isActive ? "text-brand bg-brand/5" : ""}`}
                                                >
                                                    {item.label}
                                                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
                                                </Link>
                                            )}
                                        </motion.div>
                                    );
                                })}
                                <motion.div
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: nav.length * 0.04, duration: 0.2, ease: "easeOut" }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => { openCommandPalette(); setMobileOpen(false); }}
                                        className="w-full rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted transition text-left flex items-center gap-2"
                                    >
                                        Command palette <span className="text-xs text-muted-foreground">⌘K</span>
                                    </button>
                                </motion.div>
                            </Container>
                        </motion.div>
                    )}
                </AnimatePresence>

                <CommandPalette />
            </header>
        </>
    );
}
