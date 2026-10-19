import { ImageResponse } from "next/og";
import { site } from "@/lib/site-data";

export const alt = "Yogesh Kadam — Full-Stack Software Engineer · Chicago";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* OG rendering can't read CSS vars, so the light-theme tokens are inlined. */
const BEIGE = "#E9E3D7";
const INK = "#13244F";
const COBALT = "#1546B5";
const SUN = "#F6BE1A";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: BEIGE, color: INK, fontFamily: "system-ui, sans-serif" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 0.9, letterSpacing: -3, textTransform: "uppercase" }}>{site.name}</div>
                    <div style={{ fontSize: 34, marginTop: 24 }}>{`${site.role} · ${site.location}`}</div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 26, color: COBALT, maxWidth: 560 }}>Give me a hard problem and a stack I don&apos;t know yet.</div>
                    {/* the staircase: five layers, the request on the top step */}
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                        {[1, 2, 3, 4, 5].map((h) => (
                            <div key={h} style={{ display: "flex", width: 72, height: h * 34, border: `3px solid ${COBALT}`, marginLeft: -3, background: h === 5 ? SUN : "transparent" }} />
                        ))}
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
