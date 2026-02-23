/* eslint-disable react/jsx-no-comment-textnodes */
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';
import { Spline_Sans } from 'next/font/google';

// Configure the font loader
const splineSans = Spline_Sans({
  weight: ['300', '400', '500', '600', '700'], // Specify the weights you need
  subsets: ['latin'],
  display: 'swap', // 'swap' ensures the fallback font is used until Spline Sans loads
  variable: '--font-spline-sans', // Optional: if you want to use it with CSS variables
});

export const metadata: Metadata = {
  title: 'Retrovisionários',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${splineSans.variable} font-sans antialiased`}>
        <Header />
        <div className="pt-6">{children}</div>
        <Footer />
      </body>
      <Analytics />
    </html>
  );
}
