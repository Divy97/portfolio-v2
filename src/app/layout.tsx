import type { Metadata } from "next";
import { Playwrite_HU, Work_Sans } from "next/font/google";
import "./globals.css";

const playwriteHU = Playwrite_HU({
  variable: "--font-playwrite-hu",
  weight: "400",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// Derive site URL from env, fallback to localhost for dev
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Divy Parekh | Software Engineer",
    template: "%s | Divy Parekh",
  },
  description: "Too many side projects and not enough sleep",
  keywords: [
    "Divy Parekh",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "AI",
    "LangChain",
    "Portfolio",
  ],
  applicationName: "Divy Parekh Portfolio",
  authors: [{ name: "Divy Parekh" }],
  creator: "Divy Parekh",
  publisher: "Divy Parekh",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Divy Parekh | Software Engineer",
    description:
      "Too many side projects and not enough sleep",
    siteName: "Divy Parekh Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divy Parekh | Software Engineer",
    description:
      "Too many side projects and not enough sleep",
    creator: "@divy97",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: [
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
        className={`${playwriteHU.variable} ${workSans.variable} antialiased`}
      >
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Divy Parekh",
              url: SITE_URL,
              sameAs: [
                "https://github.com/Divy97",
                "https://www.linkedin.com/in/divyparekh/",
              ],
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Independent",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Divy Parekh Portfolio",
              url: SITE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
