"use client"

export default function HeroContent() {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left">
        

        {/* Main Heading */}
        <h1 className="text-5xl md:leading-16 tracking-tight font-light text-white mb-4 ml-0 md:text-5xl">
          <span className="font-medium italic instrument leading-3">KI Integration für KMU`s    </span> 
          <br />
          <span className="font-light tracking-tight text-white">We Konekt you!    </span>
        </h1>

        {/* Description */}
        <p className="font-light text-white/70 mb-4 leading-relaxed text-sm">
          {"Wir verbinden Unternehmen mit intelligenter Technologie.\nDurch nahtlose KI-Integration automatisieren wir Prozesse, optimieren Kommunikation und schaffen neue Effizienz – präzise, sicher und auf Ihre Ziele abgestimmt."}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap">
          <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
            Kontakt
          </button>
          <button className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
            Socials
          </button>
        </div>
      </div>
    </main>
  )
}
