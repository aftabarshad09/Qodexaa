// import { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { SERVICES } from "./services";
// // import "./style/serviceDetail.css";

// const CONTENT = {
//   "web-development": {
//     hero: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1600&q=80",
//     heroAlt: "Developer coding on multiple screens",
//     overview: "We don't just build websites — we engineer high-performance digital experiences that rank, convert, and scale. Every line of code is intentional.",
//     highlights: ["React / Next.js / Vue", "Node.js & REST/GraphQL APIs", "CMS Integration", "Performance & SEO optimisation", "CI/CD Deployment pipelines"],
//     process: [
//       { step: "Discovery", desc: "Deep-dive into your goals, audience, and technical requirements." },
//       { step: "Architecture", desc: "We plan the tech stack, data flows, and component structure." },
//       { step: "Design & Build", desc: "Pixel-perfect UI paired with clean, maintainable code." },
//       { step: "Test & Launch", desc: "Rigorous QA, performance audits, then a smooth go-live." },
//       { step: "Maintain & Grow", desc: "Ongoing support, monitoring, and iterative improvements." },
//     ],
//     images: [
//       "https://images.unsplash.com/photo-1555066931-4365d14431b9?w=800&q=80",
//       "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
//       "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
//     ],
//     stat1: { value: "3×", label: "Avg. Speed Improvement" },
//     stat2: { value: "98%", label: "Lighthouse Score" },
//     stat3: { value: "40+", label: "Sites Shipped" },
//   },
//   "custom-software": {
//     hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
//     heroAlt: "Software architecture planning",
//     overview: "Off-the-shelf tools hold you back. We build bespoke software systems that fit your workflow like a glove — from internal dashboards to full enterprise platforms.",
//     highlights: ["Custom ERP / CRM systems", "Internal tooling & automation", "API design & integrations", "Database architecture", "Scalable cloud infrastructure"],
//     process: [
//       { step: "Requirements", desc: "We map every user story and technical constraint upfront." },
//       { step: "System Design", desc: "Database schemas, microservice boundaries, API contracts." },
//       { step: "Agile Delivery", desc: "Two-week sprints with demos and feedback loops built in." },
//       { step: "Integration", desc: "Connect to your existing stack via robust APIs." },
//       { step: "Handover", desc: "Full documentation and team training included." },
//     ],
//     images: [
//       "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=80",
//       "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
//       "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
//     ],
//     stat1: { value: "60%", label: "Avg. Ops Time Saved" },
//     stat2: { value: "99.9%", label: "Uptime SLA" },
//     stat3: { value: "25+", label: "Systems Built" },
//   },
//   "saas": {
//     hero: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
//     heroAlt: "SaaS dashboard on laptop",
//     overview: "From zero to a fully-funded SaaS product. We build the infrastructure, onboarding, billing, and analytics so you can focus on growth.",
//     highlights: ["Multi-tenancy architecture", "Stripe / Paddle billing", "User onboarding flows", "Role-based access control", "Analytics & feature flags"],
//     process: [
//       { step: "Concept Validation", desc: "We pressure-test your idea against real market signals." },
//       { step: "MVP Scoping", desc: "Define the core loop — the smallest shippable product." },
//       { step: "Build Sprint", desc: "Rapid, focused development cycles targeting launch." },
//       { step: "Beta Launch", desc: "Soft launch with early users and feedback collection." },
//       { step: "Scale", desc: "Harden infrastructure and add growth-stage features." },
//     ],
//     images: [
//       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
//       "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
//       "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
//     ],
//     stat1: { value: "8 wks", label: "Avg. MVP Timeline" },
//     stat2: { value: "12+", label: "SaaS Products Launched" },
//     stat3: { value: "$2M+", label: "Client ARR Generated" },
//   },
//   "generative-ai": {
//     hero: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80",
//     heroAlt: "AI neural network visualisation",
//     overview: "We go beyond ChatGPT wrappers. Our team builds production-grade AI systems — RAG pipelines, fine-tuned models, and autonomous agents — that deliver real business value.",
//     highlights: ["LLM integration (GPT-4, Claude, Gemini)", "RAG & vector databases", "AI agents & automation", "Custom model fine-tuning", "AI-powered analytics"],
//     process: [
//       { step: "Use Case Mapping", desc: "Identify where AI creates the most leverage in your business." },
//       { step: "Data Audit", desc: "Assess your data quality, gaps, and privacy requirements." },
//       { step: "Prototype", desc: "Build a working proof-of-concept in 2 weeks." },
//       { step: "Production Build", desc: "Harden, secure, and scale the AI system." },
//       { step: "Monitor & Improve", desc: "Continuous evaluation loops to improve model performance." },
//     ],
//     images: [
//       "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
//       "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80",
//       "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&q=80",
//     ],
//     stat1: { value: "10×", label: "Productivity Gains" },
//     stat2: { value: "2 wks", label: "Prototype to Demo" },
//     stat3: { value: "15+", label: "AI Projects Shipped" },
//   },
//   "ui-ux-design": {
//     hero: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80",
//     heroAlt: "UI design process with wireframes",
//     overview: "Beautiful is not enough — design must convert. We merge rigorous UX research with striking visual design to create interfaces your users never want to leave.",
//     highlights: ["User research & personas", "Wireframing & prototyping", "Design systems & tokens", "Interaction design", "Usability testing"],
//     process: [
//       { step: "Research", desc: "User interviews, competitor analysis, and heuristic reviews." },
//       { step: "Information Architecture", desc: "Sitemaps, user flows, and content hierarchy." },
//       { step: "Wireframes", desc: "Lo-fi sketches validated with real users before visual design." },
//       { step: "High-Fidelity Design", desc: "Stunning, detailed screens in Figma with full component library." },
//       { step: "Handoff", desc: "Developer-ready assets with detailed specs and interaction notes." },
//     ],
//     images: [
//       "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
//       "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
//       "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
//     ],
//     stat1: { value: "38%", label: "Avg. Conversion Lift" },
//     stat2: { value: "4.9★", label: "Design Quality Rating" },
//     stat3: { value: "50+", label: "Products Designed" },
//   },
//   "ecommerce": {
//     hero: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
//     heroAlt: "E-commerce store on devices",
//     overview: "We build stores that feel fast, look premium, and are optimised to sell. Whether Shopify, headless, or custom — every component is built for revenue.",
//     highlights: ["Shopify & headless commerce", "Payment gateway integration", "Product & inventory management", "SEO & conversion optimisation", "Email & retention automation"],
//     process: [
//       { step: "Store Audit", desc: "For existing stores: find the exact revenue leaks." },
//       { step: "Platform Choice", desc: "Shopify, WooCommerce, or custom — we recommend the right fit." },
//       { step: "Design & Build", desc: "Beautiful, fast storefronts with conversion-optimised UX." },
//       { step: "Integrate & Automate", desc: "Payments, fulfilment, email, and CRM all connected." },
//       { step: "Launch & Optimise", desc: "A/B testing and analytics from day one." },
//     ],
//     images: [
//       "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
//       "https://images.unsplash.com/photo-1571867424488-4565932edb41?w=800&q=80",
//       "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
//     ],
//     stat1: { value: "2.4×", label: "Avg. Revenue Increase" },
//     stat2: { value: "1.8s", label: "Avg. Page Load Time" },
//     stat3: { value: "30+", label: "Stores Launched" },
//   },
//   "brand-identity": {
//     hero: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1600&q=80",
//     heroAlt: "Brand identity design mockups",
//     overview: "Your brand is the first thing people feel — before they read a word. We build cohesive visual identities that make you instantly recognisable and deeply trustworthy.",
//     highlights: ["Logo & symbol design", "Typography & colour systems", "Brand guidelines", "Marketing collateral", "Brand voice & messaging"],
//     process: [
//       { step: "Discovery", desc: "Brand workshops to uncover your values, audience, and positioning." },
//       { step: "Moodboarding", desc: "Visual direction proposals aligned with your strategy." },
//       { step: "Concept Design", desc: "3 distinct logo and identity directions to choose from." },
//       { step: "Refinement", desc: "Iterate on the chosen direction to perfection." },
//       { step: "Brand Book", desc: "A complete brand guidelines document for your whole team." },
//     ],
//     images: [
//       "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
//       "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80",
//       "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
//     ],
//     stat1: { value: "3×", label: "Brand Recognition Lift" },
//     stat2: { value: "100%", label: "Client Satisfaction" },
//     stat3: { value: "60+", label: "Brands Created" },
//   },
// };

