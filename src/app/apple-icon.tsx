import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #f472b6 0%, #c084fc 100%)",
                    borderRadius: 40,
                    fontSize: 76,
                    fontWeight: 700,
                    color: "white",
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: -4,
                }}
            >
                YK
            </div>
        ),
        { ...size }
    );
}
