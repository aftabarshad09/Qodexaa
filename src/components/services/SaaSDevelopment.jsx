import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaArrowRight, FaCheckCircle, FaRocket, FaCloudUploadAlt, 
  FaChartLine, FaUsers, FaCreditCard, FaUserPlus, FaChartBar,
  FaServer, FaShieldAlt, FaDatabase, FaCogs, FaBrain,
  FaEnvelope, FaBell, FaFileAlt, FaLock, FaSync,
  FaDocker, FaCloud, FaMoneyBillWave, FaIdCard, FaCode,
  FaRegClock, FaRegBuilding, FaCrown, FaInfinity,
  FaSearch, FaPenNib, FaSlidersH
} from "react-icons/fa";
import "./SaaSDevelopment.css";

const SaaSDevelopment = () => {
  const heroRef = useRef(null);
  const [heroOffset, setHeroOffset] = useState(0);
  const [overviewRef, overviewVisible] = useReveal();
  const [servicesRef, servicesVisible] = useReveal();
  const [techRef, techVisible] = useReveal();
  const [processRef, processVisible] = useReveal();
  const [pricingRef, pricingVisible] = useReveal();

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
    { path: "/web-development", number: "01", title: "Web Development", tagline: "Blazing-fast, pixel-perfect websites built to convert", img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80" },
    { path: "/custom-software", number: "02", title: "Custom Software", tagline: "Tailor-made software engineered for your exact workflow", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
    { path: "/generative-ai", number: "04", title: "Generative AI", tagline: "Embed AI that actually moves the needle", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80" },
    { path: "/ui-ux-design", number: "05", title: "UI/UX Design", tagline: "Interfaces your users will fall in love with", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
    { path: "/ecommerce", number: "06", title: "E-Commerce", tagline: "Stores that sell — built for speed and conversions", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" },
    { path: "/brand-identity", number: "07", title: "Brand Identity", tagline: "A brand that makes you impossible to ignore", img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80" }
  ];

  return (
    <div className="saas-page">
      {/* Hero Section */}
      <section className="saas-hero" ref={heroRef}>
        <div className="saas-hero-bg-layer">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80" alt="SaaS Development" className="saas-hero-img" />
          <div className="saas-hero-overlay"></div>
        </div>
        <div className="saas-hero-content">
          <span className="saas-hero-badge">SaaS Development</span>
          <h1 className="saas-hero-title">Launch Your <span className="saas-hero-highlight">SaaS</span> Product</h1>
          <p className="saas-hero-subtitle">From MVP to market-ready. We build scalable, subscription-based platforms that users love and investors notice.</p>
          <div className="saas-hero-buttons">
            <Link to="/contact" className="saas-btn-primary">Launch Your SaaS <FaArrowRight /></Link>
            <a href="#process" className="saas-btn-secondary">How It Works</a>
          </div>
        </div>
        <div className="saas-hero-stats">
          <div className="saas-stat"><FaRocket /><span className="saas-stat-val">8 wks</span><span>MVP Timeline</span></div>
          <div className="saas-stat"><FaChartLine /><span className="saas-stat-val">12+</span><span>SaaS Products</span></div>
          <div className="saas-stat"><FaUsers /><span className="saas-stat-val">$2M+</span><span>Client ARR</span></div>
        </div>
      </section>

      {/* Overview Section */}
      <section className={`saas-section saas-overview ${overviewVisible ? "visible" : ""}`} ref={overviewRef}>
        <div className="saas-container">
          <div className="saas-overview-grid">
            <div className="saas-overview-content">
              <span className="saas-label">What We Deliver</span>
              <h2 className="saas-title">From Idea to <span className="saas-highlight">Market Leader</span></h2>
              <p className="saas-overview-text">From zero to a fully-funded SaaS product. We build the infrastructure, onboarding, billing, and analytics so you can focus on growth. Our battle-tested approach has helped founders raise millions and scale to thousands of users.</p>
              <div className="saas-feature-list">
                <div><FaCheckCircle /> Multi-tenancy Architecture</div>
                <div><FaCheckCircle /> Subscription Billing</div>
                <div><FaCheckCircle /> User Onboarding Flows</div>
                <div><FaCheckCircle /> Role-based Access</div>
                <div><FaCheckCircle /> Analytics Dashboard</div>
                <div><FaCheckCircle /> API First Design</div>
              </div>
            </div>
            <div className="saas-overview-image">
              <img src="https://images.unsplash.com/photo-1551434678-e076c2238d7e?w=800&q=80" alt="SaaS Development" />
              <div className="saas-image-badge">Scale Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={`saas-section saas-services ${servicesVisible ? "visible" : ""}`} ref={servicesRef}>
        <div className="saas-container">
          <span className="saas-label">Core Features</span>
          <h2 className="saas-title">Complete <span className="saas-highlight">SaaS Package</span></h2>
          <div className="saas-services-grid">
            {[
              { icon: <FaUserPlus />, title: "User Management", desc: "Complete authentication and user profile system", features: ["Sign Up/Login", "Social Auth", "Profile Management", "Email Verification"] },
              { icon: <FaCreditCard />, title: "Payment Integration", desc: "Stripe, Paddle, or custom billing solutions", features: ["Subscription Plans", "Invoicing", "Payment History", "Refund Handling"] },
              { icon: <FaChartBar />, title: "Analytics Dashboard", desc: "Real-time metrics and user behavior tracking", features: ["User Analytics", "Revenue Reports", "Churn Rate", "Engagement Metrics"] },
              { icon: <FaServer />, title: "Multi-tenancy", desc: "Isolated environments for each customer", features: ["Database Per Tenant", "Custom Domains", "White-labeling", "Team Management"] },
              { icon: <FaEnvelope />, title: "Email & Notifications", desc: "Automated communication workflows", features: ["Welcome Emails", "Invoice Reminders", "In-app Alerts", "Digest Reports"] },
              { icon: <FaShieldAlt />, title: "Security & Compliance", desc: "Enterprise-grade security measures", features: ["GDPR Ready", "Data Encryption", "Audit Logs", "Backup System"] }
            ].map((service, i) => (
              <div key={i} className="saas-service-card">
                <div className="saas-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="saas-service-features">{service.features.map((f, idx) => (<span key={idx}>{f}</span>))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className={`saas-section saas-tech ${techVisible ? "visible" : ""}`} ref={techRef}>
        <div className="saas-container">
          <span className="saas-label">Technology Stack</span>
          <h2 className="saas-title">Modern <span className="saas-highlight">Tech Stack</span></h2>
          <div className="saas-tech-grid">
            {[
              { icon: <FaCode />, name: "React/Next.js" }, { icon: <FaServer />, name: "Node.js" }, { icon: <FaDatabase />, name: "MongoDB" },
              { icon: <FaDatabase />, name: "PostgreSQL" }, { icon: <FaRegClock />, name: "Redis" }, { icon: <FaCloud />, name: "AWS" },
              { icon: <FaDocker />, name: "Docker" }, { icon: <FaSync />, name: "K8s" }, { icon: <FaMoneyBillWave />, name: "Stripe" },
              { icon: <FaIdCard />, name: "Auth0" }, { icon: <FaBrain />, name: "AI/ML" }, { icon: <FaCloudUploadAlt />, name: "CI/CD" }
            ].map((tech, i) => (
              <div key={i} className="saas-tech-item">
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Modern Cards */}
      <section id="process" className={`saas-section saas-process ${processVisible ? "visible" : ""}`} ref={processRef}>
        <div className="saas-container">
          <span className="saas-label">How We Work</span>
          <h2 className="saas-title">Our <span className="saas-highlight">SaaS Process</span></h2>
          <div className="saas-process-steps">
            {[
              { number: "01", icon: <FaSearch />, title: "Discovery", subtitle: "Idea Validation", desc: "We pressure-test your concept against real market signals and user needs", duration: "1-2 Weeks" },
              { number: "02", icon: <FaFileAlt />, title: "Planning", subtitle: "MVP Scoping", desc: "Define the core loop — the smallest shippable product that delivers value", duration: "1 Week" },
              { number: "03", icon: <FaCogs />, title: "Development", subtitle: "Build Sprint", desc: "Rapid, focused development cycles targeting a 8-week launch", duration: "6-8 Weeks" },
              { number: "04", icon: <FaUsers />, title: "Launch", subtitle: "Beta Release", desc: "Soft launch with early users and feedback collection", duration: "1-2 Weeks" },
              { number: "05", icon: <FaChartLine />, title: "Scale", subtitle: "Growth Phase", desc: "Harden infrastructure and add growth-stage features", duration: "Ongoing" }
            ].map((step, i) => (
              <div key={i} className="saas-process-card">
                <div className="saas-process-number">{step.number}</div>
                <div className="saas-process-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p className="saas-process-subtitle">{step.subtitle}</p>
                <p className="saas-process-desc">{step.desc}</p>
                <span className="saas-process-duration">{step.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Models Section */}
      <section className={`saas-pricing-models ${pricingVisible ? "visible" : ""}`} ref={pricingRef}>
        <div className="saas-container">
          <span className="saas-label">Monetization</span>
          <h2 className="saas-title">Flexible <span className="saas-highlight">Pricing Models</span></h2>
          <div className="saas-pricing-grid">
            {[
              { icon: <FaCreditCard />, title: "Subscription", desc: "Monthly/Annual recurring billing", models: ["Freemium", "Tiered Plans", "Usage-based"] },
              { icon: <FaRocket />, title: "One-time Payment", desc: "Lifetime access or one-off fees", models: ["Lifetime Deal", "Perpetual License"] },
              { icon: <FaChartBar />, title: "Hybrid Model", desc: "Combination of subscription + usage", models: ["Base Fee + Overage", "Enterprise Quotes"] }
            ].map((model, i) => (
              <div key={i} className="saas-pricing-card">
                <div className="saas-pricing-icon">{model.icon}</div>
                <h3>{model.title}</h3>
                <p>{model.desc}</p>
                <div className="saas-pricing-models-list">{model.models.map((m, idx) => (<span key={idx}>{m}</span>))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="saas-cta">
        <div className="saas-container">
          <h2>Ready to Launch Your <span>SaaS Product</span>?</h2>
          <p>Let's turn your idea into a scalable, revenue-generating platform.</p>
          <Link to="/contact" className="saas-cta-btn">Start Your SaaS Journey <FaArrowRight /></Link>
        </div>
      </section>

      {/* Other Services */}
      <section className="saas-other-services">
        <div className="saas-container">
          <span className="saas-label">Explore More</span>
          <h2 className="saas-title">Other Services We <span className="saas-highlight">Offer</span></h2>
          <div className="saas-other-grid">
            {otherServices.map((service) => (
              <Link key={service.path} to={service.path} className="saas-other-card">
                <img src={service.img} alt={service.title} />
                <div className="saas-other-info">
                  <span className="saas-other-num">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.tagline}</p>
                  <span className="saas-other-link">Explore →</span>
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

export default SaaSDevelopment;