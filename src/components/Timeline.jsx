import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import TiltCard from "./TiltCard.jsx";

// Dòng thời gian: ảnh polaroid bay vào theo kiểu lật 3D, nghiêng theo ngón tay
export default function Timeline({ memories }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  return (
    <ol ref={ref} className="relative mx-auto max-w-5xl list-none">
      <span className="absolute inset-y-0 left-[15px] w-0.5 bg-rose/20 md:left-1/2 md:-ml-px" />
      <motion.span style={{ scaleY: progress }} className="absolute inset-y-0 left-[15px] w-0.5 origin-top bg-rose md:left-1/2 md:-ml-px" />
      {memories.map((m, i) => {
        const left = i % 2 === 0;
        return (
          <li key={i} className={`relative w-full pb-14 pl-12 md:w-1/2 md:pb-16 ${left ? "md:mr-auto md:pl-0 md:pr-11" : "md:ml-auto md:pl-11"}`}>
            <span className={`absolute left-0 top-[18px] z-10 grid h-[30px] w-[30px] place-items-center rounded-full bg-rose text-sm text-white shadow-[0_0_0_6px_var(--color-cream)] ${left ? "md:left-auto md:-right-[15px]" : "md:-left-[15px]"}`}>♥</span>
            <motion.div
              initial={{ opacity: 0, rotateY: left ? 35 : -35, x: left ? -40 : 40, z: -120 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0, z: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ transformPerspective: 1000 }}
            >
              <TiltCard>
                <figure className={`rounded bg-white p-3 pb-5 shadow-[0_24px_50px_-24px_rgba(61,42,46,.45)] ${left ? "-rotate-[1.5deg]" : "rotate-[1.5deg]"}`}>
                  <img src={m.photo} alt={m.title} loading="lazy" className="block aspect-[3/4] w-full rounded-sm bg-blush object-cover" />
                </figure>
              </TiltCard>
              {m.date && <span className="mt-3.5 inline-block text-[13px] font-medium tracking-[.15em] text-rose-deep">{m.date}</span>}
              <h3 className="mb-0.5 mt-3.5 font-script text-3xl leading-tight text-wine">{m.title}</h3>
              <p className="text-[15px] text-muted">{m.text}</p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
