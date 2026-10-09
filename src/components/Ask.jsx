import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { petals } from "./Petals.jsx";

const rand = (a, b) => a + Math.random() * (b - a);
const noClass = "cursor-pointer rounded-full border border-rose-deep/25 bg-white px-9 py-3.5 text-[17px] font-medium text-muted";

// "Em có thương anh không?" — nút Không chạy trốn, nút Có làm tim bay khắp màn hình
export default function Ask({ question, answer }) {
  const [pos, setPos] = useState(null);
  const [done, setDone] = useState(false);
  const noRef = useRef(null);

  const run = (e) => {
    e?.preventDefault();
    const r = noRef.current.getBoundingClientRect();
    setPos({ fromLeft: r.left, fromTop: r.top, left: rand(16, innerWidth - r.width - 16), top: rand(76, innerHeight - r.height - 16), rot: rand(-25, 25) });
  };

  const yes = (e) => {
    setDone(true);
    const r = e.currentTarget.getBoundingClientRect();
    petals.hearts(r.left + r.width / 2, r.top, 90);
    setTimeout(() => petals.hearts(innerWidth * 0.2, innerHeight * 0.5, 50), 400);
    setTimeout(() => petals.hearts(innerWidth * 0.8, innerHeight * 0.5, 50), 700);
  };

  return (
    <div className="text-center">
      <h2 className="mb-9 font-script text-[clamp(32px,7vw,48px)] font-bold text-rose-deep">{question}</h2>
      <div className="flex min-h-[60px] justify-center gap-4">
        <motion.button onClick={yes} whileHover={{ scale: 1.08, rotateX: 10 }} whileTap={{ scale: 0.95 }}
          className="cursor-pointer rounded-full border-0 bg-gradient-to-br from-[#e98aa2] to-rose-deep px-9 py-3.5 text-[17px] font-medium text-white shadow-[0_12px_24px_-10px_rgba(180,71,95,.7)]">
          Có 💗
        </motion.button>
        {!done && !pos && (
          <button ref={noRef} onMouseEnter={run} onTouchStart={run} onClick={run} className={noClass}>Không</button>
        )}
        {/* khi đã chạy trốn, nút nằm thẳng trong body để bay khắp màn hình */}
        {!done && pos && createPortal(
          <motion.button ref={noRef} onMouseEnter={run} onTouchStart={run} onClick={run}
            initial={{ left: pos.fromLeft, top: pos.fromTop }}
            animate={{ left: pos.left, top: pos.top, rotate: pos.rot }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            style={{ position: "fixed", zIndex: 70 }}
            className={noClass}>
            Không
          </motion.button>,
          document.body
        )}
      </div>
      <motion.p initial={false} animate={done ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        className="mt-7 min-h-[1.4em] font-script text-[clamp(26px,6vw,36px)] text-wine" aria-live="polite">
        {done ? answer : ""}
      </motion.p>
    </div>
  );
}
