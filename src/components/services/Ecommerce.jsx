import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  FaArrowRight, FaCheckCircle, FaRocket, FaShoppingCart,
  FaChartLine, FaUsers, FaCreditCard, FaMobileAlt, FaTruck,
  FaShieldAlt, FaDatabase, FaSearch, FaStar, FaGem,
  FaDocker, FaCloud, FaMoneyBillWave, FaPlug, FaCode,
  FaRegHeart, FaRegClock, FaRegCreditCard, FaRegSmile,
  FaCrown, FaLock, FaInfinity, FaAward, FaPenNib,
  FaSlidersH, FaFileAlt, FaRegLightbulb
} from "react-icons/fa";
import "./Ecommerce.css";

const Ecommerce = () => {
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
    { path: "/services/custom-software", number: "02", title: "Custom Software", tagline: "Tailor-made software engineered for your exact workflow", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
    { path: "/services/saas-development", number: "03", title: "SaaS Development", tagline: "Launch your SaaS product from MVP to market-ready", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
    { path: "/services/generative-ai", number: "04", title: "Generative AI", tagline: "Embed AI that actually moves the needle", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80" },
    { path: "/services/ui-ux-design", number: "05", title: "UI/UX Design", tagline: "Interfaces your users will fall in love with", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
    { path: "/services/brand-identity", number: "07", title: "Brand Identity", tagline: "A brand that makes you impossible to ignore", img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80" }
  ];

  return (
    <div className="ecommerce-page">
      <Helmet>
        <title>eCommerce Transformation Services — Qodexaa</title>
        <meta name="description" content="Migrate from outdated platforms to a modern, scalable eCommerce stack with Qodexaa. Full transformation handled with zero downtime and zero data loss." />
        <meta property="og:title" content="eCommerce Transformation Services — Qodexaa" />
        <meta property="og:description" content="Migrate from outdated platforms to a modern, scalable eCommerce stack with Qodexaa. Full transformation handled with zero downtime and zero data loss." />
        <meta property="og:url" content="https://qodexaa.com/services/ecommerce-transformation" />
        <meta name="twitter:title" content="eCommerce Transformation Services — Qodexaa" />
        <meta name="twitter:description" content="Migrate from outdated platforms to a modern, scalable eCommerce stack with Qodexaa. Full transformation handled with zero downtime and zero data loss." />
        <link rel="canonical" href="https://qodexaa.com/services/ecommerce-transformation" />
      </Helmet>
      {/* Hero Section */}
      <section className="eco-hero" ref={heroRef}>
        <div className="eco-hero-bg-layer">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80" alt="Ecommerce" className="eco-hero-img" />
          <div className="eco-hero-overlay"></div>
        </div>
        <div className="eco-hero-content">
          <span className="eco-hero-badge">E-Commerce</span>
          <h1 className="eco-hero-title">Stores That <span className="eco-hero-highlight">Sell</span></h1>
          <p className="eco-hero-subtitle">Built for speed, conversions, and unforgettable shopping experiences. Let's build your online empire.</p>
          <div className="eco-hero-buttons">
            <Link to="/contact" className="eco-btn-primary">Launch Your Store <FaArrowRight /></Link>
            <a href="#process" className="eco-btn-secondary">How It Works</a>
          </div>
        </div>
        <div className="eco-hero-stats">
          <div className="eco-stat"><FaShoppingCart /><span className="eco-stat-val">2.4x</span><span>Revenue Increase</span></div>
          <div className="eco-stat"><FaRocket /><span className="eco-stat-val">1.8s</span><span>Load Time</span></div>
          <div className="eco-stat"><FaUsers /><span className="eco-stat-val">30+</span><span>Stores Launched</span></div>
        </div>
      </section>

      {/* Overview Section */}
      <section className={`eco-section eco-overview ${overviewVisible ? "visible" : ""}`} ref={overviewRef}>
        <div className="eco-container">
          <div className="eco-overview-grid">
            <div className="eco-overview-content">
              <span className="eco-label">What We Deliver</span>
              <h2 className="eco-title">Stores That <span className="eco-highlight">Convert</span></h2>
              <p className="eco-overview-text">We build stores that feel fast, look premium, and are optimized to sell. Whether Shopify, WooCommerce, or custom headless solutions — every component is built for revenue. Our stores don't just look beautiful; they drive real business results.</p>
              <div className="eco-feature-list">
                <div><FaCheckCircle /> Lightning Fast Performance</div>
                <div><FaCheckCircle /> Mobile First Design</div>
                <div><FaCheckCircle /> SEO Optimized</div>
                <div><FaCheckCircle /> Secure Payments</div>
                <div><FaCheckCircle /> Inventory Management</div>
                <div><FaCheckCircle /> Analytics Dashboard</div>
              </div>
            </div>
            <div className="eco-overview-image">
              <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80" alt="Ecommerce Store" />
              <div className="eco-image-badge">High Converting</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={`eco-section eco-services ${servicesVisible ? "visible" : ""}`} ref={servicesRef}>
        <div className="eco-container">
          <span className="eco-label">Core Features</span>
          <h2 className="eco-title">Complete <span className="eco-highlight">Ecommerce Package</span></h2>
          <div className="eco-services-grid">
            {[
              { icon: <FaShoppingCart />, title: "Product Management", desc: "Complete product catalog system", features: ["Unlimited Products", "Variants & Options", "Inventory Tracking", "Bulk Import"] },
              { icon: <FaCreditCard />, title: "Payment Gateway", desc: "Secure payment processing", features: ["Stripe/PayPal", "Apple/Google Pay", "Installments", "Multiple Currencies"] },
              { icon: <FaTruck />, title: "Shipping & Fulfillment", desc: "Smart shipping solutions", features: ["Real-time Rates", "Tracking Integration", "Local Pickup", "International Shipping"] },
              { icon: <FaUsers />, title: "Customer Management", desc: "Build customer relationships", features: ["Accounts & Profiles", "Order History", "Wishlists", "Reviews & Ratings"] },
              { icon: <FaSearch />, title: "Advanced Search", desc: "Powerful product discovery", features: ["Filter & Sort", "Search Suggestions", "Related Products", "Faceted Search"] },
              { icon: <FaChartLine />, title: "Analytics & Reports", desc: "Data-driven insights", features: ["Sales Reports", "Customer Analytics", "Inventory Reports", "Abandoned Cart"] }
            ].map((service, i) => (
              <div key={i} className="eco-service-card">
                <div className="eco-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="eco-service-features">{service.features.map((f, idx) => (<span key={idx}>{f}</span>))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className={`eco-section eco-tech ${techVisible ? "visible" : ""}`} ref={techRef}>
        <div className="eco-container">
          <span className="eco-label">Technology Stack</span>
          <h2 className="eco-title">What We <span className="eco-highlight">Build With</span></h2>
          <div className="eco-tech-grid">
            {[
              { icon: <FaGem />, name: "Shopify" }, { icon: <FaShoppingCart />, name: "WooCommerce" }, { icon: <FaCode />, name: "Custom/Headless" },
              { icon: <FaMobileAlt />, name: "Mobile Ready" }, { icon: <FaShieldAlt />, name: "SSL Security" }, { icon: <FaCloud />, name: "Cloud Hosting" },
              { icon: <FaDocker />, name: "Docker" }, { icon: <FaDatabase />, name: "Optimized DB" }, { icon: <FaMoneyBillWave />, name: "Stripe/PP" }
            ].map((tech, i) => (
              <div key={i} className="eco-tech-item">
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Modern Cards */}
      <section id="process" className={`eco-section eco-process ${processVisible ? "visible" : ""}`} ref={processRef}>
        <div className="eco-container">
          <span className="eco-label">How We Work</span>
          <h2 className="eco-title">Our <span className="eco-highlight">Process</span></h2>
          <div className="eco-process-steps">
            {[
              { number: "01", icon: <FaSearch />, title: "Discovery", subtitle: "Understanding your needs", desc: "We analyze your products, audience, and competition to define strategy", duration: "1 Week" },
              { number: "02", icon: <FaPenNib />, title: "Design", subtitle: "Creating visuals", desc: "Conversion-focused designs that reflect your brand and drive purchases", duration: "2 Weeks" },
              { number: "03", icon: <FaCode />, title: "Development", subtitle: "Building your store", desc: "Clean code, fast performance, and seamless checkout integration", duration: "4-6 Weeks" },
              { number: "04", icon: <FaCreditCard />, title: "Integrations", subtitle: "Payments & shipping", desc: "Integrating payment gateways and shipping solutions", duration: "1 Week" },
              { number: "05", icon: <FaShieldAlt />, title: "Testing", subtitle: "Quality assurance", desc: "Rigorous testing across devices before launch", duration: "1 Week" },
              { number: "06", icon: <FaRocket />, title: "Launch & Grow", subtitle: "Going live", desc: "Smooth launch with post-launch support and optimization", duration: "Ongoing" }
            ].map((step, i) => (
              <div key={i} className="eco-process-card">
                <div className="eco-process-number">{step.number}</div>
                <div className="eco-process-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p className="eco-process-subtitle">{step.subtitle}</p>
                <p className="eco-process-desc">{step.desc}</p>
                <span className="eco-process-duration">{step.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`eco-section eco-benefits ${benefitsVisible ? "visible" : ""}`} ref={benefitsRef}>
        <div className="eco-container">
          <span className="eco-label">Why Choose Us</span>
          <h2 className="eco-title">Benefits You'll <span className="eco-highlight">Love</span></h2>
          <div className="eco-benefits-grid">
            {[
              { icon: <FaCrown />, title: "Faster Load Times", desc: "1.8s average load time — because speed sells" },
              { icon: <FaMoneyBillWave />, title: "Higher Conversions", desc: "Optimized checkout that reduces cart abandonment" },
              { icon: <FaRegClock />, title: "Quick Launch", desc: "Get your store live in weeks, not months" },
              { icon: <FaUsers />, title: "Ongoing Support", desc: "Dedicated support after launch" }
            ].map((benefit, i) => (
              <div key={i} className="eco-benefit-card">
                <div className="eco-benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="eco-cta">
        <div className="eco-container">
          <h2>Ready to Launch Your <span>Online Store</span>?</h2>
          <p>Let's build an ecommerce store that drives sales and grows your business.</p>
          <Link to="/contact" className="eco-cta-btn">Start Your Store <FaArrowRight /></Link>
        </div>
      </section>

      {/* Other Services */}
      <section className="eco-other-services">
        <div className="eco-container">
          <span className="eco-label">Explore More</span>
          <h2 className="eco-title">Other Services We <span className="eco-highlight">Offer</span></h2>
          <div className="eco-other-grid">
            {otherServices.map((service) => (
              <Link key={service.path} to={service.path} className="eco-other-card">
                <img src={service.img} alt={service.title} />
                <div className="eco-other-info">
                  <span className="eco-other-num">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.tagline}</p>
                  <span className="eco-other-link">Explore →</span>
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

export default Ecommerce;