"use client"

import { useState } from "react"

export default function Header() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleContactClick = () => {
    setIsContactModalOpen(true)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-6 backdrop-blur-sm bg-black/20">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/images/design-mode/Logo%20white(1).png" alt="KonektAI" className="h-12 w-auto" />
        <img src="/images/design-mode/Logo%20Text(1).png" alt="KonektAI Text" className="w-auto font-medium h-12" />
      </div>

      <div className="flex-1" />

      <nav className="hidden md:flex items-center space-x-2">
        <a
          href="#leistungen"
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Leistungen
        </a>
        <button
          onClick={handleContactClick}
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          Kontakt
        </button>
      </nav>

      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span className="w-6 h-0.5 bg-white/80 transition-all duration-300" />
        <span className="w-6 h-0.5 bg-white/80 transition-all duration-300" />
        <span className="w-6 h-0.5 bg-white/80 transition-all duration-300" />
      </button>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col p-6 space-y-4">
            <a
              href="#leistungen"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/80 hover:text-white text-sm font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Leistungen
            </a>
            <button
              onClick={handleContactClick}
              className="text-white/80 hover:text-white text-sm font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer text-left"
            >
              Kontakt
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
