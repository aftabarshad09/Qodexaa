import { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'Qodexaa_cookie_consent';
const COOKIE_CONSENT_EXPIRY = 365; // days

export const useCookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [hasConsent, setHasConsent] = useState(null);
  const [preferences, setPreferences] = useState({
    necessary: true,  // Always true - cannot be disabled
    analytics: false,
    marketing: false,
    functional: false
  });

  // Check if user has already given consent
  useEffect(() => {
    const checkConsent = () => {
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      
      if (storedConsent) {
        try {
          const consent = JSON.parse(storedConsent);
          const isExpired = Date.now() > consent.expiry;
          
          if (!isExpired) {
            setHasConsent(true);
            setPreferences(consent.preferences);
            setShowBanner(false);
            // Load analytics based on user preferences
            loadAnalyticsByPreference(consent.preferences);
          } else {
            // Consent expired, remove and show banner
            localStorage.removeItem(COOKIE_CONSENT_KEY);
            setShowBanner(true);
            setHasConsent(false);
          }
        } catch (error) {
          console.error('Error parsing cookie consent:', error);
          setShowBanner(true);
        }
      } else {
        setShowBanner(true);
        setHasConsent(false);
      }
    };

    checkConsent();
  }, []);

  // Load analytics based on user preferences
  const loadAnalyticsByPreference = (prefs) => {
    if (prefs.analytics) {
      // You can add Google Analytics here later
      console.log('✅ Analytics cookies enabled');
    }
    if (prefs.marketing) {
      // You can add marketing pixels here later
      console.log('✅ Marketing cookies enabled');
    }
  };

  // Accept all cookies
  const acceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    
    saveConsent(newPreferences);
    setPreferences(newPreferences);
    setHasConsent(true);
    setShowBanner(false);
    loadAnalyticsByPreference(newPreferences);
  };

  // Reject non-essential cookies (accept only necessary)
  const rejectAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    
    saveConsent(newPreferences);
    setPreferences(newPreferences);
    setHasConsent(true);
    setShowBanner(false);
  };

  // Save custom preferences
  const savePreferences = (newPreferences) => {
    saveConsent(newPreferences);
    setPreferences(newPreferences);
    setHasConsent(true);
    setShowBanner(false);
    loadAnalyticsByPreference(newPreferences);
  };

  // Save consent to localStorage with expiry
  const saveConsent = (preferences) => {
    const consentData = {
      preferences: preferences,
      timestamp: Date.now(),
      expiry: Date.now() + (COOKIE_CONSENT_EXPIRY * 24 * 60 * 60 * 1000)
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
  };

  // Reset consent (for testing)
  const resetConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setShowBanner(true);
    setHasConsent(false);
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    });
  };

  return {
    showBanner,
    hasConsent,
    preferences,
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent
  };
};