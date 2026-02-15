import Link from "next/link";
import { Container } from "@/components/container";
import { site } from "@/lib/site-data";

export function SiteFooter() {
    return (
        <footer className="border-t border-border bg-card/50">
            <Container className="py-12 sm:py-16">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-foreground">
                            Best way to reach me:{" "}
                            <a
                                href={`mailto:${site.email}`}
                                className="text-brand underline underline-offset-4 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:rounded"
                            >
                                {site.email}
                            </a>
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {site.location} ·{" "}
                            <a
                                href={site.links.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:rounded"
                            >
                                LinkedIn
                            </a>{" "}
                            ·{" "}
                            <a
                                href={site.links.github}
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:rounded"
                            >
                                GitHub
                            </a>
                        </p>
                        <p className="mt-2 text-sm font-medium text-brand">{site.openToRoles}</p>
                    </div>
                    <Link
                        href="/contact"
                        className="btn-primary shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                    >
                        Let&apos;s talk
                    </Link>
                </div>
                <p className="mt-8 text-xs text-muted-foreground">
                    © {new Date().getFullYear()} {site.name}. Built with Next.js.
                </p>
            </Container>
        </footer>
    );
}
