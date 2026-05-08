import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaCheckCircle, FaRocket, FaGem,
  FaChartLine, FaUsers, FaPalette, FaFont, FaRegHeart,
  FaRegLightbulb, FaRegClock, FaRegStar,
  FaInstagram, FaTwitter, FaLinkedin, FaFacebook,
  FaPenFancy, FaEye, FaSlidersH, FaFileAlt,
  FaSearch, FaSitemap, FaPaintBrush, FaCode, FaClipboardCheck, FaShieldAlt
} from "react-icons/fa";
import "./BrandIdentity.css";

/* ─── Reveal hook ─────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Data ────────────────────────────────── */
const processSteps = [
  {
    icon: <FaSearch />,
    label: "Discovery",
    desc: "We dive deep into your goals, audience, and technical requirements.",
    tag: "Week 1",
  },
  {
    icon: <FaSitemap />,
    label: "Architecture",
    desc: "Planning tech stack, data flows, and component structure.",
    tag: "Week 1–2",
  },
  {
    icon: <FaPaintBrush />,
    label: "Design",
    desc: "Creating pixel-perfect UI that aligns with your brand identity.",
    tag: "Week 2–3",
  },
  {
    icon: <FaCode />,
    label: "Development",
    desc: "Writing clean, maintainable code with industry best practices.",
    tag: "Week 3–6",
  },
  {
    icon: <FaClipboardCheck />,
    label: "Testing",
    desc: "Rigorous QA, performance audits, and security checks.",
    tag: "Week 6–7",
  },
  {
    icon: <FaRocket />,
    label: "Launch",
    desc: "Smooth deployment with zero downtime and post-launch support.",
    tag: "Week 7–8",
  },
];

const services = [
  { icon: <FaGem />, title: "Logo Design", desc: "Unique, memorable logo that represents your brand", features: ["Primary Logo", "Secondary Marks", "Icon/Symbol", "Wordmark"] },
  { icon: <FaPalette />, title: "Color Palette", desc: "Strategic color system that evokes emotion", features: ["Primary Colors", "Secondary Colors", "Accent Colors", "Gradients"] },
  { icon: <FaFont />, title: "Typography", desc: "Font pairings that reflect your brand voice", features: ["Primary Font", "Secondary Font", "Font Hierarchy", "Web Fonts"] },
  { icon: <FaRegStar />, title: "Brand Guidelines", desc: "Complete brand book for consistency", features: ["Usage Rules", "Spacing Rules", "Do's & Don'ts", "Examples"] },
  { icon: <FaFileAlt />, title: "Collateral Design", desc: "Business cards, stationery, and more", features: ["Business Cards", "Letterhead", "Envelopes", "Invoices"] },
  { icon: <FaRegHeart />, title: "Brand Voice", desc: "Messaging that connects with your audience", features: ["Tone of Voice", "Taglines", "Value Props", "Brand Story"] },
];

const deliverables = [
  { title: "Logo Files", desc: "AI, EPS, PNG, SVG, JPG formats" },
  { title: "Color Palette", desc: "HEX, RGB, CMYK codes" },
  { title: "Typography Guide", desc: "Font files and usage rules" },
  { title: "Brand Guidelines", desc: "PDF brand book" },
  { title: "Social Media Kit", desc: "Profile images & templates" },
  { title: "Stationery Set", desc: "Business cards, letterhead" },
];

const socials = [
  { icon: <FaInstagram />, name: "Instagram", desc: "Profile optimization & story templates" },
  { icon: <FaTwitter />, name: "Twitter / X", desc: "Header design & post templates" },
  { icon: <FaLinkedin />, name: "LinkedIn", desc: "Company page & banner design" },
  { icon: <FaFacebook />, name: "Facebook", desc: "Cover photo & ad templates" },
];

const benefits = [
  { icon: <FaRegStar />, title: "Strategic Approach", desc: "Designs based on research, not trends" },
  { icon: <FaEye />, title: "Memorable Identity", desc: "Stand out from your competition" },
  { icon: <FaRegClock />, title: "Fast Turnaround", desc: "Complete brand in 4–6 weeks" },
  { icon: <FaGem />, title: "Scalable System", desc: "Brand that grows with you" },
];

