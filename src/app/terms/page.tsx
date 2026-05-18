import type { Metadata } from "next";
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
} from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms of use for JobPrepNotes — digital interview prep PDFs (India, INR, Kolkata jurisdiction).",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms and Conditions"
      description="Last updated for customers in India. Prices are in Indian Rupees (INR, ₹) unless stated otherwise."
    >
      <LegalSection title="Introduction">
        <p>
          Welcome to JobPrepNotes (“we”, “us”, “our”), operated as an online
          platform offering digital products—primarily interview preparation
          materials in PDF format (“Products”, “ebooks”, “notes”). By accessing
          or using our website and purchasing Products, you (“you”, “user”)
          agree to these Terms and Conditions (“Terms”). If you do not agree,
          please do not use our services.
        </p>
      </LegalSection>

      <LegalSection title="Use of website">
        <p>
          You may use our website for lawful purposes only. You agree not to:
        </p>
        <LegalList
          items={[
            "Attempt to gain unauthorised access to our systems, accounts, or data.",
            "Use automated means to scrape, overload, or interfere with the site without permission.",
            "Misrepresent your identity or affiliation when contacting us or completing a purchase.",
            "Use the site in any way that violates applicable laws in India or your local jurisdiction.",
          ]}
        />
        <p>
          We may suspend or restrict access where we reasonably believe these
          Terms have been breached.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          All content made available through JobPrepNotes—including but not
          limited to PDFs, text, graphics, branding, and layout—is owned by us
          or our licensors and is protected by copyright and other intellectual
          property laws.
        </p>
        <p>
          When you purchase a Product, we grant you a personal, non-exclusive,
          non-transferable licence to download and use that Product for your
          own preparation and study. You may not:
        </p>
        <LegalList
          items={[
            "Copy, share, resell, redistribute, or publicly distribute the files or substantial excerpts.",
            "Remove watermarks, copyright notices, or other proprietary markings.",
            "Use our materials to build competing products or training programmes without written consent.",
          ]}
        />
        <p>
          Breach of these restrictions may result in termination of access and
          legal remedies available under Indian law.
        </p>
      </LegalSection>

      <LegalSection title="User responsibilities">
        <p>You are responsible for:</p>
        <LegalList
          items={[
            "Providing accurate information at checkout (e.g. email for delivery).",
            "Maintaining the confidentiality of your account credentials if account features are offered.",
            "Ensuring you have suitable devices and software to open PDF files.",
            "Compliance with applicable laws when using our Products.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Orders, pricing, and payment">
        <p>
          Product descriptions and prices (in INR, ₹) are displayed on the
          site. By placing an order, you offer to purchase the selected
          Product(s) at the listed price.
        </p>
        <p>
          Payment is processed through third-party payment providers (such as
          Razorpay or other gateways we enable). We do not store your full card
          or UPI credentials on our servers; such data is handled by the
          payment processor subject to their terms and security practices.
        </p>
        <p>
          Purchases are generally <strong>one-time payments</strong> for
          digital access to the purchased Product(s), unless we clearly state
          otherwise (e.g. bundles or subscriptions). Taxes, if applicable, will be
          collected or displayed as required by law.
        </p>
      </LegalSection>

      <LegalSection title="Delivery">
        <p>
          Digital Products are typically delivered by download link or email
          shortly after successful payment. Delivery timelines may depend on
          payment confirmation and technical factors; we aim to minimise delays.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer of warranties">
        <p>
          Our website and Products are provided on an “as is” and “as
          available” basis to the maximum extent permitted by law. We do not
          warrant uninterrupted or error-free operation of the site or that
          every file will meet every user’s expectations.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by applicable law in India, JobPrepNotes
          and its operators shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages, or for loss of profits,
          data, or goodwill, arising from your use of the site or Products.
        </p>
        <p>
          Where liability cannot be excluded, our total aggregate liability
          arising out of or relating to these Terms or your purchase shall not
          exceed the amount you paid to us for the specific Product giving rise
          to the claim in the twelve (12) months preceding the event (unless a
          higher minimum applies under mandatory law).
        </p>
      </LegalSection>

      <LegalSection title="Indemnity">
        <p>
          You agree to indemnify and hold harmless JobPrepNotes from claims,
          damages, or expenses (including reasonable legal fees) arising from
          your misuse of the site, breach of these Terms, or infringement of
          third-party rights—except to the extent caused by our gross negligence
          or wilful misconduct.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these Terms from time to time. The updated version will
          be posted on this page with a revised “last updated” indication where
          applicable. Continued use of the site after changes constitutes
          acceptance of the updated Terms.
        </p>
      </LegalSection>

      <LegalSection title="Governing law and jurisdiction">
        <p>
          These Terms are governed by the laws of <strong>India</strong>,
          without regard to conflict-of-law principles that would require
          another jurisdiction’s laws to apply.
        </p>
        <p>
          Subject to mandatory provisions of Indian law, courts at{" "}
          <strong>Kolkata, West Bengal</strong>, shall have exclusive
          jurisdiction over any disputes arising out of or relating to these
          Terms or your use of JobPrepNotes.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For questions about these Terms, contact us at{" "}
          <a
            href="mailto:support@jobprepnotes.com"
            className="font-medium text-violet-600 hover:underline dark:text-violet-400"
          >
            support@jobprepnotes.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
