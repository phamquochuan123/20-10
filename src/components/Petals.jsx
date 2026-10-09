import { useEffect, useRef } from "react";

// Các thành phần khác gọi petals.burst(x, y) hoặc petals.hearts(x, y)
export const petals = { burst: () => {}, hearts: () => {} };

const COLORS = ["#f7b6c2", "#f19bb0", "#fbd3dc", "#e88aa1", "#fde4e8", "#f5c6a5"];
const HEARTS = ["#e8507a", "#f19bb0", "#d9587a", "#ff8fab"];
const rand = (a, b) => a + Math.random() * (b - a);

export default function Petals() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W, H, list = [], raf;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    const make = (burst, x, y, heart) => ({
      x: burst ? x + rand(-50, 50) : rand(-20, W + 20),
      y: burst ? y + rand(-30, 20) : rand(-60, -10),
      vx: burst ? rand(-3.4, 3.4) : rand(-0.4, 0.4),
      vy: burst ? rand(-5, -1) : rand(0.6, 1.4),
      size: heart ? rand(8, 16) : rand(7, 14),
      rot: heart ? rand(-0.3, 0.3) : rand(0, Math.PI * 2),
      vr: heart ? 0 : rand(-0.03, 0.03),
      sway: rand(0, Math.PI * 2),
      flip: rand(0, Math.PI * 2),
      color: heart ? HEARTS[(Math.random() * 4) | 0] : COLORS[(Math.random() * COLORS.length) | 0],
      burst, heart
    });

    petals.burst = (x = W / 2, y = H / 2, n = 70) => { for (let i = 0; i < n; i++) list.push(make(true, x, y)); };
    petals.hearts = (x = W / 2, y = H / 2, n = 80) => { for (let i = 0; i < n; i++) list.push(make(true, x, y, true)); };

    const draw = (p) => {
      const s = p.size;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.abs(Math.cos(p.flip)) * 0.7 + 0.3);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      if (p.heart) {
        ctx.moveTo(0, s * 0.6);
        ctx.bezierCurveTo(-s * 1.4, -s * 0.3, -s * 0.5, -s * 1.2, 0, -s * 0.4);
        ctx.bezierCurveTo(s * 0.5, -s * 1.2, s * 1.4, -s * 0.3, 0, s * 0.6);
      } else {
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.9, -s * 0.6, s * 0.7, s * 0.7, 0, s);
        ctx.bezierCurveTo(-s * 0.7, s * 0.7, -s * 0.9, -s * 0.6, 0, -s);
      }
      ctx.fill();
      ctx.restore();
    };

    const target = W < 600 ? 14 : 24;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      if (list.filter((p) => !p.burst).length < target && Math.random() < 0.08) list.push(make(false));
      for (const p of list) {
        p.sway += 0.02; p.flip += 0.04; p.rot += p.vr;
        if (p.burst) { p.vy += 0.06; p.vx *= 0.99; }
        p.x += p.vx + Math.sin(p.sway) * 0.6;
        p.y += p.vy;
        draw(p);
      }
      list = list.filter((p) => p.y < H + 30 && p.x > -60 && p.x < W + 60);
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 h-full w-full" />;
}
