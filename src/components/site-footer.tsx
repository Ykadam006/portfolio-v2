"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/container";
import { site } from "@/lib/site-data";

const SOCIAL_LINKS = [
    {
        href: site.links.github,
        label: "GitHub",
        icon: Github,
        hoverClass: "hover:text-foreground hover:bg-foreground/10",
    },
    {
        href: site.links.linkedin,
        label: "LinkedIn",
        icon: Linkedin,
        hoverClass: "hover:text-brand hover:bg-brand/10",
    },
    {
        href: `mailto:${site.email}`,
        label: "Email",
        icon: Mail,
        hoverClass: "hover:text-brand hover:bg-brand/10",
    },
];

export function SiteFooter() {
    return (
        <footer className="border-t border-border">
            <Container className="py-16 sm:py-20">
                {/* Big CTA */}
                <div className="text-center mb-12 sm:mb-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        Available for work · May 2026
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
                        <a
                            href={site.links.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-secondary px-6 py-2.5 text-base"
                        >
                            View resume ↗
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
                    {/* Brand + availability pill */}
                    <div className="flex items-center gap-3">
                        <span className="font-medium tracking-tight">{site.name}</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                            </span>
                            Open to US-wide roles
                        </span>
                    </div>

                    {/* Social icons */}
                    <div className="flex items-center gap-1">
                        {SOCIAL_LINKS.map(({ href, label, icon: Icon, hoverClass }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("mailto") ? undefined : "_blank"}
                                rel={href.startsWith("mailto") ? undefined : "noreferrer"}
                                aria-label={label}
                                className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 ${hoverClass}`}
                            >
                                <Icon className="h-[18px] w-[18px]" />
                            </a>
                        ))}
                    </div>

                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} {site.name}. Built with Next.js.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