const otherServices = [
  { path: "/web-development", number: "01", title: "Web Development", tagline: "Blazing-fast, pixel-perfect websites", img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80" },
  { path: "/custom-software", number: "02", title: "Custom Software", tagline: "Tailor-made software for your workflow", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  { path: "/saas-development", number: "03", title: "SaaS Development", tagline: "Launch your SaaS from MVP to market", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
  { path: "/generative-ai", number: "04", title: "Generative AI", tagline: "Embed AI that actually moves the needle", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80" },
  { path: "/ui-ux-design", number: "05", title: "UI/UX Design", tagline: "Interfaces your users will love", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
  { path: "/ecommerce", number: "06", title: "E-Commerce", tagline: "Stores built for speed and conversions", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" },
];

/* ─── Component ───────────────────────────── */
const BrandIdentity = () => {
  const heroRef = useRef(null);
  const [heroOffset, setHeroOffset] = useState(0);
  const [overviewRef, overviewVisible] = useReveal();
  const [servicesRef, servicesVisible] = useReveal();
  const [processRef, processVisible] = useReveal();

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) setHeroOffset(window.scrollY * 0.3);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="brand-page">

      {/* ── Hero ── */}
      <section className="brand-hero" ref={heroRef}>
        <div className="brand-hero-parallax" style={{ transform: `translateY(${heroOffset}px)` }}>
          <div className="brand-hero-bg" />
          <img
            src="https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1600&q=80"
            alt="Brand Identity"
            className="brand-hero-img"
          />
          <div className="brand-hero-overlay" />
        </div>

        <div className="brand-hero-content">
          <span className="brand-hero-badge">07 — Brand Identity</span>
          <h1 className="brand-hero-title">
            Brand <span className="brand-hero-highlight">Identity</span>
          </h1>
          <p className="brand-hero-subtitle">
            A brand that makes you impossible to ignore. We build cohesive visual identities that
            make you instantly recognisable and deeply trustworthy.
          </p>
          <Link to="/contact" className="brand-hero-cta">
            Build Your Brand <FaArrowRight />
          </Link>
        </div>

        <div className="brand-hero-stats">
          <div className="brand-stat"><FaRocket /><span className="brand-stat-val">3x</span><span>Brand Recognition</span></div>
          <div className="brand-stat"><FaUsers /><span className="brand-stat-val">100%</span><span>Client Satisfaction</span></div>
          <div className="brand-stat"><FaChartLine /><span className="brand-stat-val">60+</span><span>Brands Created</span></div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section
        className={`brand-section brand-overview ${overviewVisible ? "visible" : ""}`}
        ref={overviewRef}
      >
        <div className="brand-container">
          <div className="brand-overview-grid">
            <div className="brand-overview-content">
              <span className="brand-label">What We Deliver</span>
              <h2 className="brand-title">
                Brands That <span className="brand-highlight">Stand Out</span>
              </h2>
              <p className="brand-overview-text">
                Your brand is the first thing people feel — before they read a word. We build
                cohesive visual identities that make you instantly recognisable and deeply
                trustworthy. From logo design to complete brand guidelines, we create systems
                that scale with your business.
              </p>
              <div className="brand-feature-list">
                {["Logo & Symbol Design", "Typography & Color Systems", "Brand Guidelines",
                  "Marketing Collateral", "Brand Voice & Messaging", "Social Media Kit"]
                  .map((f, i) => (
                    <div key={i}><FaCheckCircle /> {f}</div>
                  ))}
              </div>
            </div>
            <div className="brand-overview-image">
              <img
                src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80"
                alt="Brand Identity Work"
              />
              <div className="brand-image-badge">Memorable Identity</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section
        className={`brand-section brand-services ${servicesVisible ? "visible" : ""}`}
        ref={servicesRef}
      >
        <div className="brand-container">
          <span className="brand-label">Brand Services</span>
          <h2 className="brand-title">
            Complete <span className="brand-highlight">Brand Package</span>
          </h2>
          <div className="brand-services-grid">
            {services.map((service, i) => (
              <div key={i} className="brand-service-card">
                <span className="brand-service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="brand-service-features">
                  {service.features.map((f, idx) => <span key={idx}>{f}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process (New Design) ── */}
      <section
        className={`brand-process-section ${processVisible ? "visible" : ""}`}
        ref={processRef}
        style={{ opacity: processVisible ? 1 : 0, transform: processVisible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
      >
        <div className="brand-container">
          <div className="brand-process-header">
            <div>
              <span className="brand-label">Our Development Process</span>
              <h2 className="brand-title">
                How We <span className="brand-highlight">Build</span>
              </h2>
            </div>
            <p className="brand-process-intro">
              A proven 6-step process refined over 60+ projects — transparent, collaborative,
              and built for results from day one.
            </p>
          </div>

          <div className="brand-process-rail">
            {processSteps.map((step, i) => (
              <div key={i} className="brand-process-step">
                <div className="brand-process-node">
                  {step.icon}
                  <span className="brand-process-node-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="brand-process-step-label">{step.label}</p>
                <div className="brand-process-step-card">
                  <p>{step.desc}</p>
                  <span className="brand-process-step-tag">{step.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables ── */}
      <section className="brand-deliverables">
        <div className="brand-container">
          <span className="brand-label">What You Get</span>
          <h2 className="brand-title">
            Brand <span className="brand-highlight">Deliverables</span>
          </h2>
          <div className="brand-deliverables-grid">
            {deliverables.map((item, i) => (
              <div key={i} className="brand-deliverable-card">
                <FaCheckCircle className="brand-deliverable-icon" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Media ── */}
      <section className="brand-social">
        <div className="brand-container">
          <span className="brand-label">Digital Presence</span>
          <h2 className="brand-title">
            Social Media <span className="brand-highlight">Branding</span>
          </h2>
          <div className="brand-social-grid">
            {socials.map((s, i) => (
              <div key={i} className="brand-social-card">
                <span className="brand-social-icon">{s.icon}</span>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="brand-benefits">
        <div className="brand-container">
          <span className="brand-label">Why Choose Us</span>
          <h2 className="brand-title">
            Benefits You'll <span className="brand-highlight">Love</span>
          </h2>
          <div className="brand-benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="brand-benefit-card">
                <span className="brand-benefit-icon">{b.icon}</span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="brand-cta">
        <div className="brand-container">
          <h2>
            Ready to Build an <span className="brand-highlight">Unforgettable Brand</span>?
          </h2>
          <p>Let's create a brand identity that tells your story and captures hearts.</p>
          <Link to="/contact" className="brand-cta-btn">
            Start Your Brand Journey <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* ── Other Services ── */}
      <section className="brand-other-services">
        <div className="brand-container">
          <span className="brand-label">Explore More</span>
          <h2 className="brand-title">
            Other Services We <span className="brand-highlight">Offer</span>
          </h2>
          <div className="brand-other-grid">
            {otherServices.map((s) => (
              <Link key={s.path} to={s.path} className="brand-other-card">
                <img src={s.img} alt={s.title} />
                <div className="brand-other-info">
                  <span className="brand-other-num">{s.number}</span>
                  <h3>{s.title}</h3>
                  <p>{s.tagline}</p>
                  <span className="brand-other-link">Explore <FaArrowRight style={{ fontSize: "0.7rem" }} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default BrandIdentity;