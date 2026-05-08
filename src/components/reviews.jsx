import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80",
      rating: 5,
      date: "March 15, 2024",
      content: "Qodexaa delivered an exceptional indoor air quality testing platform for our environmental lab. Their technical expertise and attention to detail transformed our manual processes into a streamlined digital solution. Highly recommended for environmental tech projects!",
      project: "Indoor Air Quality Testing Platform",
      testimonial: true,
      email: "cortiz@solenvair.com",
      website: "www.solenvair.com"
    },
    {
      id: 2,
      name: "Preston D. Willis",
      role: "Founder & Principal",
      company: "Willis Innovations LLC",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      rating: 5,
      date: "February 28, 2024",
      content: "The team at Qodexaa helped us build and scale our innovation platform from concept to launch. Their agile methodology and technical prowess turned our vision into reality. Plan. Build. Scale. — they delivered on every promise.",
      project: "Innovation Management Platform",
      testimonial: true,
      email: "Preston@Willisinnovations.com",
      website: "Willisinnovations.com"
    },
    {
      id: 3,
      name: "Kelly Wilder",
      role: "Founder",
      company: "Automation Wilder",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80",
      rating: 5,
      date: "April 10, 2024",
      content: "Qodexaa developed our AI automation platform that revolutionized how we handle customer calls. Their expertise in AI integration and automation workflows saved us countless hours. Never miss another call with their brilliant solution!",
      project: "AI Automation Platform",
      testimonial: true,
      email: "kelly@wilderautomation.ai",
      website: "wilderautomation.ai"
    },
    {
      id: 4,
      name: "Giovanni Reid",
      role: "Real Estate Advisor",
      company: "United Realty Group, Inc.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
      rating: 5,
      date: "January 20, 2024",
      content: "Working with Qodexaa was a game-changer for our real estate business. They built a custom CRM that streamlined our client management and property listings. Professional, responsive, and technically brilliant!",
      project: "Real Estate CRM Platform",
      testimonial: true,
      email: "Grannellg@gmail.com",
      website: "unitedrealtygroup.com"
    },
    {
      id: 5,
      name: "Jodilyn Holz, APRN",
      role: "Owner",
      company: "Holz Family Practice",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80",
      rating: 5,
      date: "December 5, 2023",
      content: "Qodexaa created a beautiful, functional website for our family practice. Patient appointments have increased 40% since launch. Their healthcare IT expertise gave us a platform that patients love and our staff finds easy to manage.",
      project: "Family Practice Website & Portal",
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