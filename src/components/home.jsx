import React, { useEffect, useRef, useState } from "react";
import "./style/home.css";

// Import all images (you can add more)
import img1 from "../assets/images/001.jpg";
import img2 from "../assets/images/002.jpg";
import img3 from "../assets/images/003.jpg";
import img4 from "../assets/images/004.png";
import img5 from "../assets/images/005.jpg";
import img6 from "../assets/images/006.jpg";
import img7 from "../assets/images/007.jpg";
import img8 from "../assets/images/008.jpeg";

const Home = () => {
  const parallaxRef1 = useRef(null);
  const parallaxRef2 = useRef(null);
  const parallaxRef3 = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Image carousel states with enhanced fade animation
  const [currentImage1, setCurrentImage1] = useState(0);
  const [currentImage2, setCurrentImage2] = useState(1);
  const [currentImage3, setCurrentImage3] = useState(2);
  const [isTransitioning1, setIsTransitioning1] = useState(false);
  const [isTransitioning2, setIsTransitioning2] = useState(false);
  const [isTransitioning3, setIsTransitioning3] = useState(false);
  
  // Array of all images
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];
  
  const phrases = ["Innovate", "Create", "Elevate"];

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[textIndex % phrases.length];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => prev + 1);
        }
      }
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  // Custom smooth image switching function
  const switchImage = (setter, setTransition, currentIndex) => {
    setTransition(true);
    setTimeout(() => {
      setter((prev) => {
        let newIndex = prev + 1;
        if (newIndex >= images.length) newIndex = 0;
        return newIndex;
      });
      setTimeout(() => {
        setTransition(false);
      }, 100);
    }, 250);
  };

  // Image switching logic with staggered start times and smooth transitions
  useEffect(() => {
    // Image 1: Starts immediately, switches every 5 seconds
    const interval1 = setInterval(() => {
      switchImage(setCurrentImage1, setIsTransitioning1, currentImage1);
    }, 5000);
    
    // Image 2: Starts after 7 seconds, switches every 7 seconds
    const timeout2 = setTimeout(() => {
      const interval2 = setInterval(() => {
        switchImage(setCurrentImage2, setIsTransitioning2, currentImage2);
      }, 7000);
      return () => clearInterval(interval2);
    }, 7000);
    
    // Image 3: Starts after 9 seconds, switches every 9 seconds
    const timeout3 = setTimeout(() => {
      const interval3 = setInterval(() => {
        switchImage(setCurrentImage3, setIsTransitioning3, currentImage3);
      }, 9000);
      return () => clearInterval(interval3);
    }, 9000);
    
    return () => {
      clearInterval(interval1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  // Parallax effect for multiple images
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (parallaxRef1.current) {
        parallaxRef1.current.style.transform = `translateY(${scrollY * 0.25}px) scale(1.02)`;
      }
      if (parallaxRef2.current) {
        parallaxRef2.current.style.transform = `translateY(${scrollY * 0.35}px) scale(1.02)`;
      }
      if (parallaxRef3.current) {
        parallaxRef3.current.style.transform = `translateY(${scrollY * 0.45}px) scale(1.02)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">
          QODEXAA
          <br /> Dream Drive
        </h1>
        
        <div className="hero__tagline">
          <span className="hero__tagline-prefix">Where ideas</span>
          <div className="hero__typing-wrapper">
            <span className="hero__typing-text">{displayText}</span>
            <span className="hero__cursor">|</span>
          </div>
        </div>

        <p className="hero__subtitle">
          We transform visions into digital realities through innovative design, 
          creative solutions, and elevated experiences that set new standards.
        </p>

        <button className="hero__btn">
          <span className="hero__btn-text">Explore Our Work</span>
          <span className="hero__btn-glow"></span>
        </button>
      </div>

      <div className="hero__image-wrapper">
        <div className="hero__blob"></div>

        {/* Image 1 - Front (Switches every 5 seconds) */}
        <div className="hero__parallax-track hero__parallax-track--1" ref={parallaxRef1}>
          <div className="hero__img-container">
            <div className={`hero__img-wrapper ${isTransitioning1 ? 'switching' : ''}`}>
              <img
                src={images[currentImage1]}
                alt="Creative Design"
                className="hero__img hero__img--1"
              />
            </div>
            <div className="hero__img-overlay"></div>
          </div>
        </div>

        {/* Image 2 - Middle (Switches every 7 seconds) */}
        <div className="hero__parallax-track hero__parallax-track--2" ref={parallaxRef2}>
          <div className="hero__img-container">
            <div className={`hero__img-wrapper ${isTransitioning2 ? 'switching' : ''}`}>
              <img
                src={images[currentImage2]}
                alt="Digital Innovation"
                className="hero__img hero__img--2"
              />
            </div>
            <div className="hero__img-overlay"></div>
          </div>
        </div>

        {/* Image 3 - Back (Switches every 9 seconds) */}
        <div className="hero__parallax-track hero__parallax-track--3" ref={parallaxRef3}>
          <div className="hero__img-container">
            <div className={`hero__img-wrapper ${isTransitioning3 ? 'switching' : ''}`}>
              <img
                src={images[currentImage3]}
                alt="Creative Solutions"
                className="hero__img hero__img--3"
              />
            </div>
            <div className="hero__img-overlay"></div>
          </div>
        </div>

        <div className="hero__social-proof">
          <div className="hero__avatars">
            <img src="https://i.pravatar.cc/40?img=1" alt="User" className="avatar" />
            <img src="https://i.pravatar.cc/40?img=2" alt="User" className="avatar" />
            <img src="https://i.pravatar.cc/40?img=3" alt="User" className="avatar" />
            <div className="avatar avatar--more">+50</div>
          </div>

          <div className="hero__stats">
            <span className="hero__count">500+</span>
            <span className="hero__label">Projects Delivered</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;