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
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 brightness-[0.25] sm:brightness-[0.3] md:blur-[4px] will-change-transform hidden md:block"
            style={{ backgroundImage: "url('/assets/images/background.gif')" }}
          />
          {/* Performant Background for Mobile / Static Layer for Desktop */}
          <div className="absolute inset-0 bg-bg-base md:bg-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
          
          {/* Subtle Mobile Grid to keep the aesthetic without the heavy GIF */}
          <div className="absolute inset-0 grid-bg opacity-[0.03] md:hidden" />
        </div>
        {children}
      </body>
    </html>
  );
}
