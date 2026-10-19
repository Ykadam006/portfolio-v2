"use client";

import { usePathname } from "next/navigation";
import { ScrollProgress } from "@/components/scroll-progress";

/**
 * Chooses what the top progress bar is measuring.
 *
 * On a blog post it tracks the article body, so the bar answers "how much
 * reading is left" rather than "how much page is left" — those differ by a
 * header, a footer and a CTA block. Everywhere else it tracks the document.
 *
 * Keyed on pathname so the underlying ScrollTrigger is rebuilt on navigation
 * instead of holding a reference to the previous route's article element.
 */
export function ReadingProgress() {
    const pathname = usePathname();
    const isPost = /^\/blog\/[^/]+$/.test(pathname);

    return <ScrollProgress key={pathname} target={isPost ? "#post-body" : undefined} />;
}
