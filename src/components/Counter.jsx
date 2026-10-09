import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Một chữ số lật kiểu đồng hồ lịch 3D
function FlipDigit({ d }) {
  return (
    <span className="relative inline-block w-[0.62em] overflow-hidden text-center" style={{ perspective: 300 }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={d}
          className="inline-block backface-hidden"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ transformOrigin: "50% 50% -0.4em" }}
        >
          {d}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Unit({ value, label }) {
  return (
    <motion.div
      whileHover={{ rotateX: 8, rotateY: -8, scale: 1.04 }}
      className="rounded-2xl border border-gold/35 bg-paper/75 px-1 py-[clamp(14px,3.5vw,26px)] shadow-[0_18px_40px_-24px_rgba(110,42,58,.4)] backdrop-blur"
    >
      <b className="block font-serif text-[clamp(26px,7.5vw,54px)] font-bold leading-tight text-rose-deep tabular-nums">
        {[...value].map((d, i) => <FlipDigit key={i} d={d} />)}
      </b>
      <span className="text-[clamp(11px,2.8vw,14px)] uppercase tracking-[.15em] text-muted">{label}</span>
    </motion.div>
  );
}

export default function Counter({ start }) {
  const startMs = new Date(start).getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);

  let s = Math.max(0, Math.floor((now - startMs) / 1000));
  const days = Math.floor(s / 86400); s %= 86400;
  const hours = Math.floor(s / 3600); s %= 3600;
  const mins = Math.floor(s / 60);
  const pad = (n) => String(n).padStart(2, "0");
  const since = new Date(start).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Ho_Chi_Minh" });

  return (
    <div className="text-center">
      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-[clamp(8px,2.5vw,20px)]" style={{ perspective: 800 }} role="timer">
        <Unit value={String(days)} label="ngày" />
        <Unit value={pad(hours)} label="giờ" />
        <Unit value={pad(mins)} label="phút" />
        <Unit value={pad(s % 60)} label="giây" />
      </div>
      <p className="mt-6 font-serif italic text-muted">kể từ {since}, và vẫn đang đếm tiếp…</p>
    </div>
  );
}
