import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
    title: "Writing — Yogesh Kadam",
    description: "Notes on what I learn building production apps: component systems, APIs and the decisions behind them.",
};

function formatDate(raw: string): string {
    if (!raw) return "";
    return new Date(raw + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="frame pb-24 pt-14 sm:pb-32">
            <h1 className="h1">Writing</h1>
            <p className="lead mt-6">Notes on what I learn building production apps, and the decisions behind them.</p>

            {posts.length === 0 ? (
                <p className="mt-16 text-muted-foreground">Nothing published yet.</p>
            ) : (
                <ol className="mt-20 space-y-16">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link href={`/blog/${post.slug}`} className="group grid gap-x-6 gap-y-3 lg:grid-cols-12">
                                <p className="text-muted-foreground lg:col-span-3">
                                    {formatDate(post.date)} · {post.readTime} min read
                                </p>
                                <div className="min-w-0 lg:col-span-8 lg:col-start-5">
                                    <h2 className="h2 transition-colors group-hover:text-brand">{post.title}</h2>
                                    <p className="mt-3 max-w-[62ch] text-muted-foreground">{post.excerpt}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
}
