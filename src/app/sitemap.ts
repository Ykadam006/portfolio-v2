import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/site-data";
import { SITE_URL } from "@/lib/site-url";

const BASE = SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = getAllPosts();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
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

    const projectRoutes: MetadataRoute.Sitemap = projects
        .filter((p) => p.links.caseStudy)
        .map((p) => ({
            url: `${BASE}${p.links.caseStudy}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.85,
        }));

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