// function useParallax(ref, speed = 0.3) {
//   const [offset, setOffset] = useState(0);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const onScroll = () => {
//       const rect = el.getBoundingClientRect();
//       const center = rect.top + rect.height / 2 - window.innerHeight / 2;
//       setOffset(center * speed);
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [ref, speed]);
//   return offset;
// }

// function useReveal() {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
//       { threshold: 0.15 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);
//   return [ref, visible];
// }

// export default function ServiceDetail() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const service = SERVICES.find((s) => s.slug === slug);
//   const content = CONTENT[slug];

//   const heroRef = useRef(null);
//   const heroOffset = useParallax(heroRef, 0.25);

//   const [overviewRef, overviewVisible] = useReveal();
//   const [highlightsRef, highlightsVisible] = useReveal();
//   const [processRef, processVisible] = useReveal();
//   const [galleryRef, galleryVisible] = useReveal();
//   const [ctaRef, ctaVisible] = useReveal();

//   useEffect(() => { window.scrollTo(0, 0); }, [slug]);

//   if (!service || !content) {
//     return (
//       <div className="sd__not-found">
//         <h2>Service not found</h2>
//         <button onClick={() => navigate("/")}>Go Home</button>
//       </div>
//     );
//   }

//   const currentIdx = SERVICES.findIndex((s) => s.slug === slug);
//   const prev = SERVICES[currentIdx - 1];
//   const next = SERVICES[currentIdx + 1];

