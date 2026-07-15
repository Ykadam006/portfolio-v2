"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { Container } from "@/components/container";
import { ResumeLink } from "@/components/resume-drawer";
import { site } from "@/lib/site-data";

const FOOTER_NAV = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/experience", label: "Experience" },
    { href: "/skills", label: "Skills" },
    { href: "/uses", label: "Uses" },
    { href: "/contact", label: "Contact" },
];

const footerLinkClass =
    "text-muted-foreground hover:text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded";

export function SiteFooter() {
    // The contact page IS the destination of this CTA — suppress the big block
    // there so the page stays calm and doesn't point to itself.
    const isContactPage = usePathname() === "/contact";

    return (
        <footer className="border-t border-border" style={{ background: "linear-gradient(to bottom, hsl(var(--background)), hsl(var(--muted) / 0.4))" }}>
            <Container className={isContactPage ? "py-8" : "py-16 sm:py-20"}>
                {/* Big CTA */}
                {!isContactPage && (
                <div className="text-center mb-12 sm:mb-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        Available for work
                    </p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight"
                        style={{ fontFamily: "var(--font-sora), var(--font-geist-sans), ui-sans-serif, sans-serif" }}
                    >
                        Let&apos;s build something{" "}
                        <span className="relative inline-block">
                            <span className="text-brand">great.</span>
                            <motion.span
                                className="absolute left-0 bottom-0 h-[3px] bg-brand rounded-full"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                                style={{ originX: 0, width: "100%" }}
                            />
                        </span>
                    </motion.h2>
                    <p className="mt-4 text-base text-muted-foreground max-w-md mx-auto">
                        Open to frontend &amp; full-stack roles across the US. Chicago, IL · Remote-friendly.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link href="/contact" className="btn-primary px-6 py-2.5 text-base">
                            Get in touch
                        </Link>
                        <ResumeLink
                            className="btn-secondary px-6 py-2.5 text-base"
                            style={{ borderWidth: "1.5px", borderColor: "hsl(var(--foreground) / 0.7)" }}
                        >
                            View resume
                        </ResumeLink>
                    </div>
                </div>
                )}

                {/* Brand / explore / connect */}
                <div className={`grid gap-10 sm:grid-cols-3 pb-10 ${isContactPage ? "" : "pt-8 border-t border-border"}`}>
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card shadow-sm">
                                <span className="text-sm font-semibold tracking-tight">YK</span>
                                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand ring-2 ring-background" />
                            </span>
                            <span className="font-medium tracking-tight">{site.name}</span>
                        </div>
                        <div className="mt-4">
                            <span className="chip chip-status">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                                </span>
                                Open to US-wide roles
                            </span>
                        </div>
                        <a
                            href={`mailto:${site.email}`}
                            className={`mt-3 inline-block text-sm ${footerLinkClass} hover:text-brand`}
                        >
                            {site.email}
                        </a>
                    </div>

                    {/* Explore */}
                    <nav aria-label="Footer navigation">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                            Explore
                        </p>
                        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                            {FOOTER_NAV.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className={footerLinkClass}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Connect */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                            Connect
                        </p>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href={site.links.github} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 ${footerLinkClass}`}>
                                    <Github className="h-4 w-4" /> GitHub ↗
                                </a>
                            </li>
                            <li>
                                <a href={site.links.linkedin} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 ${footerLinkClass}`}>
                                    <Linkedin className="h-4 w-4" /> LinkedIn ↗
                                </a>
                            </li>
                            <li>
                                <ResumeLink className={`inline-flex items-center gap-2 ${footerLinkClass}`}>
                                    <FileText className="h-4 w-4" /> Resume
                                </ResumeLink>
                            </li>
                            <li>
                                <a href={`mailto:${site.email}`} className={`inline-flex items-center gap-2 ${footerLinkClass}`}>
                                    <Mail className="h-4 w-4" /> Email
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom line */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-border text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
                    <p>Built with Next.js, TypeScript, Tailwind, and GSAP.</p>
                </div>
            </Container>
        </footer>
    );
}
