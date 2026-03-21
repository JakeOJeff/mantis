export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        minHeight: "100vh",
        fontFamily:
          '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          borderBottom: "1px solid #27272a",
          padding: "0 2rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{ fontSize: "0.875rem", fontWeight: "500", color: "#ffffff" }}
        >
          mantis
        </span>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a
            href="#"
            style={{
              fontSize: "0.875rem",
              color: "#71717a",
              textDecoration: "none",
            }}
          >
            Docs
          </a>
          <a
            href="#"
            style={{
              fontSize: "0.875rem",
              color: "#71717a",
              textDecoration: "none",
            }}
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem 2rem",
          minHeight: "calc(100vh - 60px)",
          maxWidth: "700px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "4.5rem",
            fontWeight: "400",
            lineHeight: "1.1",
            marginBottom: "1.5rem",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          Minimal. Fast. Yours.
        </h1>

        <p
          style={{
            color: "#a1a1a6",
            fontSize: "1.25rem",
            lineHeight: "1.7",
            marginBottom: "2.5rem",
            textAlign: "center",
          }}
        >
          Deploy anything. Control everything. No platform lock-in, no complex
          abstractions.
        </p>

        <div
          style={{
            width: "100%",
            backgroundColor: "#111111",
            border: "1px solid #27272a",
            borderRadius: "6px",
            padding: "1rem 1.25rem",
            marginBottom: "2.5rem",
            fontSize: "1rem",
            color: "#e4e4e7",
            fontFamily: '"Geist Mono", monospace',
          }}
        >
          <span style={{ color: "#71717a", userSelect: "none" }}>$ </span>
          mantis deploy
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            style={{
              color: "#ffffff",
              fontSize: "1rem",
              border: "1px solid #ffffff",
              padding: "0.75rem 2rem",
              backgroundColor: "transparent",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Get Started →
          </button>
          <a
            href="#"
            style={{
              color: "#71717a",
              fontSize: "1rem",
              textDecoration: "none",
            }}
          >
            Learn more
          </a>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            width: "100%",
            marginTop: "4rem",
          }}
        >
          {[
            {
              title: "Lightweight & Fast",
              desc: "Built for performance with minimal overhead. Lightning-fast deployments and zero bloat.",
            },
            {
              title: "Zero Dependencies",
              desc: "Fully standalone with no external dependencies. Complete control over your stack.",
            },
            {
              title: "Simple CLI",
              desc: "One command to deploy. No complex configuration, no vendor lock-in.",
            },
            {
              title: "Full Control",
              desc: "Own your infrastructure. Deploy anywhere with complete flexibility and transparency.",
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #27272a",
                padding: "1.5rem",
                borderRadius: "6px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  color: "#ffffff",
                  marginBottom: "0.75rem",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#a1a1a6",
                  lineHeight: "1.7",
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
