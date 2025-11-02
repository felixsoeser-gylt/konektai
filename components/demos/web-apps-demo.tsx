"use client"

import { useState, useEffect, useRef } from "react"

const buildingSteps = [
  { label: "Design-Analyse", icon: "🎨" },
  { label: "UI-Komponenten", icon: "🧩" },
  { label: "Funktionalität", icon: "⚡" },
  { label: "Optimierung", icon: "🚀" },
]

export function WebAppsDemo({ isActive }: { isActive?: boolean }) {
  const [isBuilding, setIsBuilding] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [assemblyPhase, setAssemblyPhase] = useState<
    "idle" | "base" | "nav" | "hero" | "cards" | "rotating" | "complete"
  >("idle")
  const [isThemeActive, setIsThemeActive] = useState(false)
  const mockupRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mockupRef.current) {
        const rect = mockupRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (!isBuilding) return

    const sequence = async () => {
      // Base appears
      setAssemblyPhase("base")
      await new Promise((resolve) => setTimeout(resolve, 150))

      // Nav appears
      setAssemblyPhase("nav")
      setActiveStep(0)
      await new Promise((resolve) => setTimeout(resolve, 150))

      // Hero appears
      setAssemblyPhase("hero")
      setActiveStep(1)
      await new Promise((resolve) => setTimeout(resolve, 150))

      // Cards appear
      setAssemblyPhase("cards")
      setActiveStep(2)
      await new Promise((resolve) => setTimeout(resolve, 150))

      // Start rotation
      setActiveStep(3)
      setAssemblyPhase("rotating")
      setIsThemeActive(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Complete
      setAssemblyPhase("complete")
    }

    sequence()
  }, [isBuilding])

  useEffect(() => {
    if (isActive && !isBuilding) {
      handleStart()
    }
  }, [isActive])

  const handleStart = () => {
    setIsBuilding(true)
    setActiveStep(0)
    setAssemblyPhase("idle")
    setIsThemeActive(false)
  }

  const handleReset = () => {
    setIsBuilding(false)
    setActiveStep(0)
    setAssemblyPhase("idle")
    setIsThemeActive(false)
  }

  const getParallaxOffset = (layer: number) => {
    const offsetX = (mousePosition.x - 0.5) * 20 * layer
    const offsetY = (mousePosition.y - 0.5) * 20 * layer
    return { x: offsetX, y: offsetY }
  }

  const bgOffset = getParallaxOffset(0.5)
  const midOffset = getParallaxOffset(0.7)
  const fgOffset = getParallaxOffset(0.9)

  return (
    <div
      className="border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.4), rgba(168, 85, 247, 0.4))",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
            Websites & Apps{" "}
            <span className="font-medium italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              mit KI gebaut
            </span>
          </h3>
          <p className="text-white/70 text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed">
            Wir entwickeln Websites und Apps, die mit Hilfe von KI entworfen und erstellt werden – schneller,
            individueller und datenbasiert. Vom Design bis zur Funktion – alles automatisiert durch KI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Feature List */}
          <div className="space-y-4 order-2 md:order-1">
            {buildingSteps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 ${
                  isBuilding && i <= activeStep
                    ? "border-violet-500/40 scale-100"
                    : "border-white/20 scale-95 opacity-50"
                }`}
                style={{
                  backgroundColor:
                    isBuilding && i <= activeStep ? "rgba(139, 92, 246, 0.3)" : "rgba(255, 255, 255, 0.2)",
                }}
              >
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-500 ${
                    isBuilding && i <= activeStep
                      ? "bg-gradient-to-br from-violet-500/30 to-purple-500/30 border-2 border-violet-500/50 shadow-lg shadow-violet-500/30"
                      : "bg-white/10 border border-white/10"
                  }`}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{step.label}</div>
                  {isBuilding && i <= activeStep && (
                    <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-in slide-in-from-left duration-1000" />
                    </div>
                  )}
                </div>
                {isBuilding && i <= activeStep && <div className="text-violet-400 text-xl">✓</div>}
              </div>
            ))}
          </div>

          {/* Right Column: 3D Website Mockup */}
          <div className="order-1 md:order-2">
            <div
              ref={mockupRef}
              className="relative mx-auto w-full aspect-[4/5] rounded-2xl overflow-visible"
              style={{
                perspective: "1000px",
                perspectiveOrigin: "center center",
              }}
            >
              <div
                className="relative w-full h-full transition-transform duration-1000 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform:
                    assemblyPhase === "rotating" || assemblyPhase === "complete"
                      ? "rotateY(0deg)"
                      : assemblyPhase === "idle"
                        ? "rotateY(60deg)"
                        : "rotateY(60deg)",
                }}
              >
                {/* Background Layer (deepest) - Shadow/Depth */}
                <div
                  className={`absolute inset-0 rounded-2xl blur-xl transition-all duration-1000 ${
                    assemblyPhase === "base" ||
                    assemblyPhase === "nav" ||
                    assemblyPhase === "hero" ||
                    assemblyPhase === "cards" ||
                    assemblyPhase === "rotating" ||
                    assemblyPhase === "complete"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  } ${isThemeActive ? "from-amber-950/60 to-orange-950/60" : "from-violet-950/60 to-purple-950/60"}`}
                  style={{
                    transform: `translateZ(-60px) translate(${bgOffset.x}px, ${bgOffset.y}px)`,
                  }}
                />

                {/* Main Website Layer */}
                <div
                  className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 ${
                    assemblyPhase === "base" ||
                    assemblyPhase === "nav" ||
                    assemblyPhase === "hero" ||
                    assemblyPhase === "cards" ||
                    assemblyPhase === "rotating" ||
                    assemblyPhase === "complete"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  } ${isThemeActive ? "border-amber-500/30" : "border-violet-500/30"} border`}
                  style={{
                    transform: `translateZ(-30px) translate(${midOffset.x}px, ${midOffset.y}px)`,
                    boxShadow: isThemeActive
                      ? "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(251, 191, 36, 0.2)"
                      : "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.2)",
                  }}
                >
                  {/* Navigation Bar */}
                  <div
                    className={`flex items-center justify-between px-6 py-4 bg-black/60 border-b border-white/10 transition-all duration-500 ${
                      assemblyPhase === "nav" ||
                      assemblyPhase === "hero" ||
                      assemblyPhase === "cards" ||
                      assemblyPhase === "rotating" ||
                      assemblyPhase === "complete"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-8"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-1000 ${
                          isThemeActive
                            ? "bg-gradient-to-br from-amber-500 to-orange-600"
                            : "bg-gradient-to-br from-violet-500 to-purple-600"
                        }`}
                      >
                        <span className="text-white text-lg">{isThemeActive ? "⚡" : "🌐"}</span>
                      </div>
                      <span className="text-white font-semibold text-sm">
                        {isThemeActive ? "ElektroProfi" : "MeinBusiness"}
                      </span>
                    </div>
                    <div className="flex gap-6 text-xs text-white/80">
                      <span className="hover:text-white transition-colors cursor-pointer">Home</span>
                      <span className="hover:text-white transition-colors cursor-pointer">
                        {isThemeActive ? "Leistungen" : "Services"}
                      </span>
                      <span className="hover:text-white transition-colors cursor-pointer">
                        {isThemeActive ? "Notdienst" : "Über uns"}
                      </span>
                      <span className="hover:text-white transition-colors cursor-pointer">Kontakt</span>
                    </div>
                  </div>

                  {/* Hero Section */}
                  <div
                    className={`px-6 py-12 transition-all duration-1000 delay-150 ${
                      assemblyPhase === "hero" ||
                      assemblyPhase === "cards" ||
                      assemblyPhase === "rotating" ||
                      assemblyPhase === "complete"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    } ${isThemeActive ? "bg-gradient-to-b from-amber-950/20 to-transparent" : "bg-gradient-to-b from-violet-950/20 to-transparent"}`}
                  >
                    <div className="text-center max-w-md mx-auto">
                      <h1
                        className={`text-2xl md:text-3xl font-bold text-white mb-3 bg-clip-text text-transparent leading-tight transition-all duration-1000 ${
                          isThemeActive
                            ? "bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300"
                            : "bg-gradient-to-r from-violet-300 via-purple-300 to-violet-300"
                        }`}
                      >
                        {isThemeActive ? "Ihr Elektrofachbetrieb" : "Ihr Business Online"}
                      </h1>
                      <p className="text-white/60 text-xs mb-6 leading-relaxed">
                        {isThemeActive
                          ? "Professionelle Elektroinstallationen, Wartung und 24/7 Notdienst – Ihr zuverlässiger Partner für alle elektrischen Arbeiten"
                          : "Professionelle Lösungen für Ihr Unternehmen – modern, zuverlässig und individuell auf Ihre Bedürfnisse zugeschnitten"}
                      </p>
                      <div className="flex gap-3 justify-center">
                        <button
                          className={`px-5 py-2.5 rounded-full text-white text-xs font-medium shadow-lg transition-all duration-1000 ${
                            isThemeActive
                              ? "bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-500/30 hover:shadow-amber-500/50"
                              : "bg-gradient-to-r from-violet-500 to-purple-600 shadow-violet-500/30 hover:shadow-violet-500/50"
                          }`}
                        >
                          Jetzt anfragen
                        </button>
                        <button className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium hover:bg-white/20 transition-all">
                          {isThemeActive ? "Notdienst: 24/7" : "Mehr erfahren"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Feature Cards Section */}
                  <div
                    className={`px-6 pb-8 transition-all duration-500 delay-300 ${
                      assemblyPhase === "cards" || assemblyPhase === "rotating" || assemblyPhase === "complete"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                  >
                    <div className="grid grid-cols-3 gap-3">
                      {isThemeActive
                        ? [
                            { icon: "🔌", title: "Installation", desc: "Neuanlagen" },
                            { icon: "🔧", title: "Wartung", desc: "Regelmäßig" },
                            { icon: "🚨", title: "Notdienst", desc: "24/7 erreichbar" },
                          ].map((feature, i) => (
                            <div
                              key={i}
                              className="bg-white/15 border border-white/20 rounded-xl p-3 hover:bg-white/20 hover:border-amber-500/30 transition-all duration-1000 group"
                            >
                              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                                {feature.icon}
                              </div>
                              <div className="text-white text-xs font-semibold mb-1">{feature.title}</div>
                              <div className="text-white/50 text-[10px]">{feature.desc}</div>
                            </div>
                          ))
                        : [
                            { icon: "💼", title: "Beratung", desc: "Individuell" },
                            { icon: "🚀", title: "Umsetzung", desc: "Professionell" },
                            { icon: "📈", title: "Wachstum", desc: "Nachhaltig" },
                          ].map((feature, i) => (
                            <div
                              key={i}
                              className="bg-white/15 border border-white/20 rounded-xl p-3 hover:bg-white/20 hover:border-violet-500/30 transition-all duration-1000 group"
                            >
                              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                                {feature.icon}
                              </div>
                              <div className="text-white text-xs font-semibold mb-1">{feature.title}</div>
                              <div className="text-white/50 text-[10px]">{feature.desc}</div>
                            </div>
                          ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 py-3 bg-black/80 border-t border-white/10">
                    <div className="flex items-center justify-between text-[10px] text-white/40">
                      <span>{isThemeActive ? "© 2025 ElektroProfi GmbH" : "© 2025 MeinBusiness GmbH"}</span>
                      <div className="flex gap-4">
                        <span className="hover:text-white/60 transition-colors cursor-pointer">Impressum</span>
                        <span className="hover:text-white/60 transition-colors cursor-pointer">Datenschutz</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Foreground Layer - Edge Glow & Highlights */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-1000"
                  style={{
                    transform: `translateZ(0px) translate(${fgOffset.x}px, ${fgOffset.y}px)`,
                    background: isThemeActive
                      ? "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, transparent 30%, transparent 70%, rgba(249, 115, 22, 0.2) 100%)"
                      : "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, transparent 30%, transparent 70%, rgba(168, 85, 247, 0.2) 100%)",
                    boxShadow: isThemeActive
                      ? "inset 0 0 60px rgba(251, 191, 36, 0.15), 0 0 100px rgba(249, 115, 22, 0.3)"
                      : "inset 0 0 60px rgba(139, 92, 246, 0.15), 0 0 100px rgba(168, 85, 247, 0.3)",
                    border: isThemeActive ? "1px solid rgba(251, 191, 36, 0.3)" : "1px solid rgba(139, 92, 246, 0.3)",
                  }}
                />
              </div>
            </div>

            {/* Explanation Text */}
            <div className="mt-8 text-center">
              <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed mb-4">
                {isThemeActive
                  ? "So könnte die fertige Website für einen Elektrofachbetrieb aussehen – professionell, vertrauenswürdig und vollständig durch KI erstellt. Von der Navigation bis zu den Service-Karten, alles automatisch generiert."
                  : "Sehen Sie, wie KI eine professionelle Website für Ihr Business erstellt – vom Design bis zur Funktionalität, alles automatisch generiert und auf Ihre Branche zugeschnitten."}
              </p>

              {/* Control Buttons */}
              {isBuilding && (
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-normal text-sm transition-all duration-300 hover:bg-white/20"
                  >
                    Zurücksetzen
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          [style*="transform: rotateY"] {
            transform: rotateY(0deg) !important;
          }
        }
      `}</style>
    </div>
  )
}
