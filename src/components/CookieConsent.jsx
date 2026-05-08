import React, { useState } from 'react';
import { FaCookie, FaCheck, FaTimes, FaCog } from 'react-icons/fa';
import './style/CookieConsent.css';

const CookieConsent = ({
  show,
  onAcceptAll,
  onRejectAll,
  onSavePreferences,
  preferences
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [localPreferences, setLocalPreferences] = useState(preferences);

  if (!show) return null;

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return;
    setLocalPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSavePreferences = () => {
    onSavePreferences(localPreferences);
    setShowDetails(false);
  };

  return (
    <div className="cookie-consent-bar">
      <div className="cookie-consent-container">
        {!showDetails ? (
          // Simple View
          <div className="cookie-simple">
            <div className="cookie-message">
              <FaCookie className="cookie-icon-simple" />
              <p>We use cookies to enhance your browsing experience,<br/>
                improve website performance, and deliver better services.</p>
            </div>
            <div className="cookie-actions">
              <button className="cookie-btn cookie-btn-outline" onClick={onRejectAll}>
                <FaTimes /> Decline
              </button>
              <button className="cookie-btn cookie-btn-secondary" onClick={() => setShowDetails(true)}>
                <FaCog /> Settings
              </button>
              <button className="cookie-btn cookie-btn-primary" onClick={onAcceptAll}>
                <FaCheck /> Accept
              </button>
            </div>
          </div>
        ) : (
          // Detailed Settings View
          <div className="cookie-details">
            <div className="cookie-details-header">
              <FaCookie className="cookie-icon-details" />
              <h3>Cookie Preferences</h3>
              <button className="cookie-close" onClick={() => setShowDetails(false)}>×</button>
            </div>

            <div className="cookie-options">
              <div className="cookie-option">
                <div className="cookie-option-info">
                  <span className="cookie-option-name">Necessary Cookies</span>
                  <span className="cookie-option-desc">Required for basic site functionality</span>
                </div>
                <span className="cookie-badge always-active">Always Active</span>
              </div>

              <div className="cookie-option">
                <div className="cookie-option-info">
                  <span className="cookie-option-name">Analytics Cookies</span>
                  <span className="cookie-option-desc">Help us improve our website</span>
                </div>
                <label className="cookie-switch">
                  <input
                    type="checkbox"
                    checked={localPreferences.analytics}
                    onChange={() => handlePreferenceChange('analytics')}
                  />
                  <span className="cookie-slider"></span>
                </label>
              </div>

              <div className="cookie-option">
                <div className="cookie-option-info">
                  <span className="cookie-option-name">Marketing Cookies</span>
                  <span className="cookie-option-desc">Used for targeted advertising</span>
                </div>
                <label className="cookie-switch">
                  <input
                    type="checkbox"
                    checked={localPreferences.marketing}
                    onChange={() => handlePreferenceChange('marketing')}
                  />
                  <span className="cookie-slider"></span>
                </label>
              </div>
            </div>

            <div className="cookie-details-actions">
              <button className="cookie-btn cookie-btn-outline" onClick={onRejectAll}>
                Reject All
              </button>
              <button className="cookie-btn cookie-btn-secondary" onClick={handleSavePreferences}>
                Save Preferences
              </button>
              <button className="cookie-btn cookie-btn-primary" onClick={onAcceptAll}>
                Accept All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;