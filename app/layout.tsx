import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-grotesk',
});

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'XENØr Protocol | Deterministic Infrastructure',
  description: 'Deterministic infrastructure for verifiable on-chain execution on Solana.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="bg-bg-base text-text selection:bg-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
