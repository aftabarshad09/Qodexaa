import { Link } from "react-router-dom";
import "./style/privacy-terms.css";

const HERO_IMG = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"; // contract signing

export default function TermsPage() {
  return (
    <div className="legal-page">
      <section
        className="legal-hero"
        style={{ backgroundImage: `url('${HERO_IMG}')` }}
      >
        <div className="legal-hero__inner">
          <span className="legal-eyebrow">Legal</span>
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-date">Effective: May 2026</p>
        </div>
      </section>

      <div className="legal-content">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the Qodexaa website ("Site") and any services provided
          by Qodexaa ("Services"), you agree to be bound by these Terms of Service
          ("Terms"). If you do not agree to all the Terms, you may not access the Site
          or use the Services.
        </p>

        <h2>2. Description of Services</h2>
        <p>
          Qodexaa provides digital agency services including web development, custom
          software development, SaaS development, generative AI solutions, UI/UX design,
          e‑commerce solutions, and brand identity consulting. The specific scope,
          deliverables, and timelines for each engagement will be outlined in a separate
          written agreement or Statement of Work (SOW).
        </p>

        <h2>3. User Obligations</h2>
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate, current, and complete information when requested.</li>
          <li>Maintain the security and confidentiality of any account credentials.</li>
          <li>Use the Site and Services only for lawful purposes and in compliance with
            these Terms.</li>
          <li>Not engage in any activity that could damage, disable, or impair the Site
            or interfere with other users' enjoyment.</li>
          <li>Not attempt to gain unauthorised access to any part of the Site, accounts,
            or systems.</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          All content and materials on the Site, including but not limited to text,
          graphics, logos, images, software, and code, are the exclusive property of
          Qodexaa or its licensors and are protected by international copyright,
          trademark, and other intellectual property laws. You may not reproduce,
          distribute, modify, or create derivative works without our express written
          permission.
        </p>
        <p>
          Upon full payment for custom development work, Qodexaa will assign to the
          client the ownership of the custom code and designs created specifically for
          that project, subject to any third‑party components that retain their own
          licences.
        </p>

        <h2>5. Fees & Payment</h2>
        <p>
          Fees for Services are specified in the applicable SOW or invoice. Unless
          otherwise agreed, invoices are payable within 15 days of issuance. Late
          payments may incur interest at the rate of 1.5% per month or the maximum
          permitted by law, whichever is lower. All fees are non‑refundable except as
          expressly stated in the SOW.
        </p>

        <h2>6. Confidentiality</h2>
        <p>
          Both parties agree to keep confidential any proprietary or sensitive
          information disclosed during the course of the engagement ("Confidential
          Information"). This obligation survives termination of the agreement for a
          period of three years.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Qodexaa and its directors, employees,
          and agents shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages, including loss of profits, data, or
          business opportunities, arising out of your use of the Site or Services, even
          if advised of the possibility of such damages. Our total liability for any
          claim arising from the Services shall not exceed the amount paid by you to
          Qodexaa for the specific service giving rise to the claim in the 12 months
          preceding the event.
        </p>

        <h2>8. Warranties & Disclaimers</h2>
        <p>
          The Site and Services are provided "as is" and "as available" without
          warranties of any kind, either express or implied, including but not limited to
          implied warranties of merchantability, fitness for a particular purpose, or
          non‑infringement. Qodexaa does not warrant that the Site will be error‑free,
          secure, or uninterrupted.
        </p>

        <h2>9. Third‑Party Links</h2>
        <p>
          The Site may contain links to third‑party websites or services that are not
          owned or controlled by Qodexaa. We have no control over, and assume no
          responsibility for, the content, privacy policies, or practices of any
          third‑party sites. You access them at your own risk.
        </p>

        <h2>10. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the Site or
          Services at any time, without prior notice, for conduct that we reasonably
          believe violates these Terms or is harmful to us or other users. Upon
          termination, your right to use the Site and Services will immediately cease.
          Provisions that by their nature should survive termination (e.g., intellectual
          property, limitation of liability, governing law) shall survive.
        </p>

        <h2>11. Governing Law & Disputes</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of
          [Your Country/State], without regard to conflict of law principles. Any dispute
          arising out of or relating to these Terms shall be resolved exclusively in the
          courts located in [Your City, Country]. The parties shall first attempt to
          resolve the dispute informally through good‑faith negotiations.
        </p>

        <h2>12. Changes to Terms</h2>
        <p>
          We may modify these Terms from time to time. We will notify you of material
          changes by posting the updated Terms on this page and updating the "Effective"
          date. Your continued use of the Site after such changes constitutes your
          acceptance of the new Terms.
        </p>

        <h2>13. Contact</h2>
        <p>
          Questions about these Terms? Reach out to us at{" "}
          <a href="mailto:legal@qodexaa.com">legal@qodexaa.com</a> or through our{" "}
          <Link to="/contact">Contact page</Link>.
        </p>
      </div>
    </div>
  );
}