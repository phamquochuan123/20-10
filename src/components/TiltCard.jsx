import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Thẻ nghiêng 3D theo ngón tay / chuột, có vệt sáng lướt qua
export default function TiltCard({ children, className = "", max = 14 }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glare = useTransform([sx, sy], ([a, b]) =>
    `radial-gradient(circle at ${a * 100}% ${b * 100}%, rgba(255,255,255,.55), transparent 55%)`);

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { x.set(0.5); y.set(0.5); };

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        onPointerMove={move}
        onPointerLeave={leave}
        style={{ rotateX, rotateY }}
        className="relative preserve-3d"
      >
        {children}
        <motion.div aria-hidden style={{ background: glare }} className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light" />
      </motion.div>
    </div>
  );
}
