// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Alaska OS — Live Port Intelligence",
  description: "Real-time port intelligence for Alaska cruise ports.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#00111c",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          minHeight: "100vh",
          width: "100vw",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </body>
    </html>
  );
}
