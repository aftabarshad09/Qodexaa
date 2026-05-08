import { useLocation } from "react-router-dom";
import {
  FaEnvelope, FaMapMarkerAlt, FaClock, FaPhone
} from "react-icons/fa";
import "./style/contact.css";
import ContactSection from "./ContactSection";


export default function ContactPage() {
  const location = useLocation();
  const prefill = location.state?.prefill || {};

  return (
    <div className="cp">
      <section className="cp__hero">
        <div className="cp__hero-bg" />
        <div className="cp__hero-inner">
          <span className="cp__eyebrow">Contact Us</span>
          <h1 className="cp__hero-title">
            Let's talk about<br />your project.
          </h1>
          <p className="cp__hero-sub">
            Whether you have a clear brief or just an idea — we're here to help you shape it into something remarkable.
          </p>
        </div>
      </section>

      <div className="cp__body">
        <div className="cp__info-row">
          {[
            { icon: <FaEnvelope />, title: "Email Us", val: "hello@qodexaa.com", sub: "We reply within 24 hours" },
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

        {/* ✅ replaced entire form system */}
        <div className="cp__form-wrap">
          <ContactSection  />
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
    </div>
  );
}