//   return (
//     <div className="sd" style={{ "--accent": service.accent, "--bg": service.bg }}>

//       <div className="sd__breadcrumb">
//         <Link to="/" className="sd__bc-link">Home</Link>
//         <span className="sd__bc-sep">›</span>
//         <Link to="/#services" className="sd__bc-link">Services</Link>
//         <span className="sd__bc-sep">›</span>
//         <span className="sd__bc-current">{service.title}</span>
//       </div>

//       <section className="sd__hero" ref={heroRef}>
//         <div
//           className="sd__hero-img-wrap"
//           style={{ transform: `translateY(${heroOffset}px)` }}
//         >
//           <img src={content.hero} alt={content.heroAlt} className="sd__hero-img" />
//           <div className="sd__hero-overlay" style={{ background: `linear-gradient(135deg, ${service.accent}cc 0%, #00000088 100%)` }} />
//         </div>
//         <div className="sd__hero-content">
//           <span className="sd__hero-num">{service.number}</span>
//           <h1 className="sd__hero-title">{service.title}</h1>
//           <p className="sd__hero-tagline">{service.tagline}</p>
//           <a href="#overview" className="sd__hero-cta" style={{ background: service.accent }}>
//             Explore This Service ↓
//           </a>
//         </div>
//         <div className="sd__stats">
//           {[content.stat1, content.stat2, content.stat3].map((s) => (
//             <div key={s.label} className="sd__stat">
//               <span className="sd__stat-value">{s.value}</span>
//               <span className="sd__stat-label">{s.label}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section
//         id="overview"
//         className={`sd__section sd__overview ${overviewVisible ? "sd__section--visible" : ""}`}
//         ref={overviewRef}
//       >
//         <div className="sd__container">
//           <div className="sd__overview-grid">
//             <div>
//               <span className="sd__label" style={{ color: service.accent }}>Overview</span>
//               <h2 className="sd__h2">What we deliver</h2>
//               <p className="sd__overview-text">{content.overview}</p>
//             </div>
//             <div className="sd__overview-img-wrap">
//               <img src={content.images[0]} alt="" className="sd__overview-img" loading="lazy" />
//               <div className="sd__overview-badge" style={{ background: service.accent }}>
//                 <span className="sd__overview-badge-icon">{service.icon}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section
//         className={`sd__section sd__highlights ${highlightsVisible ? "sd__section--visible" : ""}`}
//         ref={highlightsRef}
//         style={{ background: service.bg }}
//       >
//         <div className="sd__container">
//           <span className="sd__label" style={{ color: service.accent }}>What's Included</span>
//           <h2 className="sd__h2">Core capabilities</h2>
//           <div className="sd__hl-grid">
//             {content.highlights.map((h, i) => (
//               <div key={i} className="sd__hl-item" style={{ animationDelay: `${i * 80}ms` }}>
//                 <span className="sd__hl-dot" style={{ background: service.accent }} />
//                 <span>{h}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section
//         className={`sd__section sd__gallery ${galleryVisible ? "sd__section--visible" : ""}`}
//         ref={galleryRef}
//       >
//         <div className="sd__container">
//           <span className="sd__label" style={{ color: service.accent }}>Our Work</span>
//           <h2 className="sd__h2">Built with precision</h2>
//           <div className="sd__gallery-grid">
//             {content.images.map((src, i) => (
//               <GalleryImage key={i} src={src} delay={i * 100} />
//             ))}
//           </div>
//         </div>
//       </section>

