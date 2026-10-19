import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getMDXComponents } from "@/components/mdx-components";

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
        <article className="frame grid gap-x-6 pb-24 pt-14 sm:pb-32 lg:grid-cols-12">
            <div className="lg:col-span-3">
                <Link href="/blog" className="btn-ghost">
                    ← All writing
                </Link>
                <p className="mt-6 text-muted-foreground">
                    <time dateTime={post.meta.date}>{post.meta.date}</time>
                </p>
            </div>
            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
                <header>
                    <h1 className="h1">{post.meta.title}</h1>
                    <p className="lead mt-6 text-muted-foreground">{post.meta.excerpt}</p>
                </header>
                <div id="post-body" className="mt-12 max-w-[68ch]">
                    {content}
                </div>
            </div>
        </article>
    );
}
