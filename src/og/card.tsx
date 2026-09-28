import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const NIGHT = "#0a0a0b";
const BONE = "#ece7de";
const ASH = "#9d978d";

const root = process.cwd();

async function fonts() {
  const [regular, italic, mark] = await Promise.all([
    readFile(join(root, "src/og/InstrumentSerif-Regular.ttf")),
    readFile(join(root, "src/og/InstrumentSerif-Italic.ttf")),
    readFile(join(root, "src/og/Poppins-Medium.ttf")),
  ]);
  return [
    { name: "Serif", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "Serif", data: italic, style: "italic" as const, weight: 400 as const },
    { name: "Mark", data: mark, style: "normal" as const, weight: 500 as const },
  ];
}

async function dataUri(path: string, type: string) {
  return `data:${type};base64,${(await readFile(path)).toString("base64")}`;
}

/** The same waveform shape as the hero, as fixed bars. */
function Bars({ count, height, color }: { count: number; height: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, height }}>
      {Array.from({ length: count }, (_, i) => {
        const t = i / (count - 1);
        const envelope = Math.sin(Math.PI * t) ** 1.3;
        const jitter = 0.35 + 0.65 * Math.abs(Math.sin(i * 12.9898) * Math.cos(i * 4.1414));
        const h = Math.max(2, envelope * jitter * height);
        return <div key={i} style={{ width: 3, height: h, borderRadius: 2, background: color }} />;
      })}
    </div>
  );
}

/** A still frame of the site's VHS "hush": colour passes out of register, scanlines in the letters. */
function VhsHush({ size }: { size: number }) {
  const layer = { position: "absolute" as const, top: 0, left: 0, fontFamily: "Mark", fontSize: size, lineHeight: 1, letterSpacing: -0.03 * size };
  return (
    <div style={{ display: "flex", position: "relative", fontFamily: "Mark", fontSize: size, lineHeight: 1, letterSpacing: -0.03 * size }}>
      <div style={{ ...layer, color: "#ff4fa3", opacity: 0.9, transform: `translateX(${-0.05 * size}px)` }}>hush</div>
      <div style={{ ...layer, color: "#7a5cff", opacity: 0.9, transform: `translateX(${0.05 * size}px)` }}>hush</div>
      <div
        style={{
          display: "flex",
          color: "transparent",
          backgroundImage: `repeating-linear-gradient(to bottom, ${BONE} 0px, ${BONE} 2px, rgba(236,231,222,0.45) 2px, rgba(236,231,222,0.45) 3px)`,
          backgroundClip: "text",
        }}
      >
        hush
      </div>
    </div>
  );
}

/** Home and anything without its own card. */
export async function studioCard() {
  const logo = await dataUri(join(root, "src/og/hush.png"), "image/png");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: NIGHT, fontFamily: "Serif", color: BONE }}>
        <img src={logo} width={120} height={120} style={{ position: "absolute", top: 48, left: 56 }} />
        <VhsHush size={104} />
        <div style={{ marginTop: 18, fontSize: 34, fontStyle: "italic", color: ASH }}>stories you don&apos;t have to see to believe</div>
        <div style={{ display: "flex", marginTop: 30 }}>
          <Bars count={110} height={110} color={BONE} />
        </div>
        <div style={{ position: "absolute", bottom: 52, left: 56, display: "flex", fontSize: 40 }}>
          <span style={{ fontStyle: "italic", color: ASH }}>close your eyes.</span>
        </div>
        <div style={{ position: "absolute", bottom: 58, right: 56, fontSize: 26, color: ASH }}>Hush Studios</div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}

/** A show or work: its art, its colour, its title. */
export async function productionCard(p: { title: string; kicker?: string; art?: string; accent: string; comingSoon?: boolean }) {
  const [logo, art] = await Promise.all([
    dataUri(join(root, "src/og/hush.png"), "image/png"),
    p.art ? dataUri(join(root, "public", p.art), p.art.endsWith(".png") ? "image/png" : "image/jpeg") : Promise.resolve(null),
  ]);
  const titleSize = p.title.length > 16 ? 84 : 112;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: `radial-gradient(ellipse 70% 90% at 80% 50%, ${p.accent}40, ${NIGHT} 70%)`,
          backgroundColor: NIGHT,
          fontFamily: "Serif",
          color: BONE,
          padding: "0 56px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          {p.kicker && <div style={{ fontSize: 30, fontStyle: "italic", color: p.accent }}>{p.kicker}</div>}
          <div style={{ fontSize: titleSize, lineHeight: 0.95, marginTop: 18, letterSpacing: -1 }}>{p.title}</div>
          {p.comingSoon && (
            <div style={{ display: "flex", marginTop: 30 }}>
              <div style={{ background: BONE, color: NIGHT, fontSize: 24, padding: "6px 14px" }}>Coming soon</div>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", marginTop: 56, fontSize: 26, color: ASH }}>
            <img src={logo} width={44} height={44} style={{ marginRight: 14 }} />
            Hush Studios
          </div>
        </div>
        {art && <img src={art} width={480} height={480} style={{ objectFit: "cover", boxShadow: "0 30px 80px rgba(0,0,0,0.7)" }} />}
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
