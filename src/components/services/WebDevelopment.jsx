import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaArrowRight,FaCode, FaCheckCircle, FaRocket, FaMobileAlt, 
  FaShieldAlt, FaDatabase, FaCloudUploadAlt, FaChartLine,
  FaUsers, FaClock, FaSearch, FaWordpress, FaShopify,
  FaReact, FaNodeJs, FaPhp, FaPython, FaDocker, FaGitAlt,
  FaCrown, FaInfinity, FaRegClock, FaPenNib,
  FaCogs, FaMagic, FaDesktop, FaEye, FaRegGem
} from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiGraphql, SiMongodb, SiPostgresql } from "react-icons/si";
import "./WebDevelopment.css";

const WebDevelopment = () => {
  const heroRef = useRef(null);
  const [heroOffset, setHeroOffset] = useState(0);
  const [overviewRef, overviewVisible] = useReveal();
  const [servicesRef, servicesVisible] = useReveal();
  const [techRef, techVisible] = useReveal();
  const [processRef, processVisible] = useReveal();

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
    { path: "/custom-software", number: "02", title: "Custom Software", tagline: "Tailor-made software engineered for your exact workflow", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
    { path: "/saas-development", number: "03", title: "SaaS Development", tagline: "Launch your SaaS product from MVP to market-ready", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
    { path: "/generative-ai", number: "04", title: "Generative AI", tagline: "Embed AI that actually moves the needle", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80" },
    { path: "/ui-ux-design", number: "05", title: "UI/UX Design", tagline: "Interfaces your users will fall in love with", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
    { path: "/ecommerce", number: "06", title: "E-Commerce", tagline: "Stores that sell — built for speed and conversions", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" },
    { path: "/brand-identity", number: "07", title: "Brand Identity", tagline: "A brand that makes you impossible to ignore", img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80" }
  ];

  return (
    <div className="web-dev-page">
      {/* Hero Section */}
      <section className="wd-hero" ref={heroRef}>
        <div className="wd-hero-bg-layer">
          <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1600&q=80" alt="Web Development" className="wd-hero-img" />
          <div className="wd-hero-overlay"></div>
        </div>
        <div className="wd-hero-content">
          <span className="wd-hero-badge">Web Development</span>
          <h1 className="wd-hero-title">Websites That <span className="wd-hero-highlight">Convert</span></h1>
          <p className="wd-hero-subtitle">Blazing-fast, pixel-perfect websites built to convert visitors into loyal customers. We craft digital experiences that drive real business results.</p>
          <div className="wd-hero-buttons">
            <Link to="/contact" className="wd-btn-primary">Start Your Project <FaArrowRight /></Link>
            <a href="#process" className="wd-btn-secondary">How It Works</a>
          </div>
        </div>
        <div className="wd-hero-stats">
          <div className="wd-stat"><FaRocket /><span className="wd-stat-val">3x</span><span>Faster Load</span></div>
          <div className="wd-stat"><FaChartLine /><span className="wd-stat-val">98%</span><span>Lighthouse</span></div>
          <div className="wd-stat"><FaUsers /><span className="wd-stat-val">40+</span><span>Websites</span></div>
        </div>
      </section>

      {/* Overview Section */}
      <section className={`wd-section wd-overview ${overviewVisible ? "visible" : ""}`} ref={overviewRef}>
        <div className="wd-container">
          <div className="wd-overview-grid">
            <div className="wd-overview-content">
              <span className="wd-label">What We Deliver</span>
              <h2 className="wd-title">Websites That Actually <span className="wd-highlight">Work</span></h2>
              <p className="wd-overview-text">We don't just build websites — we engineer high-performance digital experiences that rank, convert, and scale. Every line of code is intentional, every pixel is purposeful. From simple landing pages to complex web applications, we build solutions that drive real business results.</p>
              <div className="wd-feature-list">
                <div><FaCheckCircle /> SEO Optimized</div>
                <div><FaCheckCircle /> Mobile Responsive</div>
                <div><FaCheckCircle /> Blazing Fast</div>
                <div><FaCheckCircle /> Secure by Default</div>
                <div><FaCheckCircle /> Analytics Ready</div>
                <div><FaCheckCircle /> Conversion Focused</div>
              </div>
            </div>
            <div className="wd-overview-image">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14431b9?w=800&q=80" alt="Web Development Process" />
              <div className="wd-image-badge">10+ Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={`wd-section wd-services ${servicesVisible ? "visible" : ""}`} ref={servicesRef}>
        <div className="wd-container">
          <span className="wd-label">What's Included</span>
          <h2 className="wd-title">Comprehensive <span className="wd-highlight">Web Solutions</span></h2>
          <div className="wd-services-grid">
            {[
              { icon: <FaWordpress />, title: "WordPress Development", desc: "Custom themes, plugins, and enterprise-level WordPress solutions", features: ["Custom Post Types", "Advanced Custom Fields", "WooCommerce", "Speed Optimization"] },
              { icon: <FaReact />, title: "React / Next.js", desc: "Modern, blazing-fast single-page applications and static sites", features: ["Server Side Rendering", "Static Generation", "API Routes", "Image Optimization"] },
              { icon: <FaShopify />, title: "E-Commerce", desc: "High-converting online stores on Shopify and custom platforms", features: ["Product Management", "Payment Gateway", "Inventory Sync", "Abandoned Cart"] },
              { icon: <FaNodeJs />, title: "Custom Web Apps", desc: "Tailored web applications for your unique business needs", features: ["User Dashboards", "CRM Integration", "Real-time Features", "API Development"] },
              { icon: <FaPhp />, title: "PHP / Laravel", desc: "Robust backend systems and enterprise applications", features: ["RESTful APIs", "Admin Panels", "Database Design", "Security First"] },
              { icon: <FaDatabase />, title: "CMS Integration", desc: "Headless CMS and traditional content management systems", features: ["Sanity.io", "Contentful", "Strapi", "Prismic"] }
            ].map((service, i) => (
              <div key={i} className="wd-service-card">
                <div className="wd-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="wd-service-features">{service.features.map((f, idx) => (<span key={idx}>{f}</span>))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className={`wd-section wd-tech ${techVisible ? "visible" : ""}`} ref={techRef}>
        <div className="wd-container">
          <span className="wd-label">Technology Stack</span>
          <h2 className="wd-title">Tools & <span className="wd-highlight">Technologies</span></h2>
          <div className="wd-tech-grid">
            {[
              { icon: <FaReact />, name: "React.js" }, { icon: <SiNextdotjs />, name: "Next.js" }, { icon: <FaNodeJs />, name: "Node.js" },
              { icon: <SiTypescript />, name: "TypeScript" }, { icon: <SiTailwindcss />, name: "Tailwind" }, { icon: <SiGraphql />, name: "GraphQL" },
              { icon: <SiMongodb />, name: "MongoDB" }, { icon: <SiPostgresql />, name: "PostgreSQL" }, { icon: <FaWordpress />, name: "WordPress" },
              { icon: <FaDocker />, name: "Docker" }, { icon: <FaGitAlt />, name: "Git" }, { icon: <FaPython />, name: "Python" }
            ].map((tech, i) => (
              <div key={i} className="wd-tech-item">
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Modern Cards */}
      <section id="process" className={`wd-section wd-process ${processVisible ? "visible" : ""}`} ref={processRef}>
        <div className="wd-container">
          <span className="wd-label">How We Work</span>
          <h2 className="wd-title">Our <span className="wd-highlight">Development</span> Process</h2>
          <div className="wd-process-steps">
            {[
              { number: "01", icon: <FaSearch />, title: "Discovery", subtitle: "Understanding needs", desc: "We dive deep into your goals, audience, and technical requirements", duration: "1 Week" },
              { number: "02", icon: <FaCogs />, title: "Architecture", subtitle: "Planning the foundation", desc: "Planning the tech stack, data flows, and component structure", duration: "1 Week" },
              { number: "03", icon: <FaPenNib />, title: "Design", subtitle: "Creating visuals", desc: "Creating pixel-perfect UI that aligns with your brand identity", duration: "2 Weeks" },
              { number: "04", icon: <FaCode />, title: "Development", subtitle: "Building the solution", desc: "Writing clean, maintainable code with best practices", duration: "4-8 Weeks" },
              { number: "05", icon: <FaShieldAlt />, title: "Testing", subtitle: "Quality assurance", desc: "Rigorous QA, performance audits, and security checks", duration: "1 Week" },
              { number: "06", icon: <FaRocket />, title: "Launch", subtitle: "Going live", desc: "Smooth deployment with zero downtime and post-launch support", duration: "Ongoing" }
            ].map((step, i) => (
              <div key={i} className="wd-process-card">
                <div className="wd-process-number">{step.number}</div>
                <div className="wd-process-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p className="wd-process-subtitle">{step.subtitle}</p>
                <p className="wd-process-desc">{step.desc}</p>
                <span className="wd-process-duration">{step.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="wd-cta">
        <div className="wd-container">
          <h2>Ready to Build Something <span>Amazing</span>?</h2>
          <p>Let's turn your vision into reality. Get a free consultation today.</p>
          <Link to="/contact" className="wd-cta-btn">Start Your Project <FaArrowRight /></Link>
        </div>
      </section>

      {/* Other Services */}
      <section className="wd-other-services">
        <div className="wd-container">
          <span className="wd-label">Explore More</span>
          <h2 className="wd-title">Other Services We <span className="wd-highlight">Offer</span></h2>
          <div className="wd-other-grid">
            {otherServices.map((service) => (
              <Link key={service.path} to={service.path} className="wd-other-card">
                <img src={service.img} alt={service.title} />
                <div className="wd-other-info">
                  <span className="wd-other-num">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.tagline}</p>
                  <span className="wd-other-link">Explore →</span>
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

export default WebDevelopment;