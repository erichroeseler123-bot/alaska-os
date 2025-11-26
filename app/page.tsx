// app/page.tsx
import { redis } from "@/lib/redis";

export default async function HomePage() {
  // Load from Redis
  let homepage = null;

  try {
    const raw = await redis.get("homepage");
    if (raw) {
      homepage = typeof raw === "string" ? JSON.parse(raw) : raw;
    }
  } catch (err) {
    console.error("Redis error:", err);
  }

  if (!homepage) {
    return (
      <main style={{
        background: "#00111c",
        minHeight: "100vh",
        color: "white",
        padding: "60px 20px",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#7cd3ff", fontSize: "42px" }}>
          Alaska OS — Live Port Intelligence
        </h1>
        <p style={{ marginTop: "20px" }}>Homepage data not generated yet.</p>
        <p>Visit <code>/api/generate</code> to build the data.</p>
      </main>
    );
  }

  return (
    <main style={{
      background: "#00111c",
      minHeight: "100vh",
      color: "white",
      padding: "40px 20px",
      maxWidth: "900px",
      margin: "0 auto"
    }}>
      
      <h1 style={{ color: "#7cd3ff", fontSize: "42px", textAlign: "center" }}>
        Alaska OS — Live Port Intelligence
      </h1>

      <p style={{ opacity: 0.8, marginTop: "10px" }}>
        Generated at: {homepage.lastUpdatedUTC}
      </p>

      <div style={{ marginTop: "40px" }}>
        {homepage.ports.map((p: any) => (
          <a
            key={p.slug}
            href={`/port/${p.slug}`}
            style={{
              display: "block",
              marginBottom: "20px",
              padding: "20px",
              background: "#002332",
              borderRadius: "12px",
              border: "1px solid #004455",
              textDecoration: "none"
            }}
          >
            <h3 style={{ color: "#9fe1ff", fontSize: "24px" }}>{p.name}</h3>
            <p style={{ opacity: 0.8 }}>{p.summary}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
