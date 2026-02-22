"use client";

/**
 * Small cartoon sticker for cards/sections.
 * Renders only when src is provided.
 */
export function CartoonSticker({
    src,
    alt = "",
    className = "",
    size = "sm",
}: {
    src: string;
    alt?: string;
    className?: string;
    size?: "sm" | "md";
}) {
    if (!src) return null;

    const sizeClass = size === "sm" ? "w-12 h-12" : "w-16 h-16";

    return (
        <div className={`shrink-0 ${sizeClass} ${className}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-contain opacity-90"
            />
        </div>
    );
}
