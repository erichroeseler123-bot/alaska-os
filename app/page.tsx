// app/page.tsx
import { redis } from "@/lib/redis";

export default async function HomePage() {
  // Load homepage data from Redis
  let homepage: any = null;

  try {
    const raw = await redis.get("homepage");
    if (raw) homepage = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch (err) {
    console.error("Redis error:", err);
  }

  // If no homepage data exists
  if (!homepage) {
    return (
      <main style={{
        background: "#00111c",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <h1>Alaska OS — Live Port Intelligence</h1>
        <p>Homepage data not generated yet.</p>
        <p>Visit <code>/api/generate</code> to build the data.</p>
      </main>
    );
  }

  // Homepage exists — display it
  return (
    <main style={{
      background: "#00111c",
      padding: "40px 20px",
      minHeight: "100vh",
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

      <h2 style={{ fontSize: "16px", opacity: 0.8 }}>
        Generated At: {homepage.lastUpdatedUTC}
      </h2>

      <div style={{ marginTop: "40px" }}>
        {homepage.ports?.map((p: any) => (
          <a
            key={p.slug}
            href={`/port/${p.slug}`}
            style={{
              display: "block",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "16px",
              textDecoration: "none",
              background: "#002332",
              border: "1px solid #004455",
              transition: "0.2s"
            }}
          >
            <h3 style={{ fontSize: "24px", color: "#9fe1ff" }}>{p.name}</h3>
            <p style={{ opacity: 0.8 }}>{p.summary}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
