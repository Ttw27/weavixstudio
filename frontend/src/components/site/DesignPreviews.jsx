import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/*
  Side-by-side mini mockups of 6 design archetypes.
  Each tile is purposefully rendered in its OWN style (fonts, colors, layout)
  so you can judge the vibe at a glance.
*/

const archetypes = [
  {
    id: 1,
    name: "Minimal Editorial",
    theme: "Light · Serif · Magazine",
    vibe: "Luxury studio / boutique consultancy",
  },
  {
    id: 2,
    name: "Glassmorphism Futurist",
    theme: "Dark · Gradients · Glass panels",
    vibe: "AI / SaaS (the 'AI-slop' look — avoid)",
  },
  {
    id: 3,
    name: "Playful Neo-Retro",
    theme: "Bright · Chunky type · Playful",
    vibe: "Creative / content studio",
  },
  {
    id: 4,
    name: "Swiss Brutalist (CURRENT)",
    theme: "Dark · Grid borders · Signal red",
    vibe: "Confident creative + tech studio",
  },
  {
    id: 5,
    name: "3D Immersive",
    theme: "Dark · WebGL feel · Depth",
    vibe: "High-end portfolio / award sites",
  },
  {
    id: 6,
    name: "Editorial Tech",
    theme: "Light · Grid · Product-led",
    vibe: "Linear / Vercel style",
  },
];

// --- Individual mini-mockups ---

const Preview1 = () => (
  <div className="h-full w-full bg-[#F4EFE7] text-[#1a1a1a] p-6 flex flex-col justify-between overflow-hidden">
    <div className="flex items-center justify-between">
      <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-sm italic">Atelier No. 12</span>
      <span className="text-[10px] uppercase tracking-[0.3em]">Est. 2019</span>
    </div>
    <div>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-[2.4rem] leading-[1.05] italic">
        Design of <br/>quiet <span className="italic">rigor.</span>
      </div>
      <p className="mt-3 text-xs text-neutral-600 max-w-[80%]">Strategy, brand, and digital for considered businesses.</p>
    </div>
    <div className="flex gap-2">
      <span className="text-[10px] border border-neutral-800 px-3 py-1 rounded-full">View work</span>
      <span className="text-[10px] text-neutral-500 px-3 py-1">Contact →</span>
    </div>
  </div>
);

const Preview2 = () => (
  <div className="h-full w-full relative overflow-hidden text-white p-6 flex flex-col justify-between"
       style={{ background: "radial-gradient(circle at 20% 10%, #6C4DFF 0%, transparent 50%), radial-gradient(circle at 80% 80%, #00D4FF 0%, transparent 55%), #0a0b1e" }}>
    <div className="flex items-center justify-between text-xs">
      <span className="font-semibold tracking-tight">◇ Nexus AI</span>
      <span className="opacity-60">Product · Pricing · Docs</span>
    </div>
    <div>
      <div className="text-[2.2rem] leading-[1.05] font-semibold tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
        The AI copilot for modern teams
      </div>
      <p className="mt-3 text-xs opacity-70">Ship 10x faster with autonomous agents.</p>
    </div>
    <div className="flex gap-2">
      <span className="text-[10px] px-3 py-1.5 rounded-full bg-white text-black font-medium">Start free</span>
      <span className="text-[10px] px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">Book demo</span>
    </div>
  </div>
);

const Preview3 = () => (
  <div className="h-full w-full bg-[#FFDD4A] text-[#1a1a1a] p-6 flex flex-col justify-between overflow-hidden relative">
    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#FF5C8A]" />
    <div className="absolute bottom-4 left-4 w-10 h-10 bg-[#3ABEFF] rotate-12" />
    <div className="flex items-center justify-between relative z-10">
      <span style={{ fontFamily: "'Fredoka', sans-serif" }} className="text-lg font-black">splash!</span>
      <span className="text-[10px] uppercase font-bold">♥ say hi</span>
    </div>
    <div className="relative z-10">
      <div style={{ fontFamily: "'Fredoka', sans-serif" }} className="text-[2.2rem] leading-[1] font-black">
        Make stuff that makes <span className="bg-black text-[#FFDD4A] px-1">people</span> smile.
      </div>
    </div>
    <div className="relative z-10 flex gap-2">
      <span className="text-xs font-bold px-3 py-1.5 bg-black text-white rounded-full">let's play →</span>
    </div>
  </div>
);

const Preview4 = () => (
  <div className="h-full w-full bg-[#050505] text-[#F5F5F0] p-6 flex flex-col justify-between overflow-hidden border-2 border-[#FF2A2A]">
    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA]">
      <span>YOUR STUDIO.</span>
      <span>[ Remote · WW ]</span>
    </div>
    <div>
      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }} className="text-[2.3rem] leading-[0.88] font-extrabold uppercase tracking-tight">
        We build websites,<br/><span style={{ WebkitTextStroke: "1px #F5F5F0", color: "transparent" }}>ai</span> & <span className="text-[#FF2A2A]">growth</span>
      </div>
    </div>
    <div className="flex gap-2">
      <span className="text-[10px] uppercase tracking-[0.2em] font-mono bg-[#FF2A2A] text-black px-3 py-1.5 border-2 border-[#FF2A2A] font-bold">Book call</span>
      <span className="text-[10px] uppercase tracking-[0.2em] font-mono px-3 py-1.5 border-2 border-white font-bold">WhatsApp</span>
    </div>
  </div>
);

