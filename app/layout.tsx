import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "XENØR | Protocol Research Stack",
    template: "%s | XENØR",
  },
  description:
    "XENØR is a protocol research stack focused on deterministic execution, simulation-led validation, and disciplined public release.",
  applicationName: "XENØR",
  keywords: [
    "XENØR",
    "protocol research stack",
    "protocol architecture",
    "simulation-led validation",
    "research-driven engineering",
    "xenor-core",
    "xenor-sim",
    "xenor-site",
  ],
  openGraph: {
    title: "XENØR | Protocol Research Stack",
    description:
      "Deterministic execution, simulation-led validation, and disciplined public release.",
    url: "https://github.com/XENOr-god",
    siteName: "XENØR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XENØR | Protocol Research Stack",
    description:
      "Deterministic execution, simulation-led validation, and disciplined public release.",
    creator: "@Xenorlabs",
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
        className="antialiased"
        style={
          {
            "--font-geist-sans": '"Space Grotesk", sans-serif',
            "--font-geist-mono": '"Space Grotesk", sans-serif',
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
