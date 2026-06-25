import React, { useState, useEffect } from 'react';
import {
  FaLightbulb,
  FaPencilAlt,
  FaCode,
  FaRocket,
  FaChartLine,
  FaCheck,
  FaPlay,
  FaPause,
  FaSearch,
  FaCogs,
  FaCloudUploadAlt
} from 'react-icons/fa';
import './style/process.css';

const ProcessFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    {
      id: 1,
      icon: <FaSearch />,
      title: "DISCOVER",
      description: "Deep dive into your vision, goals, and market opportunities.",
      color: "#2563eb"
    },
    {
      id: 2,
      icon: <FaPencilAlt />,
      title: "DESIGN",
      description: "Crafting intuitive interfaces that users love and remember.",
      color: "#2563eb"
    },
    {
      id: 3,
      icon: <FaCode />,
      title: "DEVELOP",
      description: "Building robust, scalable solutions with clean code.",
      color: "#2563eb"
    },
    {
      id: 4,
      icon: <FaCogs />,
      title: "TEST & OPTIMIZE",
      description: "Rigorous testing and performance optimization.",
      color: "#2563eb"
    },
    {
      id: 5,
      icon: <FaCloudUploadAlt />,
      title: "DEPLOY & GROW",
      description: "Seamless launch and continuous growth support.",
      color: "#2563eb"
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const goToStep = (index) => setActiveStep(index);
  const progressWidth = ((activeStep + 1) / steps.length) * 100;

  return (
    <section className="process-minimal">
      <div className="process-check-grid"></div>

      <div className="process-content">
        <div className="process-header">
          <span className="process-badge">How We Work</span>
          <h2 className="process-title">
            Our <span className="highlight">Creative</span> Process
          </h2>
          <p className="process-subtitle">
            From idea to impact — a streamlined approach that turns your vision into powerful digital experiences
          </p>
        </div>

        <div className="horizontal-steps">
          <div className="progress-line"></div>
          <div className="progress-fill" style={{ width: `${progressWidth}%` }}></div>

          <div className="steps-container">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`step-card ${activeStep === index ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
                onClick={() => goToStep(index)}
              >
                <div
                  className="step-indicator"
                  style={{
                    backgroundColor: index < activeStep ? step.color : '#ffffff',
                    color: index < activeStep ? '#ffffff' : step.color,
                    border: index === activeStep ? `2px solid ${step.color}` : '2px solid rgba(37, 99, 235, 0.2)'
                  }}
                >
                  <div className="step-number">{index + 1}</div>
                  {index < activeStep ? (
                    <FaCheck className="completed-check" />
                  ) : (
                    step.icon
                  )}
                </div>

                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="process-controls">
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <div className="step-info">
            Step {activeStep + 1} of {steps.length}
          </div>
        </div>

        <div className="nav-dots">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`dot ${activeStep === index ? 'active' : ''}`}
              onClick={() => goToStep(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;