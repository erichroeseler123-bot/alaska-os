// app/page.tsx
import { redis } from "@/lib/redis";

export default async function HomePage() {
  let homepage = null;

  try {
    const raw = await redis.get("homepage");
    homepage = raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Redis error:", err);
  }

  if (!homepage) {
    return (
      <main style={{ background:"#00111c", color:"white", height:"100vh",
        display:"flex", flexDirection:"column", justifyContent:"center",
        alignItems:"center" }}>
        <h1>Alaska OS — Live Port Intelligence</h1>
        <p>No homepage data found.</p>
        <p>Visit <code>/api/generate</code> to create the data.</p>
      </main>
    );
  }

  return (
    <main style={{ background:"#00111c", color:"white", minHeight:"100vh", padding:"40px" }}>
      <h1 style={{ fontSize:"40px", textAlign:"center", color:"#9fe1ff" }}>
        Alaska OS — Live Port Intelligence
      </h1>

      <div style={{ marginTop:"50px", background:"#002332", padding:"30px",
        borderRadius:"12px", border:"1px solid #004455" }}>
        <h2 style={{ fontSize:"26px", color:"#7cd3ff" }}>Homepage Loaded</h2>

        <p style={{ marginTop:"10px", opacity:0.9 }}>
          <strong>Generated At:</strong> {new Date(homepage.generatedAt).toLocaleString()}
        </p>

        <p style={{ marginTop:"10px", opacity:0.9 }}>
          <strong>Status:</strong> {homepage.message}
        </p>
      </div>
    </main>
  );
}
