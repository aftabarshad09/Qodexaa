import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/FeaturedInsights.css';

/* ─── Icons ──────────────────────────────────────────── */
const IconArrow = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

/* ─── Card Data with Blog Links ──────────────────────── */
const COLUMNS = [
  // ── Column 1 ────────────────────────────────────────
  [
    {
      tag: 'Blog',
      title: 'Custom Web Development',
      line: 'Tailored platforms for flexibility and scale',
      img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
      link: '/blog/custom-web-development'
    },
    {
      tag: 'Blog',
      title: 'SaaS Management & Analytics',
      line: 'Control costs, improve visibility',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      link: '/blog/saas-management-analytics'
    },
    {
      tag: 'Blog',
      title: 'AI-Powered CRM Systems',
      line: 'Predictive analytics & intelligent automation',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      link: '/blog/ai-powered-crm-systems'
    },
  ],
  // ── Column 2 ────────────────────────────────────────
  [
    {
      tag: 'Blog',
      title: 'Graphic Designer\'s Nightmare',
      line: 'Production-ready chaos in 2026',
      img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
      link: '/blog/graphic-designer-nightmare'
    },
    {
      tag: 'Blog',
      title: 'Digital Marketing Modern World',
      line: 'AI-driven strategies for growth',
      img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80',
      link: '/blog/digital-marketing-modern-world'
    },
    {
      tag: 'Blog',
      title: 'What is SEO & Why It Matters',
      line: 'Master SEO in the AI era',
      img: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&q=80',
      link: '/blog/what-is-seo'
    },
    {
      tag: 'Blog',
      title: 'Custom E-Commerce Platforms',
      line: 'Build scalable online stores that convert',
      img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
      link: '/blog/custom-ecommerce-platform'
    },
  ],
  // ── Column 3 ────────────────────────────────────────
  [
    {
      tag: 'Blog',
      title: 'SaaS Product Development',
      line: 'From MVP to market-ready platform',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      link: '/blog/saas-product-development'
    },
    {
      tag: 'Blog',
      title: 'E-commerce Transformation',
      line: 'From 0 to 100K monthly transactions',
      img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
      link: '/blog/ecommerce-transformation'
    },
    {
      tag: 'Case Study',
      title: 'AI-Powered Analytics Platform',
      line: 'Real-time insights for enterprise clients',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      link: '/blog/ai-analytics-platform'
    },
    {
      tag: 'Blog',
      title: 'Healthcare System Modernization',
      line: 'Digital transformation success story',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
      link: '/blog/healthcare-modernization'
    }
  ],
];

const SPEEDS = [0.12, -0.10, 0.15];
const CLAMP = [140, 120, 160];

/* ─── Single Card ────────────────────────────────────── */
const InsightCard = ({ tag, title, line, img, link }) => (
  <Link to={link} className="fi-card" itemScope itemType="https://schema.org/BlogPosting">
    <img
      src={img}
      alt={title}
      className="fi-card-img"
      loading="lazy"
      decoding="async"
      itemProp="image"
    />
    <div className="fi-card-overlay">
      <span className="fi-card-tag" itemProp="articleSection">{tag}</span>
      <h3 className="fi-card-title" itemProp="headline">{title}</h3>
      <p className="fi-card-line">{line}</p>
      <span className="fi-card-explore">
        Explore More <IconArrow />
      </span>
    </div>
  </Link>
);

/* ─── Main Component ─────────────────────────────────── */
const FeaturedInsights = () => {
  const sectionRef = useRef(null);
  const colRefs = useRef([null, null, null]);
  const rafRef = useRef(null);

  const currentY = useRef([0, 0, 0]);
  const targetY = useRef([0, 0, 0]);
  const prevScrollY = useRef(
    typeof window !== 'undefined' ? window.scrollY : 0
  );

  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* ── Intersection Observer ───────────────────────── */
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  /* ── Accumulate scroll delta → targetY ──────────── */
  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      if (!inView) return;
      const delta = window.scrollY - prevScrollY.current;
      prevScrollY.current = window.scrollY;

      SPEEDS.forEach((speed, i) => {
        targetY.current[i] = Math.max(
          -CLAMP[i],
          Math.min(CLAMP[i], targetY.current[i] + delta * speed)
        );
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [inView, isMobile]);

  /* ── Lerp loop — smooth chase ────────────────────── */
  useEffect(() => {
    if (isMobile || !inView) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      let dirty = false;
      SPEEDS.forEach((_, i) => {
        const next = lerp(currentY.current[i], targetY.current[i], 0.08);
        if (Math.abs(next - currentY.current[i]) > 0.01) {
          currentY.current[i] = next;
          dirty = true;
        }
      });

      if (dirty) {
        colRefs.current.forEach((el, i) => {
          if (el) el.style.transform = `translateY(${currentY.current[i]}px)`;
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, isMobile]);

  // Reset transforms on mobile
  useEffect(() => {
    if (isMobile) {
      colRefs.current.forEach((el) => {
        if (el) el.style.transform = 'translateY(0)';
      });
    }
  }, [isMobile]);

  return (
    <section
      className="fi-section"
      ref={sectionRef}
      aria-labelledby="fi-heading"
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      <div className="fi-blob" aria-hidden="true" />
      <div className="fi-blob-2" aria-hidden="true" />

      <div className="fi-inner">
        <div className="fi-left">
          <span className="fi-eyebrow">Featured Insights</span>
          <h1 className="fi-heading" id="fi-heading">
            Stories of our transformations across{' '}
            <em>Services and Industries</em>
          </h1>
          <div className="fi-divider" aria-hidden="true" />
          <p className="fi-sub">From Concept to Completion — Real results, real impact</p>
          <Link to="/blog" className="fi-btn" aria-label="View all insights">
            Explore More <IconArrow />
          </Link>
        </div>

        <div className="fi-right" aria-label="Insights gallery">
          {COLUMNS.map((cards, colIdx) => (
            <div
              key={colIdx}
              className="fi-col"
              ref={el => (colRefs.current[colIdx] = el)}
            >
              {cards.map((card, cardIdx) => (
                <InsightCard
                  key={`${colIdx}-${cardIdx}`}
                  {...card}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedInsights;