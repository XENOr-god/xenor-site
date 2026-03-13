import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/src/components/site-header";
import SiteFooter from "@/src/components/site-footer";

export const metadata: Metadata = {
  title: "XENØr",
  description:
    "Deterministic protocol infrastructure, engineered for verifiable systems.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <div className="site-bg-grid" />
          <div className="site-bg-glow" />
          <div className="site-bg-noise" />
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}