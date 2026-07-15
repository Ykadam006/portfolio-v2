import type { Metadata } from "next";
import { Container } from "@/components/container";
import { site } from "@/lib/site-data";
import { ContactForm } from "@/components/contact-form";
import { CartoonSticker } from "@/components/cartoon-sticker";
import { CopyEmail } from "@/components/copy-email";
import { LinkButton } from "@/components/button";
import { ResumeLink } from "@/components/resume-drawer";
import { SplitHeading } from "@/components/motion/split-heading";
import { FadeIn } from "@/components/fade-in";
import { AccentLine } from "@/components/motion/accent-line";

export const metadata: Metadata = {
    title: "Contact — Yogesh Kadam",
    description:
        "Get in touch — open to frontend, full-stack, and UI engineering roles across the US. Chicago, IL. Typically responds within 24 hours.",
};

export default function ContactPage() {
    return (
        <section className="section">
            <Container>
                <span className="inline-flex items-center gap-2 text-sm text-success mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                    </span>
                    Available · Responding within 24hrs
                </span>
                <SplitHeading as="h1" className="h1" trigger="load">
                    {"Let's work together"}
                </SplitHeading>
                <AccentLine className="mt-2" />
                <p className="p mt-4 max-w-2xl">
                    I&apos;m actively looking for frontend and full-stack roles across the United States. M.A.S. from Illinois Tech (May 2026).
                </p>

                {/* Strong CTAs — the four things a recruiter actually clicks */}
                <div className="mt-6 flex flex-wrap gap-3">
                    <LinkButton href={`mailto:${site.email}`} variant="primary">
                        Email me
                    </LinkButton>
                    <ResumeLink variant="secondary">Resume</ResumeLink>
                    <LinkButton href={site.links.linkedin} variant="secondary">
                        LinkedIn ↗
                    </LinkButton>
                    <LinkButton href={site.links.github} variant="secondary">
                        GitHub ↗
                    </LinkButton>
                </div>

                <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
                    <FadeIn>
                    <section className="card p-6 h-full">
                        <h2 className="h2">Direct contact</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Click to email, or copy with one click.
                        </p>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Email:</span>
                                <a
                                    href={`mailto:${site.email}`}
                                    className="text-sm text-brand underline underline-offset-4 hover:text-brand/90 font-medium"
                                >
                                    {site.email}
                                </a>
                                <CopyEmail email={site.email} />
                            </div>
                            <div className="pt-1">
                                <ResumeLink variant="secondary">Resume (PDF)</ResumeLink>
                            </div>
                            <p className="pt-2 text-sm text-muted-foreground">
                                <a
                                    href={site.links.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline underline-offset-4 hover:text-foreground"
                                >
                                    LinkedIn
                                </a>
                                {" · "}
                                <a
                                    href={site.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline underline-offset-4 hover:text-foreground"
                                >
                                    GitHub
                                </a>
                            </p>
                            <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
                                <p>Chicago, IL · CST (UTC–6)</p>
                                <p>Open to frontend, full-stack, and UI-focused roles.</p>
                                <p>Willing to relocate anywhere in the US</p>
                            </div>
                        </div>
                    </section>
                    </FadeIn>

                    <FadeIn delay={0.12}>
                    <section
                        className="card-glass p-6 relative h-full"
                        style={{ borderColor: "hsla(var(--brand) / 0.15)" }}
                    >
                        {site.assets?.stickerContact ? (
                            <div className="absolute top-4 right-4">
                                <CartoonSticker src={site.assets.stickerContact} size="sm" alt="" />
                            </div>
                        ) : (
                            <span
                                aria-hidden="true"
                                className="absolute top-4 right-4 rotate-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-brand/25 bg-card shadow-sm"
                            >
                                <span className="text-xs font-semibold tracking-tight">YK</span>
                                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-brand" />
                            </span>
                        )}
                        <div className="flex items-baseline gap-1.5">
                            <h2 className="h2">Let&apos;s build something</h2>
                            <span aria-hidden className="inline-block animate-pulse text-brand">✦</span>
                        </div>
                        <ContactForm />

                        {/* Social proof */}
                        <p className="mt-5 pt-4 border-t border-border text-xs text-muted-foreground text-center">
                            3 internships · 4.0 GPA · M.A.S. Illinois Tech · Chicago, IL
                        </p>
                    </section>
                    </FadeIn>
                </div>
            </Container>
        </section>
    );
}
