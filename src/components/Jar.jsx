import { useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

const DOTS = [[20, 70, 9, "#f19bb0"], [55, 80, 11, "#f7b6c2"], [80, 62, 8, "#e88aa1"], [38, 52, 10, "#fbd3dc"], [70, 38, 8, "#f5c6a5"], [30, 30, 7, "#f19bb0"], [60, 18, 8, "#fbd3dc"]];

// Lọ thủy tinh: chạm để rút ngẫu nhiên một lý do, mẩu giấy lật 3D bay ra
export default function Jar({ reasons }) {
  const bag = useRef([]);
  const [slip, setSlip] = useState(null);
  const shake = useAnimation();

  const draw = () => {
    if (!bag.current.length) bag.current = [...reasons].sort(() => Math.random() - 0.5);
    shake.start({ rotate: [0, -7, 6, -3, 0], transition: { duration: 0.5 } });
    setSlip({ id: Date.now(), text: bag.current.pop() });
  };

  return (
    <div className="text-center">
      <motion.button aria-label="Rút một lý do" onClick={draw} animate={shake} whileHover="open"
        className="group relative mx-auto block h-[190px] w-[150px] cursor-pointer border-0 bg-transparent p-0">
        <motion.span variants={{ open: { rotate: -14, y: -4 } }} className="absolute inset-x-8 top-0 h-[26px] origin-bottom-left rounded-t-lg rounded-b bg-gradient-to-b from-[#d9b37c] to-[#b38a52] shadow-[inset_0_-4px_0_rgba(0,0,0,.12)]" />
        <span className="absolute inset-x-2.5 bottom-0 top-[22px] overflow-hidden rounded-[28px_28px_36px_36px] border-2 border-rose/35 shadow-[0_24px_40px_-20px_rgba(110,42,58,.45)]"
          style={{ background: "linear-gradient(100deg, rgba(255,255,255,.75), rgba(255,255,255,.25) 40%, rgba(255,255,255,.55))" }}>
          {DOTS.map(([x, y, r, c], i) => (
            <span key={i} className="absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, width: r * 2, height: r * 2, background: c, translate: "-50% -50%" }} />
          ))}
        </span>
      </motion.button>
      <p className="mt-3.5 text-[13px] uppercase tracking-[.2em] text-rose-deep/70">chạm vào lọ để rút một mẩu giấy</p>
      <div className="mx-auto mt-6 min-h-24 max-w-sm" style={{ perspective: 800 }} aria-live="polite">
        <AnimatePresence mode="wait">
          {slip && (
            <motion.p key={slip.id}
              initial={{ opacity: 0, y: -80, rotateX: 90, rotateZ: -10, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, rotateZ: -1, scale: 1 }}
              exit={{ opacity: 0, y: 30, rotateX: -60 }}
              transition={{ type: "spring", stiffness: 160, damping: 14 }}
              className="rounded bg-paper px-6 py-4 font-script text-2xl leading-snug text-wine shadow-[0_16px_30px_-18px_rgba(61,42,46,.5)]">
              {slip.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
