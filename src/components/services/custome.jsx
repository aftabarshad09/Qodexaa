import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  FaArrowRight, FaCheckCircle, FaRocket, FaShieldAlt, 
  FaDatabase, FaCloudUploadAlt, FaChartLine, FaUsers,
  FaCogs, FaCode, FaBrain, FaChartBar,
  FaLock, FaSync, FaTools, FaBuilding, FaServer,
  FaPlug, FaDesktop, FaMobileAlt, FaPython, FaJava,
  FaDocker, FaCloud, FaDatabase as FaDb, FaCodeBranch,
  FaGem, FaCube, FaNetworkWired, FaClock, FaSearch,
  FaPenNib, FaCrown, FaInfinity, FaAward
} from "react-icons/fa";
import "./CustomSoftware.css";

const CustomSoftware = () => {
  const heroRef = useRef(null);
  const [heroOffset, setHeroOffset] = useState(0);
  const [overviewRef, overviewVisible] = useReveal();
  const [servicesRef, servicesVisible] = useReveal();
  const [techRef, techVisible] = useReveal();
  const [processRef, processVisible] = useReveal();
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
    { path: "/services/saas-development", number: "03", title: "SaaS Development", tagline: "Launch your SaaS product from MVP to market-ready", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
    { path: "/services/generative-ai", number: "04", title: "Generative AI", tagline: "Embed AI that actually moves the needle", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80" },
    { path: "/services/ui-ux-design", number: "05", title: "UI/UX Design", tagline: "Interfaces your users will fall in love with", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
    { path: "/services/ecommerce", number: "06", title: "E-Commerce", tagline: "Stores that sell — built for speed and conversions", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" },
    { path: "/services/brand-identity", number: "07", title: "Brand Identity", tagline: "A brand that makes you impossible to ignore", img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80" }
  ];

  return (
    <div className="custom-software-page">
      <Helmet>
  <title>Custom Software Development Services — Qodexaa</title>
  <meta name="description" content="Build powerful, tailor-made software solutions with Qodexaa. From concept to deployment, we develop scalable, secure, and high-performance software built around your exact business needs." />
  <meta property="og:title" content="Custom Software Development Services — Qodexaa" />
  <meta property="og:description" content="Build powerful, tailor-made software solutions with Qodexaa. From concept to deployment, we develop scalable, secure, and high-performance software built around your exact business needs." />
  <meta property="og:url" content="https://qodexaa.com/services/custom-software-development" />
  <meta name="twitter:title" content="Custom Software Development Services — Qodexaa" />
  <meta name="twitter:description" content="Build powerful, tailor-made software solutions with Qodexaa. From concept to deployment, we develop scalable, secure, and high-performance software built around your exact business needs." />
  <link rel="canonical" href="https://qodexaa.com/services/custom-software-development" />
</Helmet>
      {/* Hero Section */}
      <section className="cs-hero" ref={heroRef}>
        <div className="cs-hero-bg-layer">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80" alt="Custom Software" className="cs-hero-img" />
          <div className="cs-hero-overlay"></div>
        </div>
        <div className="cs-hero-content">
          <span className="cs-hero-badge">Custom Software</span>
          <h1 className="cs-hero-title">Tailor-Made <span className="cs-hero-highlight">Solutions</span></h1>
          <p className="cs-hero-subtitle">Custom software engineered for your exact workflow. We build solutions that solve your unique business challenges and scale with your growth.</p>
          <div className="cs-hero-buttons">
            <Link to="/contact" className="cs-btn-primary">Start Your Project <FaArrowRight /></Link>
            <a href="#process" className="cs-btn-secondary">How It Works</a>
          </div>
        </div>
        <div className="cs-hero-stats">
          <div className="cs-stat"><FaRocket /><span className="cs-stat-val">60%</span><span>Efficiency Gain</span></div>
          <div className="cs-stat"><FaChartLine /><span className="cs-stat-val">99.9%</span><span>Uptime SLA</span></div>
          <div className="cs-stat"><FaUsers /><span className="cs-stat-val">25+</span><span>Systems Built</span></div>
        </div>
      </section>

      {/* Overview Section */}
      <section className={`cs-section cs-overview ${overviewVisible ? "visible" : ""}`} ref={overviewRef}>
        <div className="cs-container">
          <div className="cs-overview-grid">
            <div className="cs-overview-content">
              <span className="cs-label">What We Deliver</span>
              <h2 className="cs-title">Software That <span className="cs-highlight">Transforms</span> Your Business</h2>
              <p className="cs-overview-text">Off-the-shelf software holds you back. We build bespoke systems that fit your workflow like a glove — from internal dashboards to full enterprise platforms. Every feature is designed around how you actually work.</p>
              <div className="cs-feature-list">
                <div><FaCheckCircle /> Custom Workflow Automation</div>
                <div><FaCheckCircle /> Seamless Integration</div>
                <div><FaCheckCircle /> Scalable Architecture</div>
                <div><FaCheckCircle /> Enterprise Security</div>
                <div><FaCheckCircle /> Real-time Analytics</div>
                <div><FaCheckCircle /> 24/7 Support</div>
              </div>
            </div>
            <div className="cs-overview-image">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" alt="Custom Software Development" />
              <div className="cs-image-badge">Enterprise Grade</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={`cs-section cs-services ${servicesVisible ? "visible" : ""}`} ref={servicesRef}>
        <div className="cs-container">
          <span className="cs-label">Core Capabilities</span>
          <h2 className="cs-title">What's <span className="cs-highlight">Included</span></h2>
          <div className="cs-services-grid">
            {[
              { icon: <FaCogs />, title: "Custom ERP/CRM", desc: "Tailored systems that manage your entire business operations", features: ["Lead Management", "Sales Pipeline", "Inventory Control", "Financial Tracking"] },
              { icon: <FaPlug />, title: "API Development", desc: "Robust APIs that connect your entire software ecosystem", features: ["RESTful APIs", "GraphQL", "Webhooks", "API Documentation"] },
              { icon: <FaServer />, title: "Internal Tools", desc: "Custom dashboards and tools for your team's unique needs", features: ["Admin Panels", "Data Dashboards", "Reporting Tools", "Task Automation"] },
              { icon: <FaCode />, title: "Legacy Modernization", desc: "Transform outdated systems into modern, maintainable code", features: ["Data Migration", "Code Refactoring", "Cloud Migration", "Performance Boost"] },
              { icon: <FaBrain />, title: "Business Intelligence", desc: "Data-driven insights with custom analytics solutions", features: ["Data Visualization", "Predictive Analytics", "Custom Reports", "KPI Tracking"] },
              { icon: <FaChartBar />, title: "Integration Platform", desc: "Connect all your tools into one unified system", features: ["Third-party APIs", "Database Sync", "Real-time Data", "Automated Workflows"] }
            ].map((service, i) => (
              <div key={i} className="cs-service-card">
                <div className="cs-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="cs-service-features">{service.features.map((f, idx) => (<span key={idx}>{f}</span>))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className={`cs-section cs-tech ${techVisible ? "visible" : ""}`} ref={techRef}>
        <div className="cs-container">
          <span className="cs-label">Technology Stack</span>
          <h2 className="cs-title">Tools & <span className="cs-highlight">Technologies</span></h2>
          <div className="cs-tech-grid">
            {[
              { icon: <FaPython />, name: "Python" }, { icon: <FaJava />, name: "Java" }, { icon: <FaGem />, name: "Ruby" },
              { icon: <FaCube />, name: "Go" }, { icon: <FaCodeBranch />, name: ".NET" }, { icon: <FaMobileAlt />, name: "Kotlin" },
              { icon: <FaDocker />, name: "Docker" }, { icon: <FaCloud />, name: "K8s" }, { icon: <FaCloudUploadAlt />, name: "AWS" },
              { icon: <FaDatabase />, name: "MySQL" }, { icon: <FaDb />, name: "PostgreSQL" }, { icon: <FaDatabase />, name: "MongoDB" },
              { icon: <FaClock />, name: "Redis" }, { icon: <FaNetworkWired />, name: "GraphQL" }, { icon: <FaShieldAlt />, name: "Security" }
            ].map((tech, i) => (
              <div key={i} className="cs-tech-item">
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Modern Cards */}
      <section id="process" className={`cs-section cs-process ${processVisible ? "visible" : ""}`} ref={processRef}>
        <div className="cs-container">
          <span className="cs-label">How We Work</span>
          <h2 className="cs-title">Our <span className="cs-highlight">Development</span> Process</h2>
          <div className="cs-process-steps">
            {[
              { number: "01", icon: <FaSearch />, title: "Discovery", subtitle: "Understanding your needs", desc: "We map every user story, technical constraint, and business goal upfront", duration: "1 Week" },
              { number: "02", icon: <FaServer />, title: "Architecture", subtitle: "Planning the foundation", desc: "Designing database schemas, microservice boundaries, and API contracts", duration: "1-2 Weeks" },
              { number: "03", icon: <FaCode />, title: "Development", subtitle: "Building your solution", desc: "Agile sprints with demos and continuous feedback loops built in", duration: "4-12 Weeks" },
              { number: "04", icon: <FaPlug />, title: "Integration", subtitle: "Connecting everything", desc: "Connect to your existing stack via robust APIs and data pipelines", duration: "1 Week" },
              { number: "05", icon: <FaShieldAlt />, title: "Testing & QA", subtitle: "Ensuring quality", desc: "Rigorous testing, security audits, and performance optimization", duration: "1 Week" },
              { number: "06", icon: <FaRocket />, title: "Deployment", subtitle: "Going live", desc: "Smooth rollout with full documentation and ongoing maintenance", duration: "Ongoing" }
            ].map((step, i) => (
              <div key={i} className="cs-process-card">
                <div className="cs-process-number">{step.number}</div>
                <div className="cs-process-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p className="cs-process-subtitle">{step.subtitle}</p>
                <p className="cs-process-desc">{step.desc}</p>
                <span className="cs-process-duration">{step.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`cs-section cs-benefits ${benefitsVisible ? "visible" : ""}`} ref={benefitsRef}>
        <div className="cs-container">
          <span className="cs-label">Why Choose Us</span>
          <h2 className="cs-title">Benefits You'll <span className="cs-highlight">Love</span></h2>
          <div className="cs-benefits-grid">
            {[
              { icon: <FaCrown />, title: "50% Faster Development", desc: "Agile methodology and reusable components" },
              { icon: <FaLock />, title: "Bank-Level Security", desc: "Enterprise-grade encryption and compliance" },
              { icon: <FaSync />, title: "Continuous Updates", desc: "Regular feature releases and improvements" },
              { icon: <FaTools />, title: "Dedicated Support", desc: "24/7 technical support and maintenance" }
            ].map((benefit, i) => (
              <div key={i} className="cs-benefit-card">
                <div className="cs-benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cs-cta">
        <div className="cs-container">
          <h2>Ready to Build Your <span>Custom Solution</span>?</h2>
          <p>Let's discuss your requirements and turn your idea into reality.</p>
          <Link to="/contact" className="cs-cta-btn">Start Your Project <FaArrowRight /></Link>
        </div>
      </section>

      {/* Other Services */}
      <section className="cs-other-services">
        <div className="cs-container">
          <span className="cs-label">Explore More</span>
          <h2 className="cs-title">Other Services We <span className="cs-highlight">Offer</span></h2>
          <div className="cs-other-grid">
            {otherServices.map((service) => (
              <Link key={service.path} to={service.path} className="cs-other-card">
                <img src={service.img} alt={service.title} />
                <div className="cs-other-info">
                  <span className="cs-other-num">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.tagline}</p>
                  <span className="cs-other-link">Explore →</span>
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

export default CustomSoftware;