import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  FaArrowRight, FaCheckCircle, FaRocket, FaPaintBrush,
  FaChartLine, FaUsers, FaMobileAlt, FaDesktop, FaRegHeart,
  FaServer, FaShieldAlt, FaCogs, FaMagic,
  FaSearch, FaRegLightbulb, FaRegGem, FaEye, FaSlidersH,
  FaCrown, FaInfinity, FaRegClock, FaPenNib,
  FaFigma, FaSketch
} from "react-icons/fa";
import "./UIUXDesign.css";

const UIUXDesign = () => {
  const heroRef = useRef(null);
  const [heroOffset, setHeroOffset] = useState(0);
  const [overviewRef, overviewVisible] = useReveal();
  const [servicesRef, servicesVisible] = useReveal();
  const [processRef, processVisible] = useReveal();
  const [toolsRef, toolsVisible] = useReveal();
  const [benefitsRef, benefitsVisible] = useReveal();

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setHeroOffset(window.scrollY * 0.2);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherServices = [
    { path: "/services/web-development", number: "01", title: "Web Development", tagline: "Blazing-fast, pixel-perfect websites built to convert", img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80" },
    { path: "/services/custom-software", number: "02", title: "Custom Software", tagline: "Tailor-made software engineered for your exact workflow", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
    { path: "/services/saas-development", number: "03", title: "SaaS Development", tagline: "Launch your SaaS product from MVP to market-ready", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
    { path: "/services/generative-ai", number: "04", title: "Generative AI", tagline: "Embed AI that actually moves the needle", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80" },
    { path: "/services/ecommerce", number: "06", title: "E-Commerce", tagline: "Stores that sell — built for speed and conversions", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" },
    { path: "/services/brand-identity", number: "07", title: "Brand Identity", tagline: "A brand that makes you impossible to ignore", img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80" }
  ];

  return (
    <div className="uiux-page">
      <Helmet>
        <title>UI/UX Design Services — Qodexaa</title>
        <meta name="description" content="Create intuitive, beautiful digital experiences with Qodexaa's UI/UX design services. From wireframes and prototypes to full design systems built for real users." />
        <meta property="og:title" content="UI/UX Design Services — Qodexaa" />
        <meta property="og:description" content="Create intuitive, beautiful digital experiences with Qodexaa's UI/UX design services. From wireframes and prototypes to full design systems built for real users." />
        <meta property="og:url" content="https://qodexaa.com/services/ui-ux-design" />
        <meta name="twitter:title" content="UI/UX Design Services — Qodexaa" />
        <meta name="twitter:description" content="Create intuitive, beautiful digital experiences with Qodexaa's UI/UX design services. From wireframes and prototypes to full design systems built for real users." />
        <link rel="canonical" href="https://qodexaa.com/services/ui-ux-design" />
      </Helmet>
      {/* Hero Section */}
      <section className="uiux-hero" ref={heroRef}>
        <div className="uiux-hero-bg-layer">
          <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80" alt="UI/UX Design" className="uiux-hero-img" />
          <div className="uiux-hero-overlay"></div>
        </div>
        <div className="uiux-hero-content">
          <span className="uiux-hero-badge">UI/UX Design</span>
          <h1 className="uiux-hero-title">Designs That <span className="uiux-hero-highlight">Convert</span></h1>
          <p className="uiux-hero-subtitle">Interfaces your users will fall in love with. We merge rigorous UX research with striking visual design to create experiences that convert.</p>
          <div className="uiux-hero-buttons">
            <Link to="/contact" className="uiux-btn-primary">Start Your Design <FaArrowRight /></Link>
            <a href="#process" className="uiux-btn-secondary">How It Works</a>
          </div>
        </div>
        <div className="uiux-hero-stats">
          <div className="uiux-stat"><FaRocket /><span className="uiux-stat-val">38%</span><span>Conversion Lift</span></div>
          <div className="uiux-stat"><FaUsers /><span className="uiux-stat-val">4.9★</span><span>Client Rating</span></div>
          <div className="uiux-stat"><FaChartLine /><span className="uiux-stat-val">50+</span><span>Products Designed</span></div>
        </div>
      </section>

      {/* Overview Section */}
      <section className={`uiux-section uiux-overview ${overviewVisible ? "visible" : ""}`} ref={overviewRef}>
        <div className="uiux-container">
          <div className="uiux-overview-grid">
            <div className="uiux-overview-content">
              <span className="uiux-label">What We Deliver</span>
              <h2 className="uiux-title">Designs That <span className="uiux-highlight">Convert</span></h2>
              <p className="uiux-overview-text">Beautiful is not enough — design must convert. We merge rigorous UX research with striking visual design to create interfaces your users never want to leave. Every pixel is intentional, every interaction is meaningful.</p>
              <div className="uiux-feature-list">
                <div><FaCheckCircle /> User Research & Personas</div>
                <div><FaCheckCircle /> Wireframing & Prototyping</div>
                <div><FaCheckCircle /> Design Systems & Tokens</div>
                <div><FaCheckCircle /> Interaction Design</div>
                <div><FaCheckCircle /> Usability Testing</div>
                <div><FaCheckCircle /> Developer Handoff</div>
              </div>
            </div>
            <div className="uiux-overview-image">
              <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80" alt="UI/UX Design" />
              <div className="uiux-image-badge">User Centered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Modern Cards */}
      <section id="process" className={`uiux-section uiux-process ${processVisible ? "visible" : ""}`} ref={processRef}>
        <div className="uiux-container">
          <span className="uiux-label">Our Process</span>
          <h2 className="uiux-title">How We <span className="uiux-highlight">Design</span></h2>
          <div className="uiux-process-steps">
            {[
              { number: "01", icon: <FaSearch />, title: "Research", subtitle: "Discovery Phase", desc: "User interviews, competitor analysis, and stakeholder workshops", duration: "1-2 Weeks" },
              { number: "02", icon: <FaSlidersH />, title: "Architecture", subtitle: "Planning", desc: "Sitemaps, user flows, and content hierarchy planning", duration: "1 Week" },
              { number: "03", icon: <FaCogs />, title: "Wireframing", subtitle: "Structure", desc: "Low-fidelity sketches validated with real users", duration: "1-2 Weeks" },
              { number: "04", icon: <FaPaintBrush />, title: "Visual Design", subtitle: "High-Fidelity", desc: "Stunning, detailed screens in Figma with full component library", duration: "2-3 Weeks" },
              { number: "05", icon: <FaMagic />, title: "Prototyping", subtitle: "Interactive", desc: "Interactive prototypes for user testing and stakeholder review", duration: "1 Week" },
              { number: "06", icon: <FaDesktop />, title: "Handoff", subtitle: "Developer Ready", desc: "Ready-to-code assets with detailed specs and interaction notes", duration: "3-5 Days" }
            ].map((step, i) => (
              <div key={i} className="uiux-process-card">
                <div className="uiux-process-number">{step.number}</div>
                <div className="uiux-process-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p className="uiux-process-subtitle">{step.subtitle}</p>
                <p className="uiux-process-desc">{step.desc}</p>
                <span className="uiux-process-duration">{step.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className={`uiux-section uiux-services ${servicesVisible ? "visible" : ""}`} ref={servicesRef}>
        <div className="uiux-container">
          <span className="uiux-label">Design Services</span>
          <h2 className="uiux-title">Complete <span className="uiux-highlight">Design Package</span></h2>
          <div className="uiux-services-grid">
            {[
              { icon: <FaUsers />, title: "User Research", desc: "Deep understanding of your users' needs", features: ["User Interviews", "Surveys", "Persona Creation", "Journey Mapping"] },
              { icon: <FaCogs />, title: "Wireframing", desc: "Low and high-fidelity wireframes", features: ["Sitemaps", "User Flows", "Lo-fi Wireframes", "Hi-fi Wireframes"] },
              { icon: <FaPaintBrush />, title: "Visual Design", desc: "Stunning, on-brand interface design", features: ["Color Systems", "Typography", "Iconography", "UI Components"] },
              { icon: <FaRegGem />, title: "Design Systems", desc: "Scalable design systems for consistency", features: ["Component Library", "Style Guide", "Design Tokens", "Documentation"] },
              { icon: <FaEye />, title: "Prototyping", desc: "Interactive prototypes for testing", features: ["Clickable Prototypes", "Micro-interactions", "User Testing", "Stakeholder Review"] },
              { icon: <FaMobileAlt />, title: "Responsive Design", desc: "Flawless experiences on all devices", features: ["Mobile First", "Tablet Design", "Desktop Design", "Adaptive Layouts"] }
            ].map((service, i) => (
              <div key={i} className="uiux-service-card">
                <div className="uiux-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="uiux-service-features">{service.features.map((f, idx) => (<span key={idx}>{f}</span>))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className={`uiux-tools ${toolsVisible ? "visible" : ""}`} ref={toolsRef}>
        <div className="uiux-container">
          <span className="uiux-label">Design Tools</span>
          <h2 className="uiux-title">Tools We <span className="uiux-highlight">Master</span></h2>
          <div className="uiux-tools-grid">
            {[
              { icon: <FaFigma />, name: "Figma" }, { icon: <FaSketch />, name: "Sketch" }, { icon: <FaServer />, name: "Adobe XD" },
              { icon: <FaMagic />, name: "Framer" }, { icon: <FaCogs />, name: "Illustrator" }, { icon: <FaPaintBrush />, name: "Photoshop" },
              { icon: <FaUsers />, name: "Miro" }, { icon: <FaSearch />, name: "Hotjar" }, { icon: <FaChartLine />, name: "UsabilityHub" }
            ].map((tool, i) => (
              <div key={i} className="uiux-tool-item">
                {tool.icon}
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="uiux-deliverables">
        <div className="uiux-container">
          <span className="uiux-label">What You Get</span>
          <h2 className="uiux-title">Design <span className="uiux-highlight">Deliverables</span></h2>
          <div className="uiux-deliverables-grid">
            {[
              { title: "Style Guide", desc: "Complete brand and UI guidelines" },
              { title: "Component Library", desc: "Reusable UI components in Figma" },
              { title: "Interactive Prototype", desc: "Clickable prototype for testing" },
              { title: "Developer Specs", desc: "Detailed measurements and notes" },
              { title: "Asset Export", desc: "All icons and images optimized" },
              { title: "Design Tokens", desc: "CSS variables for developers" }
            ].map((item, i) => (
              <div key={i} className="uiux-deliverable-card">
                <FaCheckCircle className="uiux-deliverable-icon" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`uiux-section uiux-benefits ${benefitsVisible ? "visible" : ""}`} ref={benefitsRef}>
        <div className="uiux-container">
          <span className="uiux-label">Why Choose Us</span>
          <h2 className="uiux-title">Benefits You'll <span className="uiux-highlight">Love</span></h2>
          <div className="uiux-benefits-grid">
            {[
              { icon: <FaCrown />, title: "User-Centered", desc: "Designs based on real user research" },
              { icon: <FaRocket />, title: "Faster Time to Market", desc: "Streamlined design process" },
              { icon: <FaChartLine />, title: "Higher Conversions", desc: "Optimized for business goals" },
              { icon: <FaDesktop />, title: "Developer Friendly", desc: "Clean, organized design files" }
            ].map((benefit, i) => (
              <div key={i} className="uiux-benefit-card">
                <div className="uiux-benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="uiux-cta">
        <div className="uiux-container">
          <h2>Ready to Create <span>Amazing Experiences</span>?</h2>
          <p>Let's design a product your users will love and remember.</p>
          <Link to="/contact" className="uiux-cta-btn">Start Your Design Project <FaArrowRight /></Link>
        </div>
      </section>

      {/* Other Services */}
      <section className="uiux-other-services">
        <div className="uiux-container">
          <span className="uiux-label">Explore More</span>
          <h2 className="uiux-title">Other Services We <span className="uiux-highlight">Offer</span></h2>
          <div className="uiux-other-grid">
            {otherServices.map((service) => (
              <Link key={service.path} to={service.path} className="uiux-other-card">
                <img src={service.img} alt={service.title} />
                <div className="uiux-other-info">
                  <span className="uiux-other-num">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.tagline}</p>
                  <span className="uiux-other-link">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

export default UIUXDesign;