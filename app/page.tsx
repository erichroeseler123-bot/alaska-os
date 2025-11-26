// app/page.tsx
import { redis } from "@/lib/redis";

export default async function HomePage() {
  // Load homepage data directly from Redis
  let homepage = null;

  try {
    const raw = await redis.get("homepage");
    if (raw) {
      homepage = typeof raw === "string" ? JSON.parse(raw) : raw;
    }
  } catch (err) {
    console.error("Redis error:", err);
  }

  // Show "not generated" screen
  if (!homepage) {
    return (
      <main style={{
        fontFamily: "system-ui, sans-serif",
        background: "#00111c",
        minHeight: "100vh",
        padding: "40px 20px",
        color: "white",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#7cd3ff", fontSize: "42px", fontWeight: "800" }}>
          Alaska OS — Live Port Intelligence
        </h1>

        <p style={{ marginTop: "40px", fontSize: "20px" }}>
          Homepage data not generated yet.
        </p>
        <p>Visit <code>/api/generate</code> to build the data.</p>
      </main>
    );
  }

  // Homepage loaded
  return (
    <main style={{
      fontFamily: "system-ui, sans-serif",
      background: "#00111c",
      minHeight: "100vh",
      padding: "40px 20px",
      color: "white",
      maxWidth: "900px",
      margin: "0 auto"
    }}>
      
      <h1 style={{
        fontSize: "42px",
        fontWeight: "800",
        textAlign: "center",
        marginBottom: "40px",
        color: "#7cd3ff"
      }}>
        Alaska OS — Live Port Intelligence
      </h1>

      <h2 style={{ opacity: 0.8, marginBottom: "30px" }}>
        Generated At: {homepage.lastUpdatedUTC}
      </h2>

      <div style={{ marginTop: "20px" }}>
        {homepage.ports.map((p: any) => (
          <a
            key={p.slug}
            href={`/port/${p.slug}`}
            style={{
              display: "block",
              background: "#002332",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "16px",
              textDecoration: "none",
              border: "1px solid #004455",
              color: "white"
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
