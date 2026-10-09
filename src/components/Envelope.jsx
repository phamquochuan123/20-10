import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Phong thư 3D: nghiêng theo ngón tay, chạm để nắp lật mở và thiệp trượt lên
export default function Envelope({ herName, onOpen }) {
  const [open, setOpen] = useState(false);
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });

  const move = (e) => {
    if (open) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 30);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 24);
  };
  const leave = () => { rx.set(0); ry.set(0); };

  const click = (e) => {
    if (open) return;
    setOpen(true);
    rx.set(-8); ry.set(0);
    onOpen(e);
  };

  return (
    <div style={{ perspective: 1200 }} className={open ? "" : "animate-float"}>
      <motion.button
        aria-label="Mở thư"
        onPointerMove={move}
        onPointerLeave={leave}
        onClick={click}
        style={{ rotateX: rx, rotateY: ry, width: "min(82vw, 420px)", aspectRatio: "1 / .64" }}
        className="relative block cursor-pointer border-0 bg-transparent p-0 preserve-3d focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-rose-deep focus-visible:outline-dashed"
      >
        {/* mặt sau */}
        <span className="absolute inset-0 rounded-md bg-gradient-to-br from-[#c25a72] to-[#a43f58] shadow-[0_40px_70px_-25px_rgba(110,42,58,.6)]" style={{ transform: "translateZ(0px)" }} />

        {/* tấm thiệp bên trong */}
        <motion.span
          className="absolute inset-[6%] flex flex-col items-center justify-center gap-1 rounded bg-paper text-center shadow"
          style={{ z: 1 }}
          animate={open ? { y: "-62%" } : { y: 0 }}
          transition={{ delay: 0.75, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="font-script text-[clamp(26px,7vw,36px)] leading-tight text-rose-deep">Chúc mừng 20/10</span>
          <span className="font-serif text-[15px] italic text-muted">gửi {herName} 🌷</span>
        </motion.span>

        {/* túi phía trước */}
        <span
          className="absolute inset-0 rounded-md bg-gradient-to-b from-[#e48aa0] to-[#cf6680]"
          style={{ transform: "translateZ(2px)", clipPath: "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)" }}
        >
          <span className="absolute inset-0" style={{ background: "linear-gradient(20deg, rgba(0,0,0,.08), transparent 50%), linear-gradient(-20deg, rgba(0,0,0,.08), transparent 50%)" }} />
        </span>

        {/* nắp thư: hai mặt */}
        <motion.span
          className="absolute inset-x-0 top-0 h-[60%] preserve-3d"
          style={{ originY: 0, z: 3 }}
          animate={open ? { rotateX: 180, z: -1 } : { rotateX: 0, z: 3 }}
          transition={{ rotateX: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }, z: { delay: 0.4, duration: 0 } }}
        >
          <span className="absolute inset-0 backface-hidden bg-gradient-to-b from-[#d97088] to-[#c25a72]" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
          <span className="absolute inset-0 backface-hidden bg-gradient-to-t from-[#f2b3c1] to-[#e9a0b2]" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", transform: "rotateX(180deg)" }} />
        </motion.span>

        {/* con dấu sáp */}
        <motion.span
          className="absolute left-1/2 top-[52%] -ml-7 -mt-7 grid h-14 w-14 place-items-center rounded-full text-2xl text-[#7a1f35] shadow-[0_4px_12px_rgba(0,0,0,.25),inset_0_-3px_6px_rgba(0,0,0,.2)]"
          style={{ z: 5, background: "radial-gradient(circle at 35% 30%, #e7c58f, #c9a063 55%, #9c7640)" }}
          animate={open ? { scale: 0.3, opacity: 0 } : { scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          ♥
        </motion.span>
      </motion.button>
    </div>
  );
}
