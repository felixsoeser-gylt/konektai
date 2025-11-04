"use client"

import { useRouter } from "next/navigation"

export default function HeroContent() {
  const router = useRouter()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-auto z-20 max-w-lg">
      <div className="text-left">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl md:leading-16 tracking-tight font-light text-white mb-3 sm:mb-4 ml-0">
          <span className="font-medium italic instrument leading-tight sm:leading-3">KI Integration für KMU`s </span>
          <br />
          <span className="font-light tracking-tight text-white">We connect you! </span>
        </h1>

        {/* Description */}
        <p className="font-light text-white/70 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
          {
            "Wir verbinden Unternehmen mit intelligenter Technologie.\nDurch nahtlose KI-Integration automatisieren wir Prozesse, optimieren Kommunikation und schaffen neue Effizienz – präzise, sicher und auf Ihre Ziele abgestimmt."
          }
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <button
            onClick={() => scrollToSection("kontakt")}
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer"
          >
            Kontakt
          </button>
          <button
            onClick={() => router.push("/ueber-uns")}
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer"
          >
            {"Über uns"}
          </button>
        </div>
      </div>
    </main>
  )
}
