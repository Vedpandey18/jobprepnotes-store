import type { Metadata } from "next";
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
} from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How JobPrepNotes collects, uses, and protects your data — India (IST), INR.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="This policy describes how JobPrepNotes handles personal information for users in India and others who use our services."
    >
      <LegalSection title="Who we are">
        <p>
          JobPrepNotes sells digital interview preparation materials (PDF ebooks)
          online. This Privacy Policy explains what data we collect, why we
          collect it, and your choices.
        </p>
      </LegalSection>

      <LegalSection title="What data we collect">
        <p>Depending on how you use our site, we may collect:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-violet-500">
          <li>
            <strong>Name</strong> — optional, if you provide it at checkout or
            in contact forms.
          </li>
          <li>
            <strong>Email address</strong> — to send order confirmations,
            download links, receipts, and support-related communication.
          </li>
          <li>
            <strong>Payment-related information</strong> — payments are
            processed by third-party providers (e.g. Razorpay, Stripe, PayPal,
            or other gateways we enable). We typically receive confirmation of
            payment status, transaction references, and limited billing
            metadata—not your full card or UPI PIN, which are handled by the
            payment processor under PCI-DSS and their policies.
          </li>
          <li>
            <strong>Technical data</strong> — such as IP address, browser type,
            device information, and cookies or similar technologies, used for
            security, analytics, and site functionality.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How we use your data">
        <p>We use personal data for purposes including:</p>
        <LegalList
          items={[
            "Processing and fulfilling your orders (including INR pricing and tax treatment where applicable).",
            "Delivering digital Products (e.g. download links or email delivery).",
            "Customer support and responding to your enquiries.",
            "Fraud prevention, security monitoring, and enforcing our Terms.",
            "Improving our website and understanding aggregate usage trends (where analytics tools are used).",
            "Complying with legal obligations under Indian law.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Legal bases (where applicable)">
        <p>
          We process personal data as necessary to perform our contract with you
          (fulfilling orders), based on our legitimate interests (security,
          improvement), and/or to comply with law. Where consent is required for
          specific communications (e.g. marketing), we will ask separately.
        </p>
      </LegalSection>

      <LegalSection title="Third-party services">
        <p>We rely on trusted service providers, including:</p>
        <LegalList
          items={[
            "Payment processors (e.g. Razorpay, Stripe, PayPal, or others) — subject to their privacy policies and terms.",
            "Email delivery and hosting providers.",
            "Analytics or error-monitoring tools, if enabled.",
          ]}
        />
        <p>
          These processors may process data on our behalf under appropriate
          agreements. We do not sell your personal data to third parties for
          their marketing.
        </p>
      </LegalSection>

      <LegalSection title="Data retention and security">
        <p>
          We retain order and account-related information for as long as needed
          to provide services, meet legal, tax, and accounting requirements in
          India, and resolve disputes. Technical logs may be kept for shorter
          periods unless security investigations require longer retention.
        </p>
        <p>
          We implement reasonable technical and organisational measures to
          protect personal data against unauthorised access, loss, or misuse.
          No method of transmission over the Internet is 100% secure; we
          encourage you to use strong passwords and protect your email account.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Subject to applicable law (including the Digital Personal Data
          Protection Act, 2023, where it applies), you may have rights to:
        </p>
        <LegalList
          items={[
            "Request access to or correction of your personal data.",
            "Request deletion or restriction in certain cases.",
            "Withdraw consent where processing was consent-based.",
            "Lodge a complaint with the Data Protection Board of India or other competent authority, as applicable.",
          ]}
        />
        <p>
          To exercise these rights, contact us using the email below. We may
          need to verify your identity before responding.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          Our services are not directed at children under the age of 18 in a
          manner that collects personal data knowingly without parental consent
          where required. If you believe we have collected such data, please
          contact us so we can delete it.
        </p>
      </LegalSection>

      <LegalSection title="International transfers">
        <p>
          Our operations are focused on India. If data is processed outside
          India (e.g. by a global payment or cloud provider), we take steps
          consistent with applicable law and contractual safeguards.
        </p>
      </LegalSection>

      <LegalSection title="Updates to this policy">
        <p>
          We may update this Privacy Policy from time to time. The revised
          version will be posted on this page. Material changes may be
          communicated by email or a notice on the site where appropriate.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For privacy-related requests or questions, email{" "}
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
