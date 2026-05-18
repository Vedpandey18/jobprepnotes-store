import type { Metadata } from "next";
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
} from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description:
    "Refund policy for digital PDF purchases at JobPrepNotes — India, IST, INR.",
};

export default function RefundPage() {
  return (
    <LegalPageLayout
      title="Return & Refund Policy"
      description="Applies to digital products (PDF ebooks) sold by JobPrepNotes. Prices are in Indian Rupees (INR, ₹)."
    >
      <LegalSection title="Nature of our products">
        <p>
          JobPrepNotes sells <strong>digital goods</strong> (PDF interview
          preparation notes). After successful payment, delivery is typically{" "}
          <strong>instant or near-instant</strong> via download link or email.
          Because the product is intangible and immediately accessible, standard
          “return” rules for physical goods do not apply in the same way.
        </p>
      </LegalSection>

      <LegalSection title="General rule — no refund after successful delivery">
        <p>
          Due to the nature of digital content,{" "}
          <strong>
            all sales are final once the Product has been successfully
            delivered or made available for download
          </strong>
          , except where a limited exception below applies or where mandatory
          consumer law requires otherwise.
        </p>
        <p>
          By completing your purchase, you acknowledge that you lose the right
          of withdrawal for digital content in many cases once delivery has
          begun—consistent with applicable rules for digital products—unless an
          exception applies.
        </p>
      </LegalSection>

      <LegalSection title="Exceptions we honour">
        <p>We may issue a refund or correction in situations such as:</p>
        <LegalList
          items={[
            "Payment failure or duplicate charge for the same order — we will investigate and, if confirmed, refund the duplicate or failed transaction amount in INR to the original payment method where possible.",
            "Technical failure on our side that prevents you from accessing a Product you paid for — we will first attempt to restore access; if that is not possible within a reasonable time, we may offer a refund at our discretion.",
            "Clear evidence that you were charged incorrectly for a Product you did not intend to purchase, subject to verification.",
          ]}
        />
      </LegalSection>

      <LegalSection title="What we do not refund">
        <p>Refunds are generally not provided for:</p>
        <LegalList
          items={[
            "Change of mind after purchase.",
            "Compatibility issues with your device or software (please ensure you can open PDF files).",
            "Dissatisfaction with content where the Product matches its description on our site.",
            "Sharing or loss of download links due to factors outside our reasonable control after delivery.",
          ]}
        />
      </LegalSection>

      <LegalSection title="How to request help">
        <p>
          If you believe you qualify for an exception, contact{" "}
          <a
            href="mailto:support@jobprepnotes.com"
            className="font-medium text-violet-600 hover:underline dark:text-violet-400"
          >
            support@jobprepnotes.com
          </a>{" "}
          with your order reference, payment details (transaction ID / UPI ref
          where applicable), and a short description of the issue. We aim to
          respond within a reasonable time.
        </p>
      </LegalSection>

      <LegalSection title="Chargebacks">
        <p>
          Please contact us before initiating a chargeback or payment dispute so
          we can resolve the matter. Unfounded chargebacks may result in
          restriction of future purchases.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:support@jobprepnotes.com"
            className="font-medium text-violet-600 hover:underline dark:text-violet-400"
          >
            support@jobprepnotes.com
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
