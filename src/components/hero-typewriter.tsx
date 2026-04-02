"use client";

import { TypeAnimation } from "react-type-animation";

const BEFORE = "UI-focused full-stack developer crafting ";
const AFTER = " production-ready web experiences.";

export function HeroTypewriter() {
    return (
        <>
            {BEFORE}
            <TypeAnimation
                sequence={[
                    "polished,",
                    2400,
                    "fast,",
                    2400,
                    "pixel-perfect,",
                    2400,
                    "accessible,",
                    2400,
                ]}
                wrapper="span"
                cursor
                repeat={Infinity}
                className="text-brand"
            />
            {AFTER}
        </>
    );
}
