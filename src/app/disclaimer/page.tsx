import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Educational disclaimer for JobPrepNotes interview prep materials — India.",
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      description="Please read this disclaimer before using JobPrepNotes materials."
    >
      <LegalSection title="Educational purpose">
        <p>
          JobPrepNotes provides interview preparation materials (including PDF
          ebooks and related content) for <strong>educational and informational
          purposes only</strong>. Content is designed to help you study and
          practise technical interview topics; it is not legal, financial, tax,
          or professional career advice tailored to your situation.
        </p>
      </LegalSection>

      <LegalSection title="No guarantee of outcomes">
        <p>
          We do <strong>not</strong> guarantee any specific result, including
          job offers, interview success, salary levels, or performance in
          assessments. Hiring decisions depend on many factors outside our
          control.
        </p>
      </LegalSection>

      <LegalSection title="Accuracy and updates">
        <p>
          We strive to keep materials accurate and relevant, but interview
          formats, technologies, and employer expectations change over time.
          Information may not be complete, error-free, or up to date at the
          moment you read it. You should verify critical facts against official
          documentation, employer requirements, and current best practices.
        </p>
      </LegalSection>

      <LegalSection title="Use at your own risk">
        <p>
          You use JobPrepNotes content <strong>at your own risk</strong>. To
          the maximum extent permitted by law, we are not liable for any loss
          or damage arising from reliance on our materials, including indirect or
          consequential losses. See our Terms and Conditions for further
          limitations.
        </p>
      </LegalSection>

      <LegalSection title="Third-party references">
        <p>
          References to companies, products, certifications, or interview
          processes are for illustration and learning. Trademarks belong to their
          respective owners. We are not endorsed by or affiliated with those
          third parties unless expressly stated.
        </p>
      </LegalSection>

      <LegalSection title="Regulatory note">
        <p>
          Nothing on this site constitutes an offer of employment or a promise
          of placement. JobPrepNotes is a digital products business focused on
          study materials.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about this disclaimer:{" "}
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
