import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaArrowRight, FaCheckCircle, FaRocket, FaShieldAlt,
  FaDatabase, FaCloudUploadAlt, FaChartLine, FaUsers,
  FaCogs, FaCode, FaBrain, FaChartBar, FaLock,
  FaSync, FaTools, FaServer, FaPlug, FaDesktop,
  FaMobileAlt, FaGraduationCap, FaHandshake, FaGlobe,
  FaSearch, FaBuilding, FaChartPie, FaMicrochip,
  FaUserTie, FaEnvelope, FaPhone, FaLinkedin, FaStar
} from "react-icons/fa";
import "./style/SAP.css";
import USAMA from "../assets/profiles/USAMA.jpeg";

const SAP = () => {
  const heroRef = useRef(null);
  const [heroOffset, setHeroOffset] = useState(0);
  const [overviewRef, overviewVisible] = useReveal();
  const [solutionsRef, solutionsVisible] = useReveal();
  const [benefitsRef, benefitsVisible] = useReveal();
  const [consultantRef, consultantVisible] = useReveal();

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setHeroOffset(window.scrollY * 0.25);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solutions = [
    {
      icon: <FaDatabase />,
      title: "SAP S/4HANA Solutions",
      desc: "Enterprise-grade SAP S/4HANA ERP solutions designed to streamline operations, automate workflows, and accelerate digital transformation for modern businesses.",
      features: [
        "Real-Time Business Analytics",
        "AI & Machine Learning Integration",
        "Financial & Predictive Accounting"
      ]
    },
    {
      icon: <FaCloudUploadAlt />,
      title: "SAP Business ByDesign Services",
      desc: "Cloud-based SAP ERP solutions for small and mid-sized businesses looking to improve financial management, operational efficiency, and scalability.",
      features: [
        "Cloud Financial Management",
        "Supply Chain Optimization",
        "Project & Resource Management"
      ]
    },
    {
      icon: <FaChartPie />,
      title: "SAP Analytics Cloud",
      desc: "Advanced business intelligence and cloud analytics platform that helps organizations make data-driven decisions with real-time insights and forecasting.",
      features: [
        "Business Intelligence Dashboards",
        "Financial Planning & Forecasting",
        "Predictive Data Analytics"
      ]
    },
    {
      icon: <FaUsers />,
      title: "SAP SuccessFactors Consulting",
      desc: "Modern human capital management solutions that improve employee experience, workforce productivity, payroll management, and HR analytics.",
      features: [
        "Talent & Employee Management",
        "HR Payroll Automation",
        "Workforce Performance Analytics"
      ]
    },
    {
      icon: <FaMicrochip />,
      title: "SAP Business Technology Platform",
      desc: "Custom SAP application development and integration services to help businesses build scalable, secure, and intelligent enterprise solutions.",
      features: [
        "Custom SAP App Development",
        "Enterprise Integration Suite",
        "Cloud Data Management"
      ]
    }
  ];

  const benefits = [
    { title: "Business Process Automation", desc: "Optimize enterprise workflows with advanced SAP ERP solutions" },
    { title: "Real-Time Business Analytics", desc: "Make faster and smarter decisions using live enterprise data" },
    { title: "Secure Cloud Infrastructure", desc: "Enterprise-grade scalability, performance, and security" },
    { title: "SAP Integration & Compliance", desc: "Ensure seamless system integration and global compliance standards" }
  ];

  return (
    <div className="sap-unique">
      <Helmet>
        <title>SAP Solutions & Integration Services — Qodexaa</title>
        <meta name="description" content="Streamline your enterprise operations with Qodexaa's SAP solutions. From SAP implementation and integration to custom module development and ongoing support." />
        <meta property="og:title" content="SAP Solutions & Integration Services — Qodexaa" />
        <meta property="og:description" content="Streamline your enterprise operations with Qodexaa's SAP solutions. From SAP implementation and integration to custom module development and ongoing support." />
        <meta property="og:url" content="https://qodexaa.com/services/sap" />
        <meta name="twitter:title" content="SAP Solutions & Integration Services — Qodexaa" />
        <meta name="twitter:description" content="Streamline your enterprise operations with Qodexaa's SAP solutions. From SAP implementation and integration to custom module development and ongoing support." />
      </Helmet>
      {/* Unique Hero with Split Layout */}
      <section className="sap-unique-hero" ref={heroRef}>
        <div className="sap-unique-hero-bg">
          <div className="sap-unique-hero-pattern"></div>
          <div className="sap-unique-hero-gradient"></div>
        </div>

        <div className="sap-unique-hero-container">
          <div className="sap-unique-hero-left">
            <div className="sap-unique-badge">Certified SAP Consulting Partner</div>
            <h1 className="sap-unique-title">
              SAP <span className="sap-unique-title-glow">Consulting Solutions</span>
            </h1>
            <p className="sap-unique-subtitle">
              QODEXAA delivers enterprise SAP consulting, ERP implementation and cloud integration services that improve operational efficiency .
            </p>
            <div className="sap-unique-buttons">
              <Link to="/contact" className="sap-unique-btn-primary">
                Get Started <FaArrowRight />
              </Link>
              <a href="#next" className="sap-unique-btn-secondary">
                Explore Solutions
              </a>
            </div>
            <div className="sap-unique-stats">
              <div className="sap-unique-stat">
                <span className="sap-unique-stat-value">500+</span>
                <span className="sap-unique-stat-label">Enterprise Clients</span>
              </div>
              <div className="sap-unique-stat">
                <span className="sap-unique-stat-value">25+</span>
                <span className="sap-unique-stat-label">Industries Served</span>
              </div>
              <div className="sap-unique-stat">
                <span className="sap-unique-stat-value">99.9%</span>
                <span className="sap-unique-stat-label">Cloud Reliability</span>
              </div>
            </div>
          </div>

          <div className="sap-unique-hero-right">
            <div className="sap-unique-floating-card sap-unique-floating-1">
              <FaDatabase />
              <span>SAP ERP Solutions</span>
            </div>
            <div className="sap-unique-floating-card sap-unique-floating-2">
              <FaCloudUploadAlt />
              <span>Cloud Integration</span>
            </div>
            <div className="sap-unique-floating-card sap-unique-floating-3">
              <FaShieldAlt />
              <span>Enterprise Security</span>
            </div>
            <div className="sap-unique-glow-orb"></div>
          </div>
        </div>
      </section>

      {/* What is SAP - Card Style */}
      <section id="next" className={`sap-unique-section ${overviewVisible ? "visible" : ""}`} ref={overviewRef}>
        <div className="sap-unique-container">
          <div className="sap-unique-what-card">
            <div className="sap-unique-what-left">
              <span className="sap-unique-section-label">Enterprise SAP Services</span>
              <h2 className="sap-unique-section-title">What is <span>SAP</span>?</h2>
              <p>
                SAP is a globally recognized enterprise resource planning (ERP) platform that helps businesses manage finance, operations, supply chain, procurement, analytics, and customer experience. QODEXAA provides SAP consulting and implementation services designed to streamline operations and support digital transformation.
              </p>
              <div className="sap-unique-features">
                <div><FaCheckCircle /> SAP ERP Implementation Services</div>
                <div><FaCheckCircle /> Custom SAP Module Development</div>
                <div><FaCheckCircle /> SAP Data Migration & Integration</div>
                <div><FaCheckCircle /> 24/7 SAP Technical Support</div>
              </div>
            </div>
            <div className="sap-unique-what-right">
              <div className="sap-unique-stats-card">
                <div className="sap-unique-stats-item">
                  <span className="sap-unique-stats-number">98%</span>
                  <span>Client Satisfaction</span>
                </div>
                <div className="sap-unique-stats-item">
                  <span className="sap-unique-stats-number">150+</span>
                  <span>SAP Deployments</span>
                </div>
                <div className="sap-unique-stats-item">
                  <span className="sap-unique-stats-number">24/7</span>
                  <span>Technical Assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAP Consultant Section */}
      <section className={`sap-unique-consultant ${consultantVisible ? "visible" : ""}`} ref={consultantRef}>
        <div className="sap-unique-container">
          <div className="sap-unique-consultant-header">
            <span className="sap-unique-section-label">SAP Industry Expert</span>
            <h2 className="sap-unique-section-title">Your SAP <span>Consultant</span></h2>
            <p>
              Experienced SAP consultant specializing in ERP implementation, procurement optimization, cloud migration, and enterprise business transformation.
            </p>
          </div>

          <div className="sap-unique-consultant-card">
            <div className="sap-unique-consultant-image">
              <img src={USAMA} alt="Usama - SAP Consultant" />
              <div className="sap-unique-consultant-badge">
                <FaStar /> SAP Certified Professional
              </div>
            </div>
            <div className="sap-unique-consultant-info">
              <h3>Usama Ashraf</h3>
              <div className="sap-unique-consultant-title">
                SAP S/4HANA MM Consultant | SAP Cloud Procurement & Sourcing Specialist
              </div>
              <div className="sap-unique-consultant-experience">
                <div className="sap-unique-exp-item">
                  <FaCheckCircle />
                  <span>2+ Years SAP Consulting Experience</span>
                </div>
                <div className="sap-unique-exp-item">
                  <FaCheckCircle />
                  <span>15+ Enterprise SAP Implementations</span>
                </div>
                <div className="sap-unique-exp-item">
                  <FaCheckCircle />
                  <span>Certified SAP S/4HANA Expert</span>
                </div>
              </div>
              <div className="sap-unique-consultant-bio">
                <p>
                  Usama specializes in SAP S/4HANA implementation, procurement automation, materials management, and enterprise workflow optimization. He has successfully delivered SAP transformation solutions for manufacturing, retail, logistics, and enterprise organizations.
                </p>
              </div>
              <div className="sap-unique-consultant-contact">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=usama@qodexaa.com" target="_blank" rel="noopener noreferrer" className="sap-unique-contact-link">
                  <FaEnvelope /> usama@qodexaa.com
                </a>
                <a href="https://www.linkedin.com/in/usama-ashraf-11b835281?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="sap-unique-contact-link">
                  <FaLinkedin /> LinkedIn Profile
                </a>
              </div>
              <Link to="/contact" className="sap-unique-consultant-btn">
                Schedule Consultation <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions - Unique Grid */}
      <section className={`sap-unique-section sap-unique-solutions ${solutionsVisible ? "visible" : ""}`} ref={solutionsRef}>
        <div className="sap-unique-container">
          <div className="sap-unique-header-center">
            <span className="sap-unique-section-label">Enterprise SAP Expertise</span>
            <h2 className="sap-unique-section-title">SAP Solutions <span>We Deliver</span></h2>
            <p>
              End-to-end SAP consulting, ERP implementation, cloud migration, integration, and support services tailored for modern enterprises and growing businesses.
            </p>
          </div>

          <div className="sap-unique-solutions-grid">
            {solutions.map((solution, i) => (
              <div key={i} className="sap-unique-solution-card" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="sap-unique-solution-icon">{solution.icon}</div>
                <h3>{solution.title}</h3>
                <p>{solution.desc}</p>
                <div className="sap-unique-solution-features">
                  {solution.features.map((f, idx) => <span key={idx}>{f}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Modern Banner */}
      <section className="sap-unique-benefits">
        <div className="sap-unique-benefits-bg"></div>
        <div className="sap-unique-container">
          <div className="sap-unique-benefits-content">
            <div className="sap-unique-benefits-left">
              <span className="sap-unique-section-label">Why Businesses Choose QODEXAA</span>
              <h2 className="sap-unique-section-title">Accelerate Enterprise <span>Growth</span></h2>
              <p>
                Improve operational efficiency, automate business processes, and scale enterprise performance with intelligent SAP ERP and cloud solutions from QODEXAA.
              </p>
              <Link to="/contact" className="sap-unique-btn-primary">
                Schedule Consultation <FaArrowRight />
              </Link>
            </div>
            <div className="sap-unique-benefits-right">
              {benefits.map((benefit, i) => (
                <div key={i} className="sap-unique-benefit-card">
                  <div className="sap-unique-benefit-dot"></div>
                  <div>
                    <h4>{benefit.title}</h4>
                    <p>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries - Trust Bar */}
      <section className="sap-unique-trusted">
        <div className="sap-unique-container">
          <div className="sap-unique-trusted-header">
            <span className="sap-unique-section-label">Industries We Support</span>
            <h2 className="sap-unique-section-title">Enterprise Sectors <span>We Serve</span></h2>
          </div>
          <div className="sap-unique-trusted-grid">
            {["Manufacturing", "Retail & Ecommerce", "Healthcare", "Banking & Finance", "Energy & Utilities", "Logistics & Supply Chain", "Construction", "Professional Services"].map((industry, i) => (
              <div key={i} className="sap-unique-trusted-item">
                <FaBuilding />
                <span>{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Clean */}
      <section className="sap-unique-cta">
        <div className="sap-unique-cta-container">
          <h2>Ready to Scale Your Business with <span>SAP</span>?</h2>
          <p>
            Partner with QODEXAA for SAP consulting, ERP implementation, cloud integration, and enterprise digital transformation services.
          </p>
          <Link to="/contact" className="sap-unique-cta-btn">
            Start Your SAP Transformation <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

export default SAP;

