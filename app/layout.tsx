import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Instrument_Serif } from "next/font/google"
import "./globals.css"
import { ErrorBoundary } from "@/components/error-boundary"
import { ErrorSuppressor } from "@/components/error-suppressor"

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "KonektAI – Zukunftssichere KI-Integration für Unternehmen",
  description:
    "KonektAI macht Unternehmen effizienter mit moderner KI-Automatisierung und smarten Strategien für nachhaltigen Erfolg.",
  keywords: [
    "KI-Integration",
    "Künstliche Intelligenz",
    "KI-Automatisierung",
    "Business AI",
    "Prozessoptimierung",
    "KI-Lösungen",
  ],
  authors: [{ name: "KonektAI" }],
  creator: "KonektAI",
  publisher: "KonektAI",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://konektai.com",
    siteName: "KonektAI",
    title: "KonektAI – AI that drives your business forward",
    description:
      "Wir verbinden Intelligenz und Effizienz: KonektAI entwickelt KI-Lösungen, die Prozesse optimieren und Unternehmen zukunftsfähig machen.",
    images: [
      {
        url: "/images/design-mode/Logo%20white(1).png",
        width: 1200,
        height: 630,
        alt: "KonektAI Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KonektAI – AI that drives your business forward",
    description:
      "Wir verbinden Intelligenz und Effizienz: KonektAI entwickelt KI-Lösungen, die Prozesse optimieren und Unternehmen zukunftsfähig machen.",
    images: ["/images/design-mode/Logo%20white(1).png"],
  },
  metadataBase: new URL("https://konektai.com"),
  alternates: {
    canonical: "/",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/_next/static/media/instrument-serif-latin-400-italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style>{`
html {
  font-family: ${figtree.style.fontFamily};
  --font-sans: ${figtree.style.fontFamily};
  --font-mono: ${GeistMono.style.fontFamily};
  --font-instrument-serif: ${instrumentSerif.style.fontFamily};
}
        `}</style>
      </head>
      <body className={`${figtree.variable} ${instrumentSerif.variable}`}>
        <ErrorSuppressor />
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