//       <section
//         className={`sd__section sd__process ${processVisible ? "sd__section--visible" : ""}`}
//         ref={processRef}
//       >
//         <div className="sd__container">
//           <span className="sd__label" style={{ color: service.accent }}>How We Work</span>
//           <h2 className="sd__h2">Our process</h2>
//           <div className="sd__process-list">
//             {content.process.map((p, i) => (
//               <div key={i} className="sd__process-item" style={{ animationDelay: `${i * 100}ms` }}>
//                 <div className="sd__process-num" style={{ background: service.accent }}>{i + 1}</div>
//                 <div className="sd__process-line" style={{ background: i < content.process.length - 1 ? `${service.accent}33` : "transparent" }} />
//                 <div className="sd__process-body">
//                   <h4 className="sd__process-step">{p.step}</h4>
//                   <p className="sd__process-desc">{p.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section
//         className={`sd__section sd__cta-section ${ctaVisible ? "sd__section--visible" : ""}`}
//         ref={ctaRef}
//         style={{ background: `linear-gradient(135deg, ${service.accent} 0%, #111 100%)` }}
//       >
//         <div className="sd__container sd__cta-inner">
//           <h2 className="sd__cta-title">Ready to get started?</h2>
//           <p className="sd__cta-sub">Let's talk about your project — no commitment, just clarity.</p>
//           <Link to="/contact" className="sd__cta-btn">Book a Free Consultation →</Link>
//         </div>
//       </section>

//       <div className="sd__nav">
//         {prev ? (
//           <Link to={`/services/${prev.slug}`} className="sd__nav-link sd__nav-link--prev">
//             ← {prev.title}
//           </Link>
//         ) : <span />}
//         {next && (
//           <Link to={`/services/${next.slug}`} className="sd__nav-link sd__nav-link--next">
//             {next.title} →
//           </Link>
//         )}
//       </div>

//     </div>
//   );
// }

// function GalleryImage({ src, delay }) {
//   const [ref, visible] = useReveal();
//   return (
//     <div
//       ref={ref}
//       className={`sd__gallery-item ${visible ? "sd__gallery-item--visible" : ""}`}
//       style={{ animationDelay: `${delay}ms` }}
//     >
//       <img src={src} alt="" loading="lazy" />
//     </div>
//   );
// }

import React from 'react'

const ServiceDetail = () => {
  return (
    <div></div>
  )
}

export default ServiceDetail