import { Container } from "@/components/container";
import { site } from "@/lib/site-data";
import { ContactForm } from "@/components/contact-form";
import { CartoonSticker } from "@/components/cartoon-sticker";
import { CopyEmail } from "@/components/copy-email";

export default function ContactPage() {
    return (
        <section className="section">
            <Container>
                <h1 className="h1">Let&apos;s work together</h1>
                <p className="p mt-4 max-w-2xl">
                    I&apos;m actively looking for frontend and full-stack roles across the United States. Graduating May 2026. I typically respond within 24 hours.
                </p>

                <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
                    <section className="card p-6">
                        <h2 className="h2">Direct contact</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Click to email, or copy with one click. I typically reply within 24 hours.
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
                            <p className="text-sm text-muted-foreground">
                                Phone: <span className="font-medium text-foreground/70">Available on request</span>
                            </p>
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
                                <p>Open to: Frontend / Full-stack / UI Engineer roles</p>
                                <p>Willing to relocate anywhere in the US</p>
                                <p>Response time: within 24 hours</p>
                            </div>
                        </div>
                    </section>

                    <section className="card p-6 relative">
                        {site.assets?.stickerContact && (
                            <div className="absolute top-4 right-4">
                                <CartoonSticker src={site.assets.stickerContact} size="sm" alt="" />
                            </div>
                        )}
                        <h2 className="h2">
                            Let&apos;s build something
                            <span className="ml-1 inline-block animate-pulse text-brand">✦</span>
                        </h2>
                        <ContactForm />

                        {/* Social proof */}
                        <p className="mt-5 pt-4 border-t border-border text-xs text-muted-foreground text-center">
                            3 internships · 4.0 GPA · Graduating May 2026 · Chicago, IL
                        </p>
                    </section>
                </div>
            </Container>
        </section>
    );
}
