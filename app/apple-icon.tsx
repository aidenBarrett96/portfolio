import { ImageResponse } from "next/og";

// iOS home-screen icon (rendered to PNG at build time).
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
          background: "#2733e6",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 4C16.65 11.6 20.4 15.35 28 16C20.4 16.65 16.65 20.4 16 28C15.35 20.4 11.6 16.65 4 16C11.6 15.35 15.35 11.6 16 4Z"
            fill="#f3efe4"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
