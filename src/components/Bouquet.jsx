import { motion } from "framer-motion";
import TiltCard from "./TiltCard.jsx";

const stems = [
  "M150 300 C150 240 150 190 150 110",
  "M150 300 C140 240 110 200 92 140",
  "M150 300 C160 240 190 200 208 140",
  "M150 300 C135 250 80 230 52 190",
  "M150 300 C165 250 220 230 248 190"
];
const big = "M-20 -6 C-22 -30 -12 -40 -10 -40 L0 -26 L10 -40 C12 -40 22 -30 20 -6 C18 10 -18 10 -20 -6Z";
const mid = "M-18 -6 C-20 -28 -11 -36 -9 -36 L0 -24 L9 -36 C11 -36 20 -28 18 -6 C16 9 -16 9 -18 -6Z";
const sm = "M-16 -5 C-18 -25 -10 -32 -8 -32 L0 -21 L8 -32 C10 -32 18 -25 16 -5 C14 8 -14 8 -16 -5Z";
const tulips = [
  { t: "translate(150 110)", d: big, f: "url(#tA)" },
  { t: "translate(92 140) rotate(-14)", d: mid, f: "url(#tB)" },
  { t: "translate(208 140) rotate(14)", d: mid, f: "url(#tC)" },
  { t: "translate(52 190) rotate(-28)", d: sm, f: "url(#tC)" },
  { t: "translate(248 190) rotate(28)", d: sm, f: "url(#tA)" }
];

// Bó tulip tự mọc và nở khi cuộn tới, nghiêng 3D theo ngón tay
export default function Bouquet() {
  const view = { once: true, amount: 0.4 };
  return (
    <TiltCard className="mx-auto w-[min(78vw,380px)]" max={18}>
      <svg viewBox="0 0 300 340" className="h-auto w-full overflow-visible drop-shadow-[0_20px_24px_rgba(110,42,58,.18)]" aria-label="Bó hoa tulip" role="img">
        <defs>
          <linearGradient id="tA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffb3c4" /><stop offset="1" stopColor="#d9587a" /></linearGradient>
          <linearGradient id="tB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd9e1" /><stop offset="1" stopColor="#ef8fa8" /></linearGradient>
          <linearGradient id="tC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe2c7" /><stop offset="1" stopColor="#f29b7f" /></linearGradient>
        </defs>
        {stems.map((d, i) => (
          <motion.path key={d} d={d} fill="none" stroke="#6f9b6a" strokeWidth="4" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={view}
            transition={{ delay: i * 0.15, duration: 1.3, ease: "easeOut" }} />
        ))}
        {["M150 250 C120 230 112 205 118 190 C135 205 148 225 150 250Z", "M150 250 C180 230 188 205 182 190 C165 205 152 225 150 250Z"].map((d, i) => (
          <motion.path key={d} d={d} fill="#86b47f" style={{ transformBox: "fill-box", originY: 1 }}
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={view}
            transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 160, damping: 10 }} />
        ))}
        {tulips.map((tl, i) => (
          <g key={i} transform={tl.t}>
            <motion.g style={{ transformBox: "fill-box", originY: 1 }}
              initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={view}
              transition={{ delay: 1.1 + i * 0.15, type: "spring", stiffness: 140, damping: 9 }}>
              <path d={tl.d} fill={tl.f} className="tulip-sway" style={{ animationDelay: `${i * 0.4}s` }} />
            </motion.g>
          </g>
        ))}
        <motion.g initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ duration: 0.8 }}>
          <path fill="#f3e3d3" d="M95 250 L150 340 L205 250 L180 262 L150 250 L120 262Z" />
          <path fill="#e9cfb6" d="M150 250 L150 340 L205 250 L180 262Z" opacity=".7" />
          <path fill="none" stroke="#c9a063" strokeWidth="3" d="M128 292 Q150 300 172 292" />
          <circle cx="150" cy="294" r="5" fill="#d9798f" />
        </motion.g>
      </svg>
    </TiltCard>
  );
}
