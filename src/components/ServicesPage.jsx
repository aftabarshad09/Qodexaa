import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  FaArrowRight, FaCheckCircle, FaRocket, FaPalette, 
  FaCode, FaMobileAlt, FaShoppingCart, FaBrain,
  FaGem, FaCloud, FaShieldAlt, FaChartLine,
  FaUsers, FaRegStar, FaInfinity, FaCrown,
  FaSearch, FaPenNib, FaCogs, FaDesktop,
  FaFilter, FaTimes, FaPlay, FaPause,
  FaLayerGroup, FaGlobe, FaClock
} from "react-icons/fa";
import { SERVICES } from "./Services";
import "./style/ServicePage.css";

// Background Video
import servicesBgVideo from "../assets/about-bg.mp4";

const ServicesPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [videoPlay, setVideoPlay] = useState(true);
  const videoRef = useRef(null);

  const filters = [
    { id: "all", label: "All Services", icon: <FaLayerGroup /> },
    { id: "development", label: "Development", icon: <FaCode /> },
    { id: "design", label: "Design", icon: <FaPalette /> },
    { id: "ai", label: "AI & Innovation", icon: <FaBrain /> },
    { id: "ecommerce", label: "E-Commerce", icon: <FaShoppingCart /> }
  ];

  const getCategory = (slug) => {
    const categories = {
      "web-development": "development",
      "custom-software": "development",
      "saas-development": "development",
      "generative-ai": "ai",
      "ui-ux-design": "design",
      "ecommerce": "ecommerce",
      "brand-identity": "design"
    };
    return categories[slug] || "all";
  };

  const filteredServices = activeFilter === "all" 
    ? SERVICES 
    : SERVICES.filter(s => getCategory(s.slug) === activeFilter);

  const getRoutePath = (slug) => {
    const rootRoutes = ["ui-ux-design", "brand-identity"];
    if (rootRoutes.includes(slug)) {
      return `/${slug}`;
    }
    return `/services/${slug}`;
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoPlay) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlay(!videoPlay);
    }
  };

  return (
    <div className="services-page-full">
      <Helmet>
        <title>Our Services — Qodexaa</title>
        <meta name="description" content="Explore Qodexaa's services: custom web development, SaaS platforms, AI-powered CRMs, generative AI, UI/UX design, e-commerce, and brand identity." />
        <meta property="og:title" content="Our Services — Qodexaa" />
        <meta property="og:description" content="Explore Qodexaa's services: custom web development, SaaS platforms, AI-powered CRMs, generative AI, UI/UX design, e-commerce, and brand identity." />
        <meta property="og:url" content="https://qodexaa.com/services" />
      </Helmet>
      {/* Hero Section with Video Background */}
      <section className="sp-hero">
        {/* Video Background */}
        <div className="sp-hero-video-wrapper">
          <video
            ref={videoRef}
            className="sp-hero-video"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1551434678-e076c2238d7e?w=1600&q=80"
          >
            <source src={servicesBgVideo} type="video/mp4" />
          </video>
          <div className="sp-hero-overlay"></div>
          
          {/* Video Control Button */}
          <button className="sp-video-control" onClick={toggleVideo}>
            {videoPlay ? <FaPause /> : <FaPlay />}
          </button>
        </div>

        {/* Floating Blue Shapes */}
        <div className="sp-hero-shapes">
          <div className="sp-shape sp-shape-1"></div>
          <div className="sp-shape sp-shape-2"></div>
          <div className="sp-shape sp-shape-3"></div>
          <div className="sp-shape sp-shape-4"></div>
          <div className="sp-shape sp-shape-5"></div>
          <div className="sp-shape sp-shape-6"></div>
        </div>

        <div className="sp-container">
          <div className="sp-hero-content">
            <div className="sp-hero-badge-wrapper">
              <span className="sp-hero-badge-dot"></span>
              <span className="sp-hero-badge">Explore Our Services</span>
            </div>
            <h1 className="sp-hero-title">
              Digital Solutions That <span className="sp-hero-highlight">Drive Growth</span>
            </h1>
            <p className="sp-hero-subtitle">
              We combine strategy, design, and technology to build digital products 
              that users love and businesses rely on.
            </p>
            <div className="sp-hero-actions">
              <Link to="/contact" className="sp-hero-btn sp-hero-btn-primary">
                Start a Project <FaArrowRight />
              </Link>
              <a href="#services-grid" className="sp-hero-btn sp-hero-btn-secondary">
                Explore Services
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="sp-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="sp-scroll-mouse">
            <div className="sp-scroll-wheel"></div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="sp-trusted">
        <div className="sp-container">
          <p className="sp-trusted-label">Trusted by innovative companies worldwide</p>
          <div className="sp-trusted-logos">
            {["Techvision", "NovaSoft", "PixelForge", "CloudStack", "DataPeak", "BuilderIO"].map((logo, i) => (
              <span key={i} className="sp-trusted-logo">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Animated Cards */}
      <section className="sp-stats">
        <div className="sp-container">
          <div className="sp-stats-grid">
            <div className="sp-stat-card" data-count="120">
              <div className="sp-stat-icon"><FaRocket /></div>
              <span className="sp-stat-number">120+</span>
              <span className="sp-stat-label">Projects Shipped</span>
            </div>
            <div className="sp-stat-card" data-count="98">
              <div className="sp-stat-icon"><FaUsers /></div>
              <span className="sp-stat-number">98%</span>
              <span className="sp-stat-label">Client Satisfaction</span>
            </div>
            <div className="sp-stat-card" data-count="8">
              <div className="sp-stat-icon"><FaClock /></div>
              <span className="sp-stat-number">8 wks</span>
              <span className="sp-stat-label">Avg. MVP Timeline</span>
            </div>
            <div className="sp-stat-card" data-count="2">
              <div className="sp-stat-icon"><FaChartLine /></div>
              <span className="sp-stat-number">$2M+</span>
              <span className="sp-stat-label">Client ARR Generated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Service Highlight */}
      <section className="sp-featured">
        <div className="sp-container">
          <div className="sp-featured-content">
            <div className="sp-featured-left">
              <span className="sp-featured-badge">Featured Service</span>
              <h2 className="sp-featured-title">End-to-End <span>Digital Solutions</span></h2>
              <p className="sp-featured-desc">
                From initial concept to final deployment, we provide complete digital solutions 
                tailored to your business needs. Our integrated approach ensures seamless execution 
                across design, development, and strategy.
              </p>
              <div className="sp-featured-features">
                <div><FaCheckCircle /> Strategy & Consulting</div>
                <div><FaCheckCircle /> Design & Prototyping</div>
                <div><FaCheckCircle /> Development & Testing</div>
                <div><FaCheckCircle /> Deployment & Support</div>
              </div>
            </div>
            <div className="sp-featured-right">
              <div className="sp-featured-card">
                <FaGlobe className="sp-featured-icon" />
                <h3>Full-Cycle Development</h3>
                <p>We handle everything from ideation to launch, so you can focus on growing your business.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section - Modern */}
      <section className="sp-filter-section">
        <div className="sp-container">
          <div className="sp-filter-header">
            <div className="sp-filter-title">
              <span className="sp-filter-label">Browse by Category</span>
              <h3>Find the <span>Right Service</span> for You</h3>
            </div>
            <button 
              className="sp-filter-toggle"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              {filterOpen ? <FaTimes /> : <FaFilter />}
              {filterOpen ? "Close" : "Filter"}
            </button>
          </div>
          <div className={`sp-filters ${filterOpen ? "open" : ""}`}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`sp-filter-btn ${activeFilter === filter.id ? "active" : ""}`}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setFilterOpen(false);
                }}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Section - Unique Card Design */}
      <section id="services-grid" className="sp-services">
        <div className="sp-container">
          <div className="sp-services-header">
            <span className="sp-services-badge">Our Offerings</span>
            <h2 className="sp-services-title">What We <span>Deliver</span></h2>
            <p className="sp-services-subtitle">
              Comprehensive solutions tailored to your unique business needs
            </p>
          </div>
          <div className="sp-services-grid">
            {filteredServices.map((service, index) => (
              <div 
                key={service.slug} 
                className="sp-service-card"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(getRoutePath(service.slug))}
              >
                <div className="sp-service-card-front">
                  <div className="sp-service-number">{service.number}</div>
                  <div className="sp-service-icon">{service.icon}</div>
                  <h3 className="sp-service-title">{service.title}</h3>
                  <p className="sp-service-tagline">{service.tagline}</p>
                  <div className="sp-service-tags">
                    {service.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="sp-service-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="sp-service-card-back">
                  <FaArrowRight className="sp-service-arrow" />
                  <span>Explore</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="sp-process">
        <div className="sp-container">
          <div className="sp-process-header">
            <span className="sp-process-badge">How We Work</span>
            <h2 className="sp-process-title">Our <span>Development Process</span></h2>
            <p className="sp-process-subtitle">A battle-tested methodology that delivers results</p>
          </div>
          <div className="sp-process-timeline">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your goals and requirements", icon: <FaSearch /> },
              { step: "02", title: "Strategy", desc: "Planning the roadmap and architecture", icon: <FaCrown /> },
              { step: "03", title: "Design", desc: "Creating beautiful, intuitive interfaces", icon: <FaPalette /> },
              { step: "04", title: "Develop", desc: "Building with clean, scalable code", icon: <FaCode /> },
              { step: "05", title: "Launch", desc: "Deploying and monitoring performance", icon: <FaRocket /> }
            ].map((item, i) => (
              <div key={i} className="sp-process-step">
                <div className="sp-process-step-icon">{item.icon}</div>
                <div className="sp-process-step-number">{item.step}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                {i < 4 && <div className="sp-process-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Interactive Cards */}
      <section className="sp-why">
        <div className="sp-container">
          <div className="sp-why-header">
            <span className="sp-why-badge">Why Choose Us</span>
            <h2 className="sp-why-title">What Makes Us <span>Different</span></h2>
          </div>
          <div className="sp-why-grid">
            {[
              { icon: <FaRocket />, title: "Fast Delivery", desc: "Agile methodology that gets your product to market faster", color: "#2563eb" },
              { icon: <FaShieldAlt />, title: "Enterprise Security", desc: "Bank-level encryption and security standards", color: "#10b981" },
              { icon: <FaUsers />, title: "Dedicated Team", desc: "A dedicated team focused on your success", color: "#f59e0b" },
              { icon: <FaChartLine />, title: "Data-Driven", desc: "Every decision backed by analytics and insights", color: "#ec4899" },
              { icon: <FaRegStar />, title: "Quality First", desc: "Rigorous testing and quality assurance", color: "#8b5cf6" },
              { icon: <FaInfinity />, title: "Ongoing Support", desc: "24/7 support and continuous improvement", color: "#06b6d4" }
            ].map((item, i) => (
              <div key={i} className="sp-why-card" style={{ borderColor: item.color }}>
                <div className="sp-why-icon" style={{ background: `${item.color}15`, color: item.color }}>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Full Width */}
      <section className="sp-cta">
        <div className="sp-cta-bg">
          <div className="sp-cta-shape"></div>
        </div>
        <div className="sp-container">
          <div className="sp-cta-content">
            <h2>Ready to Start Your <span>Project</span>?</h2>
            <p>Let's discuss your vision and build something extraordinary together.</p>
            <div className="sp-cta-buttons">
              <Link to="/contact" className="sp-cta-btn sp-cta-btn-primary">
                Get in Touch <FaArrowRight />
              </Link>
              <Link to="/services" className="sp-cta-btn sp-cta-btn-secondary">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;