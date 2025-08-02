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

export const metadata: Metadata = {
  title: "Divy Parekh",
  description: "In and out about Divy Parekh",
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
        {children}
      </body>
    </html>
  );
}
