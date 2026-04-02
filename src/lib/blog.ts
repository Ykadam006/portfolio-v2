import path from "path";
import fs from "fs";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
    title: string;
    date: string;
    excerpt: string;
    category?: string;
    tags?: string[];
};

export type BlogPost = BlogPostMeta & {
    slug: string;
    readTime: number;
};

function getSlugFromFilename(filename: string): string {
    return filename.replace(/\.mdx?$/, "");
}

export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(BLOG_DIR)) return [];
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
    const posts: BlogPost[] = [];
    for (const file of files) {
        const slug = getSlugFromFilename(file);
        const fullPath = path.join(BLOG_DIR, file);
        const raw = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(raw);
        const wordCount = content.split(/\s+/).filter(Boolean).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));
        posts.push({
            slug,
            title: data.title ?? slug,
            date: data.date ?? "",
            excerpt: data.excerpt ?? "",
            category: data.category,
            tags: data.tags,
            readTime,
        });
    }
    return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getPostBySlug(slug: string): { content: string; meta: BlogPostMeta; readTime: number } | null {
    for (const ext of [".mdx", ".md"]) {
        const fullPath = path.join(BLOG_DIR, `${slug}${ext}`);
        if (fs.existsSync(fullPath)) {
            const raw = fs.readFileSync(fullPath, "utf-8");
            const { data, content } = matter(raw);
            const wordCount = content.split(/\s+/).filter(Boolean).length;
            return {
                content,
                meta: {
                    title: data.title ?? slug,
                    date: data.date ?? "",
                    excerpt: data.excerpt ?? "",
                    category: data.category,
                    tags: data.tags,
                },
                readTime: Math.max(1, Math.ceil(wordCount / 200)),
            };
        }
    }
    return null;
}
