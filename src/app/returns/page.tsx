import { redirect } from "next/navigation";

/** @deprecated Use /refund — kept for old links. */
export default function ReturnsRedirectPage() {
  redirect("/refund");
}
