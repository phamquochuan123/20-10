import { useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Lá thư gấp ba, tự mở ra từng nếp trong không gian 3D khi cuộn tới
export default function Letter({ paragraphs, myName }) {
  const measure = useRef(null);
  const wrap = useRef(null);
  const inView = useInView(wrap, { once: true, amount: 0.35 });
  const [h, setH] = useState(0);

  useLayoutEffect(() => {
    const el = measure.current;
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const content = (
    <div className="lined-paper px-[clamp(22px,6vw,56px)] py-[clamp(32px,7vw,64px)] font-script text-[clamp(21px,4.8vw,25px)] leading-9 text-[#4a2a33]">
      {paragraphs.map((p, i) => <p key={i} className="mb-[18px]">{p}</p>)}
      <p className="mt-8 text-right text-rose-deep">Yêu em,<br />{myName}</p>
    </div>
  );

  const third = h / 3;
  // nếp giữa đứng yên, nếp trên lật xuống, nếp dưới lật lên
  const panels = [
    { origin: "bottom", from: 178, delay: 0.9 },
    { origin: "center", from: 0, delay: 0 },
    { origin: "top", from: -178, delay: 0.3 }
  ];

  return (
    <div ref={wrap} className="relative mx-auto max-w-[640px]" style={{ perspective: 1600 }}>
      <span className="absolute -top-6 left-1/2 z-10 -translate-x-1/2 text-[40px]">🌷</span>
      {/* bản ẩn để đo chiều cao thật của lá thư */}
      <div ref={measure} aria-hidden className="invisible absolute inset-x-0 top-0">{content}</div>
      <div className="relative preserve-3d" style={{ height: h }}>
        {h > 0 && panels.map((p, i) => (
          <motion.div key={i}
            className="absolute inset-x-0 preserve-3d"
            style={{ top: i * third, height: third, transformOrigin: p.origin, zIndex: i === 1 ? 0 : 1 }}
            initial={{ rotateX: p.from }}
            animate={inView ? { rotateX: 0 } : { rotateX: p.from }}
            transition={{ delay: p.delay, duration: 1.1, ease: [0.3, 0.7, 0.2, 1] }}
          >
            <div className={`absolute inset-0 overflow-hidden backface-hidden shadow-[0_30px_60px_-30px_rgba(61,42,46,.5)] ${i === 0 ? "rounded-t-md" : i === 2 ? "rounded-b-md" : ""}`}>
              <div style={{ marginTop: -i * third }} aria-hidden={i !== 1}>{content}</div>
              <span className="pointer-events-none absolute inset-0" style={{ background: i === 1 ? "none" : `linear-gradient(${i === 0 ? "to top" : "to bottom"}, rgba(110,42,58,.06), transparent 30%)` }} />
            </div>
            {/* mặt sau của nếp giấy */}
            <div className="absolute inset-0 backface-hidden bg-[#f4e7d8]" style={{ transform: "rotateX(180deg)" }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
