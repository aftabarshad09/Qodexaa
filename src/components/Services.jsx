import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Services.css";

/* ── Service Data with Direct Paths ──────────────────────── */
export const SERVICES = [
  {
    path: "/services/web-development",
    number: "01",
    title: "Custom Web Development Services",
tagline:
  "QODEXAA builds high-performance, SEO-optimized websites and scalable web applications designed for startups, businesses, enterprises, and growing brands. We create fast, responsive, and conversion-focused digital experiences that help companies increase visibility, generate leads, and drive long-term business growth.",
    tags: ["React", "Next.js", "Node.js"],
    accent: "#2563eb",
    img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&q=80",
  },
  {
    path: "/services/custom-software",
    number: "02",
    title: "Custom Software",
    tagline: "Tailor-made systems engineered for your exact workflow.",
    tags: ["APIs", "Microservices", "Cloud"],
    accent: "#2563eb",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    path: "/services/saas-development",
    number: "03",
    title: "SaaS Development",
    tagline: "From MVP to market-ready — auth, billing, analytics included.",
    tags: ["Stripe", "Multi-tenant", "RBAC"],
    accent: "#2563eb",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    path: "/services/generative-ai",
    number: "04",
    title: "Generative AI",
    tagline: "Production-grade AI that actually moves the needle.",
    tags: ["LLMs", "RAG", "Agents"],
    accent: "#2563eb",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  },
  {
    path: "/services/ui-ux-design",
    number: "05",
    title: "UI/UX Design",
    tagline: "Interfaces your users will fall in love with.",
    tags: ["Figma", "Design System", "Research"],
    accent: "#2563eb",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    path: "/services/ecommerce",
    number: "06",
    title: "E-Commerce",
    tagline: "Stores built for speed, beauty, and conversions.",
    tags: ["Shopify", "Headless", "CRO"],
    accent: "#2563eb",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  },
  {
    path: "/services/brand-identity",
    number: "07",
    title: "Brand & Identity",
    tagline: "A brand that makes you impossible to ignore.",
    tags: ["Logo", "Guidelines", "Strategy"],
    accent: "#2563eb",
    img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&q=80",
  },
];

/* ── Human photos for the top strip ──────────────────────── */
const HUMANS = [
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80",
    name: "Sarah K.",
    role: "Product Lead",
  },
  {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80",
    name: "James T.",
    role: "Engineering",
  },
  {
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
    name: "Mia R.",
    role: "Design",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    name: "Daniel P.",
    role: "Strategy",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
    name: "Layla M.",
    role: "AI Research",
  },
];

const INITIAL_SHOW = 6;

/* ── Icons ────────────────────────────────────────────────── */
const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

/* ── Main Component ───────────────────────────────────────── */
export default function Services() {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const visible = showAll ? SERVICES : SERVICES.slice(0, INITIAL_SHOW);

  return (
    <section className="svc" id="services">
      <div className="svc__container">

        {/* ── Header ── */}
        <div className="svc__header">
          <div className="svc__header-left">
            <span className="svc__eyebrow">Our Services</span>
            <h2 className="svc__title">
              Everything you need to<br />
              <span className="svc__title-accent">build & grow</span>
            </h2>
          </div>
          <p className="svc__subtitle">
            End-to-end digital expertise — from strategy to launch and beyond.
            We handle the complexity so you can focus on what matters.
          </p>
        </div>

        {/* ── Human Strip with Explore Button ── */}
        <div className="svc__humans">
          <div className="svc__humans-left">
            <div className="svc__avatars">
              {HUMANS.map((h, i) => (
                <div key={i} className="svc__avatar-wrap" style={{ zIndex: HUMANS.length - i }}>
                  <img src={h.src} alt={h.name} className="svc__avatar" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="svc__humans-copy">
              <p className="svc__humans-title">Real people. Real results.</p>
              <p className="svc__humans-sub">A cross-functional team that ships.</p>
            </div>
          </div>

          {/* Explore Button - Replacing Stats */}
          <div className="svc__explore-wrap">
            <button 
              className="svc__explore-btn"
              onClick={() => navigate("/services")}
            >
              Explore all services
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="svc__grid">
          {visible.map((s, i) => (
            <ServiceCard key={s.path} s={s} i={i} navigate={navigate} />
          ))}
        </div>

        {/* ── Show All ── */}
        {!showAll && (
          <div className="svc__more-wrap">
            <button className="svc__more-btn" onClick={() => setShowAll(true)}>
              Show all services
              <ChevronDown />
            </button>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="svc__cta">
          <div className="svc__cta-left">
            <p className="svc__cta-label">Not sure where to start?</p>
            <p className="svc__cta-text">
              Book a free 30-min consultation — no pitch, just clarity.
            </p>
          </div>
          <button
            className="svc__cta-btn"
            onClick={() => navigate("/contact")}
          >
            Get in touch <ArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
}

/* ── Service Card ─────────────────────────────────────────── */
function ServiceCard({ s, i, navigate }) {
  return (
    <div
      className="svc__card"
      style={{ animationDelay: `${i * 60}ms` }}
      onClick={() => navigate(s.path)}
    >
      <div className="svc__card-img-wrap">
        <img src={s.img} alt={s.title} className="svc__card-img" loading="lazy" />
        <div className="svc__card-img-veil" />
        <span className="svc__card-num">{s.number}</span>
      </div>
      <div className="svc__card-body">
        <div className="svc__card-tags">
          {s.tags.map((t) => (
            <span key={t} className="svc__card-tag">{t}</span>
          ))}
        </div>
        <h3 className="svc__card-title">{s.title}</h3>
        <p className="svc__card-tagline">{s.tagline}</p>
        <button
          className="svc__card-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(s.path);
          }}
        >
          View details <ArrowRight />
        </button>
      </div>
    </div>
  );
}