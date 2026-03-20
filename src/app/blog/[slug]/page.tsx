import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getMDXComponents } from "@/components/mdx-components";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post not found" };
    return {
        title: `${post.meta.title} — Yogesh Kadam`,
        description: post.meta.excerpt,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const { content } = await compileMDX({
        source: post.content,
        options: {
            parseFrontmatter: false,
            mdxOptions: {},
        },
        components: getMDXComponents({}),
    });

    return (
        <div className="section">
            <Container className="max-w-3xl">
                <FadeIn>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to blog
                    </Link>

                    <header className="mb-10">
                        <time className="text-sm text-muted-foreground">{post.meta.date}</time>
                        <h1 className="h1 mt-2">{post.meta.title}</h1>
                        <p className="p mt-2 text-muted-foreground">{post.meta.excerpt}</p>
                    </header>

                    <article className="prose-invert">{content}</article>
                </FadeIn>
            </Container>
        </div>
    );
}
