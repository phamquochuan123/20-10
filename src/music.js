// Phát file nhạc nếu có, nếu không thì chơi giai điệu hộp nhạc bằng Web Audio
const N = { C4: 261.63, E4: 329.63, G4: 392, A3: 220, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F4: 349.23, G5: 783.99, F3: 174.61, G3: 196, C3: 130.81, A2: 110 };
const SONG = [
  [N.C3, N.E4, N.G4, N.C5, N.E5, N.C5, N.G4, N.E4],
  [N.A2, N.C4, N.E4, N.A4, N.C5, N.A4, N.E4, N.C4],
  [N.F3, N.A3, N.C4, N.F4, N.A4, N.C5, N.A4, N.F4],
  [N.G3, N.B4, N.D5, N.G5, N.D5, N.B4, N.G4, N.D5]
].flat();

let audio, ctx, out, mode = null, playing = false;
const listeners = new Set();
const set = (v) => { playing = v; listeners.forEach((f) => f(v)); };
export const onMusic = (f) => { listeners.add(f); return () => listeners.delete(f); };

function note(freq, t) {
  [1, 2].forEach((mult, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = i ? "sine" : "triangle";
    o.frequency.value = freq * mult;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(i ? 0.03 : 0.12, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
    o.connect(g).connect(out);
    o.start(t); o.stop(t + 2.3);
  });
}

function musicBox() {
  mode = "box";
  out = ctx.createGain();
  out.gain.value = 0.5;
  out.connect(ctx.destination);
  let i = 0, next = ctx.currentTime + 0.1;
  setInterval(() => {
    while (next < ctx.currentTime + 0.5) { note(SONG[i % SONG.length], next); next += 0.34; i++; }
  }, 100);
  set(true);
}

// Phải gọi ngay trong sự kiện chạm/bấm để trình duyệt cho phép phát
export function startMusic(src) {
  if (mode) return;
  try { ctx = new (window.AudioContext || window.webkitAudioContext)(); ctx.resume(); } catch { /* không hỗ trợ */ }
  audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.6;
  audio.play().then(() => { mode = "file"; set(true); }).catch(() => ctx && musicBox());
}

export function toggleMusic(src) {
  if (!mode) return startMusic(src);
  if (mode === "file") playing ? audio.pause() : audio.play();
  else playing ? ctx.suspend() : ctx.resume();
  set(!playing);
}
