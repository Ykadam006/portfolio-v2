import Link from "next/link";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
    title: "Blog — Yogesh Kadam",
    description: "Technical posts on frontend, full-stack, and performance. Spring Boot, React, component systems.",
};

function formatDate(raw: string): string {
    if (!raw) return "";
    const d = new Date(raw + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const CATEGORY_COLORS: Record<string, string> = {
    Performance:  "bg-brand/10 text-brand border-brand/20",
    Architecture: "bg-brand/[0.07] text-brand/80 border-brand/15",
    DevOps:       "bg-muted text-muted-foreground border-border",
    "Dev Process":"bg-brand/[0.05] text-brand/70 border-brand/10",
};

const ALL_TAGS = ["Performance", "React Patterns", "AWS", "Dev Process", "Architecture", "TypeScript"];

export default function BlogPage() {
    const posts = getAllPosts();
    const [featured, ...rest] = posts;

    return (
        <div className="section">
            <Container>
                <FadeIn>
                    <h1 className="h1">Blog</h1>
                    <p className="p mt-2 max-w-2xl text-muted-foreground">
                        Technical posts on performance, component architecture, and what I learn building production apps.
                    </p>
                </FadeIn>

                {/* Tag cloud */}
                <FadeIn delay={0.05}>
                    <div className="mt-8 flex flex-wrap gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground self-center mr-1">
                            I write about:
                        </span>
                        {ALL_TAGS.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </FadeIn>

                {posts.length === 0 && (
                    <p className="mt-12 text-muted-foreground">No posts yet. Check back soon.</p>
                )}

                {/* Featured post — big card */}
                {featured && (
                    <FadeIn delay={0.1}>
                        <article className="mt-12 group">
                            <Link
                                href={`/blog/${featured.slug}`}
                                className="relative block rounded-3xl border border-border bg-card p-7 sm:p-10 overflow-hidden transition-all duration-300 hover:border-brand/40 hover:shadow-xl hover:-translate-y-0.5"
                            >
                                {/* Code snippet bg texture — decorative only, hidden from AT */}
                                <div aria-hidden="true" className="absolute inset-0 opacity-[0.018] dark:opacity-[0.012] select-none overflow-hidden pointer-events-none font-mono text-[10px] leading-4 text-foreground p-6 whitespace-pre">
                                    {`@Query("SELECT p FROM Project p LEFT JOIN FETCH p.submissions")
List<Project> findAllWithSubmissions();

CREATE INDEX idx_project_id ON submissions(project_id);
CREATE INDEX idx_created_at ON projects(created_at DESC);

return PageRequest.of(page, 20, Sort.by("createdAt").descending());`}
                                </div>

                                {/* Featured badge */}
                                <div className="relative z-10 mb-4 inline-flex items-center gap-2">
                                    <span className="inline-flex items-center rotate-[-2deg] rounded-md bg-brand px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                                        Featured
                                    </span>
                                    {featured.category && (
                                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[featured.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                                            {featured.category}
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <time>{formatDate(featured.date)}</time>
                                        <span>·</span>
                                        <span>{featured.readTime} min read</span>
                                    </div>

                                    <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight leading-snug group-hover:text-brand transition-colors">
                                        <span className="relative">
                                            {featured.title}
                                            <span className="absolute bottom-0 left-0 h-[2px] bg-brand rounded-full w-0 group-hover:w-full transition-all duration-500 ease-out" />
                                        </span>
                                    </h2>
                                    <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">{featured.excerpt}</p>

                                    {featured.tags && featured.tags.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {featured.tags.map((tag) => (
                                                <span key={tag} className="text-xs rounded-md bg-muted/60 border border-border px-2 py-0.5 text-muted-foreground font-mono">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-brand font-semibold group-hover:gap-2.5 transition-all">
                                        Read article <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                    </span>
                                </div>
                            </Link>
                        </article>
                    </FadeIn>
                )}

                {/* Rest — 2-col grid */}
                {rest.length > 0 && (
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        {rest.map((post, i) => (
                            <FadeIn key={post.slug} delay={0.12 + 0.05 * i}>
                                <article className="group h-full">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="flex flex-col h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-lg hover:bg-brand/[0.02] hover:-translate-y-0.5"
                                    >
                                        <div className="flex items-center gap-2 mb-3">
                                            {post.category && (
                                                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[post.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                                                    {post.category}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                            <time>{formatDate(post.date)}</time>
                                            <span>·</span>
                                            <span>{post.readTime} min read</span>
                                        </div>

                                        <h2 className="text-lg font-semibold tracking-tight leading-snug group-hover:text-brand transition-colors flex-1">
                                            <span className="relative">
                                                {post.title}
                                                <span className="absolute bottom-0 left-0 h-[1.5px] bg-brand rounded-full w-0 group-hover:w-full transition-all duration-500 ease-out" />
                                            </span>
                                        </h2>
                                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>

                                        <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand font-medium">
                                            Read more →
                                        </span>
                                    </Link>
                                </article>
                            </FadeIn>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
