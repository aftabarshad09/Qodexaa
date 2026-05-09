import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaArrowRight, FaInstagram, FaCheckCircle, FaRocket, FaUsers,
  FaHeart, FaLightbulb, FaHandshake, FaGlobe,
  FaChartLine, FaCode, FaMobileAlt, FaCloud,
  FaTrophy, FaCoffee, FaGithub, FaLinkedin, FaTwitter,
  FaBolt, FaDatabase, FaLayerGroup, FaSearch,
  FaPenNib, FaCogs, FaShieldAlt
} from "react-icons/fa";
import "./style/About.css";

import bgVideo from "../assets/reviews-bg.mp4";
import Fahad from "../assets/profiles/fahad.jpeg";
import AFTAB from "../assets/profiles/AFTAB.jpeg";
import REHAN from "../assets/profiles/REHAN.jpeg";
import AHMAD from "../assets/profiles/AHMAD.jpeg";
import OMER from "../assets/profiles/OMER.jpeg";
import HASEEB from "../assets/profiles/HASEEB.jpeg";

const About = () => {
  const [counts, setCounts] = useState({ projects: 0, clients: 0, years: 0, team: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState({});

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const ease = 1 - Math.pow(1 - step / steps, 3);
            setCounts({
              projects: Math.min(Math.floor(ease * 120), 120),
              clients: Math.min(Math.floor(ease * 40), 40),
              years: Math.min(Math.floor(ease * 5), 5),
              team: Math.min(Math.floor(ease * 28), 28),
            });
            if (step >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Scroll-reveal for sections
  useEffect(() => {
    const sections = document.querySelectorAll(".about-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Team data
  // Replace your existing team array with this updated one:
  const team = [
    {
      name: "Muhammad Ahmad",
      role: "Founder & CEO",
      email: "ahmad@qodexaa.com",
      avatar: AHMAD,
      instagram: "https://www.instagram.com/ahma__adhere?igsh=d202NTJ5bmRpOXhy",
      linkedin: "https://www.linkedin.com/in/muhammad-ahmad-75b3ab2b5?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      bio: "Visionary leader with 2+ years scaling startups from 0 to 1.",
    },
    {
      name: "Aftab Ahmad",
      role: "Co-Founder & CTO",
      email: "aftab@qodexaa.com",
      instagram: "https://www.instagram.com/me_aftab09",
      linkedin: "https://www.linkedin.com/in/helloaftabahmad",
      avatar: AFTAB,
      bio: "Full-stack developer who loves building robust, scalable applications.",
    },
    {
      name: "Rehan Ahmed",
      role: "Lead Developer",
      email: "rehan@qodexaa.com",
      instagram: "https://www.instagram.com/rehanahmedkhan987?igsh=NTA0bnpraWV3YnRx",
      linkedin: "https://www.linkedin.com/in/rehan-khan-31aa70241",
      avatar: REHAN,
      bio: "Senior developer with expertise in modern web technologies.",
    },
    {
      name: "Muhammad Fahad",
      role: "CPO & Full-Stack Developer",
      email: "fahad@qodexaa.com",
      instagram: "https://www.instagram.com/m._fahad034",
      linkedin: "https://www.linkedin.com/in/muhammad-fahad-461475332",
      avatar: Fahad,
      bio: "Full-stack developer and UI/UX enthusiast.",
    },
    // NEW TEAM MEMBERS - UTBA & OMER
      {
      name: "Omer Ahmed",
      role: "Co-Founder & SEO Specialist",
      email: "omer@qodexaa.com",
      instagram: "https://www.instagram.com/omerahmed1004?igsh=dnU5dzlvZjlkZnNn&utm_source=qr",
      linkedin: "https://www.linkedin.com/in/omer-ahmed-a628b8331?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      avatar: OMER,
      bio: "SEO specialist with a passion for driving organic traffic and improving search engine rankings.",
    },
    {
      name: "Haseeb Baber",
      role: "Associate Software Engineer",
      email: "haseeb@qodexaa.com",
      instagram: "https://www.instagram.com/haseebchaudhary___?igsh=MTRpcnMxN2kzbDRwOQ==",
      linkedin: "https://www.linkedin.com/in/haseeb-chaudhary-530245390",
      avatar: HASEEB,
      bio: "Product management enthusiast with a focus on user-centered design and data-driven decision making.",
    }
   
  ];
  const values = [
    { icon: <FaHeart />, title: "Customer First", desc: "Your success is our success. We prioritize your needs above everything else." },
    { icon: <FaLightbulb />, title: "Innovation Driven", desc: "We constantly push boundaries and embrace cutting-edge technologies." },
    { icon: <FaHandshake />, title: "Transparent Partnership", desc: "Open communication and honest relationships built on trust." },
    { icon: <FaRocket />, title: "Excellence Focused", desc: "We never settle for 'good enough' — only exceptional results." },
  ];

  const techStack = [
    { icon: <FaCode />, name: "React / Next.js", desc: "Modern, performant frontend frameworks" },
    { icon: <FaMobileAlt />, name: "React Native", desc: "Cross-platform mobile development" },
    { icon: <FaCloud />, name: "Cloud Native", desc: "AWS, Azure & GCP infrastructure" },
    { icon: <FaChartLine />, name: "AI / ML", desc: "GPT-4, Claude, Llama & custom models" },
    { icon: <FaDatabase />, name: "Databases", desc: "PostgreSQL, MongoDB, Redis" },
    { icon: <FaBolt />, name: "Node.js / Python", desc: "Scalable, high-performance backends" },
  ];

  const process = [
    { num: "01", icon: <FaSearch />, title: "Discovery", desc: "We deep-dive into your business goals, users, and technical landscape." },
    { num: "02", icon: <FaPenNib />, title: "Design", desc: "Pixel-perfect UI/UX that balances aesthetics with usability." },
    { num: "03", icon: <FaCogs />, title: "Build", desc: "Agile sprints with continuous delivery and QA at every step." },
    { num: "04", icon: <FaRocket />, title: "Launch & Grow", desc: "Deploy, monitor, iterate — we're with you post-launch." },
  ];

  const trustLogos = ["Techvision", "NovaSoft", "PixelForge", "CloudStack", "DataPeak", "BuilderIO"];

  return (
    <div className="about-page">
      <Helmet>
        <title>About Us — Who We Are at Qodexaa</title>
        <meta name="description" content="Learn about Qodexaa — a team of engineers, designers, and strategists building AI-powered software, SaaS platforms, and digital solutions for modern businesses." />
        <meta property="og:title" content="About Us — Who We Are at Qodexaa" />
        <meta property="og:description" content="Learn about Qodexaa — a team of engineers, designers, and strategists building AI-powered software, SaaS platforms, and digital solutions for modern businesses." />
        <meta property="og:url" content="https://qodexaa.com/about" />
        <meta name="twitter:title" content="About Us — Who We Are at Qodexaa" />
        <meta name="twitter:description" content="Learn about Qodexaa — a team of engineers, designers, and strategists building AI-powered software, SaaS platforms, and digital solutions for modern businesses." />
        <link rel="canonical" href="https://qodexaa.com/about" />
      </Helmet>
      {/* ════════════ HERO WITH VIDEO BACKGROUND ════════════ */}
      <section className="about-hero" aria-label="About Qodexaa hero">
        {/* Video Background */}
        <div className="about-hero-video-wrapper">
          <video
            className="about-hero-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className="about-hero-overlay"></div>
        </div>

        {/* Glowing Orbs */}
        <div className="about-hero-orb about-hero-orb-1" />
        <div className="about-hero-orb about-hero-orb-2" />

        <div className="about-hero-content">
          <div className="about-hero-text">
            <span className="about-hero-badge">About Qodexaa</span>
            <h1 className="about-hero-title">
              We're on a mission to{" "}
              <span className="about-hero-highlight">transform</span> how
              businesses build digital products
            </h1>
            <p className="about-hero-subtitle">
              A team of passionate engineers, designers, and strategists
              dedicated to crafting exceptional digital experiences that drive
              real, measurable business growth.
            </p>
            <div className="about-hero-buttons">
              <Link to="/contact" className="about-btn-primary">
                Work With Us <FaArrowRight aria-hidden="true" />
              </Link>
              <a href="#story" className="about-btn-secondary">
                Our Story ↴
              </a>
            </div>
          </div>

          <div className="about-hero-stats" ref={statsRef} aria-label="Company statistics">
            {[
              { num: counts.projects, suffix: "+", label: "Projects Delivered" },
              { num: counts.clients, suffix: "+", label: "Happy Clients" },
              { num: counts.years, suffix: "+", label: "Years Experience" },
              { num: counts.team, suffix: "", label: "Team Members" },
            ].map((stat, i) => (
              <div className="about-stat-card" key={i}>
                <span className="about-stat-number" aria-live="polite">
                  {stat.num}{stat.suffix}
                </span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ REST OF SECTIONS (Unchanged) ════════════ */}
      {/* STORY SECTION */}
      <section
        id="story"
        className={`about-section about-story ${visibleSections.story ? "visible" : ""}`}
        aria-label="Our story"
      >
        <div className="about-container">
          <div className="about-story-grid">
            <div className="about-story-image">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Qodexaa team collaborating on a project"
                loading="lazy"
                width="800"
                height="600"
              />
              <div className="about-story-badge" aria-label="Founded 2021">
                <FaCoffee aria-hidden="true" />
                <span>Founded 2021</span>
              </div>
            </div>

            <div className="about-story-content">
              <span className="about-section-tag">Our Journey</span>
              <h2 className="about-section-title">
                From humble <span className="about-highlight">beginnings</span>{" "}
                to digital excellence
              </h2>
              <p className="about-story-text">
                Qodexaa started in 2021 with a simple belief: quality software
                shouldn't be reserved for enterprises only. What began as a
                two-person freelance operation has grown into a full-service
                digital studio trusted by businesses worldwide.
              </p>
              <p className="about-story-text">
                Today we're a team of passionate creators who've shipped over
                120 products — from sleek marketing websites to complex AI
                systems. We've kept our startup mindset: agile, transparent,
                and obsessively focused on delivering lasting value.
              </p>
              <div className="about-story-milestones">
                <div className="about-milestone"><FaTrophy aria-hidden="true" /> <span>120+ Projects</span></div>
                <div className="about-milestone"><FaGlobe aria-hidden="true" />  <span>Global Clients</span></div>
                <div className="about-milestone"><FaCode aria-hidden="true" />   <span>7 Tech Stacks</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section
        id="mission"
        className={`about-section about-mission ${visibleSections.mission ? "visible" : ""}`}
        aria-label="Our mission"
      >
        <div className="about-container">
          <div className="about-mission-card">
            <div className="about-mission-left">
              <span className="about-section-tag about-tag-light">Our Mission</span>
              <h2 className="about-mission-title">
                Empower every ambitious founder with{" "}
                <span className="about-highlight-light">
                  world-class digital craftsmanship
                </span>
              </h2>
            </div>
            <div className="about-mission-right">
              <p className="about-mission-text">
                We believe exceptional digital products should be accessible to
                everyone, not just Fortune 500 companies. Our mission is to
                bridge the gap between ambitious ideas and flawless execution —
                delivering products that stand the test of time.
              </p>
              <div className="about-mission-principles">
                {[
                  "Quality without compromise",
                  "Transparent partnerships",
                  "Long-term thinking",
                  "Security-first mindset",
                ].map((p, i) => (
                  <div className="about-principle" key={i}>
                    <FaCheckCircle aria-hidden="true" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section
        id="process"
        className={`about-section about-process ${visibleSections.process ? "visible" : ""}`}
        aria-label="How we work"
      >
        <div className="about-container">
          <div className="about-process-header">
            <span className="about-section-tag">How We Work</span>
            <h2 className="about-section-title">
              Our <span className="about-highlight">proven</span> process
            </h2>
            <p className="about-values-subtitle">
              From discovery to deployment, we follow a battle-tested process
              that minimizes risk and maximises impact.
            </p>
          </div>
          <div className="about-process-steps">
            {process.map((step, i) => (
              <div
                className="about-process-step"
                key={i}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="about-process-num" aria-hidden="true">
                  {step.num}
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section
        id="values"
        className={`about-section about-values ${visibleSections.values ? "visible" : ""}`}
        aria-label="Our core values"
      >
        <div className="about-container">
          <div className="about-values-header">
            <span className="about-section-tag">Core Values</span>
            <h2 className="about-section-title">
              What <span className="about-highlight">guides</span> us every day
            </h2>
            <p className="about-values-subtitle">
              These principles shape our culture, our decisions, and every line
              of code we ship.
            </p>
          </div>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <div
                className="about-value-card"
                key={i}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="about-value-icon" aria-hidden="true">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / CLIENTS */}
      <div className="about-trust" aria-label="Trusted by">
        <div className="about-trust-inner">
          <p className="about-trust-label">Trusted by forward-thinking companies</p>
          <div className="about-trust-logos">
            {trustLogos.map((name, i) => (
              <span className="about-trust-logo" key={i}>{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* TECHNOLOGY SECTION */}
      <section
        id="tech"
        className={`about-section about-tech ${visibleSections.tech ? "visible" : ""}`}
        aria-label="Technology stack"
      >
        <div className="about-container">
          <div className="about-tech-header">
            <span className="about-section-tag about-tag-light">Technology Stack</span>
            <h2 className="about-section-title" style={{ color: "#fff" }}>
              Tools we <span className="about-highlight-light">master</span>
            </h2>
            <p className="about-tech-subtitle">
              We stay ahead of the curve — using modern, battle-tested
              technologies to build scalable, maintainable solutions.
            </p>
          </div>
          <div className="about-tech-grid">
            {techStack.map((tech, i) => (
              <div className="about-tech-card" key={i}>
                <div className="about-tech-icon" aria-hidden="true">{tech.icon}</div>
                <h3>{tech.name}</h3>
                <p>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      {/* TEAM SECTION */}
      <section
        id="team"
        className={`about-section about-team ${visibleSections.team ? "visible" : ""}`}
        aria-label="Meet the team"
      >
        <div className="about-container">
          <div className="about-team-header">
            <span className="about-section-tag">Meet the Team</span>
            <h2 className="about-section-title">
              The <span className="about-highlight">people</span> behind the code
            </h2>
            <p className="about-team-subtitle">
              A diverse group of creators united by a passion for building
              remarkable software.
            </p>
          </div>

          {/* First Row - 4 Team Members */}
          <div className="about-team-grid">
            {team.slice(0, 4).map((member, i) => (
              <article className="about-team-card" key={i}>
                <div className="about-team-avatar">
                  <img
                    src={member.avatar}
                    alt={`${member.name}, ${member.role} at Qodexaa`}
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                  <div className="about-team-social" aria-label={`${member.name}'s social links`}>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                  </div>
                </div>
                <div className="about-team-info">
                  <h3>{member.name}</h3>
                  <p className="about-team-role">{member.role}</p>
                  <p className="about-team-bio">{member.bio}</p>
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}`} target="blank" className="about-team-email">
                    {member.email}
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Second Row - Remaining 2 Team Members (Centered) */}
          {team.length > 4 && (
            <div className="about-team-grid about-team-grid-centered">
              {team.slice(4).map((member, i) => (
                <article className="about-team-card" key={i + 4}>
                  <div className="about-team-avatar">
                    <img
                      src={member.avatar}
                      alt={`${member.name}, ${member.role} at Qodexaa`}
                      loading="lazy"
                      width="400"
                      height="400"
                    />
                    <div className="about-team-social" aria-label={`${member.name}'s social links`}>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                    </div>
                  </div>
                  <div className="about-team-info">
                    <h3>{member.name}</h3>
                    <p className="about-team-role">{member.role}</p>
                    <p className="about-team-bio">{member.bio}</p>
                    <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}`} target="blank" className="about-team-email">
                      {member.email}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        id="cta"
        className={`about-section about-cta ${visibleSections.cta ? "visible" : ""}`}
        aria-label="Start a project"
      >
        <div className="about-container">
          <div className="about-cta-card">
            <div className="about-cta-content">
              <h2>
                Ready to build something{" "}
                <span className="about-highlight-light">extraordinary</span>?
              </h2>
              <p>
                Let's turn your vision into reality. We'd love to hear about
                your project.
              </p>
              <div className="about-cta-buttons">
                <Link to="/contact" className="about-btn-primary about-btn-large">
                  Start Your Project <FaArrowRight aria-hidden="true" />
                </Link>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@qodexaa.com" target="_blank" rel="noopener noreferrer" className="about-btn-secondary about-btn-large">
                  info@qodexaa.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;