// app/page.tsx
import { redis } from "@/lib/redis";
import Link from "next/link";

export default async function HomePage() {
  let homepage = null;

  try {
    const raw = await redis.get("homepage");
    if (raw) {
      homepage = typeof raw === "string" ? JSON.parse(raw) : raw;
    }
  } catch (err) {
    console.error("Redis error:", err);
  }

  // If homepage not generated
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
      </main>
    );
  }

  // If homepage exists — show it
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

      <h2 style={{ fontSize: "20px", opacity: 0.8 }}>
        Homepage generated at:{" "}
        {new Date(homepage.generatedAt).toLocaleString()}
      </h2>

      <div style={{ marginTop: "40px" }}>
        {/* Fake ports until we generate ports properly */}
        {[
          { slug: "juneau", name: "Juneau" },
          { slug: "skagway", name: "Skagway" },
          { slug: "ketchikan", name: "Ketchikan" },
          { slug: "sitka", name: "Sitka" },
          { slug: "icy", name: "Icy Strait Point" },
          { slug: "haines", name: "Haines" },
          { slug: "seward", name: "Seward" },
          { slug: "whittier", name: "Whittier" },
        ].map((p) => (
          <Link
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
            }}
          >
            <h3 style={{ fontSize: "24px", color: "#9fe1ff" }}>{p.name}</h3>
            <p style={{ opacity: 0.7 }}>Live data intelligence →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
