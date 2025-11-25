import Image from "next/image";

export default async function HomePage() {
  const homepage = await fetch(
    `${process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""}/api/data/homepage`,
    { cache: "no-store" }
  ).then((r) => r.json()).catch(() => null);

  return (
    <main style={{
      fontFamily: "system-ui, sans-serif",
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

      {!homepage ? (
        <div style={{ textAlign: "center", marginTop: "80px", fontSize: "20px" }}>
          <p>Homepage data not generated yet.</p>
          <p>Visit <code>/api/generate</code> to build the data.</p>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: "20px", opacity: 0.8 }}>
            Last Updated: {homepage.lastUpdatedUTC}
          </h2>

          <div style={{ marginTop: "30px" }}>
            {homepage.ports.map((p: any) => (
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
                  transition: "0.2s",
                }}
              >
                <h3 style={{ fontSize: "24px", color: "#9fe1ff" }}>{p.name}</h3>
                <p style={{ opacity: 0.8 }}>{p.summary}</p>
              </a>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
