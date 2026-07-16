import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/hero.css";

// Software house themed imagery
const img1 = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&q=80"; // code
const img2 = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&q=80"; // team
const img3 = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80"; // analytics
const img4 = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=80"; // cloud / circuit

const slides = [
  {
    id: 0,
    image: img1,
    label: "WEB DEVELOPMENT",
    titleLines: ["CUSTOM WEB", "SOLUTIONS THAT", "DRIVE GROWTH"],
    subtitle:
      "Tailored web platforms built with modern stacks — React, Next.js, Node.js and cloud infrastructure. Fast, scalable, and optimized for conversions.",
    cta: "Explore Service",
    path: "/services/web-development",
    accent: "#2563eb",
    accentHover: "#1d4ed8",
    bg: "#eef2fb",
    blobColor: "#c9d7f5",
    tagline: "Web Development Studio",
    stack: ["React", "Next.js", "Node.js", "MongoDB"],
    cardMeta: "SERVICE_01 // ACTIVE",
  },
  {
    id: 1,
    image: img2,
    label: "CUSTOM SOFTWARE",
    titleLines: ["TAILOR-MADE", "SOFTWARE FOR", "YOUR WORKFLOW"],
    subtitle:
      "End-to-end custom software development that solves real business problems. From ERP to internal tools — we build what you actually need.",
    cta: "Explore Service",
    path: "/services/custom-software",
    accent: "#0f766e",
    accentHover: "#0b5d57",
    bg: "#eaf5f1",
    blobColor: "#bfe2d6",
    tagline: "Software Engineering",
    stack: ["Python", "Django", "PostgreSQL", "Docker"],
    cardMeta: "SERVICE_02 // ACTIVE",
  },
  {
    id: 2,
    image: img3,
    label: "SAAS DEVELOPMENT",
    titleLines: ["LAUNCH YOUR", "SAAS PRODUCT", "FROM MVP TO SCALE"],
    subtitle:
      "End-to-end SaaS development — from ideation and MVP to full-scale launch. Multi-tenant architecture, subscription management, and enterprise-ready features.",
    cta: "Explore Service",
    path: "/services/saas-development",
    accent: "#7c3aed",
    accentHover: "#5b21b6",
    bg: "#f1ecfa",
    blobColor: "#d6c5f3",
    tagline: "SaaS Studio",
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    cardMeta: "SERVICE_03 // ACTIVE",
  },
  {
    id: 3,
    image: img4,
    label: "GENERATIVE AI",
    titleLines: ["AI-POWERED", "SOLUTIONS FOR", "MODERN BUSINESS"],
    subtitle:
      "Integrate cutting-edge AI into your products. LLM integration, custom AI agents, chatbots, and intelligent automation that actually delivers ROI.",
    cta: "Explore Service",
    path: "/services/generative-ai",
    accent: "#c2410c",
    accentHover: "#9a3412",
    bg: "#faf0e6",
    blobColor: "#f1cfae",
    tagline: "AI Integration",
    stack: ["GPT-4", "Claude", "LangChain", "Python"],
    cardMeta: "SERVICE_04 // ACTIVE",
  },
];

const SLIDE_DURATION = 7000;
const COUNT = slides.length;
const ANGLE = 360 / COUNT;
const TRANSLATE_Z = 260;
const TYPE_SPEED = 32; // ms per character

/* ── Typewriter hook ────────────────────────────── */
// Initial state is the full text (not "") so SSR — which never runs this
// effect — emits the real headline into the raw HTML for crawlers. The
// client then blanks it on mount and replays the typing animation.
const useTypewriter = (text, speed = TYPE_SPEED, startDelay = 0) => {
  const [out, setOut] = useState(text);
  const [done, setDone] = useState(true);

  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    let timeoutId;
    let intervalId;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { text: out, done };
};

const TypedLine = ({ text, delay = 0, className, style, showCaret }) => {
  const { text: typed, done } = useTypewriter(text, TYPE_SPEED, delay);
  return (
    <span className={className} style={style}>
      {typed}
      {(!done || showCaret) && <span className="hero__caret">|</span>}
    </span>
  );
};

