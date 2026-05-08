import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Layout from "./layout";
import Home from "./components/home";
import Stats from "./components/Stats";
import LogoStrip from "./components/LogoStrip";
import Services from "./components/services";
// import ServiceDetail from "./components/serviceDetail";
import Blog from "./components/blog";
import BlogDetail from "./components/BlogDetail";
import About from "./components/About";
import ContactSection from "./components/ContactSection";
import ContactPage from "./components/ContactPage";
import FAQ from "./components/FAQ";

// Service Components (7 new components for header dropdown)
import WebDevelopment from "./components/services/WebDevelopment";
import CustomSoftware from "./components/services/custome";
import SaaSDevelopment from "./components/services/SaaSDevelopment";
import GenerativeAI from "./components/services/GenerativeAI";
import UIUXDesign from "./components/services/UIUXDesign";
import Ecommerce from "./components/services/Ecommerce";
import BrandIdentity from "./components/services/BrandIdentity";

import "./App.css";
import Hero from "./components/hero";
import ProcessFlow from "./components/process";
import StatsSection from "./components/numbers";
import FeaturedInsights from "./components/FeaturedInsights";
import SAP from "./components/SAP";
import AboutSnippet from "./components/aboutsection";
import Reviews from "./components/reviews";
import TermsPage from "./components/TermsPage";
import PrivacyPage from "./components/PrivacyPage";
import Careers from "./components/Careers";
import ServiceDetail from "./components/ServiceDetail";
import ServicesPage from "./components/ServicesPage";

// Cookie Consent
import { useCookieConsent } from "./hooks/useCookieConsent";
import CookieConsent from "./components/CookieConsent";

/* Scroll Top on Route Change */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* HOME PAGE */
function HomePage() {
  return (
    <Layout>
      <div id="home"><Hero /></div>
      <AboutSnippet />
      <div id="services"><Services /></div>
      <FeaturedInsights />
      {/* <Stats /> */}
      <ProcessFlow />
      <LogoStrip />
      <StatsSection />
      <div id="contact"><ContactSection /></div>
      <FAQ />
    </Layout>
  );
}

/* MAIN APP */
function App() {
  const {
    showBanner,
    preferences,
    acceptAll,
    rejectAll,
    savePreferences
  } = useCookieConsent();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Existing routes - DO NOT DISTURB */}
        <Route path="/services/:slug" element={<Layout><ServiceDetail /><FAQ /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /><FAQ /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /><FAQ /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><BlogDetail /><FAQ /></Layout>} />
        <Route path="/about" element={<Layout><About /><FAQ /></Layout>} />
        <Route path="/sap" element={<Layout><SAP /><FAQ /></Layout>} />
        <Route path="/reviews" element={<Layout><Reviews /><FAQ /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /><FAQ /></Layout>} />
        <Route path="/projects" element={<HomePage />} />
        <Route path="/Careers" element={<Layout><Careers /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
        <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
        {/* New Service Routes - Direct Paths for Header Dropdown */}
        <Route path="/services/custom-software" element={<Layout><CustomSoftware /></Layout>} />
        <Route path="/services/ecommerce" element={<Layout><Ecommerce /></Layout>} />
        <Route path="/services/web-development" element={<Layout><WebDevelopment /></Layout>} />
        <Route path="/services/saas-development" element={<Layout><SaaSDevelopment /></Layout>} />
        <Route path="/services/generative-ai" element={<Layout><GenerativeAI /></Layout>} />
        <Route path="/services/ui-ux-design" element={<Layout><UIUXDesign /></Layout>} />
        <Route path="/services/brand-identity" element={<Layout><BrandIdentity /></Layout>} />
      </Routes>
      
      {/* Cookie Consent Banner - Shows on all pages */}
      <CookieConsent
        show={showBanner}
        preferences={preferences}
        onAcceptAll={acceptAll}
        onRejectAll={rejectAll}
        onSavePreferences={savePreferences}
      />
    </BrowserRouter>
  );
}

export default App;