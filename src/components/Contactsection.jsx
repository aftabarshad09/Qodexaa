import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane,
  FaUser, FaAt, FaList, FaComment, FaArrowRight,
  FaCheckCircle, FaExclamationTriangle, FaSpinner
} from "react-icons/fa";
import "./style/contact.css";

const SERVICES_LIST = [
  "Web Development",
  "Custom Software Development",
  "SaaS Development",
  "Generative AI",
  "UI / UX Design",
  "E-Commerce",
  "Brand & Identity Design",
];

export default function ContactSection() {
  const navigate = useNavigate();

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

      const response = await fetch("https://www.qodexaa.com/api/contact", {
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
    <section className="cs" id="contact">
      <div className="cs__container">

        {/* LEFT SIDE */}
        <div className="cs__left">
          <span className="cs__eyebrow">Get In Touch</span>

          <h2 className="cs__title">
            Let's build something<br />great together.
          </h2>

          <p className="cs__sub">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>

          <button
            className="cs__full-link"
            onClick={() => navigate("/contact")}
          >
            View full contact page <FaArrowRight />
          </button>

          <div className="cs__info">
            <div className="cs__info-item">
              <FaEnvelope className="cs__info-icon" />
              <span>info@qodexaa.com</span>
            </div>

            <div className="cs__info-item">
              <FaMapMarkerAlt className="cs__info-icon" />
              <span>Lahore, Pakistan</span>
            </div>

            <div className="cs__info-item">
              <FaClock className="cs__info-icon" />
              <span>Response within 24h</span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form className="cs__form" onSubmit={handleSubmit} noValidate>

          {success && (
            <div className="cs__alert cs__alert--success">
              <FaCheckCircle className="cs__alert-icon" />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="cs__alert cs__alert--error">
              <FaExclamationTriangle className="cs__alert-icon" />
              <span>{error}</span>
            </div>
          )}

          <div className="cs__row">
            <div className="cs__field">
              <label className="cs__label">
                <FaUser className="cs__label-icon" /> Name
              </label>
              <input
                className="cs__input"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="cs__field">
              <label className="cs__label">
                <FaAt className="cs__label-icon" /> Email
              </label>
              <input
                className="cs__input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>

          <div className="cs__field">
            <label className="cs__label">Phone</label>
            <input
              className="cs__input"
              type="text"
              placeholder="+92 300 0000000"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="cs__row">
            <div className="cs__field">
              <label className="cs__label">
                <FaList className="cs__label-icon" /> Service
              </label>
              <select
                className="cs__input cs__select"
                value={form.service}
                onChange={(e) => handleChange("service", e.target.value)}
              >
                <option value="">Select a service</option>
                {SERVICES_LIST.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="cs__field">
              <label className="cs__label">Subject</label>
              <input
                className="cs__input"
                type="text"
                placeholder="Project inquiry..."
                value={form.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
              />
            </div>
          </div>

          <div className="cs__field">
            <label className="cs__label">
              <FaComment className="cs__label-icon" /> Message
            </label>
            <textarea
              className="cs__input cs__textarea"
              placeholder="Tell us about your project..."
              rows={4}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>

          <button type="submit" className="cs__submit" disabled={sending}>
            {sending ? (
              <>
                <FaSpinner className="cs__spinner" /> Sending...
              </>
            ) : (
              <>
                Send Message <FaPaperPlane />
              </>
            )}
          </button>

        </form>
      </div>
    </section>
  );
}
