// app/page.tsx
import { redis } from "@/lib/redis";

export default async function HomePage() {
  let homepage: any = null;

  try {
    const raw = await redis.get("homepage");
    if (raw) {
      homepage = typeof raw === "string" ? JSON.parse(raw) : raw;
    }
  } catch (err) {
    console.error("Redis error:", err);
  }

  return (
    <main
      style={{
        backgroundColor: "#02131d",
        color: "white",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          fontWeight: 800,
          textAlign: "center",
          marginBottom: "24px",
          color: "#7cd3ff",
        }}
      >
        Alaska OS — Live Port Intelligence
      </h1>

      {!homepage ? (
        <div
          style={{
            marginTop: "60px",
            textAlign: "center",
            fontSize: "18px",
            opacity: 0.9,
          }}
        >
          <p>Homepage data not generated yet.</p>
          <p>
            Visit <code>/api/generate</code> once, then refresh this page.
          </p>
        </div>
      ) : (
        <>
          <p style={{ opacity: 0.8, marginTop: "8px" }}>
            {homepage.message}
          </p>

          <p style={{ marginTop: "16px", fontSize: "14px", opacity: 0.7 }}>
            Generated at:{" "}
            {new Date(homepage.generatedAt).toLocaleString("en-US", {
              timeZone: "UTC",
            })}{" "}
            (UTC)
          </p>

          <section
            style={{
              marginTop: "32px",
              padding: "20px",
              borderRadius: "12px",
              background: "#002332",
              border: "1px solid #004455",
            }}
          >
            <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>
              Raw homepage data
            </h2>
            <pre
              style={{
                fontSize: "13px",
                backgroundColor: "#000814",
                padding: "16px",
                borderRadius: "8px",
                overflowX: "auto",
              }}
            >
              {JSON.stringify(homepage, null, 2)}
            </pre>
          </section>
        </>
      )}
    </main>
  );
}
