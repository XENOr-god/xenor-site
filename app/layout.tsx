import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import HeroCanvas from '@/components/ui/HeroCanvas';

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
  title: 'XENØr Protocol',
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
        url: 'https://www.xenor.xyz/assets/images/url.png',
        width: 1200,
        height: 630,
        alt: 'XENØr Protocol',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XENØr Protocol',
    description: 'Deterministic infrastructure for verifiable on-chain execution on Solana.',
    images: ['https://www.xenor.xyz/assets/images/og-hero.png'],
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
        {/* Global Background */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
          {/* Ambient Gold Bloom */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/[0.05] blur-[150px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.02] blur-[150px] rounded-full" />

          {/* Animated Background GIF */}
          <div 
            className="absolute inset-0 opacity-40 mix-blend-screen"
            style={{ 
              backgroundImage: "url('/assets/images/background.gif')", 
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            }} 
          />

          {/* Global Hero Canvas Animation (if still desired) */}
          <div className="absolute inset-0 opacity-60">
            <HeroCanvas />
          </div>

          {/* Overlay gradients to blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black opacity-90" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(255,215,0,0.08),transparent_70%)]" />

          {/* Dark Vintage Vignette (gelap di pinggir) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

          {/* Film Grain / Noise Effect */}
          <div className="absolute inset-0 noise-overlay opacity-[0.15] mix-blend-overlay pointer-events-none" />

          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-[0.03] grid-bg pointer-events-none" />
        </div>
        {children}
      </body>
    </html>
  );
}
