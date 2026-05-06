// Renders a stylised mini-mockup for a project tile, based on `preview.type`.
// Each type is a different "fake site preview" — playful and brand-y.

const Wrap = ({ bg, fg, children }) => (
  <div
    className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between"
    style={{ background: bg, color: fg }}
  >
    {children}
  </div>
);

const TopBar = ({ brand, fg, accent }) => (
  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] font-bold opacity-80">
    <div className="flex items-center gap-1.5">
      <span style={{ background: accent || fg }} className="w-2 h-2 rounded-full inline-block" />
      <span>{brand}</span>
    </div>
    <span>↗</span>
  </div>
);

export const ProjectPreview = ({ project }) => {
  const { brand, tagline, preview, results = [] } = project;
  const { type, bg, fg } = preview;

  switch (type) {
    case "fintech":
      return (
        <Wrap bg={bg} fg={fg}>
          <TopBar brand={brand} fg={fg} accent="#FFDD4A" />
          <div>
            <div className="font-display text-3xl md:text-4xl leading-[0.95] tracking-tight">
              Capital that moves <span style={{ color: "#FFDD4A" }}>fast.</span>
            </div>
            <p className="mt-2 text-xs opacity-70">{tagline}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: "#FFDD4A", color: "#161616" }}>
              View deals →
            </span>
            <span className="text-[10px] px-2.5 py-1 rounded-full border" style={{ borderColor: fg, color: fg }}>
              Investors
            </span>
          </div>
        </Wrap>
      );

    case "wellness":
      return (
        <Wrap bg={bg} fg={fg}>
          <TopBar brand={brand} fg={fg} accent="#FF5C8A" />
          <div className="flex flex-col items-start">
            <div className="w-12 h-12 rounded-full bg-white border-[2.5px] border-[var(--ink)] mb-3 flex items-center justify-center text-2xl">
              🌱
            </div>
            <div className="font-display text-3xl md:text-4xl leading-[0.95] tracking-tight max-w-[80%]">
              Tiny habits, <span className="font-hand text-[var(--p-pink)] text-4xl md:text-5xl">big</span> wins.
            </div>
            <p className="mt-2 text-xs opacity-80">{tagline}</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-[var(--ink)] text-white font-bold">Get the app</span>
          </div>
        </Wrap>
      );

    case "ecom":
      return (
        <Wrap bg={bg} fg={fg}>
          <TopBar brand={brand} fg={fg} accent="#FFFBF0" />
          <div>
            <div className="font-display text-3xl md:text-4xl leading-[0.95] tracking-tight italic">
              summer<br/>
              <span style={{ background: "#FFFBF0", color: "#FF5C8A", padding: "0 8px", borderRadius: 8 }}>drop'25</span>
            </div>
            <p className="mt-2 text-xs opacity-90">{tagline}</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-[var(--ink)] text-[#FFFBF0] font-bold">Shop ↗</span>
            <span className="text-[10px] px-2.5 py-1 rounded-full border-[1.5px]" style={{ borderColor: fg }}>Lookbook</span>
          </div>
        </Wrap>
      );

    case "ai":
      return (
        <Wrap bg={bg} fg={fg}>
          <TopBar brand={brand} fg={fg} accent="#161616" />
          <div>
            <span className="text-[10px] px-2 py-0.5 bg-[var(--ink)] text-[#3ABEFF] rounded-full font-bold inline-block mb-3">
              ◆ Live agent
            </span>
            <div className="font-display text-2xl md:text-3xl leading-[1] tracking-tight">
              Reconciled <span className="font-mono">2,481</span> invoices today.
            </div>
            <div className="mt-3 flex gap-2 flex-wrap text-[10px]">
              <span className="px-2 py-1 rounded bg-white/60 border border-[var(--ink)]">OCR → 99.4%</span>
              <span className="px-2 py-1 rounded bg-white/60 border border-[var(--ink)]">Anomaly: 3</span>
            </div>
          </div>
          <div className="text-[10px] font-bold">Agent uptime · 99.98%</div>
        </Wrap>
      );

    case "portfolio":
      return (
        <Wrap bg={bg} fg={fg}>
          <TopBar brand={brand} fg={fg} accent="#FF5C8A" />
          <div>
            <div className="font-display text-3xl md:text-4xl leading-[0.95] tracking-tight">
              <span className="italic">Selected</span><br/>works, 2018–'25.
            </div>
            <p className="mt-2 text-xs opacity-80">{tagline}</p>
          </div>
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em]">
            <span>↳ Index of 32 projects</span>
            <span>Scroll →</span>
          </div>
        </Wrap>
      );

    case "social":
      return (
        <Wrap bg={bg} fg={fg}>
          <TopBar brand={brand} fg={fg} accent="#FF5C8A" />
          <div className="grid grid-cols-3 gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-md border-[1.5px] border-[var(--ink)]"
                style={{
                  background: ["#FFDD4A", "#FF5C8A", "#FFFBF0", "#3ABEFF", "#FFFBF0", "#FFDD4A"][i - 1],
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span>@{brand.toLowerCase()}</span>
            <span>+38k followers</span>
          </div>
        </Wrap>
      );

    default:
      return (
        <Wrap bg={bg} fg={fg}>
          <TopBar brand={brand} fg={fg} />
          <div className="font-display text-3xl">{brand}</div>
          <p className="text-xs">{tagline}</p>
        </Wrap>
      );
  }
};

export default ProjectPreview;