const Home = () => {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const goTo = (index) => {
    const normalized = ((index % COUNT) + COUNT) % COUNT;
    if (transitioning || normalized === active) return;
    setTransitioning(true);
    setActive(normalized);
    setTimeout(() => setTransitioning(false), 850);
  };

  const next = () => goTo(active + 1);
  const prevSlideFn = () => goTo(active - 1);
  const togglePlay = () => setIsPlaying(!isPlaying);

  // Auto-advance
  useEffect(() => {
    if (!isPlaying) {
      clearInterval(timerRef.current);
      return;
    }
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % COUNT);
    }, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [isPlaying, active]);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || document.activeElement?.isContentEditable) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prevSlideFn();
      if (e.key === " " || e.key === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const slide = slides[active];

  // Compute typing delays so lines appear sequentially
  const lineDelays = [];
  let acc = 0;
  slide.titleLines.forEach((line) => {
    lineDelays.push(acc);
    acc += line.length * TYPE_SPEED + 120;
  });
  const subtitleDelay = acc + 200;

  const handleCtaClick = () => {
    navigate(slide.path);
  };

  return (
    <section
      className="hero"
      style={{
        "--accent": slide.accent,
        "--accent-hover": slide.accentHover,
        "--hero-bg": slide.bg,
        "--blob-color": slide.blobColor,
        backgroundColor: slide.bg,
      }}
    >
      <div className="hero__texture" />
      <div className="hero__grid" />
      <div className="hero__glow" />

      {/* LEFT: Content */}
      <div className="hero__content">
        <div className="hero__label-wrap" key={`label-${active}`}>
          <span className="hero__label-line" style={{ backgroundColor: slide.accent }} />
          <span className="hero__label">{slide.label}</span>
          <span className="hero__slide-count">
            <span style={{ color: slide.accent }}>0{active + 1}</span>
            <span className="hero__slide-count-sep"> / </span>
            0{COUNT}
          </span>
        </div>

        <h1 className="hero__title" key={`title-${active}`}>
          {slide.titleLines.map((line, i) => (
            <TypedLine
              key={i}
              text={line}
              delay={lineDelays[i]}
              className="hero__title-line"
              style={{ color: i === 1 ? slide.accent : "#0d0d0d" }}
              showCaret={i === slide.titleLines.length - 1}
            />
          ))}
        </h1>

        <p className="hero__subtitle" key={`sub-${active}`}>
          <TypedLine text={slide.subtitle} delay={subtitleDelay} className="hero__subtitle-text" />
        </p>

        <div className="hero__stack" key={`stack-${active}`}>
          {slide.stack.map((s, i) => (
            <span
              key={s}
              className="hero__chip"
              style={{ animationDelay: `${subtitleDelay + 600 + i * 80}ms` }}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="hero__actions">
          <button
            className="hero__btn"
            style={{ backgroundColor: slide.accent, "--btn-glow": slide.accent }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = slide.accentHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = slide.accent)}
            onClick={handleCtaClick}
          >
            <span>{slide.cta}</span>
            <span className="hero__btn-arrow">→</span>
          </button>

          <button className="hero__btn-ghost" onClick={togglePlay}>
            {isPlaying ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Play
              </>
            )}
          </button>
        </div>

        {/* Dots only — arrows moved to side */}
        <div className="hero__dots-wrap">
          {slides.map((s, i) => (
            <button
              key={i}
              className={`hero__dot ${i === active ? "hero__dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={i === active ? { backgroundColor: slide.accent } : undefined}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: Rotating 3D carousel */}
      <div className="hero__image-wrapper">
        <div className="hero__blob" />
        <div className="hero__ring" style={{ borderColor: slide.accent }} />
        <div className="hero__ring hero__ring--2" style={{ borderColor: slide.accent }} />

        <div
          className="hero__tagline"
          style={{ borderColor: slide.accent, color: slide.accent }}
          key={`tag-${active}`}
        >
          <span className="hero__tagline-dot" style={{ backgroundColor: slide.accent }} />
          {slide.tagline}
        </div>

        <div
          className="hero__carousel"
          style={{
            transform: `translateZ(-${TRANSLATE_Z}px) rotateY(${-active * ANGLE}deg)`,
          }}
        >
          {slides.map((s, i) => (
            <div
              key={s.id}
              className="hero__card"
              style={{
                transform: `rotateY(${i * ANGLE}deg) translateZ(${TRANSLATE_Z}px)`,
                boxShadow: `0 40px 80px -20px ${s.accent}55, 0 18px 36px rgba(0,0,0,0.18)`,
              }}
            >
              <img src={s.image} alt={s.label} className="hero__card-img" />
              <div className="hero__card-overlay">
                <span
                  className="hero__card-meta"
                  style={{ borderColor: s.accent }}
                >
                  <span className="hero__card-dot" style={{ backgroundColor: s.accent, boxShadow: `0 0 10px ${s.accent}` }} />
                  {s.cardMeta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Side arrows in middle */}
        <button
          className="hero__side-arrow hero__side-arrow--left"
          onClick={prevSlideFn}
          aria-label="Previous slide"
          style={{ "--accent": slide.accent }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className="hero__side-arrow hero__side-arrow--right"
          onClick={next}
          aria-label="Next slide"
          style={{ "--accent": slide.accent }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>

        {/* Stats badge */}
        <div className="hero__social-proof">
          <div className="hero__avatars">
            {[11, 12, 13].map((n) => (
              <img key={n} src={`https://i.pravatar.cc/40?img=${n}`} alt="" className="avatar" />
            ))}
          </div>
          <div className="hero__stats">
            <span className="hero__count">120+</span>
            <span className="hero__label-sm">Products shipped</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;