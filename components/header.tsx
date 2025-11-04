"use client"

import { useState } from "react"

export default function Header() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const handleContactClick = () => {
    setIsContactModalOpen(true)
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-6 backdrop-blur-sm bg-black/20">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/images/design-mode/Logo%20white(1).png" alt="KonektAI" className="h-12 w-auto" />
        <img
          src="/images/design-mode/Logo%20Text(1).png"
          alt="KonektAI Text"
          className="w-auto font-medium h-12"
        />
      </div>

      <div className="flex-1" />

      <nav className="flex items-center space-x-2">
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
    </header>
  )
}
