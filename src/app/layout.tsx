import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { ConditionalTopBanner } from "@/components/ConditionalTopBanner";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JobPrepNotes — Interview Prep PDFs & Coding Notes",
    template: "%s | JobPrepNotes",
  },
  description:
    "Structured interview preparation PDFs: coding, system design, and stack-specific notes — instant download after checkout.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    shortcut: ["/icon.png"],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable}`}
      style={{ colorScheme: "light" }}
    >
      <body className="overflow-x-hidden bg-white font-sans text-slate-900 antialiased">
        <CartProvider>
          <Navbar />
          <ConditionalTopBanner />
          {children}
          <ConditionalFooter />
        </CartProvider>
      </body>
    </html>
  );
}
