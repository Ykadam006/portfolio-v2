import Link from "next/link";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
    title: "Blog — Yogesh Kadam",
    description: "Technical posts on frontend, full-stack, and performance. Spring Boot, React, component systems.",
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="section">
            <Container>
                <FadeIn>
                    <h1 className="h1">Blog</h1>
                    <p className="p mt-2 max-w-2xl text-muted-foreground">
                        Technical posts on performance, component architecture, and what I learn building production apps.
                    </p>
                </FadeIn>

                <div className="mt-12 space-y-8">
                    {posts.map((post, i) => (
                        <FadeIn key={post.slug} delay={0.05 * (i + 1)}>
                            <article className="group">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="block rounded-2xl border border-border bg-card p-6 sm:p-8 transition hover:border-brand/50 hover:shadow-lg"
                                >
                                    <time className="text-sm text-muted-foreground">{post.date}</time>
                                    <h2 className="mt-2 text-xl font-semibold tracking-tight group-hover:text-brand transition">
                                        {post.title}
                                    </h2>
                                    <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand font-medium">
                                        Read more →
                                    </span>
                                </Link>
                            </article>
                        </FadeIn>
                    ))}
                </div>

                {posts.length === 0 && (
                    <p className="mt-12 text-muted-foreground">No posts yet. Check back soon.</p>
                )}
            </Container>
        </div>
    );
}
