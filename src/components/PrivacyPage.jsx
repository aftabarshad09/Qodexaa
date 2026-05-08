import { Link } from "react-router-dom";
import "./style/privacy-terms.css";

const HERO_IMG = "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1920&q=80";

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <section
        className="legal-hero"
        style={{ backgroundImage: `url('${HERO_IMG}')` }}
      >
        <div className="legal-hero__inner">
          <span className="legal-eyebrow">Privacy & Security</span>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-date">Updated: May 2026</p>
        </div>
      </section>

      <div className="legal-content">
        <h2>1. Introduction</h2>
        <p>
          At <strong>QODEXAA</strong>, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how
          we collect, use, store, and protect your data when you visit our
          website, interact with our services, or communicate with our team.
        </p>

        <p>
          By accessing or using our website and services, you agree to the terms
          outlined in this Privacy Policy.
        </p>

        <h2>2. Information We Collect</h2>

        <h3>2.1 Personal Information</h3>
        <p>
          We may collect information you voluntarily provide, including:
        </p>

        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company or business information</li>
          <li>Project requirements and inquiries</li>
        </ul>

        <h3>2.2 Automatically Collected Information</h3>
        <p>
          When you visit our website, we may automatically collect certain
          technical information such as:
        </p>

        <ul>
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device information</li>
          <li>Pages visited and session duration</li>
          <li>Referral source and analytics data</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>
          The information we collect may be used to:
        </p>

        <ul>
          <li>Provide and improve our services</li>
          <li>Respond to inquiries and support requests</li>
          <li>Communicate project updates and proposals</li>
          <li>Improve website performance and user experience</li>
          <li>Send important notices or marketing communications</li>
          <li>Maintain security and prevent fraudulent activity</li>
        </ul>

        <h2>4. Data Protection & Security</h2>
        <p>
          We implement industry-standard security measures to protect your data
          against unauthorized access, disclosure, or misuse. While no system is
          completely secure, we continuously monitor and improve our security
          practices to safeguard your information.
        </p>

        <h2>5. Sharing of Information</h2>
        <p>
          QODEXAA does not sell or rent your personal information to third
          parties.
        </p>

        <p>
          We may share information only when necessary with:
        </p>

        <ul>
          <li>Trusted service providers and hosting partners</li>
          <li>Payment processors and analytics providers</li>
          <li>Legal authorities when required by law</li>
        </ul>

        <h2>6. Cookies & Tracking Technologies</h2>
        <p>
          Our website may use cookies and similar technologies to enhance your
          browsing experience, analyze website traffic, and improve functionality.
        </p>

        <p>
          You can choose to disable cookies through your browser settings,
          although some features of the website may not function properly.
        </p>

        <h2>7. Third-Party Services</h2>
        <p>
          Our website may include links or integrations with third-party
          platforms such as analytics tools, social media platforms, or payment
          gateways. We are not responsible for the privacy practices of these
          external services.
        </p>

        <h2>8. Data Retention</h2>
        <p>
          We retain personal information only for as long as necessary to fulfill
          the purposes outlined in this policy, comply with legal obligations,
          resolve disputes, and enforce agreements.
        </p>

        <h2>9. Your Rights</h2>
        <p>
          Depending on your location and applicable laws, you may have the right
          to:
        </p>

        <ul>
          <li>Request access to your personal data</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent for marketing communications</li>
          <li>Request data portability where applicable</li>
        </ul>

        <p>
          To exercise any of these rights, please contact us using the details
          below.
        </p>

        <h2>10. Children's Privacy</h2>
        <p>
          Our services are not intended for individuals under the age of 16. We
          do not knowingly collect personal information from children.
        </p>

        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in
          legal requirements, technology, or our services. Updated versions will
          be posted on this page with the revised effective date.
        </p>

        <h2>12. Contact Information</h2>
        <p>
          If you have any questions regarding this Privacy Policy or how your
          data is handled, please contact us:
        </p>

        <p>
           <a href="mailto:privacy@qodexaa.com">privacy@qodexaa.com</a><br />
           <strong>QODEXAA</strong><br />
           Pakistan
        </p>

        <p>
          You may also visit our <Link to="/contact">Contact Page</Link> for
          further assistance.
        </p>
      </div>
    </div>
  );
}