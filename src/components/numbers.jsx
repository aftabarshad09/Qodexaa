import React, { useState, useEffect, useRef } from 'react';
import './style/numbers.css';

/* ─── SVG Icons ─────────────────────────────────────── */
const IconProjects = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
  </svg>
);

const IconClients = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/>
  </svg>
);

const IconYears = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4C2.9 3 2 3.9 2 5v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13zM8 10h5v5H8z"/>
  </svg>
);

const IconTeam = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

/* ─── Stat Data ─────────────────────────────────────── */
const STATS = [
  { icon: <IconProjects />, label: 'Projects Completed', target: 500, suffix: '+' },
  { icon: <IconClients />, label: 'Happy Clients', target: 500, suffix: '+' },
  { icon: <IconYears />, label: 'Years of Experience', target: 5, suffix: '+' },
  { icon: <IconTeam />, label: 'Team Members', target: 28, suffix: '' },
];

/* ─── Easing Function ───────────────────────────────── */
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ─── Main Component ────────────────────────────────── */
const StatsSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const rafRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const [visible, setVisible] = useState(STATS.map(() => false));

  /* ── Parallax Background Effect ───────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewH = window.innerHeight;
        const scrollPercent = (viewH - rect.top) / (viewH + rect.height);
        const clamped = Math.max(0, Math.min(1, scrollPercent));
        const offsetPct = (clamped - 0.5) * 20;
        
        bgRef.current.style.transform = `translateY(${offsetPct}%)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Intersection Observer + Animation ────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Reset values
          setCounts(STATS.map(() => 0));
          setVisible(STATS.map(() => false));

          // Stagger card visibility
          STATS.forEach((_, i) => {
            setTimeout(() => {
              setVisible(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 140);
          });

          // Count-up animation
          const DURATION = 1800;
          const startTime = performance.now() + 200;

          const tick = (now) => {
            const elapsed = Math.max(0, now - startTime);
            const progress = Math.min(elapsed / DURATION, 1);
            const eased = easeOutExpo(progress);

            setCounts(STATS.map(s => Math.round(eased * s.target)));

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="stats-section" ref={sectionRef} aria-label="Company statistics">
      {/* Parallax Background */}
      <div className="stats-parallax-bg" ref={bgRef} aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="Office background"
          className="stats-bg-img"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Overlays */}
      <div className="stats-overlay" aria-hidden="true" />
      <div className="stats-texture" aria-hidden="true" />
      <div className="stats-vignette" aria-hidden="true" />

      {/* Corner Brackets */}
      <span className="stats-bracket stats-bracket--tl" aria-hidden="true" />
      <span className="stats-bracket stats-bracket--tr" aria-hidden="true" />
      <span className="stats-bracket stats-bracket--bl" aria-hidden="true" />
      <span className="stats-bracket stats-bracket--br" aria-hidden="true" />

      {/* Stats Content */}
      <div className="stats-wrapper">
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`stat-card${visible[i] ? ' visible' : ''}`}
            >
              <div className="stat-icon-badge">
                {stat.icon}
              </div>
              <div className="stat-number">
                <span className="num">{counts[i]}</span>
                {stat.suffix && (
                  <span className="sfx" aria-hidden="true">{stat.suffix}</span>
                )}
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-bar" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;