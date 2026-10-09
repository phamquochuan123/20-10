import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "./data.js";
import Petals, { petals } from "./components/Petals.jsx";
import Envelope from "./components/Envelope.jsx";
import Counter from "./components/Counter.jsx";
import Bouquet from "./components/Bouquet.jsx";
import Timeline from "./components/Timeline.jsx";
import Jar from "./components/Jar.jsx";
import Letter from "./components/Letter.jsx";
import Ask from "./components/Ask.jsx";
import { onMusic, startMusic, toggleMusic } from "./music.js";

const Heart3D = lazy(() => import("./components/Heart3D.jsx"));

function Title({ children }) {
  return (
    <motion.h2 initial={{ opacity: 0, y: 40, rotateX: -40 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.9 }} style={{ transformPerspective: 600 }}
      className="mb-9 text-center font-serif text-[clamp(28px,6vw,42px)] font-medium text-wine">
      {children}
    </motion.h2>
  );
}

function MusicButton() {
  const [on, setOn] = useState(false);
  useEffect(() => onMusic(setOn), []);
  return (
    <button onClick={() => toggleMusic(data.music)} aria-label="Bật/tắt nhạc" title="Bật/tắt nhạc"
      className="fixed right-4 top-4 z-[60] grid h-[46px] w-[46px] cursor-pointer place-items-center rounded-full border border-rose-deep/25 bg-paper/80 shadow-[0_6px_20px_-8px_rgba(110,42,58,.35)] backdrop-blur">
      <span className="flex h-4 items-end gap-[3px]">
        {[0, 0.2, 0.4, 0.1].map((d, i) => (
          <i key={i} className={`h-1 w-[3px] rounded-sm bg-rose-deep ${on ? "eq-bar" : ""}`} style={{ animationDelay: `${d}s` }} />
        ))}
      </span>
    </button>
  );
}

export default function App() {
  const [stage, setStage] = useState("intro"); // intro → opening → main

  useEffect(() => {
    document.body.style.overflow = stage === "main" ? "" : "hidden";
  }, [stage]);

  const open = () => {
    setStage("opening");
    startMusic(data.music);
    setTimeout(() => petals.burst(innerWidth / 2, innerHeight / 2), 900);
    setTimeout(() => setStage("main"), 2600);
  };

  return (
    <>
      <Petals />

      <AnimatePresence>
        {stage !== "main" && (
          <motion.section key="intro" aria-label="Phong thư"
            exit={{ opacity: 0, scale: 1.15 }} transition={{ duration: 1.1 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7"
            style={{ background: "radial-gradient(circle at 50% 45%, #fff3ef 0%, #f3d6d3 55%, #e6b8bb 100%)" }}>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: stage === "intro" ? 1 : 0, y: 0 }} transition={{ duration: 1 }}
              className="px-4 text-center font-serif text-[clamp(18px,4.4vw,24px)] italic text-wine">
              Có một lá thư dành cho {data.herName}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>
              <Envelope herName={data.herName} onOpen={open} />
            </motion.div>
            <p className={`text-[13px] uppercase tracking-[.3em] text-rose-deep transition-opacity duration-500 ${stage === "intro" ? "animate-pulse-soft" : "opacity-0"}`}>
              chạm để mở
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      {stage !== "intro" && <MusicButton />}

      <main aria-hidden={stage !== "main"}>
        {/* Trái tim 3D */}
        <header className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 text-center"
          style={{ background: "radial-gradient(ellipse at 50% 40%, #5a1f37 0%, #2b0f1d 60%, #1c0a13 100%)" }}>
          <div className="absolute inset-0">
            {stage === "main" && <Suspense fallback={null}><Heart3D /></Suspense>}
          </div>
          <div className="pointer-events-none absolute inset-x-4 bottom-[13%]">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={stage === "main" ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 1 }}
              className="mb-3 text-[13px] tracking-[.4em] text-[#f7b6c2]">20 · 10 · 2026</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={stage === "main" ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 1.2 }}
              className="font-serif text-[clamp(34px,8vw,68px)] font-medium leading-[1.15] text-[#fde4e8] [text-shadow:0_4px_30px_rgba(232,80,122,.45)]">
              Gửi {data.herName},<br />
              <em className="font-script text-[1.05em] font-bold not-italic text-[#ff8fab]">người con gái của anh</em>
            </motion.h1>
          </div>
          <a href="#together" aria-label="Cuộn xuống" className="absolute bottom-8 h-[42px] w-[26px] rounded-[14px] border-[1.5px] border-[#f7b6c2]/70">
            <span className="animate-scroll-dot absolute left-1/2 top-2 -ml-0.5 h-2 w-1 rounded-sm bg-[#f7b6c2]" />
          </a>
          <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream" />
        </header>

        <section className="px-4 pb-6 pt-16 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="mx-auto max-w-[30em] text-[clamp(15px,3.6vw,18px)] text-muted">
            Một món quà nhỏ, không mua được ở đâu cả, vì nó được làm từ những ngày có em.
          </motion.p>
        </section>

        <section id="together" className="px-4 pb-24 pt-16">
          <Title>Mình đã bên nhau</Title>
          <Counter start={data.startDate} />
        </section>

        <section className="px-4 pb-24 text-center">
          <Title>Tặng em một bó hoa</Title>
          <Bouquet />
          <p className="mt-4 font-serif italic text-muted">Hoa này không bao giờ héo, như anh thương em vậy.</p>
        </section>

        <section className="px-4 pb-20">
          <Title>Những ngày của mình</Title>
          <Timeline memories={data.memories} />
        </section>

        <section className="px-4 pb-24">
          <Title>Lý do anh thương em</Title>
          <Jar reasons={data.reasons} />
        </section>

        <section className="px-4 pb-24 pt-6">
          <Letter paragraphs={data.letter} myName={data.myName} />
        </section>

        <section className="px-4 pb-20 pt-6">
          <Ask question={data.question} answer={data.answerYes} />
        </section>

        <footer className="px-4 pb-16 pt-8 text-center text-sm text-muted">
          Made with <span className="animate-beat inline-block text-rose-deep">♥</span> by {data.myName}
        </footer>
      </main>
    </>
  );
}
