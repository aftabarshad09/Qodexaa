import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getBlogBySlug, blogMenuItems } from "../data/blogData";
import { Helmet } from "react-helmet-async";
import {
  FaCalendarAlt, FaClock, FaUser, FaFacebook, FaTwitter,
  FaLinkedin, FaLink, FaCheckCircle
} from "react-icons/fa";
import "./style/blog-detail.css";

// Import videos for all 11 blog posts
import videoAI from "../assets/videos/AI.mp4";
import videoAnalytics from "../assets/videos/Analytics.mp4";
import videoDigitalMarketing from "../assets/videos/Digital Marketing.mp4";
import videoEcommerce from "../assets/videos/E-commerce .mp4";
import videoGraphicDesigner from "../assets/videos/Graphic Designer.mp4";
import videoHealthcare from "../assets/videos/Healthcare.mp4";
import videoSaaS from "../assets/videos/SaaS.mp4";
import videoWebDevelopment from "../assets/videos/Web Development.mp4";
import videoSEO from "../assets/videos/SEO.mp4";
import fallbackVideo from "../assets/about-bg.mp4";

// Map slugs to videos based on blog category/title
const blogVideos = {
  "custom-web-development": videoWebDevelopment,
  "what-is-seo": videoSEO,
  "saas-management-analytics": videoSaaS,
  "saas-product-development": videoSaaS,
  "graphic-designer-nightmare": videoGraphicDesigner,
  "digital-marketing-modern-world": videoDigitalMarketing,
  "custom-ecommerce-platform": videoEcommerce,
  "ecommerce-transformation": videoEcommerce,
  "ai-powered-crm-systems": videoAI,
  "ai-analytics-platform": videoAnalytics,
  "healthcare-modernization": videoHealthcare,
};

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);
  const [progress, setProgress] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const videoRef = useRef(null);

  // Get video for this blog or fallback to default
  const blogVideo = blogVideos[slug] || fallbackVideo;

  // Force video reload when slug changes
  useEffect(() => {
    if (videoRef.current) {
      // Reload the video element
      videoRef.current.load();
      // Play the video
      videoRef.current.play().catch(err => {
        // Auto-play might be blocked, that's fine
        console.log("Video autoplay prevented:", err);
      });
    }
  }, [slug, blogVideo]);

  // Progress bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(scrollPercent);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset scroll position when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="blog-detail not-found">
        <h2>Article not found</h2>
        <Link to="/blog" className="blog__read-btn">Back to Blog</Link>
      </div>
    );
  }

  // Get images from sections
  const images = blog.sections.filter(section => section.type === "image");

  // Share URLs
  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(blog.title);
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(blog.title)}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="blog-detail">
      <Helmet>
        <title>Blog — Insights on AI, SaaS & Web Development | Qodexaa</title>
        <meta name="description" content="Explore the Qodexaa blog for expert insights on AI, SaaS development, eCommerce, digital marketing, SEO, and software engineering trends." />
        <meta property="og:title" content="Blog — Insights on AI, SaaS & Web Development | Qodexaa" />
        <meta property="og:description" content="Explore the Qodexaa blog for expert insights on AI, SaaS development, eCommerce, digital marketing, SEO, and software engineering trends." />
        <meta property="og:url" content="https://qodexaa.com/blog" />
        <meta name="twitter:title" content="Blog — Insights on AI, SaaS & Web Development | Qodexaa" />
        <meta name="twitter:description" content="Explore the Qodexaa blog for expert insights on AI, SaaS development, eCommerce, digital marketing, SEO, and software engineering trends." />
        <link rel="canonical" href="https://qodexaa.com/blog" />
      </Helmet>
      {/* Progress Bar */}
      <div className="blog-detail__progress">
        <div className="blog-detail__progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Hero Section with Video Background */}
      <section className="blog-detail__hero">
        <video
          key={slug}
          ref={videoRef}
          className="blog-detail__hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80"
        >
          <source src={blogVideo} type="video/mp4" />
        </video>
        <div className="blog-detail__hero-overlay"></div>

        <div className="blog-detail__hero-inner">
          <span className="blog-detail__category">{blog.category}</span>
          <h1 className="blog-detail__title">
            <span className="blog-detail__title-gradient">{blog.title}</span>
          </h1>
          <div className="blog-detail__meta">
            <span><FaCalendarAlt /> {blog.date}</span>
            <span className="blog-detail__dot"></span>
            <span><FaClock /> {blog.readTime}</span>
            <span className="blog-detail__dot"></span>
            <span><FaUser /> {blog.author}</span>
          </div>
        </div>
      </section>

      <div className="blog-detail__content">
        {/* Main Content */}
        <div className="blog-detail__main">
          {blog.sections.map((section, idx) => {
            switch (section.type) {
              case "heading": {
                const Tag = `h${section.level}`;
                const headingClass = section.level === 2 ? "blog-detail__h2" : "blog-detail__h3";
                return (
                  <Tag key={idx} className={headingClass}>
                    {section.content}
                  </Tag>
                );
              }
              case "paragraph":
                return (
                  <p
                    key={idx}
                    className="blog-detail__text"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                );
              case "image":
                return (
                  <div key={idx} className="blog-detail__image-wrapper">
                    <img
                      src={section.src}
                      alt={section.alt}
                      className="blog-detail__image"
                      loading="lazy"
                    />
                    {section.alt && <p className="blog-detail__caption">{section.alt}</p>}
                  </div>
                );
              case "table":
                return (
                  <div key={idx} className="blog-detail__table-wrap">
                    <table className="blog-detail__table">
                      <thead>
                        <tr>
                          {section.headers.map((h, i) => (
                            <th key={i}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              case "list": {
                const ListTag = section.ordered ? "ol" : "ul";
                return (
                  <ListTag key={idx} className="blog-detail__list">
                    {section.items.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ListTag>
                );
              }
              case "faq":
                return (
                  <div key={idx} className="blog-detail__faq">
                    <h3 className="blog-detail__h2">FAQs</h3>
                    {section.items.map((faq, i) => (
                      <details key={i} className="blog-detail__faq-item">
                        <summary>{faq.question}</summary>
                        <p>{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                );
              default:
                return null;
            }
          })}

          {/* Footer Actions - Share & Reading Time */}
          <div className="blog-detail__footer-actions">
            <div className="blog-detail__share">
              <h4 className="blog-detail__share-title">Share this article</h4>
              <div className="blog-detail__share-icons">
                <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                  <FaFacebook />
                </a>
                <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
                  <FaTwitter />
                </a>
                <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                  <FaLinkedin />
                </a>
                <button onClick={copyToClipboard} aria-label="Copy link">
                  {copySuccess ? <FaCheckCircle /> : <FaLink />}
                </button>
              </div>
              {copySuccess && <span className="blog-detail__copy-feedback">Link copied!</span>}
            </div>

            <div className="blog-detail__time">
              <div className="blog-detail__time-icon">
                <FaClock />
              </div>
              <div className="blog-detail__time-content">
                <h4>Reading Time</h4>
                <p>{blog.readTime}</p>
                <span>Approximate reading time for this article</span>
              </div>
            </div>
          </div>

          <div className="blog-detail__nav">
            <Link to="/blog" className="blog__read-btn">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}