const Preview5 = () => (
  <div className="h-full w-full relative overflow-hidden text-white p-6 flex flex-col justify-between"
       style={{ background: "linear-gradient(180deg, #05010d 0%, #1a0933 100%)" }}>
    <div className="absolute top-8 right-8 w-28 h-28 rounded-full blur-2xl opacity-70"
         style={{ background: "radial-gradient(circle, #ff4d9f 0%, #6d2eff 60%, transparent 100%)" }} />
    <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full blur-2xl opacity-50"
         style={{ background: "radial-gradient(circle, #00e5ff 0%, transparent 60%)" }} />
    <div className="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.25em]">
      <span className="font-semibold">◎ ORBIT</span>
      <span className="opacity-60">Scroll ↓</span>
    </div>
    <div className="relative z-10">
      <div className="text-[2.2rem] leading-[1] font-light tracking-tight">
        Where<br/><span className="italic font-medium">craft</span> meets code.
      </div>
      <p className="mt-3 text-xs opacity-70 max-w-[80%]">Immersive digital experiences, rendered in real time.</p>
    </div>
    <div className="relative z-10 flex gap-2">
      <span className="text-[10px] px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20">Explore ↗</span>
    </div>
  </div>
);

const Preview6 = () => (
  <div className="h-full w-full bg-white text-[#111] p-6 flex flex-col justify-between overflow-hidden relative"
       style={{ backgroundImage: "linear-gradient(to right, #eee 1px, transparent 1px), linear-gradient(to bottom, #eee 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
    <div className="flex items-center justify-between text-xs">
      <span className="font-semibold tracking-tight">▲ Stacked</span>
      <div className="flex gap-4 text-neutral-500">
        <span>Product</span><span>Pricing</span><span>Docs</span>
      </div>
    </div>
    <div>
      <span className="inline-block text-[10px] px-2 py-1 bg-neutral-100 border border-neutral-200 rounded-full mb-3">NEW · v2.0</span>
      <div style={{ fontFamily: "'Inter', sans-serif" }} className="text-[2.2rem] leading-[1.05] font-semibold tracking-tight">
        The operating system<br/>for modern teams.
      </div>
      <p className="mt-2 text-xs text-neutral-600">Ship better product, faster. Built for engineers.</p>
    </div>
    <div className="flex gap-2">
      <span className="text-xs px-3 py-1.5 bg-black text-white rounded-md font-medium">Get started</span>
      <span className="text-xs px-3 py-1.5 border border-neutral-200 rounded-md">Read docs →</span>
    </div>
  </div>
);

const renderers = { 1: Preview1, 2: Preview2, 3: Preview3, 4: Preview4, 5: Preview5, 6: Preview6 };

export default function DesignPreviews() {
  return (
    <main data-testid="design-previews-page" className="min-h-screen bg-[#050505] text-[var(--text)]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-10 md:py-14">
        <div className="flex items-center justify-between mb-10">
          <Link
            to="/"
            data-testid="back-home"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-[var(--text-dim)] hover:text-[var(--text)]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--text-dim)]">
            Design / Archetype explorer
          </span>
        </div>

        <header className="mb-12 md:mb-16">
          <div className="eyebrow mb-4">[ Design / 6 options ]</div>
          <h1 className="display-xl text-[var(--text)] max-w-4xl">
            Pick a look.<br />
            <span className="outline-text">Same content,</span> <span className="text-[var(--accent)]">different feel.</span>
          </h1>
          <p className="mt-6 font-mono text-sm text-[var(--text-dim)] max-w-2xl">
            Each tile below is a miniature hero in that archetype's style —
            same studio name, different aesthetic. Tell me the number you want
            and I'll redesign the whole site to match.
          </p>
        </header>

        {/* The grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {archetypes.map((a) => {
            const R = renderers[a.id];
            const isCurrent = a.id === 4;
            return (
              <article
                key={a.id}
                data-testid={`archetype-${a.id}`}
                className={`group relative flex flex-col ${isCurrent ? "ring-2 ring-[var(--accent)]" : ""}`}
              >
                {/* Mini preview viewport */}
                <div className="relative aspect-[4/3] w-full border border-[var(--line)] overflow-hidden">
                  <R />
                </div>

                {/* Meta */}
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[var(--accent)]">
                        0{a.id}
                      </span>
                      <h3 className="font-display uppercase text-lg tracking-tight text-[var(--text)]">
                        {a.name}
                      </h3>
                    </div>
                    <p className="mt-1 font-mono text-xs text-[var(--text-dim)]">
                      {a.theme}
                    </p>
                    <p className="mt-1 font-mono text-xs text-[var(--text-dim)]">
                      → {a.vibe}
                    </p>
                  </div>

                  {isCurrent && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] bg-[var(--accent)] text-black px-2 py-1 whitespace-nowrap">
                      In use
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* How to choose */}
        <div className="mt-16 border border-[var(--line)] p-8 md:p-10">
          <div className="eyebrow mb-3 text-[var(--accent)]">How to pick</div>
          <h3 className="font-display uppercase text-2xl md:text-3xl tracking-tight text-[var(--text)] max-w-3xl">
            Just reply with a number (01–06) and I'll redesign the whole site.
          </h3>
          <p className="mt-4 font-mono text-sm text-[var(--text-dim)] max-w-2xl">
            Or combine — e.g. "03 but with the red accent from 04". Content
            stays the same; only the aesthetic changes.
          </p>
        </div>
      </div>
    </main>
  );
}
