"use client";

import { site } from "@/lib/site-data";
import { HeroIllustration } from "@/components/hero-illustration";

export function HeroCartoon() {
    const src = site.assets?.heroCartoon;

    if (!src) {
        return <HeroIllustration />;
    }

    return (
        <div className="relative hidden lg:block w-full max-w-[280px] mx-auto">
            <div className="absolute -inset-8 bg-gradient-to-br from-brand/5 to-brand/[0.02] rounded-3xl blur-2xl -z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt=""
                className="w-full h-auto object-contain drop-shadow-lg"
            />
        </div>
    );
}
