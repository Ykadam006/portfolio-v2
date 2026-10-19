import Link from "next/link";
import { Container } from "@/components/container";
import { NotFoundMotion } from "@/components/motion/not-found-motion";

const HEADLINE = "This page took a wrong step.";

export default function NotFound() {
    return (
        <section className="flex min-h-[70svh] flex-col justify-center py-24">
            <Container>
                <NotFoundMotion headline={HEADLINE}>
                    <h1 data-404-title className="h1">
                        {HEADLINE}
                    </h1>
                    <p data-404-item className="p mt-5">
                        Error 404: the page you&apos;re looking for doesn&apos;t exist or has moved.
                    </p>
                    <div data-404-item className="mt-8 flex flex-wrap gap-3">
                        <Link href="/" className="btn-primary">
                            Back home
                        </Link>
                        <Link href="/projects" className="btn-secondary">
                            See the work
                        </Link>
                    </div>
                </NotFoundMotion>
            </Container>
        </section>
    );
}
