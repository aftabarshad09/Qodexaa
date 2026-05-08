import { useEffect, useRef, useState } from "react";
import "./style/Stats.css";

function useCountUp(target, duration = 1600, delay = 0, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    let startTs;
    const startTimer = setTimeout(() => {
      const step = (ts) => {
        if (!startTs) startTs = ts;
        const p = Math.min((ts - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(target * eased);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(startTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, delay, active]);
  return value;
}

function formatDisplay(format, n) {
  if (format === "percent")         return `${n.toFixed(0)}%`;
  if (format === "percent-decimal") return `${n.toFixed(1)}%`;
  if (format === "rating")          return `${n.toFixed(1)} / 5`;
  return n.toFixed(0);
}

function Gauge({ value, target, format, label, sublabel, delay = 0, gradId, active }) {
  const [progress, setProgress] = useState(0);
  const [wobble, setWobble] = useState(0);
  const settledRef = useRef(false);

  // Reset everything when active flips to false (re-entry)
  useEffect(() => {
    if (!active) {
      setProgress(0);
      setWobble(0);
      settledRef.current = false;
    }
  }, [active]);

  // Sweep in once active
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setProgress(value), 120 + delay);
    const settled = setTimeout(() => { settledRef.current = true; }, 120 + delay + 1700);
    return () => { clearTimeout(t); clearTimeout(settled); };
  }, [value, delay, active]);

  // Live wobble after settled
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      if (!settledRef.current) return;
      setWobble((Math.random() - 0.5) * 1.2);
    }, 1600);
    return () => clearInterval(id);
  }, [active]);

  const liveValue = Math.max(0, Math.min(100, progress + (settledRef.current ? wobble : 0)));
  const counted = useCountUp(target, 1600, 120 + delay, active);
  const displayNumber = settledRef.current ? target : counted;
  const displayText = formatDisplay(format, displayNumber);

  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const r = 92;
  const strokeW = 16;
  const circumference = Math.PI * r;
  const dash = (liveValue / 100) * circumference;
  const angle = -90 + (liveValue / 100) * 180;
  const ticks = Array.from({ length: 11 }, (_, i) => -90 + i * 18);

  return (
    <div className="gauge-card">
      <svg
        width={size}
        height={size / 2 + 28}
        viewBox={`0 0 ${size} ${size / 2 + 28}`}
        className="gauge-svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7BB0E8" />
            <stop offset="60%" stopColor="#3B82C4" />
            <stop offset="100%" stopColor="#1E5A9C" />
          </linearGradient>
          <filter id={`${gradId}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#1E3A5F" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke="#E6EEF7"
          strokeWidth={strokeW} strokeLinecap="round"
        />

        {/* Filled arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeW} strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - dash}
          className="gauge-arc"
        />

        {/* Tick marks */}
        {ticks.map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const inner = r - strokeW / 2 - 6;
          const outer = r - strokeW / 2 - (i % 5 === 0 ? 14 : 10);
          return (
            <line key={i}
              x1={cx + Math.sin(rad) * inner} y1={cy - Math.cos(rad) * inner}
              x2={cx + Math.sin(rad) * outer} y2={cy - Math.cos(rad) * outer}
              stroke="#B9C9DC"
              strokeWidth={i % 5 === 0 ? 1.5 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* Needle */}
        <g
          className="gauge-needle"
          style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${cx}px ${cy}px` }}
          filter={`url(#${gradId}-shadow)`}
        >
          <path d={`M ${cx} ${cy - r + 6} L ${cx - 4} ${cy + 8} L ${cx + 4} ${cy + 8} Z`} fill="#243B5C" />
          <circle cx={cx} cy={cy} r={9} fill="#243B5C" />
          <circle cx={cx} cy={cy} r={3.5} fill="#FFFFFF" />
        </g>

        {/* Center value */}
        <text x={cx} y={cy + 30} textAnchor="middle" className="gauge-value">
          {displayText}
        </text>
      </svg>

      <div className="gauge-meta">
        <div className="gauge-label">{label}</div>
        {sublabel && <div className="gauge-sublabel">{sublabel}</div>}
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        } else {
          // Reset so animation replays every time section enters view
          setActive(false);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-container">
        <div className="stats-header">
          <p className="stats-eyebrow">Performance at a glance</p>
          <h2 className="stats-title">Numbers that speak for themselves</h2>
          <p className="stats-subtitle">
            Real-time indicators of the reliability and care we put into every product we ship.
          </p>
        </div>

        <div className="stats-grid">
          <Gauge gradId="g1" value={98} target={98} format="percent"
            label="Client Satisfaction" sublabel="Across 200+ engagements"
            delay={0} active={active} />
          <Gauge gradId="g2" value={99.9} target={99.9} format="percent-decimal"
            label="Service Uptime" sublabel="Last 12 months"
            delay={180} active={active} />
          <Gauge gradId="g3" value={96} target={4.8} format="rating"
            label="Support Rating" sublabel="24/7 response team"
            delay={360} active={active} />
        </div>
      </div>
    </section>
  );
}