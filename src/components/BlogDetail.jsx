import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBlogBySlug, blogMenuItems } from "../data/blogData";
import { 
  FaCalendarAlt, FaClock, FaUser, FaFacebook, FaTwitter, 
  FaLinkedin, FaLink, FaCheckCircle 
} from "react-icons/fa";
import "./style/blog-detail.css";

// Import videos for each blog post (8 different videos)
import video1 from "../assets/about-bg.mp4";
import video2 from "../assets/about-bg.mp4";
import video3 from "../assets/about-bg.mp4";
import video4 from "../assets/about-bg.mp4";
import video5 from "../assets/about-bg.mp4";
import video6 from "../assets/about-bg.mp4";
import video7 from "../assets/about-bg.mp4";
import video8 from "../assets/about-bg.mp4";

// Map slugs to video imports
const blogVideos = {
  "custom-web-development": video1,
  "saas-management-analytics": video2,
  "graphic-designer-nightmare": video3,
  "digital-marketing-modern-world": video4,
  "what-is-seo": video5,
  "ai-powered-crm-systems": video6,
  "custom-ecommerce-platform": video7,
  "saas-product-development": video8
};

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);
  const [progress, setProgress] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");

  // Get video for this blog or fallback to video1
  const blogVideo = blogVideos[slug] || video1;

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

  // Active heading detection for TOC
  useEffect(() => {
    const headings = document.querySelectorAll('.blog-detail__h2');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id);
        }
      });
    }, { threshold: 0.5, rootMargin: '-80px 0px 0px 0px' });

    headings.forEach(heading => observer.observe(heading));
    return () => headings.forEach(heading => observer.unobserve(heading));
  }, [blog]);

  if (!blog) {
    return (
      <div className="blog-detail not-found">
        <h2>Article not found</h2>
        <Link to="/blog" className="blog__read-btn">Back to Blog</Link>
      </div>
    );
  }

  // Generate TOC items from headings
  const tocItems = blog.sections.filter(section => section.type === "heading" && section.level === 2);

  // Copy current URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Share URLs
  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(blog.title);
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(blog.title)}`;

  return (
    <div className="blog-detail">
      {/* Progress Bar */}
      <div className="blog-detail__progress">
        <div className="blog-detail__progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Hero Section with Video Background */}
      <section className="blog-detail__hero">
        <video 
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
                const headingId = section.level === 2 ? `heading-${idx}` : undefined;
                return (
                  <Tag key={idx} id={headingId} className={headingClass}>
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
                    <div className="blog-detail__image-shape-left"></div>
                    <div className="blog-detail__image-shape-right"></div>
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

          <div className="blog-detail__nav">
            <Link to="/blog" className="blog__read-btn">
              ← Back to Blog
            </Link>
          </div>

          <div className="blog-detail__related">
            <h3 className="blog-detail__h2">More Articles</h3>
            <div className="blog-detail__related-grid">
              {blogMenuItems
                .filter((item) => item.slug !== slug)
                .slice(0, 4)
                .map((item) => (
                  <Link key={item.slug} to={`/blog/${item.slug}`} className="blog__card-link">
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="blog-detail__sidebar">
          {/* Table of Contents */}
          {tocItems.length > 0 && (
            <div className="blog-detail__toc">
              <h4 className="blog-detail__toc-title">Table of Contents</h4>
              <ul className="blog-detail__toc-list">
                {tocItems.map((item, i) => {
                  const headingText = item.content;
                  return (
                    <li key={i}>
                      <a 
                        href={`#heading-${i}`}
                        className={activeHeading === `heading-${i}` ? 'active' : ''}
                      >
                        {headingText}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Share Widget */}
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

          {/* Reading Time Estimate */}
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
        </aside>
      </div>
    </div>
  );
}