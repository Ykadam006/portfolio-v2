import { Container } from "@/components/container";
import { site } from "@/lib/site-data";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
    return (
        <section className="section">
            <Container>
                <h1 className="h1">Contact</h1>
                <p className="p mt-4 max-w-2xl">
                    Fastest way: send a message here (it opens your email client) or reach me directly.
                </p>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <section className="card p-6">
                        <h2 className="h2">Direct</h2>
                        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <p><span className="text-foreground/90">Email:</span> {site.email}</p>
                        <p><span className="text-foreground/90">Phone:</span> {site.phone}</p>
                        <p className="pt-2">
                            <a className="underline underline-offset-4 hover:opacity-80" href={site.links.linkedin}>LinkedIn</a>
                            {" · "}
                            <a className="underline underline-offset-4 hover:opacity-80" href={site.links.github}>GitHub</a>
                        </p>
                        </div>
                    </section>

                    <section className="card p-6">
                        <h2 className="h2">Send a message</h2>
                        <ContactForm />
                    </section>
                </div>
            </Container>
        </section>
    );
}
