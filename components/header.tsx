"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Header() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isUeberUnsPage = pathname === "/ueber-uns"

  const handleContactClick = () => {
    const contactSection = document.getElementById("kontakt")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-6 backdrop-blur-sm bg-black/20">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <img src="/images/wir-verstehen-ai-logo.png" alt="Wir Verstehen AI" className="h-8 md:h-12 w-auto opacity-80" />
      </Link>

      <div className="flex-1" />

      {!isUeberUnsPage && (
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
      )}

      {!isUeberUnsPage && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-white/80 transition-all duration-300" />
          <span className="w-6 h-0.5 bg-white/80 transition-all duration-300" />
          <span className="w-6 h-0.5 bg-white/80 transition-all duration-300" />
        </button>
      )}

      <div
        className={`absolute top-full left-0 right-0 bg-black/20 backdrop-blur-sm md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
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
    </header>
  )
}
