import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
                heading: ["var(--font-sora)", "var(--font-geist-sans)", "ui-sans-serif", "sans-serif"],
            },
            colors: {
                brand: "hsl(var(--brand))",
                "brand-foreground": "hsl(var(--brand-foreground))",
            },
            ringColor: {
                brand: "hsla(var(--brand) / 0.35)",
            },
        },
    },
    plugins: [],
};

export default config;
