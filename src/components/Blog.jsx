import { useState } from "react";
import { Link } from "react-router-dom";
import { blogArticles } from "../data/blogData";
import "./style/blog.css";
import bgVideo from "../assets/about-bg.mp4";

const POSTS = blogArticles;
const CATEGORIES = ["All", "Web Development", "SaaS", "Design", "Digital Marketing", "SEO", "Case Study"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);
  const filtered = rest.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const totalArticles = POSTS.length;
  const uniqueCategories = [...new Set(POSTS.map(p => p.category))].length;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage(`🎉 Thank you! ${email} has been subscribed to our newsletter.`);
        setEmail("");
        
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        setError(data.error || "Subscription failed. Please try again.");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setError("Unable to connect to server. Please try again later.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog">
      {/* Hero Section with Video Background */}
      <section className="blog__hero">
        <div className="blog__hero-video-wrapper">
          <video
            className="blog__hero-video"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className="blog__hero-overlay"></div>
        </div>
        <div className="blog__hero-inner">
          <span className="blog__eyebrow">The Blog</span>
          <h1 className="blog__hero-title">Insights from<br />the build.</h1>
          <p className="blog__hero-sub">
            Real lessons from shipping products, designing systems,<br />and growing digital businesses.
          </p>
          <div className="blog__hero-stats">
            <div className="blog__hero-stat">
              <span className="blog__hero-stat-val">{totalArticles}</span>
              <span className="blog__hero-stat-label">In‑Depth Articles</span>
            </div>
            <div className="blog__hero-stat-div" />
            <div className="blog__hero-stat">
              <span className="blog__hero-stat-val">{uniqueCategories}</span>
              <span className="blog__hero-stat-label">Topics</span>
            </div>
            <div className="blog__hero-stat-div" />
            <div className="blog__hero-stat">
              <span className="blog__hero-stat-val">Weekly</span>
              <span className="blog__hero-stat-label">New Posts</span>
            </div>
          </div>
        </div>
      </section>

      <div className="blog__body">
        {featured && activeCategory === "All" && (
          <div className="blog__featured-wrap">
            <div className="blog__featured-tag">✦ Featured</div>
            <article className="blog__featured">
              <div className="blog__featured-img-wrap">
                <img
                  src={featured.featuredImage}
                  alt={featured.title}
                  className="blog__featured-img"
                />
                <div className="blog__featured-img-overlay" />
                <span className="blog__cat" style={{ background: featured.categoryColor }}>
                  {featured.category}
                </span>
              </div>
              <div className="blog__featured-body">
                <div className="blog__featured-meta">
                  <span>{featured.date}</span>
                  <span className="blog__dot" />
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="blog__featured-title">{featured.title}</h2>
                <p className="blog__featured-excerpt">{featured.metaDescription}</p>
                <div className="blog__featured-footer">
                  <div className="blog__author">
                    <img src={featured.authorImg} alt={featured.author} className="blog__author-img" />
                    <span>{featured.author}</span>
                  </div>
                  <Link to={`/blog/${featured.slug}`} className="blog__read-btn">
                    Read Article
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        )}

        <div className="blog__filter-bar">
          <p className="blog__filter-label">Browse by topic</p>
          <div className="blog__filter">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`blog__filter-btn ${activeCategory === c ? "blog__filter-btn--active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="blog__grid">
            {filtered.map((post, i) => (
              <article
                key={post.slug}
                className="blog__card"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Link to={`/blog/${post.slug}`} className="blog__card-img-wrap">
                  <img src={post.featuredImage} alt={post.title} className="blog__card-img" loading="lazy" />
                  <div className="blog__card-img-overlay" />
                  <span className="blog__cat blog__cat--sm" style={{ background: post.categoryColor }}>
                    {post.category}
                  </span>
                  <div className="blog__card-hover-overlay">
                    <span className="blog__card-hover-label">Read Article →</span>
                  </div>
                </Link>
                <div className="blog__card-body">
                  <div className="blog__card-meta">
                    <span>{post.date}</span>
                    <span className="blog__dot" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="blog__card-title">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="blog__card-excerpt">{post.metaDescription}</p>
                  <div className="blog__card-footer">
                    <div className="blog__author blog__author--sm">
                      <img src={post.authorImg} alt={post.author} className="blog__author-img" />
                      <span>{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="blog__card-link">
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="blog__empty">
            <span>📭</span>
            <p>No posts in this category yet — check back soon!</p>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="blog__newsletter">
          <div className="blog__newsletter-inner">
            <span className="blog__newsletter-icon">✦</span>
            <h3 className="blog__newsletter-title">Get articles in your inbox</h3>
            <p className="blog__newsletter-sub">
              We publish weekly insights on design, development, and building digital products.
            </p>
            
            {successMessage ? (
              <div className="blog__newsletter-success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{successMessage}</span>
              </div>
            ) : (
              <form className="blog__newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="blog__newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  className="blog__newsletter-btn" 
                  disabled={loading}
                >
                  {loading ? "Subscribing..." : "Subscribe →"}
                </button>
              </form>
            )}
            
            {error && <div className="blog__newsletter-error">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}