import { Container } from "@/components/container";
import { site } from "@/lib/site-data";
import { ContactForm } from "@/components/contact-form";
import { CartoonSticker } from "@/components/cartoon-sticker";

export default function ContactPage() {
    return (
        <section className="section">
            <Container>
                <h1 className="h1">Contact</h1>
                <p className="p mt-4 max-w-2xl">
                    Fastest way: send a message here (it opens your email client) or reach me
                    directly.
                </p>
                <p className="mt-2 text-sm text-brand font-medium">{site.replyNote}</p>

                <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
                    <section className="card p-6">
                        <h2 className="h2">Direct contact</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Click to email or call. I typically reply within 24 hours.
                        </p>
                        <div className="mt-4 space-y-3">
                            <p className="text-sm">
                                <span className="text-muted-foreground">Email:</span>{" "}
                                <a
                                    href={`mailto:${site.email}`}
                                    className="text-brand underline underline-offset-4 hover:text-brand/90 font-medium"
                                >
                                    {site.email}
                                </a>
                            </p>
                            <p className="text-sm">
                                <span className="text-muted-foreground">Phone:</span>{" "}
                                <a
                                    href={`tel:${site.phone.replace(/\D/g, "")}`}
                                    className="text-brand underline underline-offset-4 hover:text-brand/90 font-medium"
                                >
                                    {site.phone}
                                </a>
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
                        </div>
                    </section>

                    <section className="card p-6 relative">
                        {site.assets?.stickerContact && (
                            <div className="absolute top-4 right-4">
                                <CartoonSticker src={site.assets.stickerContact} size="sm" alt="" />
                            </div>
                        )}
                        <h2 className="h2">Let&apos;s build something</h2>
                        <ContactForm />
                    </section>
                </div>
            </Container>
        </section>
    );
}
