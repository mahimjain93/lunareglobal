/** Deterministic, sparse starfield. Same markup on server and client. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(1969);
const STARS = Array.from({ length: 150 }, () => {
  const bright = rand() > 0.93;
  return {
    x: (rand() * 100).toFixed(2),
    y: (rand() * 100).toFixed(2),
    r: (bright ? 0.9 + rand() * 0.5 : 0.35 + rand() * 0.45).toFixed(2),
    o: (bright ? 0.7 + rand() * 0.3 : 0.15 + rand() * 0.4).toFixed(2),
  };
});

export default function Starfield() {
  return (
    <svg className="stars" width="100%" height="100%" preserveAspectRatio="none">
      {STARS.map((s, i) => (
        <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="#f3ebe3" opacity={s.o} />
      ))}
    </svg>
  );
}
