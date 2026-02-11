import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tip Calculator - Split Bills & Calculate Tips",
  description:
    "Free online tip calculator. Quickly calculate tips by percentage and split bills evenly among friends. Simple, fast, and mobile-friendly.",
  openGraph: {
    title: "Tip Calculator - Split Bills & Calculate Tips",
    description:
      "Free online tip calculator. Calculate tips by percentage and split bills evenly among friends. Simple, fast, and mobile-friendly.",
    url: "https://tip-calculator.vercel.app",
    siteName: "Tip Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tip Calculator - Split Bills & Calculate Tips",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tip Calculator - Split Bills & Calculate Tips",
    description:
      "Free online tip calculator. Calculate tips by percentage and split bills evenly among friends.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://tip-calculator.vercel.app",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Tip Calculator",
              description:
                "Free online tip calculator. Calculate tips by percentage and split bills evenly among friends.",
              url: "https://tip-calculator.vercel.app",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              browserRequirements: "Requires JavaScript",
            }),
          }}
        />
      </body>
    </html>
  );
}
