// app/page.tsx
import { redis } from "@/lib/redis";

export default async function HomePage() {
  let homepage: { generatedAt?: number; message?: string } | null = null;

  try {
    const raw = await redis.get("homepage");
    console.log("Redis raw:", raw);

    if (typeof raw === "string") {
      homepage = JSON.parse(raw);
    } else if (raw && typeof raw === "object") {
      homepage = raw;
    }
  } catch (err) {
    console.error("Redis error:", err);
  }

  if (!homepage || !homepage.generatedAt) {
    return (
      <div style={{
        backgroundColor: "#02131d",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px"
      }}>
        <h1 style={{ fontSize: "42px", fontWeight: 800, color: "#7cd3ff" }}>
          Alaska OS — Live Port Intelligence
        </h1>
        <p style={{ fontSize: "18px", marginTop: "20px", opacity: 0.8 }}>
          Homepage data not generated yet.
        </p>
        <p>Visit <code>/api/generate</code> to build the data.</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: "#02131d",
      color: "white",
      minHeight: "100vh",
      padding: "40px 20px",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      <h1 style={{
        fontSize: "42px",
        fontWeight: 800,
        textAlign: "center",
        color: "#7cd3ff"
      }}>
        Alaska OS — Live Port Intelligence
      </h1>

      <div style={{ marginTop: "40px" }}>
        <p style={{ opacity: 0.8 }}>
          Generated At: {new Date(homepage.generatedAt).toLocaleString()}
        </p>
        <p style={{ opacity: 0.8 }}>Message: {homepage.message}</p>
      </div>
    </div>
  );
}
