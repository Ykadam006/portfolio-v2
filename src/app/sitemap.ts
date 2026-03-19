import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://yk-studio.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = getAllPosts();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${BASE}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE}/experience`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE}/skills`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE}/uses`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    ];

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${BASE}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [...staticRoutes, ...blogRoutes];
}
