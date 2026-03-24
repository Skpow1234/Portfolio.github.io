import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
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
          justifyContent: "space-between",
          padding: "64px",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 28,
            color: "#d4d4d4",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "9999px",
              background: "#fafafa",
            }}
          />
          Juan Hurtado Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            Juan Hurtado
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#d4d4d4",
              maxWidth: "90%",
              lineHeight: 1.2,
            }}
          >
            Senior Software Engineer who ships reliable, performant platforms
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#a3a3a3",
          }}
        >
          <span>Go • Node.js • .NET • Java</span>
          <span>juan-hurtado-senior-sde.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
