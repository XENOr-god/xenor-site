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
  title: 'XENØr Protocol | Deterministic Infrastructure',
  description: 'Deterministic infrastructure for verifiable on-chain execution on Solana.',
  icons: {
    icon: '/assets/images/xenor-icon.png',
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
        {/* Global Blurry Dark GIF Background */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 blur-[4px] brightness-[0.3] will-change-transform"
            style={{ backgroundImage: "url('/assets/images/background.gif')" }}
          />
          {/* Grain/Noise Overlay for texture */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        {children}
      </body>
    </html>
  );
}
