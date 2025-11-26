// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Alaska OS — Live Port Intelligence",
  description: "Real-time port conditions, weather, webcams, excursion intel, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#00111c",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          margin: 0,
          padding: 0,
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
