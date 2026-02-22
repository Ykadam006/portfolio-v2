import Link from "next/link";
import { Container } from "@/components/container";
import { site } from "@/lib/site-data";

export default function NotFound() {
    const sticker404 = site.assets?.sticker404;

    return (
        <section className="section min-h-[60vh] flex flex-col items-center justify-center text-center">
            <Container>
                {sticker404 && (
                    <div className="mb-6 flex justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={sticker404}
                            alt=""
                            className="w-24 h-24 object-contain opacity-80"
                        />
                    </div>
                )}
                <h1 className="h1">Looks like this page didn&apos;t deploy</h1>
                <p className="p mt-4 max-w-md mx-auto">
                    The route you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="btn-primary mt-8"
                >
                    Back home
                </Link>
            </Container>
        </section>
    );
}
