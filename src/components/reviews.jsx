import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft,
  FaArrowLeft, FaArrowRight, FaTwitter, FaLinkedin,
  FaRegClock, FaCheckCircle, FaBriefcase,
  FaHeart, FaPlay, FaPause,
  FaEnvelope, FaBuilding, FaRocket, FaSmile
} from "react-icons/fa";
import "./style/review.css";
import bgVideo from "../assets/reviews-bg.mp4";

const Reviews = () => {
  const [activeReview, setActiveReview] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoOffset, setVideoOffset] = useState(0);
  const autoPlayRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  // Platform reviews
  const platformReviews = [
    { platform: "Clutch", rating: 4.9, reviews: 45, icon: <FaStar />, link: "#" },
    { platform: "Trustpilot", rating: 4.8, reviews: 128, icon: <FaStar />, link: "#" },
    { platform: "Google", rating: 4.9, reviews: 56, icon: <FaStar />, link: "#" }
  ];

  // Updated Reviews with real client data
  const reviews = [
    {
      id: 1,
      name: "Alejandro Ortiz",
      role: "CEO, SOL Environmental LLC",
      company: "SOL ENVIRONMENTAL LLC",
      avatar: "https://media.licdn.com/dms/image/v2/D5603AQGIjbcrcBUtVw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1695650627443?e=2147483647&v=beta&t=sddtLxfiqO2rxgZFhG2JFPc2wdH06iHKYleiTFHO6Zw",
      rating: 5,
      date: "March 15, 2024",
      content:
        "QODEXAA developed a custom environmental management software platform that completely transformed our indoor air quality testing operations. Their expertise in custom web development, business automation, cloud-based dashboards, and scalable software solutions helped us streamline reporting, improve client communication, and automate complex workflows. The platform is fast, secure, mobile-friendly, and built for long-term scalability. If you need a reliable software development company for enterprise solutions, QODEXAA delivers exceptional results.",
      project: "Environmental Management Software Platform",
      testimonial: true,
      email: "cortiz@solenvair.com",
      website: "www.solenvair.com"
    },
    {
      id: 2,
      name: "Preston D. Willis",
      role: "Founder & Principal",
      company: "Willis Innovations LLC",
      avatar: "https://assets.montefioreeinstein.org/profiles/images/william-preston.jpg",
      rating: 5,
      date: "February 28, 2024",
      content:
        "Working with QODEXAA was one of the best business decisions we made. Their team built a high-performance SaaS platform with modern UI/UX design, cloud integration, secure authentication systems, and scalable backend architecture. They understood our startup goals and delivered a solution optimized for growth, performance, and user engagement. Their expertise in SaaS development, custom software engineering, and digital product strategy truly stands out.",
      project: "SaaS Product Development Platform",
      testimonial: true,
      email: "Preston@Willisinnovations.com",
      website: "Willisinnovations.com"
    },
    {
      id: 3,
      name: "Kelly Wilder",
      role: "Founder",
      company: "Automation Wilder",
      avatar: "https://media.licdn.com/dms/image/v2/D4E03AQE_t88RC-xVzQ/profile-displayphoto-shrink_200_200/B4EZcTPrKRHIAY-/0/1748374565901?e=2147483647&v=beta&t=WI1JN-buwL71SoSVv7czqjEIMHQCwQyg13LkcS9YIvw",
      rating: 5,
      date: "April 10, 2024",
      content:
        "QODEXAA helped us launch an advanced AI automation platform powered by intelligent workflows and modern AI integration. Their team implemented automation systems, AI-driven customer support features, and scalable cloud infrastructure that significantly improved our operations. Their knowledge of artificial intelligence development, workflow automation, and business process optimization helped us save time, increase productivity, and deliver a better customer experience.",
      project: "AI Automation & Workflow Platform",
      testimonial: true,
      email: "kelly@wilderautomation.ai",
      website: "wilderautomation.ai"
    },
    {
      id: 4,
      name: "Giovanni Reid",
      role: "Real Estate Advisor",
      company: "United Realty Group, Inc.",
      avatar: "https://avatars.githubusercontent.com/u/88079608?v=4",
      rating: 5,
      date: "January 20, 2024",
      content:
        "QODEXAA created a powerful real estate CRM platform tailored specifically to our business needs. The system improved lead management, property listing workflows, customer communication, and overall operational efficiency. Their team delivered a responsive, SEO-friendly, and easy-to-manage solution that helped us modernize our digital presence. Their expertise in CRM software development and custom business applications is outstanding.",
      project: "Custom Real Estate CRM Software",
      testimonial: true,
      email: "Grannellg@gmail.com",
      website: "unitedrealtygroup.com"
    },
    {
      id: 5,
      name: "Jodilyn Holz, APRN",
      role: "Owner",
      company: "Holz Family Practice",
      avatar: "https://assets-us-01.kc-usercontent.com/617312fb-2e06-4b4b-a69a-d0a0fea7798f/e8fec257-165f-453c-b9be-63d33b4cf708/Harper_Whitney_Right_3348_600x600.jpg?w=0.4",
      rating: 5,
      date: "December 5, 2023",
      content:
        "QODEXAA designed and developed a modern healthcare website and patient portal for our clinic. The new platform improved patient engagement, online appointment scheduling, mobile accessibility, and search engine visibility. Their healthcare web development expertise, UI/UX design quality, and attention to performance optimization helped us attract more patients and improve overall clinic efficiency. Highly recommended for professional healthcare software and website development services.",
      project: "Healthcare Website & Patient Portal",
      testimonial: true,
      email: "jodi@holzfamilypractice.com",
      website: "www.holzfamilypractice.com"
    }
  ];

  // Parallax effect for video background
  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const scrolled = window.scrollY;
        setVideoOffset(scrolled * 0.3);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveReview((prev) => (prev + 1) % reviews.length);
      }, 5000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isPlaying, reviews.length]);

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  const nextReview = () => setActiveReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star-filled" />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<FaStarHalfAlt key={i} className="star-half" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-empty" />);
      }
    }
    return stars;
  };

  return (
    <div className="reviews-page">
      <Helmet>
        <title>Client Reviews & Testimonials — Qodexaa</title>
        <meta name="description" content="See what our clients say about Qodexaa. Real reviews from businesses we've helped with custom software, AI platforms, SaaS development, and digital marketing." />
        <meta property="og:title" content="Client Reviews & Testimonials — Qodexaa" />
        <meta property="og:description" content="See what our clients say about Qodexaa. Real reviews from businesses we've helped with custom software, AI platforms, SaaS development, and digital marketing." />
        <meta property="og:url" content="https://qodexaa.com/reviews" />
        <meta name="twitter:title" content="Client Reviews & Testimonials — Qodexaa" />
        <meta name="twitter:description" content="See what our clients say about Qodexaa. Real reviews from businesses we've helped with custom software, AI platforms, SaaS development, and digital marketing." />
      </Helmet>
      {/* Hero Section with Video Background - Height 500px */}
      <section className="reviews-hero">
        <div className="reviews-hero-video">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="reviews-bg-video"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className="reviews-hero-overlay"></div>
        </div>

        <div className="reviews-hero-content">
          <div className="reviews-hero-text" ref={textRef} style={{ transform: `translateY(${videoOffset * 0.5}px)` }}>
            <span className="reviews-hero-badge">Testimonials</span>
            <h1 className="reviews-hero-title">
              What Our <span className="reviews-hero-highlight">Clients Say</span>
            </h1>
            <p className="reviews-hero-subtitle">
              Don't just take our word for it — hear from the businesses we've helped transform
            </p>
          </div>
        </div>
      </section>

      {/* Platform Ratings */}
      <section className="reviews-platforms">
        <div className="reviews-container">
          <div className="reviews-platform-grid">
            {platformReviews.map((platform, i) => (
              <a key={i} href={platform.link} className="reviews-platform-card" target="_blank" rel="noopener noreferrer">
                <div className="reviews-platform-icon">{platform.icon}</div>
                <div className="reviews-platform-rating">
                  <div className="reviews-platform-stars">{renderStars(platform.rating)}</div>
                  <span className="reviews-platform-score">{platform.rating}</span>
                </div>
                <span className="reviews-platform-count">{platform.reviews} reviews</span>
                <span className="reviews-platform-name">{platform.platform}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials Slider */}
      <section className="reviews-slider-section">
        <div className="reviews-container">
          <div className="reviews-slider-header">
            <div>
              <span className="reviews-section-tag">Featured Testimonials</span>
              <h2 className="reviews-section-title">Success <span className="reviews-highlight">Stories</span></h2>
              <p className="reviews-section-subtitle">Real results from real clients</p>
            </div>
            <div className="reviews-slider-controls">
              <button
                className="reviews-slider-btn"
                onClick={prevReview}
                aria-label="Previous review"
              >
                <FaArrowLeft />
              </button>
              <button
                className="reviews-slider-btn reviews-slider-btn-play"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                className="reviews-slider-btn"
                onClick={nextReview}
                aria-label="Next review"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div
            className="reviews-slider-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="reviews-slider-track"
              style={{ transform: `translateX(-${activeReview * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={review.id} className="reviews-slide">
                  <div className="reviews-card">
                    <FaQuoteLeft className="reviews-quote-icon" />
                    <div className="reviews-card-header">
                      <img src={review.avatar} alt={review.name} className="reviews-avatar" />
                      <div className="reviews-client-info">
                        <h3>{review.name}</h3>
                        <p>{review.role}</p>
                        <div className="reviews-company">
                          <FaBuilding /> {review.company}
                        </div>
                        <div className="reviews-rating">
                          {renderStars(review.rating)}
                          <span className="reviews-date">
                            <FaRegClock /> {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="reviews-content">{review.content}</p>
                    <div className="reviews-project">
                      <FaBriefcase />
                      <span>{review.project}</span>
                    </div>
                    <div className="reviews-card-footer">
                      <div className="reviews-contact-info">
                        <a href={`mailto:${review.email}`} className="reviews-email">
                          <FaEnvelope /> {review.email}
                        </a>
                      </div>
                      <div className="reviews-verification">
                        <FaCheckCircle />
                        <span>Verified Client</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reviews-dots">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`reviews-dot ${activeReview === index ? "active" : ""}`}
                onClick={() => setActiveReview(index)}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Attractive CTA Section with Stats-like Cards */}
      <section className="reviews-attractive-cta">
        <div className="reviews-container">
          <div className="reviews-cta-grid">
            <div className="reviews-cta-card">
              <FaRocket className="reviews-cta-icon" />
              <h3>500+</h3>
              <p>Projects Delivered</p>
            </div>
            <div className="reviews-cta-card">
              <FaSmile className="reviews-cta-icon" />
              <h3>98%</h3>
              <p>Client Satisfaction</p>
            </div>
            <div className="reviews-cta-card">
              <FaHeart className="reviews-cta-icon" />
              <h3>50+</h3>
              <p>Team Members</p>
            </div>
            <div className="reviews-cta-card">
              <FaStar className="reviews-cta-icon" />
              <h3>4.9/5</h3>
              <p>Average Rating</p>
            </div>
          </div>

          <div className="reviews-main-cta">
            <h2>Ready to Join Our <span>Happy Clients</span>?</h2>
            <p>Let's create something amazing together</p>
            <Link to="/contact" className="reviews-cta-btn">
              Start Your Project <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;