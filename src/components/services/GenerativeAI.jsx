import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaArrowRight, FaCheckCircle, FaRocket, FaBrain, 
  FaChartLine, FaUsers, FaDatabase, FaRobot, FaMicrochip,
  FaServer, FaShieldAlt, FaCogs, FaMagic, FaCloudUploadAlt,
  FaSearch, FaChartBar, FaRegLightbulb, FaRegClock, FaRegGem,
  FaCrown, FaLock, FaInfinity, FaAward, FaPenNib,
  FaSlidersH, FaFileAlt, FaCloud, FaDocker, FaCode
} from "react-icons/fa";
import "./GenerativeAI.css";

const GenerativeAI = () => {
  const heroRef = useRef(null);
  const [heroOffset, setHeroOffset] = useState(0);
  const [overviewRef, overviewVisible] = useReveal();
  const [servicesRef, servicesVisible] = useReveal();
  const [techRef, techVisible] = useReveal();
  const [processRef, processVisible] = useReveal();
  const [benefitsRef, benefitsVisible] = useReveal();

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setHeroOffset(window.scrollY * 0.2);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherServices = [
    { path: "/web-development", number: "01", title: "Web Development", tagline: "Blazing-fast, pixel-perfect websites built to convert", img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80" },
    { path: "/custom-software", number: "02", title: "Custom Software", tagline: "Tailor-made software engineered for your exact workflow", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
    { path: "/saas-development", number: "03", title: "SaaS Development", tagline: "Launch your SaaS product from MVP to market-ready", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
    { path: "/ui-ux-design", number: "05", title: "UI/UX Design", tagline: "Interfaces your users will fall in love with", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
    { path: "/ecommerce", number: "06", title: "E-Commerce", tagline: "Stores that sell — built for speed and conversions", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" },
    { path: "/brand-identity", number: "07", title: "Brand Identity", tagline: "A brand that makes you impossible to ignore", img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80" }
  ];

  return (
    <div className="ai-page">
      {/* Hero Section */}
      <section className="ai-hero" ref={heroRef}>
        <div className="ai-hero-bg-layer">
          <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80" alt="Generative AI" className="ai-hero-img" />
          <div className="ai-hero-overlay"></div>
        </div>
        <div className="ai-hero-content">
          <span className="ai-hero-badge">Generative AI</span>
          <h1 className="ai-hero-title">AI That <span className="ai-hero-highlight">Moves</span> the Needle</h1>
          <p className="ai-hero-subtitle">Embed AI that actually moves the needle. We build production-grade AI systems that deliver real business value — not just ChatGPT wrappers.</p>
          <div className="ai-hero-buttons">
            <Link to="/contact" className="ai-btn-primary">Integrate AI Now <FaArrowRight /></Link>
            <a href="#process" className="ai-btn-secondary">How It Works</a>
          </div>
        </div>
        <div className="ai-hero-stats">
          <div className="ai-stat"><FaRocket /><span className="ai-stat-val">10x</span><span>Productivity Gain</span></div>
          <div className="ai-stat"><FaBrain /><span className="ai-stat-val">2 wks</span><span>Prototype to Demo</span></div>
          <div className="ai-stat"><FaUsers /><span className="ai-stat-val">15+</span><span>AI Projects</span></div>
        </div>
      </section>

      {/* Overview Section */}
      <section className={`ai-section ai-overview ${overviewVisible ? "visible" : ""}`} ref={overviewRef}>
        <div className="ai-container">
          <div className="ai-overview-grid">
            <div className="ai-overview-content">
              <span className="ai-label">What We Deliver</span>
              <h2 className="ai-title">AI That <span className="ai-highlight">Transforms</span> Your Business</h2>
              <p className="ai-overview-text">We go beyond ChatGPT wrappers. Our team builds production-grade AI systems — RAG pipelines, fine-tuned models, and autonomous agents — that deliver real business value. From customer support automation to intelligent document processing, we make AI work for you.</p>
              <div className="ai-feature-list">
                <div><FaCheckCircle /> LLM Integration (GPT-4, Claude, Gemini)</div>
                <div><FaCheckCircle /> RAG & Vector Databases</div>
                <div><FaCheckCircle /> AI Agents & Automation</div>
                <div><FaCheckCircle /> Custom Model Fine-tuning</div>
                <div><FaCheckCircle /> AI-powered Analytics</div>
                <div><FaCheckCircle /> Document Processing</div>
              </div>
            </div>
            <div className="ai-overview-image">
              <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" alt="Generative AI" />
              <div className="ai-image-badge">Production Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={`ai-section ai-services ${servicesVisible ? "visible" : ""}`} ref={servicesRef}>
        <div className="ai-container">
          <span className="ai-label">AI Capabilities</span>
          <h2 className="ai-title">Complete <span className="ai-highlight">AI Solutions</span></h2>
          <div className="ai-services-grid">
            {[
              { icon: <FaRobot />, title: "LLM Integration", desc: "Connect powerful language models to your apps", features: ["GPT-4/GPT-4o", "Claude 3", "Gemini Pro", "Local LLMs"] },
              { icon: <FaDatabase />, title: "RAG Pipelines", desc: "Connect AI to your proprietary data sources", features: ["Vector Search", "Document Chunking", "Semantic Search", "Knowledge Bases"] },
              { icon: <FaCogs />, title: "AI Agents", desc: "Autonomous agents that execute complex tasks", features: ["Task Planning", "Tool Use", "Multi-step Reasoning", "Human-in-loop"] },
              { icon: <FaMicrochip />, title: "Model Fine-tuning", desc: "Custom models trained on your data", features: ["Fine-tuning", "Embedding Models", "Classification", "Entity Extraction"] },
              { icon: <FaSearch />, title: "Intelligent Search", desc: "Semantic search for your content", features: ["Similarity Search", "Hybrid Search", "Filters & Facets", "Re-ranking"] },
              { icon: <FaChartBar />, title: "AI Analytics", desc: "Extract insights from unstructured data", features: ["Sentiment Analysis", "Topic Clustering", "Summarization", "Trend Detection"] }
            ].map((service, i) => (
              <div key={i} className="ai-service-card">
                <div className="ai-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="ai-service-features">{service.features.map((f, idx) => (<span key={idx}>{f}</span>))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className={`ai-section ai-usecases ${techVisible ? "visible" : ""}`} ref={techRef}>
        <div className="ai-container">
          <span className="ai-label">Use Cases</span>
          <h2 className="ai-title">Real World <span className="ai-highlight">Applications</span></h2>
          <div className="ai-usecases-grid">
            {[
              { icon: <FaRegLightbulb />, title: "Customer Support", desc: "24/7 AI agents that handle tickets instantly" },
              { icon: <FaDatabase />, title: "Document Processing", desc: "Extract data from contracts, invoices, and forms" },
              { icon: <FaSearch />, title: "Content Generation", desc: "Blog posts, product descriptions, and marketing copy" },
              { icon: <FaChartLine />, title: "Sales Intelligence", desc: "Lead scoring and conversation insights" },
              { icon: <FaShieldAlt />, title: "Fraud Detection", desc: "Real-time anomaly detection and risk scoring" },
              { icon: <FaRegGem />, title: "Personalization", desc: "Tailored recommendations and dynamic content" }
            ].map((useCase, i) => (
              <div key={i} className="ai-usecase-card">
                <div className="ai-usecase-icon">{useCase.icon}</div>
                <h3>{useCase.title}</h3>
                <p>{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="ai-tech-stack">
        <div className="ai-container">
          <span className="ai-label">AI Stack</span>
          <h2 className="ai-title">Powered By <span className="ai-highlight">Industry Leaders</span></h2>
          <div className="ai-tech-grid">
            {[
              { name: "OpenAI GPT-4" }, { name: "Claude 3" }, { name: "Gemini Pro" }, { name: "Llama 3" },
              { name: "Pinecone" }, { name: "Weaviate" }, { name: "LangChain" }, { name: "LlamaIndex" },
              { name: "Hugging Face" }, { name: "PyTorch" }, { name: "TensorFlow" }, { name: "AWS Bedrock" }
            ].map((tech, i) => (
              <div key={i} className="ai-tech-item">
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Modern Cards */}
      <section id="process" className={`ai-section ai-process ${processVisible ? "visible" : ""}`} ref={processRef}>
        <div className="ai-container">
          <span className="ai-label">How We Work</span>
          <h2 className="ai-title">Our <span className="ai-highlight">AI Process</span></h2>
          <div className="ai-process-steps">
            {[
              { number: "01", icon: <FaRegLightbulb />, title: "Discovery", subtitle: "Use Case Mapping", desc: "Identify where AI creates the most leverage in your business", duration: "1 Week" },
              { number: "02", icon: <FaDatabase />, title: "Data Audit", subtitle: "Assessment", desc: "Assess your data quality, gaps, and privacy requirements", duration: "1 Week" },
              { number: "03", icon: <FaMagic />, title: "Prototype", subtitle: "Proof of Concept", desc: "Build a working proof-of-concept in 2 weeks", duration: "2 Weeks" },
              { number: "04", icon: <FaServer />, title: "Production", subtitle: "Build & Deploy", desc: "Harden, secure, and scale the AI system", duration: "4-6 Weeks" },
              { number: "05", icon: <FaChartLine />, title: "Monitor", subtitle: "Continuous Improvement", desc: "Continuous evaluation loops to improve model performance", duration: "Ongoing" }
            ].map((step, i) => (
              <div key={i} className="ai-process-card">
                <div className="ai-process-number">{step.number}</div>
                <div className="ai-process-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p className="ai-process-subtitle">{step.subtitle}</p>
                <p className="ai-process-desc">{step.desc}</p>
                <span className="ai-process-duration">{step.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`ai-section ai-benefits ${benefitsVisible ? "visible" : ""}`} ref={benefitsRef}>
        <div className="ai-container">
          <span className="ai-label">Why Choose Us</span>
          <h2 className="ai-title">Benefits You'll <span className="ai-highlight">Love</span></h2>
          <div className="ai-benefits-grid">
            {[
              { icon: <FaCrown />, title: "Faster Time to Market", desc: "2-week prototypes, 6-week production" },
              { icon: <FaLock />, title: "Enterprise Security", desc: "Data privacy and compliance first" },
              { icon: <FaRegClock />, title: "Continuous Improvement", desc: "Models that get smarter over time" },
              { icon: <FaCloud />, title: "Seamless Integration", desc: "Works with your existing stack" }
            ].map((benefit, i) => (
              <div key={i} className="ai-benefit-card">
                <div className="ai-benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ai-cta">
        <div className="ai-container">
          <h2>Ready to Leverage <span>AI</span>?</h2>
          <p>Let's explore how AI can transform your business operations and drive growth.</p>
          <Link to="/contact" className="ai-cta-btn">Start Your AI Journey <FaArrowRight /></Link>
        </div>
      </section>

      {/* Other Services */}
      <section className="ai-other-services">
        <div className="ai-container">
          <span className="ai-label">Explore More</span>
          <h2 className="ai-title">Other Services We <span className="ai-highlight">Offer</span></h2>
          <div className="ai-other-grid">
            {otherServices.map((service) => (
              <Link key={service.path} to={service.path} className="ai-other-card">
                <img src={service.img} alt={service.title} />
                <div className="ai-other-info">
                  <span className="ai-other-num">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.tagline}</p>
                  <span className="ai-other-link">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

export default GenerativeAI;