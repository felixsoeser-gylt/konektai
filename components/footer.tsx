"use client"

import Link from "next/link"
import { Mail, MapPin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-50 bg-black border-t border-white/10">
      {/* Glass morphism background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(46, 16, 101, 0.2), rgba(59, 7, 100, 0.1), rgba(0, 0, 0, 1))",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Three column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Navigation */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-6">Navigation</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/ueber-uns"
                className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
              >
                <span className="relative">
                  Über uns
                  <span className="absolute inset-0 blur-md bg-violet-400/0 group-hover:bg-violet-400/30 transition-all duration-300 -z-10" />
                </span>
              </Link>
              <Link
                href="/#leistungen"
                className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
              >
                <span className="relative">
                  Leistungen
                  <span className="absolute inset-0 blur-md bg-violet-400/0 group-hover:bg-violet-400/30 transition-all duration-300 -z-10" />
                </span>
              </Link>
              <Link
                href="/#kontakt"
                className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
              >
                <span className="relative">
                  Kontakt
                  <span className="absolute inset-0 blur-md bg-violet-400/0 group-hover:bg-violet-400/30 transition-all duration-300 -z-10" />
                </span>
              </Link>
            </nav>
          </div>

          {/* Column 2: Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-6">Rechtliches</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/impressum"
                className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
              >
                <span className="relative">
                  Impressum
                  <span className="absolute inset-0 blur-md bg-violet-400/0 group-hover:bg-violet-400/30 transition-all duration-300 -z-10" />
                </span>
              </Link>
              <Link
                href="/datenschutz"
                className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
              >
                <span className="relative">
                  Datenschutzerklärung
                  <span className="absolute inset-0 blur-md bg-violet-400/0 group-hover:bg-violet-400/30 transition-all duration-300 -z-10" />
                </span>
              </Link>
              <Link
                href="/agb"
                className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
              >
                <span className="relative">
                  AGB
                  <span className="absolute inset-0 blur-md bg-violet-400/0 group-hover:bg-violet-400/30 transition-all duration-300 -z-10" />
                </span>
              </Link>
            </nav>
          </div>

          {/* Column 3: Social & Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-6">Kontakt & Social</h3>
            <nav className="flex flex-col space-y-3">
              <a
                href="https://www.instagram.com/konektai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group"
              >
                <Instagram className="w-4 h-4" />
                <span className="relative">
                  Instagram
                  <span className="absolute inset-0 blur-md bg-violet-400/0 group-hover:bg-violet-400/30 transition-all duration-300 -z-10" />
                </span>
              </a>
              <a
                href="mailto:soeser@wirverstehen.ai"
                className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group"
              >
                <Mail className="w-4 h-4" />
                <span className="relative">
                  soeser@wirverstehen.ai
                  <span className="absolute inset-0 blur-md bg-violet-400/0 group-hover:bg-violet-400/30 transition-all duration-300 -z-10" />
                </span>
              </a>
              <div className="text-white/80 inline-flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Attnang-Puchheim </span>
              </div>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm">© 2025 WirVerstehenAI – All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
