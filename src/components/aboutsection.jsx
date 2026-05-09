import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./style/aboutsection.css";

/* ─── Arrow icon ────────────────────────────────────── */
const ArrowRight = () => (
    <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
);

/* ─── Values data ───────────────────────────────────── */
const VALUES = [
    {
        glyph: "◈",
        title: "Craft over speed",
        body: "Every pixel, function, and word is intentional — never rushed. We take the time to get it right.",
    },
    {
        glyph: "✦",
        title: "Radical transparency",
        body: "No surprises, ever. Open communication on timelines, blockers, and tough calls from day one.",
    },
    {
        glyph: "⟨/⟩",
        title: "Ownership mindset",
        body: "We treat every client's product like our own. Full accountability, zero finger-pointing.",
    },
    {
        glyph: "↗",
        title: "Always improving",
        body: "We're never satisfied with good enough. Every project sharpens our craft.",
    },
    {
        glyph: "◎",
        title: "Impact-first thinking",
        body: "We ask 'does this create real value?' before writing a single line of code.",
    },
    {
        glyph: "⌘",
        title: "Deep collaboration",
        body: "Your team and ours, one shared goal — aligned from kickoff through launch and beyond.",
    },
];

/* ─── Stats ─────────────────────────────────────────── */
const STATS = [
    { target: 2021, label: "Founded", suffix: "" },
    { target: 120, label: "Projects", suffix: "+" },
    { target: 40, label: "Happy Clients", suffix: "+" },
    { target: 7, label: "Team Members", suffix: "" },
];

/* ─── Terminal lines ────────────────────────────────── */
const TERM_LINES = [
    { prompt: "$", cmd: "git log --oneline --first-parent", val: "", comment: "" },
    { prompt: "→", cmd: "2025", val: "founded", comment: "// Lahore, Pakistan" },
    { prompt: "→", cmd: "2025", val: "scaled ×3", comment: "// first e-commerce win" },
    { prompt: "→", cmd: "2025", val: "team of 10", comment: "// kept it tight on purpose" },
    { prompt: "→", cmd: "now ", val: "120+ shipped", comment: "// and counting" },
];

/* ─── Easing ─────────────────────────────────────────── */
const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

/* ════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════ */
const AboutSnippet = () => {
    const sectionRef = useRef(null);
    const rafRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [counts, setCounts] = useState(STATS.map(() => 0));
    const [counted, setCounted] = useState(false);
    const [activeVal, setActiveVal] = useState(0);

    /* ── Intersection Observer ─────────────────────── */
    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) io.observe(sectionRef.current);
        return () => io.disconnect();
    }, []);

    /* ── Count-up when in view ──────────────────────── */
    useEffect(() => {
        if (!inView || counted) return;
        setCounted(true);
        const DURATION = 1800;
        const start = performance.now() + 300;

        const tick = now => {
            const elapsed = Math.max(0, now - start);
            const p = Math.min(elapsed / DURATION, 1);
            const e = easeOutExpo(p);
            setCounts(STATS.map(s => Math.round(e * s.target)));
            if (p < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [inView, counted]);

    /* ── Auto-cycle active value card ──────────────── */
    useEffect(() => {
        if (!inView) return;
        const t = setInterval(() => {
            setActiveVal(v => (v + 1) % VALUES.length);
        }, 3500);
        return () => clearInterval(t);
    }, [inView]);

    const handleValHover = useCallback(i => setActiveVal(i), []);

    return (
        <section
            className={`ab${inView ? " in-view" : ""}`}
            ref={sectionRef}
            aria-labelledby="ab-heading"
        >
            {/* ambient elements */}
            <div className="ab__glow" aria-hidden="true" />
            <div className="ab__dots" aria-hidden="true" />
            <div className="ab__grain" aria-hidden="true" />

            <div className="ab__inner">

                {/* ══════════════════════════════════════════
                    LEFT — Light Blue Column
                ══════════════════════════════════════════ */}
                <div className="ab__left">

                    {/* Eye label */}
                    <div className="ab__eye" aria-hidden="true">
                        <span className="ab__eye-line" />
                        <span className="ab__eye-text">About Qodexaa</span>
                    </div>

                    {/* Heading */}
                    <h2 className="ab__heading" id="ab-heading">
                        Built by builders,
                        <em>for builders.</em>
                    </h2>

                    {/* Copy */}
                    <p className="ab__copy">
                        A tight-knit crew of engineers, designers, and strategists based
                        in Lahore — working with ambitious founders worldwide who want
                        things done <strong className="ab__highlight">right</strong>.
                        We don't chase every project — only the ones where we can make
                        a genuine difference.
                    </p>

                    {/* Stats */}
                    <div className="ab__stats" aria-label="Key metrics">
                        {/* {STATS.map((s, i) => (
                            <div className="ab__stat" key={s.label}>
                                <span className="ab__stat-num">
                                    {counts[i]}
                                    <span>{s.suffix}</span>
                                </span>
                                <span className="ab__stat-label">{s.label}</span>
                            </div>
                        ))} */}
                    </div>

                    {/* CTA */}
                    <Link to="/about" className="ab__cta">
                        Our full story <ArrowRight />
                    </Link>

                </div>

                {/* ══════════════════════════════════════════
                    RIGHT — Light column with cards
                ══════════════════════════════════════════ */}
                <div className="ab__right">

                    <p className="ab__right-label">What we stand for</p>

                    {/* Interactive value cards with smooth animations */}
                    <div className="ab__values" role="list" aria-label="Company values">
                        {VALUES.map((v, i) => (
                            <div
                                key={v.title}
                                className={`ab__val ${activeVal === i ? "active" : ""}`}
                                role="listitem"
                                onMouseEnter={() => handleValHover(i)}
                                onFocus={() => handleValHover(i)}
                                tabIndex={0}
                                aria-pressed={activeVal === i}
                            >
                                <span className="ab__val-glyph" aria-hidden="true">
                                    {v.glyph}
                                </span>
                                <h3 className="ab__val-title">{v.title}</h3>
                                <p className="ab__val-body">{v.body}</p>
                            </div>
                        ))}
                    </div>

                    {/* Terminal origin strip */}
                    <div className="ab__terminal" role="presentation" aria-hidden="true">
                        <div className="ab__terminal-bar">
                            <span className="ab__terminal-dot" />
                            <span className="ab__terminal-dot" />
                            <span className="ab__terminal-dot" />
                            <span className="ab__terminal-title">qodexaa — history</span>
                        </div>
                        <div className="ab__terminal-body">
                            {TERM_LINES.map((line, i) => (
                                <div className="ab__terminal-line" key={i}>
                                    <span className="ab__terminal-prompt">{line.prompt}</span>
                                    <span className="ab__terminal-cmd">{line.cmd}</span>
                                    {line.val && <span className="ab__terminal-val">{line.val}</span>}
                                    {line.comment && <span className="ab__terminal-comment">{line.comment}</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSnippet;