import { useState } from "react";
import "./style/Faq.css";

const FAQS = [
  {
    q: "What types of projects does Qodexaa take on?",
    a: "We work on web development, custom software, SaaS platforms, AI integrations, UI/UX design, e-commerce, and brand identity. We are selective — we only take on projects where we believe we can deliver real impact, not just complete tasks."
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on the scope. A landing page or brand refresh typically takes 2–3 days. A full SaaS product usually takes 8–16 days from kickoff to launch. We provide a detailed timeline in our proposal before any commitment."
  },
  {
    q: "What does working with Qodexaa look like day-to-day?",
    a: "You get a dedicated project manager, weekly progress updates, and access to a shared project board. We work in 2-week sprints with demos at the end of each cycle so you always know exactly where the project stands."
  },
  {
    q: "Do you work with early-stage startups or only established businesses?",
    a: "We work with both. Some of our best projects are zero-to-one builds with first-time founders. We are comfortable working with ambiguity and helping shape ideas into real products rather than just executing specifications."
  },
  {
    q: "What is your pricing model?",
    a: "We offer fixed-price quotes for clearly defined projects and a retainer model for ongoing development. We do not use hourly billing as it misaligns incentives. After a discovery call, we share a detailed proposal with transparent pricing."
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes. Every project includes a 30-day post-launch support period at no additional cost. After that, we offer flexible maintenance retainers covering bug fixes, updates, and feature enhancements."
  },
  {
    q: "Can you work with our existing codebase or design system?",
    a: "Yes. We often join ongoing projects, audit existing codebases, and improve or extend them. We always start with an honest technical assessment before moving forward."
  },
  {
    q: "How do we get started?",
    a: "Fill out the contact form or book a free 30-minute discovery call. We will discuss your goals, timeline, and budget — and if we are a good fit, you will receive a proposal within 3 business days."
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq" id="faq">
      <div className="faq__container">
        <div className="faq__header">
          <span className="faq__eyebrow">FAQ</span>
          <h2 className="faq__title">Questions we get asked a lot</h2>
          <p className="faq__sub">Can't find your answer here? <button className="faq__contact-link" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Get in touch →</button></p>
        </div>

        <div className="faq__list">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`faq__item ${open === i ? "faq__item--open" : ""}`}
            >
              <button
                className="faq__question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="faq__icon">{open === i ? "−" : "+"}</span>
              </button>
              <div className="faq__answer-wrap">
                <p className="faq__answer">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}