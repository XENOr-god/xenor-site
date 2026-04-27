import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'XENØr Protocol | Deterministic Execution Substrate',
  description: 'Deterministic infrastructure for verifiable on-chain execution on Solana. Built in Rust for absolute order.',
  metadataBase: new URL('https://www.xenor.xyz'),
  icons: {
    icon: '/assets/images/xenor-gold.png',
  },
  openGraph: {
    title: 'XENØr Protocol',
    description: 'Deterministic infrastructure for verifiable on-chain execution on Solana.',
    url: 'https://www.xenor.xyz',
    siteName: 'XENØr Protocol',
    images: [
      {
        url: '/assets/images/og-hero.png',
        width: 1200,
        height: 630,
        alt: 'XENØr Protocol Hero',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XENØr Protocol',
    description: 'Deterministic infrastructure for verifiable on-chain execution on Solana.',
    images: ['/assets/images/og-hero.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="relative min-h-screen bg-bg-base text-text selection:bg-accent/30 selection:text-white font-mono antialiased">
        {/* Optimized Global Background */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
          {/* Subtle static base to replace the heavy blurred GIF */}
          <div className="absolute inset-0 bg-[#050505]" />
          
          {/* Performant static gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a05] to-black opacity-60" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,215,0,0.03),transparent_70%)]" />

          {/* Subtle Grid to keep the technical aesthetic without GPU lag */}
          <div className="absolute inset-0 opacity-[0.03] grid-bg" />
        </div>
        {children}
      </body>
    </html>
  );
}
