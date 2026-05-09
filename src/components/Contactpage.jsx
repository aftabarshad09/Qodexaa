
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  FaMapMarkerAlt, FaClock, FaPhone, FaComment, FaPaperPlane,
  FaList, FaAt, FaUser, FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft,
  FaArrowLeft, FaArrowRight, FaTwitter, FaLinkedin,
  FaRegClock, FaCheckCircle, FaBriefcase,
  FaHeart, FaPlay, FaPause,
  FaEnvelope, FaBuilding, FaRocket, FaSmile
} from "react-icons/fa";
import "./style/contact.css";
// import ContactSection from "./ContactSection";

import bgVideo from "../assets/videos/Contact.mp4";

const SERVICES_LIST = [
  "Web Development",
  "Custom Software Development",
  "SaaS Development",
  "Generative AI",
  "UI / UX Design",
  "E-Commerce",
  "Brand & Identity Design",
];

export default function ContactPage() {
  const location = useLocation();


  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    subject: "",
    message: ""
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      setError(null);
      setSuccess(null);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Message sent successfully!");

        setForm({
          name: "",
          email: "",
          phone: "",
          service: "",
          subject: "",
          message: ""
        });
      } else {
        setError(data.error || "Failed to send message");
      }

    } catch (err) {
      console.error(err);
      setError("Server not responding");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="cp">
        <Helmet>
          <title>Contact Qodexaa — Let's Build Something Together</title>
          <meta name="description" content="Get in touch with Qodexaa. Whether you have a project in mind or just want to explore options, our team is ready to help you build smarter digital solutions." />
          <meta property="og:title" content="Contact Qodexaa — Let's Build Something Together" />
          <meta property="og:description" content="Get in touch with Qodexaa. Whether you have a project in mind or just want to explore options, our team is ready to help you build smarter digital solutions." />
          <meta property="og:url" content="https://qodexaa.com/contact" />
          <meta name="twitter:title" content="Contact Qodexaa — Let's Build Something Together" />
          <meta name="twitter:description" content="Get in touch with Qodexaa. Whether you have a project in mind or just want to explore options, our team is ready to help you build smarter digital solutions." />
          <link rel="canonical" href="https://qodexaa.com/contact" />
        </Helmet>
        {/* Hero Section with Video Background - NO MASK */}
        <section className="cp__hero">
          <div className="cp__hero-video-wrapper">
            <video
              className="cp__hero-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={bgVideo} type="video/mp4" />
            </video>
          </div>
          <div className="cp__hero-content">
            <div className="cp__hero-inner">
              <span className="cp__eyebrow">Contact Us</span>
              <h1 className="cp__hero-title">
                Let's talk about<br />your project.
              </h1>
              <p className="cp__hero-sub">
                Whether you have a clear brief or just an idea — we're here to help you shape it into something remarkable.
              </p>
            </div>
          </div>
        </section>

        <div className="cp__body">
          <div className="cp__info-row">
            {[
              { icon: <FaEnvelope />, title: "Email Us", val: "info@qodexaa.com", sub: "We reply within 24 hours" },
              { icon: <FaMapMarkerAlt />, title: "Our Location", val: "Lahore, Pakistan", sub: "Available globally" },
              { icon: <FaClock />, title: "Working Hours", val: "Mon – Fri, 9am – 7pm", sub: "PKT (UTC+5)" },
              { icon: <FaPhone />, title: "Quick Chat", val: "Book a free call", sub: "30-min discovery session" },
            ].map((c) => (
              <div key={c.title} className="cp__info-card">
                <span className="cp__info-icon">{c.icon}</span>
                <div>
                  <p className="cp__info-title">{c.title}</p>
                  <p className="cp__info-val">{c.val}</p>
                  <p className="cp__info-sub">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cp__process">
            <h3 className="cp__process-title">What happens next?</h3>
            <div className="cp__process-steps">
              {[
                { n: "01", title: "We review your brief", desc: "Within 24 hours of receiving your message." },
                { n: "02", title: "Discovery call", desc: "A 30-min call to align on goals and scope." },
                { n: "03", title: "Proposal sent", desc: "A detailed proposal with timeline and pricing." },
                { n: "04", title: "Kickoff", desc: "We hit the ground running — no delays." },
              ].map((s) => (
                <div key={s.n} className="cp__process-step">
                  <span className="cp__process-n">{s.n}</span>
                  <h4 className="cp__process-step-title">{s.title}</h4>
                  <p className="cp__process-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cp__form-wrap">
          <form className="cpf__form" onSubmit={handleSubmit} noValidate>
            {success && (
              <div className="cpf__alert cpf__alert--success">
                <FaCheckCircle className="cpf__alert-icon" />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="cpf__alert cpf__alert--error">
                <FaExclamationTriangle className="cpf__alert-icon" />
                <span>{error}</span>
              </div>
            )}

            <div className="cpf__row">
              <div className="cpf__field">
                <label className="cpf__label">
                  <FaUser className="cpf__label-icon" /> Name
                </label>
                <input
                  className="cpf__input"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              <div className="cpf__field">
                <label className="cpf__label">
                  <FaAt className="cpf__label-icon" /> Email
                </label>
                <input
                  className="cpf__input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="cpf__field">
              <label className="cpf__label">Phone</label>
              <input
                className="cpf__input"
                type="text"
                placeholder="+92 300 0000000"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="cpf__row">
              <div className="cpf__field">
                <label className="cpf__label">
                  <FaList className="cpf__label-icon" /> Service
                </label>
                <select
                  className="cpf__input cpf__select"
                  value={form.service}
                  onChange={(e) => handleChange("service", e.target.value)}
                >
                  <option value="">Select a service</option>
                  {SERVICES_LIST.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="cpf__field">
                <label className="cpf__label">Subject</label>
                <input
                  className="cpf__input"
                  type="text"
                  placeholder="Project inquiry..."
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                />
              </div>
            </div>

            <div className="cpf__field">
              <label className="cpf__label">
                <FaComment className="cpf__label-icon" /> Message
              </label>
              <textarea
                className="cpf__input cpf__textarea"
                placeholder="Tell us about your project..."
                rows={4}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
            </div>

            <button type="submit" className="cpf__submit" disabled={sending}>
              {sending ? (
                <>
                  <FaSpinner className="cpf__spinner" /> Sending...
                </>
              ) : (
                <>
                  Send Message <FaPaperPlane />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}