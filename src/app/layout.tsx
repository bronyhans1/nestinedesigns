import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import BackToTop from '@/components/layout/BackToTop';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: "Nestine Designs",
  description: "Fashion design training and professional tailoring services.",

  openGraph: {
    title: "Nestine Designs | Luxury Fashion House",
    description: "Fashion design training and professional tailoring services. Join Nestine Designs Fashion Training Institute.",
    url: "https://nestinedesigns.com",
    siteName: "Nestine Designs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nestine Designs",
    description: "Fashion training and design services.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased min-h-screen bg-background text-foreground font-sans`}
      >
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
