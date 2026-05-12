import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import logoImg from "./assets/images/004.png";
import "./components/style/layout.css";
import Footer from "./components/Footer";
import { blogMenuItems } from "./data/blogData";

const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [blogDropdown, setBlogDropdown] = useState(false);

  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const blogRef = useRef(null);
  const servicesButtonRef = useRef(null);
  const aboutButtonRef = useRef(null);
  const blogButtonRef = useRef(null);
  const blogNavLinkRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesDropdown(false);
    setAboutDropdown(false);
    setBlogDropdown(false);
  }, [location]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesDropdown &&
        servicesRef.current &&
        !servicesRef.current.contains(event.target) &&
        !servicesButtonRef.current.contains(event.target)
      ) {
        setServicesDropdown(false);
      }
      if (
        aboutDropdown &&
        aboutRef.current &&
        !aboutRef.current.contains(event.target) &&
        !aboutButtonRef.current.contains(event.target)
      ) {
        setAboutDropdown(false);
      }
      if (
        blogDropdown &&
        blogRef.current &&
        !blogRef.current.contains(event.target) &&
        !blogButtonRef.current.contains(event.target) &&
        !blogNavLinkRef.current?.contains(event.target)
      ) {
        setBlogDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [servicesDropdown, aboutDropdown, blogDropdown]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setServicesDropdown(false);
    setAboutDropdown(false);
    setBlogDropdown(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 350);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const servicesList = [
    { path: "/services/web-development", title: "Web Development", line: "Blazing-fast, pixel-perfect websites built to convert" },
    { path: "/services/custom-software", title: "Custom Software", line: "Tailor-made software engineered for your exact workflow" },
    { path: "/services/saas-development", title: "SaaS Development", line: "Launch your SaaS product from MVP to market-ready" },
    { path: "/services/generative-ai", title: "Generative AI", line: "Embed AI that actually moves the needle" },
    { path: "/services/ui-ux-design", title: "UI/UX Design", line: "Interfaces your users will fall in love with" },
    { path: "/services/ecommerce", title: "E-Commerce", line: "Stores that sell — built for speed and conversions" },
    { path: "/services/brand-identity", title: "Brand Identity", line: "A brand that makes you impossible to ignore" }
  ];

  const aboutList = [
    { path: "/about", title: "Who We Are", line: "Learn about our story, values, and the people behind Qodexaa" },
    { path: "/sap", title: "SAP", line: "Strategic Alliance Partnership — empowering businesses with SAP solutions" }
  ];

  return (
    <>
      <header className={`header ${scrolled ? "header--glassy" : "header--solid"}`}>
        <div className="header__inner">
          <Link to="/" className="header__logo">
            <div className="header__logo-container">
              <img src={logoImg} alt="Qodexaa" className="header__logo-img" />
              <h2 className="header__logo-wordmark">Qodexaa</h2>
            </div>
          </Link>

          <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
            <button className="header__nav-link" onClick={() => scrollTo("home")}>
              HOME
            </button>

            {/* About Dropdown */}
            <div className="header__dropdown">
              <button
                ref={aboutButtonRef}
                className="header__nav-link header__dropdown-trigger"
                onClick={() => setAboutDropdown(!aboutDropdown)}
              >
                ABOUT US
                <svg
                  className={`header__dropdown-icon ${aboutDropdown ? 'rotate' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="14"
                  height="14"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {aboutDropdown && (
                <div className="header__dropdown-menu header__dropdown-menu--about" ref={aboutRef}>
                  <div className="header__dropdown-header">
                    <span className="header__dropdown-title">About Qodexaa</span>
                    <span className="header__dropdown-subtitle">Get to know us better</span>
                  </div>
                  <div className="header__dropdown-about-grid">
                    {aboutList.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="header__dropdown-item-large"
                        onClick={() => setAboutDropdown(false)}
                      >
                        <div className="header__dropdown-item-title">{item.title}</div>
                        <div className="header__dropdown-item-line">{item.line}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="header__dropdown">
              <button
                ref={servicesButtonRef}
                className="header__nav-link header__dropdown-trigger"
                onClick={() => setServicesDropdown(!servicesDropdown)}
              >
                SERVICES
                <svg
                  className={`header__dropdown-icon ${servicesDropdown ? 'rotate' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="14"
                  height="14"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {servicesDropdown && (
                <div className="header__dropdown-menu header__dropdown-menu--large" ref={servicesRef}>
                  <div className="header__dropdown-header">
                    <span className="header__dropdown-title">Our Services</span>
                    <span className="header__dropdown-subtitle">What we offer</span>
                  </div>
                  <div className="header__dropdown-grid">
                    {servicesList.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="header__dropdown-item-large"
                        onClick={() => setServicesDropdown(false)}
                      >
                        <div className="header__dropdown-item-title">{service.title}</div>
                        <div className="header__dropdown-item-line">{service.line}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Blog – NavLink for navigation + separate arrow for dropdown */}
            <div className="header__dropdown header__dropdown--split">
              <NavLink
                ref={blogNavLinkRef}
                to="/blog"
                className={({ isActive }) => `header__nav-link header__blog-nav ${isActive ? 'active' : ''}`}
              >
                EXPLORE Blog
              </NavLink>
              <button
                ref={blogButtonRef}
                className="header__nav-link header__blog-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setBlogDropdown(!blogDropdown);
                }}
                aria-label="Open blog articles menu"
              >
                OUR POSTS
                <svg
                  className={`header__dropdown-icon ${blogDropdown ? 'rotate' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="14"
                  height="14"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {blogDropdown && (
                <div className="header__dropdown-menu header__dropdown-menu--blog" ref={blogRef}>
                  <div className="header__dropdown-header">
                    <span className="header__dropdown-title">Our Blog</span>
                    <span className="header__dropdown-subtitle">Deep dives & guides</span>
                  </div>
                  <div className="header__dropdown-grid--blog">
                    {blogMenuItems.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/blog/${item.slug}`}
                        className="header__dropdown-item-large"
                        onClick={() => setBlogDropdown(false)}
                      >
                        <div className="header__dropdown-item-title">{item.label}</div>
                        <div className="header__dropdown-item-line">
                          {item.label === "Custom Web Development"
                            ? "Tailored platforms for flexibility and scale"
                            : item.label === "SaaS Management & Analytics"
                              ? "Control costs, improve visibility"
                              : item.label === "Graphic Designer's Nightmare"
                                ? "Production-ready chaos in 2026"
                                : item.label === "Digital Marketing Modern World"
                                  ? "AI-driven strategies for growth"
                                  : item.label === "What is SEO & Why It Matters"
                                    ? "Master SEO in the AI era"
                                    : item.label === "AI-Powered CRM Systems"
                                      ? "Predictive analytics & intelligent automation"
                                      : item.label === "Custom E-Commerce Platforms"
                                        ? "Build scalable online stores that convert"
                                        : item.label === "SaaS Product Development"
                                          ? "From MVP to market-ready platform"
                                          : "Deep insights for modern businesses"}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Link */}
            <NavLink
              to="/reviews"
              className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`}
            >
              Reviews
            </NavLink>

            {/* Careers Link */}
            <NavLink
              to="/careers"
              className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`}
            >
              Careers
            </NavLink>

            {/* Mobile Contact Button - Only visible in mobile menu */}
            <button 
              className="header__mobile-cta"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </button>
          </nav>

          <div className="header__actions">
            <button className="header__cta" onClick={() => navigate("/contact")}>
              Contact Us
            </button>

            <button
              className={`header__hamburger ${menuOpen ? "header__hamburger--open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;