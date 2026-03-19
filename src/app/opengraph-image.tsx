import { ImageResponse } from "next/og";

export const alt = "Yogesh Kadam — Frontend Engineer · Chicago, IL";
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
                    background: "#0f172a",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginBottom: 32,
                    }}
                >
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: 16,
                            background: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 28,
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
                <div style={{ fontSize: 28, color: "white", marginBottom: 8 }}>
                    Frontend Engineer · Chicago, IL
                </div>
                <div style={{ fontSize: 20, color: "#94a3b8" }}>
                    Next.js · React · TypeScript
                </div>
            </div>
        ),
        { ...size }
    );
}
