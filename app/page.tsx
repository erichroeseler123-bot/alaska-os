// app/page.tsx
import { redis } from "@/lib/redis";

export default async function HomePage() {
  // Load the homepage object from Redis
  let homepage = null;

  try {
    const raw = await redis.get("homepage");
    if (raw) {
      homepage = typeof raw === "string" ? JSON.parse(raw) : raw;
    }
  } catch (err) {
    console.error("Redis error:", err);
  }

  // If nothing in Redis → show “not generated”
  if (!homepage) {
    return (
      <main
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#00111c",
          padding: "40px 20px",
          minHeight: "100vh",
          color: "white",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "800",
            marginBottom: "40px",
            color: "#7cd3ff"
          }}
        >
          Alaska OS — Live Port Intelligence
        </h1>

        <p style={{ fontSize: "20px" }}>Homepage data not generated yet.</p>
        <p style={{ fontSize: "16px" }}>
          Visit <code>/api/generate</code> to build the data.
        </p>
      </main>
    );
  }

  // When homepage exists → show details
  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        background: "#00111c",
        padding: "40px 20px",
        minHeight: "100vh",
        color: "white",
        maxWidth: "900px",
        margin: "0 auto"
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "800",
          textAlign: "center",
          marginBottom: "40px",
          color: "#7cd3ff"
        }}
      >
        Alaska OS — Live Port Intelligence
      </h1>

      <h2 style={{ opacity: 0.8, marginBottom: "20px" }}>
        Homepage Loaded
      </h2>

      <div
        style={{
          background: "#002332",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #004455",
          fontSize: "16px"
        }}
      >
        <p><strong>Generated At:</strong> {new Date(homepage.generatedAt).toUTCString()}</p>
        <p><strong>Message:</strong> {homepage.message}</p>
      </div>
    </main>
  );
}
