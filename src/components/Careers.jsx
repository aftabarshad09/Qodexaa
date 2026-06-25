import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

import {
  FaArrowRight, FaCheckCircle, FaBriefcase, FaGraduationCap,
  FaMapMarkerAlt, FaClock, FaUpload, FaPaperPlane, FaSpinner,
  FaHeart, FaChartLine, FaUsers, FaLaptopCode, FaTrophy, FaGlobe,
  FaCoffee, FaMedal, FaEnvelope, FaRocket, FaShieldAlt, FaRegSmile,
  FaHandshake, FaCheck, FaEye, FaEyeSlash, FaPlus, FaMinus
} from "react-icons/fa";
import "./style/Careers.css";
import servicesBgVideo from "../assets/about-bg.mp4";

// GitHub Gist URL
const GIST_URL = "https://gist.githubusercontent.com/aftabarshad09/50ee7fb369d83e5fc90eba0f63336957/raw/0112c41e2003a5295ff37de0fb761e033b8324a4/qodexaa-jobs.json";

const Careers = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [expandedJob, setExpandedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    coverLetter: "",
    resume: null,
    experience: "",
    portfolio: "",
    linkedin: "",
    expectedSalary: "",
    noticePeriod: ""
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [resumeName, setResumeName] = useState("");

  const formRef = useRef(null);

  // Fetch jobs from GitHub Gist
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(GIST_URL);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();

      const activeJobs = data.jobs?.filter(job => job.active === true) || [];
      const activeInternships = data.internships?.filter(intern => intern.active === true) || [];

      setJobs(activeJobs);
      setInternships(activeInternships);
      setLastUpdated(data.last_updated || new Date().toLocaleDateString());
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Unable to load job listings. Please check back later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleJobDescription = (jobId) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
    } else {
      setExpandedJob(jobId);
    }
  };

  const handleApplyClick = (role) => {
    setSelectedRole(role);
    setShowForm(true);
    setFormData({ ...formData, role: role });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file });
      setResumeName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSuccess(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('role', selectedRole);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('portfolio', formData.portfolio);
      formDataToSend.append('linkedin', formData.linkedin);
      formDataToSend.append('expectedSalary', formData.expectedSalary);
      formDataToSend.append('noticePeriod', formData.noticePeriod);

      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(`Thank you for applying! Your application for ${selectedRole} has been received. A confirmation email has been sent to ${formData.email}.`);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          role: "",
          coverLetter: "",
          resume: null,
          experience: "",
          portfolio: "",
          linkedin: "",
          expectedSalary: "",
          noticePeriod: ""
        });
        setResumeName("");
        setShowForm(false);
        setSelectedRole("");

        setTimeout(() => setSuccess(null), 8000);
      } else {
        setError(result.error || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Cannot connect to server. Please make sure backend is running on port 5000.');
    } finally {
      setSending(false);
    }
  };

  const handleEmailClick = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=careers@qodexaa.com", "_blank");
    window.location.href = "mailto:careers@qodexaa.com";
  };

  const benefits = [
    { icon: <FaHeart />, title: "Health Insurance", desc: "Comprehensive medical coverage for you and your family" },
    { icon: <FaChartLine />, title: "Growth Opportunities", desc: "Continuous learning, certifications, and career advancement" },
    { icon: <FaUsers />, title: "Collaborative Culture", desc: "Work with talented people who inspire you daily" },
    { icon: <FaLaptopCode />, title: "Remote Friendly", desc: "Flexible work arrangements and work-life balance" },
    { icon: <FaTrophy />, title: "Performance Bonus", desc: "Rewarded for excellence and exceeding targets" },
    { icon: <FaGlobe />, title: "Global Exposure", desc: "Work with international clients and cutting-edge projects" },
    { icon: <FaCoffee />, title: "Free Meals & Snacks", desc: "Daily lunch, coffee, and snacks at the office" },
    { icon: <FaMedal />, title: "Annual Retreats", desc: "Team building trips and annual company retreats" }
  ];

  const values = [
    { icon: <FaRocket />, title: "Innovation First", desc: "We embrace new technologies and creative solutions" },
    { icon: <FaShieldAlt />, title: "Integrity", desc: "Honest, transparent communication with clients and team" },
    { icon: <FaRegSmile />, title: "Growth Mindset", desc: "Continuous learning and improvement" },
    { icon: <FaHandshake />, title: "Team Success", desc: "We win together, we grow together" }
  ];

  const activeJobs = jobs.filter(job => job.active !== false);
  const hasActiveInternships = internships.length > 0;

  return (
    <div className="careers-page">
      <Helmet>
        <title>Careers at Qodexaa — Join Our Team</title>
        <meta name="description" content="We're hiring! Explore open roles at Qodexaa and join a team of engineers, designers, and strategists building the future of AI-powered software and SaaS products." />
        <meta property="og:title" content="Careers at Qodexaa — Join Our Team" />
        <meta property="og:description" content="We're hiring! Explore open roles at Qodexaa and join a team of engineers, designers, and strategists building the future of AI-powered software and SaaS products." />
        <meta property="og:url" content="https://qodexaa.com/careers" />
        <meta name="twitter:title" content="Careers at Qodexaa — Join Our Team" />
        <meta name="twitter:description" content="We're hiring! Explore open roles at Qodexaa and join a team of engineers, designers, and strategists building the future of AI-powered software and SaaS products." />
      </Helmet>
      {/* Hero Section with Video Background */}
      <section className="careers-hero">
        <div className="careers-hero-video-wrapper">
          <video
            className="careers-hero-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={servicesBgVideo} type="video/mp4" />
          </video>
          <div className="careers-hero-overlay"></div>
        </div>
        <div className="careers-hero-content">
          <span className="careers-hero-badge">Join Our Team</span>
          <h1 className="careers-hero-title">
            Build Your <span className="careers-hero-highlight">Career</span> With Us
          </h1>
          <p className="careers-hero-subtitle">
            We're looking for passionate individuals who want to make an impact through technology.
            Join a team that values innovation, collaboration, and personal growth.
          </p>
          <div className="careers-hero-buttons">
            <a href="#openings" className="careers-btn-primary">
              View Openings ({activeJobs.length}) <FaArrowRight />
            </a>
            <a href="#benefits" className="careers-btn-secondary">
              Why Join Us
            </a>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="careers-intro">
        <div className="careers-container">
          <div className="careers-section-header">
            <span className="careers-section-tag">Who We Are</span>
            <h2 className="careers-section-title">Why Work at <span className="careers-highlight">Qodexaa</span></h2>
          </div>
          <p className="careers-prose">
            Qodexaa is a web development and digital products agency building custom software,
            SaaS platforms, and AI-powered tools for clients across industries. [Placeholder: replace
            with a short paragraph about how many people are on the team today, where the company is
            based, and what kind of clients/projects you typically work on.] We're a small, fast-moving
            team, which means every hire has a real say in the products we ship and the technical
            decisions behind them.
          </p>
          <p className="careers-prose">
            [Placeholder: add a sentence on what stage the company is at — e.g. "we're scaling our
            engineering and design teams to keep up with client demand" — and what that means for
            someone joining now: more ownership, more variety, faster growth than at a larger agency.]
          </p>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="careers-culture">
        <div className="careers-container">
          <div className="careers-section-header">
            <span className="careers-section-tag">Company Culture</span>
            <h2 className="careers-section-title">How We <span className="careers-highlight">Work</span> Together</h2>
          </div>
          <p className="careers-prose">
            [Placeholder: describe day-to-day working style — e.g. remote/hybrid/in-office split,
            typical working hours, how teams are structured (pods, squads, per-client teams), and how
            decisions get made.] We try to keep process light: short standups, direct feedback, and
            enough autonomy that people aren't waiting on permission to do good work.
          </p>
          <p className="careers-prose">
            [Placeholder: add a specific example of a team ritual or tradition — e.g. weekly demo
            day, monthly show-and-tell, pairing on hard problems, internal hackathons — something that
            makes the culture concrete rather than generic.] The values below are what we actually
            try to hold each other to, not just words on a careers page.
          </p>
          <div className="careers-values-grid">
            {values.map((value, i) => (
              <div key={i} className="careers-value-card">
                <div className="careers-value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For Section */}
      <section className="careers-look-for">
        <div className="careers-container">
          <div className="careers-section-header">
            <span className="careers-section-tag">What We Look For</span>
            <h2 className="careers-section-title">Traits We <span className="careers-highlight">Value</span> in a Hire</h2>
          </div>
          <p className="careers-prose">
            [Placeholder: replace with your own hiring philosophy. Below is a starting list of
            traits to edit, reorder, or replace with whatever actually matters when you're evaluating
            candidates.]
          </p>
          <ul className="careers-look-for-list">
            <li><FaCheckCircle /> Strong fundamentals over framework-of-the-month chasing — we'd rather hire someone who understands why something works.</li>
            <li><FaCheckCircle /> Comfortable with ambiguity — client requirements shift, and we need people who can adapt without losing momentum.</li>
            <li><FaCheckCircle /> Clear communicators, especially in writing — most of our collaboration happens async across tickets, PRs, and docs.</li>
            <li><FaCheckCircle /> Ownership mentality — you flag problems early and follow through, rather than waiting to be told what to do.</li>
            <li><FaCheckCircle /> Curiosity — you're the kind of person who tries the new tool, reads the changelog, and asks "why" by default.</li>
          </ul>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="careers-benefits">
        <div className="careers-container">
          <div className="careers-section-header">
            <span className="careers-section-tag">Why Join Us</span>
            <h2 className="careers-section-title">Benefits & <span className="careers-highlight">Perks</span></h2>
            <p className="careers-section-subtitle">We take care of our team so you can focus on doing your best work</p>
          </div>
          <div className="careers-benefits-grid">
            {benefits.map((benefit, i) => (
              <div key={i} className="careers-benefit-card">
                <div className="careers-benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings Section */}
      <section id="openings" className="careers-openings">
        <div className="careers-container">
          <div className="careers-section-header">
            <span className="careers-section-tag">Current Openings</span>
            <h2 className="careers-section-title">Join Our <span className="careers-highlight">Team</span></h2>
            <p className="careers-section-subtitle">Find the perfect role that matches your skills and career goals</p>
            {lastUpdated && <p className="careers-last-updated"> Last updated: {lastUpdated}</p>}
          </div>

          {/* Tab Buttons */}
          <div className="careers-tabs">
            <button
              className={`careers-tab ${activeTab === "jobs" ? "active" : ""}`}
              onClick={() => setActiveTab("jobs")}
            >
              <FaBriefcase /> Job Openings ({activeJobs.length})
            </button>
            {hasActiveInternships && (
              <button
                className={`careers-tab ${activeTab === "internships" ? "active" : ""}`}
                onClick={() => setActiveTab("internships")}
              >
                <FaGraduationCap /> Internships ({internships.length})
              </button>
            )}
          </div>

          {error && (
            <div className="careers-error">
              <p>{error}</p>
              <button onClick={fetchJobs} className="careers-retry-btn">Try Again</button>
            </div>
          )}

          {/* Jobs Grid */}
          {activeTab === "jobs" && !error && (
            <div className="careers-roles-grid">
              {loading ? (
                <div className="careers-loading careers-loading--inline">
                  <div className="loader-spinner"></div>
                  <p>Loading opportunities...</p>
                </div>
              ) : activeJobs.length === 0 ? (
                <div className="careers-no-jobs">
                  <p>No active positions at the moment. Check back soon!</p>
                </div>
              ) : (
                activeJobs.map((job, index) => (
                  <div key={job.id || index} className="careers-role-card">
                    <div className="careers-role-icon"><FaBriefcase /></div>
                    <h3>{job.title}</h3>
                    <div className="careers-role-details">
                      <span><FaMapMarkerAlt /> {job.location}</span>
                      <span><FaClock /> {job.type}</span>
                    </div>
                    <button
                      className="careers-view-btn"
                      onClick={() => toggleJobDescription(job.id)}
                    >
                      {expandedJob === job.id ? <FaMinus /> : <FaPlus />}
                      {expandedJob === job.id ? " Hide Description" : " View Description"}
                    </button>
                    {expandedJob === job.id && (
                      <div className="careers-role-full-description">
                        <p className="careers-role-description">{job.description}</p>
                        {job.responsibilities && (
                          <div className="careers-role-requirements">
                            <strong>Key Responsibilities:</strong>
                            <ul>
                              {job.responsibilities.map((resp, i) => (
                                <li key={i}><FaCheck /> {resp}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {job.requirements && (
                          <div className="careers-role-requirements">
                            <strong>Requirements:</strong>
                            <ul>
                              {job.requirements.map((req, i) => (
                                <li key={i}><FaCheck /> {req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    <button
                      className="careers-apply-btn"
                      onClick={() => handleApplyClick(job.title)}
                    >
                      Apply Now <FaArrowRight />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Internships Grid */}
          {activeTab === "internships" && hasActiveInternships && !error && (
            <div className="careers-roles-grid">
              {internships.map((intern, index) => (
                <div key={intern.id || index} className="careers-role-card">
                  <div className="careers-role-icon"><FaGraduationCap /></div>
                  <h3>{intern.title}</h3>
                  <div className="careers-role-details">
                    <span><FaMapMarkerAlt /> {intern.location}</span>
                    <span><FaClock /> {intern.duration || "3-6 months"}</span>
                  </div>
                  <button className="careers-apply-btn" onClick={() => handleApplyClick(intern.title)}>
                    Apply Now <FaArrowRight />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "internships" && !hasActiveInternships && !error && (
            <div className="careers-no-jobs">
              <p>No active internship positions at the moment. Please check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="careers-how-to-apply">
        <div className="careers-container">
          <div className="careers-section-header">
            <span className="careers-section-tag">How to Apply</span>
            <h2 className="careers-section-title">From <span className="careers-highlight">Application</span> to Offer</h2>
          </div>
          <p className="careers-prose">
            [Placeholder: confirm this matches your actual hiring process — number of interview
            rounds, whether there's a paid test project, typical turnaround time end-to-end.]
          </p>
          <ol className="careers-apply-steps">
            <li>
              <strong>Apply online.</strong> Pick an open role above and submit your resume and a short
              note on why you're interested — no cover letter template required, just be specific.
            </li>
            <li>
              <strong>Initial screen.</strong> [Placeholder: e.g. "A 20-30 minute call with our hiring
              team to talk through your background and the role."]
            </li>
            <li>
              <strong>Technical / portfolio review.</strong> [Placeholder: describe what this actually
              involves — a live coding session, a take-home task, a portfolio walkthrough, etc.]
            </li>
            <li>
              <strong>Final interview.</strong> [Placeholder: who's involved — e.g. team lead, founder
              — and what gets discussed.]
            </li>
            <li>
              <strong>Offer.</strong> [Placeholder: typical timeline from final interview to offer, e.g.
              "within a week."]
            </li>
          </ol>
          <p className="careers-prose">
            Don't see an open role that fits? Email your resume to{" "}
            <button onClick={handleEmailClick} className="careers-inline-link">careers@qodexaa.com</button>{" "}
            anyway — we keep strong applications on file for when a matching role opens up.
          </p>
        </div>
      </section>

      {/* Application Form Section */}
      {showForm && (
        <section id="application-form" className="careers-form-section" ref={formRef}>
          <div className="careers-container">
            <div className="careers-form-header">
              <span className="careers-section-tag">Apply Now</span>
              <h2 className="careers-section-title">
                {activeTab === "jobs" ? "Job Application" : "Internship Application"}
              </h2>
              <p className="careers-section-subtitle">Applying for: <strong>{selectedRole}</strong></p>
            </div>

            {success && (
              <div className="careers-alert careers-alert--success">
                <FaCheckCircle />
                <span>{success}</span>
              </div>
            )}

            <form className="careers-form" onSubmit={handleSubmit}>
              <div className="careers-form-group full-width">
                <label>Cover Letter / Why do you want to join Qodexaa? <span className="careers-required">*</span></label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell us about yourself, your skills, and why you're interested in this position..."
                  rows={5}
                  required
                />
              </div>

              <div className="careers-form-divider">
                <span>Personal Information</span>
              </div>

              <div className="careers-form-row">
                <div className="careers-form-group">
                  <label>Full Name <span className="careers-required">*</span></label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="careers-form-group">
                  <label>Email Address <span className="careers-required">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="careers-form-row">
                <div className="careers-form-group">
                  <label>Phone Number <span className="careers-required">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    required
                  />
                </div>
                <div className="careers-form-group">
                  <label>Years of Experience</label>
                  <select name="experience" value={formData.experience} onChange={handleChange}>
                    <option value="">Select experience</option>
                    <option>Fresh Graduate</option>
                    <option>1-2 years</option>
                    <option>3-5 years</option>
                    <option>6-8 years</option>
                    <option>9+ years</option>
                  </select>
                </div>
              </div>

              <div className="careers-form-row">
                <div className="careers-form-group">
                  <label>Portfolio / GitHub (optional)</label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                <div className="careers-form-group">
                  <label>LinkedIn Profile (optional)</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              <div className="careers-form-group">
                <label>Upload Resume/CV <span className="careers-required">*</span></label>
                <div className="careers-file-upload">
                  <input
                    type="file"
                    id="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <label htmlFor="resume" className="careers-file-label">
                    <FaUpload /> {resumeName || "Click to upload resume (PDF, DOC, DOCX)"}
                  </label>
                </div>
              </div>

              <button type="submit" className="careers-submit-btn" disabled={sending}>
                {sending ? <><FaSpinner className="careers-spinner" /> Submitting...</> : <><FaPaperPlane /> Submit Application</>}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Career Growth Section */}
      <section className="careers-growth">
        <div className="careers-container">
          <div className="careers-section-header">
            <span className="careers-section-tag">Career Growth</span>
            <h2 className="careers-section-title">Your <span className="careers-highlight">Path</span> Forward</h2>
            <p className="careers-section-subtitle">Clear progression tracks for every role</p>
          </div>
          <div className="careers-growth-grid">
            <div className="careers-growth-card">
              <div className="careers-growth-level">Junior</div>
              <div className="careers-growth-years">0-2 years</div>
              <p>Learn and grow with mentorship from senior developers</p>
            </div>
            <div className="careers-growth-card">
              <div className="careers-growth-level">Mid-Level</div>
              <div className="careers-growth-years">2-4 years</div>
              <p>Lead features independently and mentor junior team members</p>
            </div>
            <div className="careers-growth-card">
              <div className="careers-growth-level">Senior</div>
              <div className="careers-growth-years">4-6 years</div>
              <p>Architect solutions and guide technical decisions</p>
            </div>
            <div className="careers-growth-card">
              <div className="careers-growth-level">Lead/Manager</div>
              <div className="careers-growth-years">6+ years</div>
              <p>Strategic leadership and team management responsibilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="careers-contact">
        <div className="careers-container">
          <div className="careers-contact-card">
            <FaEnvelope className="careers-contact-icon" />
            <h3>Have Questions?</h3>
            <p>Our HR team is here to help with any questions about careers at Qodexaa</p>
            <button onClick={handleEmailClick} className="careers-contact-email">
              careers@qodexaa.com
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;