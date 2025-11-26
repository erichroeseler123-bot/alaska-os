// app/page.tsx
import { redis } from "@/lib/redis";

export default async function HomePage() {
  let homepage: any = null;

  try {
    const raw = await redis.get("homepage");

    // Handle both strings AND objects safely
    if (typeof raw === "string") {
      homepage = JSON.parse(raw);
    } else if (typeof raw === "object" && raw !== null) {
      homepage = raw; // Already parsed by Upstash
    }
  } catch (err) {
    console.error("Redis parse error:", err);
  }

  if (!homepage) {
    return (
      <div
        style={{
          backgroundColor: "#02131d",
          color: "white",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h1>Alaska OS — Live Port Intelligence</h1>
        <p>Homepage data not generated yet.</p>
        <p>Visit <code>/api/generate</code> to build the data.</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: "#02131d",
      color: "white",
      minHeight: "100vh",
      padding: "40px"
    }}>
      <h1>Alaska OS — Live Port Intelligence</h1>

      <h2 style={{ marginTop: "40px" }}>Homepage Loaded</h2>

      <pre style={{
        background: "#002332",
        padding: "20px",
        borderRadius: "12px",
        whiteSpace: "pre-wrap",
        overflowX: "auto"
      }}>
        {JSON.stringify(homepage, null, 2)}
      </pre>
    </div>
  );
}
