// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** True only for links to an actual repository — never a bare profile. */
export function isRepoLink(url?: string): boolean {
    return !!url && /^https?:\/\/github\.com\/[^/]+\/[^/]+/.test(url);
}
