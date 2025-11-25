// app/page.tsx
import { redis } from "@/lib/redis";

export default async function HomePage() {
  // Load homepage data directly from Redis
  let homepage = null;

  try {
    const raw = await redis.get("homepage");
    if (raw) homepage = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch (err) {
    console.error("Redis read error:", err);
  }

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
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "800",
          textAlign: "center",
          marginBottom: "40px",
          color: "#7cd3ff",
        }}
      >
        Alaska OS — Live Port Intelligence
      </h1>

      {!homepage ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "80px",
            fontSize: "20px",
          }}
        >
          <p>Homepage data not generated yet.</p>
          <p>
            Visit <code>/api/generate</code> to build the data.
          </p>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: "20px", opacity: 0.8 }}>
            Generated At: {new Date(homepage.generatedAt).toLocaleString()}
          </h2>

          <div
            style={{
              marginTop: "30px",
              fontSize: "22px",
              background: "#002332",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #004455",
            }}
          >
            <strong>Message:</strong> {homepage.message}
          </div>
        </>
      )}
    </main>
  );
}
