/**
 * Canonical site origin — single source of truth for metadataBase,
 * sitemap, and robots. Override per environment with NEXT_PUBLIC_SITE_URL
 * (e.g. preview deploys); production falls back to the real domain.
 */
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://yk-kadam.tech";
