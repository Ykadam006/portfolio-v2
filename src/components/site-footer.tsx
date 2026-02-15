import { Container } from "@/components/container";
import { site } from "@/lib/site-data";

export function SiteFooter() {
    return (
        <footer className="border-t border-border">
            <Container className="py-10 text-sm text-muted-foreground flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} {site.name}. Built with Next.js.</p>
                <p className="opacity-80">{site.location} · {site.email}</p>
            </Container>
        </footer>
    );
}
