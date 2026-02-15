import { ImageResponse } from "next/og";

export const alt = "Yogesh Kadam — Full-Stack / Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginBottom: 24,
                    }}
                >
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 16,
                            background: "linear-gradient(135deg, #f472b6 0%, #c084fc 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 24,
                            fontWeight: 700,
                            color: "white",
                        }}
                    >
                        YK
                    </div>
                </div>
                <div style={{ fontSize: 48, fontWeight: 700, color: "white", marginBottom: 12 }}>
                    Yogesh Kadam
                </div>
                <div style={{ fontSize: 24, color: "#94a3b8", marginBottom: 8 }}>
                    Frontend Engineer / Full-Stack (UI-focused)
                </div>
                <div style={{ fontSize: 18, color: "#64748b" }}>
                    React · Next.js · TypeScript · Chicago, IL
                </div>
            </div>
        ),
        { ...size }
    );
}
