import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useEffect } from "react";

import { StatusProvider } from "./context/StatusContext";
import Layout from "./layout";
import Home from "./components/home";
import Stats from "./components/Stats";
import LogoStrip from "./components/LogoStrip";
import Services from "./components/Services";
// import ServiceDetail from "./components/serviceDetail";
import Blog from "./components/Blog";
import BlogDetail from "./components/BlogDetail";
import About from "./components/About";
import ContactSection from "./components/Contactsection";
import ContactPage from "./components/Contactpage";
import FAQ from "./components/Faq";

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
import Chatbot from "./components/Chatbot";

/* Scroll Top on Route Change */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const CANONICAL_ORIGIN = "https://qodexaa.com";

/* Self-referencing canonical for every route. Rendered after <Routes> so
   react-helmet-async's last-wins dedupe on rel="canonical" overrides any
   page-specific canonical <link> rendered inside individual route
   components above, guaranteeing one consistent non-www canonical per
   route without having to touch every page file. */
function CanonicalTag() {
  const { pathname } = useLocation();
  const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

  return (
    <Helmet>
      <link rel="canonical" href={`${CANONICAL_ORIGIN}${path}`} />
    </Helmet>
  );
}

/* HOME PAGE */
function HomePage() {
  return (
    <Layout>
      <Helmet>
        <title>Qodexaa — AI Software, SaaS & Custom Web Development Agency</title>
        <meta name="description"
          content="Qodexaa builds AI-powered CRMs, custom SaaS platforms, eCommerce solutions, and scalable web apps. Transform your business with expert software development. Get a free consultation." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Qodexaa — AI Software, SaaS & Custom Web Development Agency" />
        <meta property="og:description"
          content="Partner with Qodexaa to build AI-powered platforms, scalable SaaS products, and high-converting eCommerce experiences. Trusted by modern businesses." />
        <meta property="og:url" content="https://qodexaa.com/" />
        <meta property="og:image" content="https://qodexaa.com/og-image.png" />
        <meta property="og:site_name" content="Qodexaa" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Qodexaa — AI Software, SaaS & Custom Web Development Agency" />
        <meta name="twitter:description"
          content="Qodexaa builds AI-powered CRMs, custom SaaS platforms, eCommerce solutions, and scalable web apps." />
        <meta name="twitter:image" content="https://qodexaa.com/og-image.png" />
      </Helmet>
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
function App({ statusRef }) {
  const {
    showBanner,
    preferences,
    acceptAll,
    rejectAll,
    savePreferences
  } = useCookieConsent();

  return (
    <StatusProvider value={statusRef || null}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Existing routes - DO NOT DISTURB */}
        <Route path="/services/:slug" element={<Layout><ServiceDetail /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /><FAQ /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /><FAQ /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><BlogDetail /><FAQ /></Layout>} />
        <Route path="/about" element={<Layout><About /><FAQ /></Layout>} />
        <Route path="/sap" element={<Layout><SAP /><FAQ /></Layout>} />
        <Route path="/reviews" element={<Layout><Reviews /><FAQ /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /><FAQ /></Layout>} />
        <Route path="/careers" element={<Layout><Careers /></Layout>} />
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
      <CanonicalTag />

      {/* Cookie Consent Banner - Shows on all pages */}
      <CookieConsent
        show={showBanner}
        preferences={preferences}
        onAcceptAll={acceptAll}
        onRejectAll={rejectAll}
        onSavePreferences={savePreferences}
      />

      {/* AI Chatbot - client-side only, mounts after hydration */}
      <Chatbot />
    </StatusProvider>
  );
}

export default App;