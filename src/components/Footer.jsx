import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style/Footer.css";
import logo from "../assets/images/004.png";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

/* ─── Nav links — mirrors your route structure exactly ── */
const footerLinks = {
  Company: [
    { label: "About Us",    href: "/about" },
    { label: "Blog",        href: "/blog" },
    { label: "Careers",     href: "/careers" },
    { label: "Contact",     href: "/contact" },
    { label: "SAP",         href: "/sap" },
  ],
  Services: [
    { label: "Custom Software",  href: "/services/custom-software" },
    { label: "E-Commerce",       href: "/services/ecommerce" },
    { label: "Web Development",  href: "/services/web-development" },
    { label: "SaaS Development", href: "/services/saas-development" },
    { label: "Generative AI",    href: "/services/generative-ai" },
    { label: "UI / UX Design",   href: "/ui-ux-design" },
    { label: "Brand Identity",   href: "/brand-identity" },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy",    href: "/privacy" },
  ],
};

/* ─── Social icons ───────────────────────────────────── */
const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/qodexaa",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
          0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
          1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
          7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063
          2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0
          .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24
          23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com/qodexaa",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99
          21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161
          17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/qodexaa",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205
          11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422
          18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084
          1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
          0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0
          1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3
          .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12
          3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475
          5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0
          .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/qodexaa",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691
          4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069
          4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204
          0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849
          0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919
          1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072
          2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014
          3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741
          24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618
          6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014
          15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0
          000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44
          0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
];

/* ─── Lock icon for trust line ───────────────────────── */
const LockIcon = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
    <path d="M8 1a3 3 0 00-3 3v1.5H4a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0
      001-1v-6a1 1 0 00-1-1h-1V4a3 3 0 00-3-3zm0 1.5a1.5 1.5 0 011.5
      1.5v1.5h-3V4A1.5 1.5 0 018 2.5z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════ */
export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:5000/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 5000);
      } else {
        setError(data.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setError("Unable to subscribe. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      {/* Animated blue spot — mid right */}
      <div className="footer__spot" aria-hidden="true" />

      {/* ── Main body ─────────────────────────────────── */}
      <div className="footer__body">
        <div className="footer__grid">

          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">
                <img src={logo} alt="Qodexaa logo" />
              </span>
              <span className="footer__logo-text">Qodexaa</span>
            </Link>
            <p className="footer__tagline">
              We craft digital products that push boundaries, scale with your
              ambitions, and leave lasting impressions.
            </p>
            <div className="footer__socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="footer__links">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group} className="footer__col">
                <p className="footer__col-title">{group}</p>
                <ul className="footer__col-list">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.href} className="footer__col-link">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="footer__newsletter">
            <p className="footer__col-title">Stay updated</p>
            <p className="footer__newsletter-sub">
              Project insights and tech updates — straight to your inbox.
              No spam, ever.
            </p>
            
            {subscribed ? (
              <div className="footer__success">
                <FaCheckCircle className="footer__success-icon" />
                <span>Thanks for subscribing! 🎉</span>
              </div>
            ) : (
              <form className="footer__form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="footer__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button type="submit" className="footer__submit" disabled={loading}>
                  {loading ? <FaSpinner className="footer__spinner" /> : "Subscribe →"}
                </button>
              </form>
            )}
            
            {error && <p className="footer__error">{error}</p>}
            
            <p className="footer__trust">
              <LockIcon />
              We never share your email address.
            </p>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────── */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copy">
            © {year} Qodexaa. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link to="/privacy" className="footer__bottom-link">Privacy</Link>
            <span className="footer__sep" />
            <Link to="/terms" className="footer__bottom-link">Terms</Link>
            <span className="footer__sep" />
            <Link to="/privacy" className="footer__bottom-link">Cookies</Link>
          </div>
          <p className="footer__made">
            Made with <span className="footer__heart">❤️</span> in Pakistan
          </p>
        </div>
      </div>

    </footer>
  );
}