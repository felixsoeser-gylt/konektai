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
  const animationTimeoutRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    let rafId: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        if (mockupRef.current) {
          const rect = mockupRef.current.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width
          const y = (e.clientY - rect.top) / rect.height
          setMousePosition({ x, y })
        }
        rafId = null
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    if (!isBuilding) return

    animationTimeoutRef.current.forEach((timeout) => clearTimeout(timeout))
    animationTimeoutRef.current = []

    const sequence = async () => {
      // Base appears
      setAssemblyPhase("base")
      await new Promise((resolve) => {
        const timeout = setTimeout(resolve, 150)
        animationTimeoutRef.current.push(timeout)
      })

      // Nav appears
      setAssemblyPhase("nav")
      setActiveStep(0)
      await new Promise((resolve) => {
        const timeout = setTimeout(resolve, 150)
        animationTimeoutRef.current.push(timeout)
      })

      // Hero appears
      setAssemblyPhase("hero")
      setActiveStep(1)
      await new Promise((resolve) => {
        const timeout = setTimeout(resolve, 150)
        animationTimeoutRef.current.push(timeout)
      })

      // Cards appear
      setAssemblyPhase("cards")
      setActiveStep(2)
      await new Promise((resolve) => {
        const timeout = setTimeout(resolve, 150)
        animationTimeoutRef.current.push(timeout)
      })

      // Start rotation
      setActiveStep(3)
      setAssemblyPhase("rotating")
      setIsThemeActive(true)
      await new Promise((resolve) => {
        const timeout = setTimeout(resolve, 1000)
        animationTimeoutRef.current.push(timeout)
      })

      // Complete
      setAssemblyPhase("complete")
    }

    sequence()

    return () => {
      animationTimeoutRef.current.forEach((timeout) => clearTimeout(timeout))
      animationTimeoutRef.current = []
    }
  }, [isBuilding])

  useEffect(() => {
    if (!isActive) {
      // Clear all ongoing timeouts
      animationTimeoutRef.current.forEach((timeout) => clearTimeout(timeout))
      animationTimeoutRef.current = []

      setIsBuilding(false)
      setActiveStep(0)
      setAssemblyPhase("idle")
      setIsThemeActive(false)
    }
  }, [isActive])

  useEffect(() => {
    if (isActive && !isBuilding && assemblyPhase === "idle") {
      setAssemblyPhase("base")
      setIsBuilding(true)
    }
  }, [isActive, isBuilding, assemblyPhase])

  const handleStart = () => {
    setIsBuilding(true)
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
      className="border border-white/10 rounded-3xl p-4 sm:p-8 md:p-12 relative overflow-hidden"
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
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
            {" "}
            <span className="font-medium italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Websites &amp; Apps
            </span>
          </h3>
          <p className="text-white/70 text-xs sm:text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed px-2">
            Wir entwickeln Websites und Apps, die mit Hilfe von KI entworfen und erstellt werden – schneller,
            individueller und datenbasiert. Vom Design bis zur Funktion – alles automatisiert durch KI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Left Column: Feature List */}
          <div className="space-y-3 md:space-y-4 order-2 md:order-1">
            {buildingSteps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-500 ${
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
                  className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-xl md:text-2xl transition-all duration-500 ${
                    isBuilding && i <= activeStep
                      ? "border-2 border-violet-500/50 shadow-lg shadow-violet-500/30"
                      : "bg-white/10 border border-white/10"
                  }`}
                  style={{
                    background:
                      isBuilding && i <= activeStep
                        ? "linear-gradient(to bottom right, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.3))"
                        : undefined,
                  }}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs md:text-sm font-medium text-white">{step.label}</div>
                  {isBuilding && i <= activeStep && (
                    <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full animate-in slide-in-from-left duration-1000"
                        style={{ background: "linear-gradient(to right, rgb(139, 92, 246), rgb(168, 85, 247))" }}
                      />
                    </div>
                  )}
                </div>
                {isBuilding && i <= activeStep && <div className="text-violet-400 text-lg md:text-xl">✓</div>}
              </div>
            ))}
          </div>

          {/* Right Column: 3D Website Mockup */}
          <div className="order-1 md:order-2">
            <div
              ref={mockupRef}
              className="relative mx-auto w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-visible"
              style={{
                perspective: "1000px",
                perspectiveOrigin: "center center",
              }}
            >
              <div
                className="relative w-full h-full transition-transform duration-1000 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: assemblyPhase === "idle" ? "rotateY(30deg)" : "rotateY(0deg)",
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
                  }`}
                  style={{
                    transform: `translateZ(-30px) translate(${bgOffset.x * 0.5}px, ${bgOffset.y * 0.5}px)`,
                    background: isThemeActive
                      ? "linear-gradient(to bottom right, rgba(120, 53, 15, 0.6), rgba(124, 45, 18, 0.6))"
                      : "linear-gradient(to bottom right, rgba(88, 28, 135, 0.6), rgba(107, 33, 168, 0.6))",
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
                    transform: `translateZ(-15px) translate(${midOffset.x * 0.5}px, ${midOffset.y * 0.5}px)`,
                    boxShadow: isThemeActive
                      ? "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(251, 191, 36, 0.2)"
                      : "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.2)",
                  }}
                >
                  {/* Navigation Bar */}
                  <div
                    className={`flex items-center justify-between px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 bg-black/60 border-b border-white/10 transition-all duration-500 ${
                      assemblyPhase === "nav" ||
                      assemblyPhase === "hero" ||
                      assemblyPhase === "cards" ||
                      assemblyPhase === "rotating" ||
                      assemblyPhase === "complete"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-8"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center transition-all duration-1000"
                        style={{
                          background: isThemeActive
                            ? "linear-gradient(to bottom right, rgb(245, 158, 11), rgb(234, 88, 12))"
                            : "linear-gradient(to bottom right, rgb(139, 92, 246), rgb(147, 51, 234))",
                        }}
                      >
                        <span className="text-white text-sm sm:text-base md:text-lg">
                          {isThemeActive ? "⚡" : "🌐"}
                        </span>
                      </div>
                      <span className="text-white font-semibold text-[10px] sm:text-xs md:text-sm">
                        {isThemeActive ? "ElektroProfi" : "MeinBusiness"}
                      </span>
                    </div>
                    <div className="hidden sm:flex gap-3 md:gap-6 text-[10px] md:text-xs text-white/80">
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
                    className={`px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 transition-all duration-1000 delay-150 ${
                      assemblyPhase === "hero" ||
                      assemblyPhase === "cards" ||
                      assemblyPhase === "rotating" ||
                      assemblyPhase === "complete"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      background: isThemeActive
                        ? "linear-gradient(to bottom, rgba(120, 53, 15, 0.2), transparent)"
                        : "linear-gradient(to bottom, rgba(88, 28, 135, 0.2), transparent)",
                    }}
                  >
                    <div className="text-center max-w-md mx-auto">
                      <h1
                        className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 bg-clip-text text-transparent leading-tight transition-all duration-1000"
                        style={{
                          backgroundImage: isThemeActive
                            ? "linear-gradient(to right, rgb(252, 211, 77), rgb(251, 146, 60), rgb(252, 211, 77))"
                            : "linear-gradient(to right, rgb(196, 181, 253), rgb(192, 132, 252), rgb(196, 181, 253))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {isThemeActive ? "Ihr Elektrofachbetrieb" : "Ihr Business Online"}
                      </h1>
                      <p className="text-white/60 text-[10px] sm:text-xs mb-3 sm:mb-4 md:mb-6 leading-relaxed">
                        {isThemeActive
                          ? "Professionelle Elektroinstallationen, Wartung und 24/7 Notdienst"
                          : "Professionelle Lösungen für Ihr Unternehmen – modern und zuverlässig"}
                      </p>
                      <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
                        <button
                          className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-white text-[10px] sm:text-xs font-medium shadow-lg transition-all duration-1000"
                          style={{
                            background: isThemeActive
                              ? "linear-gradient(to right, rgb(245, 158, 11), rgb(234, 88, 12))"
                              : "linear-gradient(to right, rgb(139, 92, 246), rgb(147, 51, 234))",
                            boxShadow: isThemeActive
                              ? "0 10px 25px rgba(245, 158, 11, 0.3)"
                              : "0 10px 25px rgba(139, 92, 246, 0.3)",
                          }}
                        >
                          Jetzt anfragen
                        </button>
                        <button className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] sm:text-xs font-medium hover:bg-white/20 transition-all">
                          {isThemeActive ? "Notdienst" : "Mehr erfahren"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Feature Cards Section */}
                  <div
                    className={`px-3 sm:px-4 md:px-6 pb-4 sm:pb-6 md:pb-8 transition-all duration-500 delay-300 ${
                      assemblyPhase === "cards" || assemblyPhase === "rotating" || assemblyPhase === "complete"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                  >
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-3">
                      {isThemeActive
                        ? [
                            { icon: "🔌", title: "Installation", desc: "Neuanlagen" },
                            { icon: "🔧", title: "Wartung", desc: "Regelmäßig" },
                            { icon: "🚨", title: "Notdienst", desc: "24/7" },
                          ].map((feature, i) => (
                            <div
                              key={i}
                              className="bg-white/15 border border-white/20 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 hover:bg-white/20 hover:border-amber-500/30 transition-all duration-1000 group"
                            >
                              <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-1.5 md:mb-2 group-hover:scale-110 transition-transform">
                                {feature.icon}
                              </div>
                              <div className="text-white text-[9px] sm:text-[10px] md:text-xs font-semibold mb-0.5 sm:mb-1">
                                {feature.title}
                              </div>
                              <div className="text-white/50 text-[8px] sm:text-[9px] md:text-[10px]">
                                {feature.desc}
                              </div>
                            </div>
                          ))
                        : [
                            { icon: "💼", title: "Beratung", desc: "Individuell" },
                            { icon: "🚀", title: "Umsetzung", desc: "Professionell" },
                            { icon: "📈", title: "Wachstum", desc: "Nachhaltig" },
                          ].map((feature, i) => (
                            <div
                              key={i}
                              className="bg-white/15 border border-white/20 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 hover:bg-white/20 hover:border-violet-500/30 transition-all duration-1000 group"
                            >
                              <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-1.5 md:mb-2 group-hover:scale-110 transition-transform">
                                {feature.icon}
                              </div>
                              <div className="text-white text-[9px] sm:text-[10px] md:text-xs font-semibold mb-0.5 sm:mb-1">
                                {feature.title}
                              </div>
                              <div className="text-white/50 text-[8px] sm:text-[9px] md:text-[10px]">
                                {feature.desc}
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-black/80 border-t border-white/10">
                    <div className="flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] text-white/40">
                      <span className="truncate">{isThemeActive ? "© 2025 ElektroProfi" : "© 2025 MeinBusiness"}</span>
                      <div className="flex gap-2 sm:gap-3 md:gap-4">
                        <span className="hover:text-white/60 transition-colors cursor-pointer hidden sm:inline">
                          Impressum
                        </span>
                        <span className="hover:text-white/60 transition-colors cursor-pointer">Datenschutz</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Foreground Layer - Edge Glow & Highlights */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-1000"
                  style={{
                    transform: `translateZ(0px) translate(${fgOffset.x * 0.3}px, ${fgOffset.y * 0.3}px)`,
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
            <div className="mt-4 sm:mt-6 md:mt-8 text-center px-2">
              <p className="text-white/70 text-[11px] sm:text-xs md:text-sm font-light leading-relaxed mb-3 sm:mb-4">
                {isThemeActive
                  ? "So könnte die fertige Website für einen Elektrofachbetrieb aussehen – professionell und vollständig durch KI erstellt."
                  : "Sehen Sie, wie KI eine professionelle Website für Ihr Business erstellt – vom Design bis zur Funktionalität."}
              </p>

              <div className="flex justify-center">
                <a
                  href="#kontakt"
                  onClick={(e) => {
                    e.preventDefault()
                    const kontaktSection = document.getElementById("kontakt")
                    if (kontaktSection) {
                      kontaktSection.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  }}
                  className="inline-block px-8 py-3 rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90 hover:shadow-lg"
                >
                  Jetzt KI integrieren!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          [style*="perspective"] {
            perspective: 800px !important;
          }
          [style*="rotateY(30deg)"] {
            transform: rotateY(15deg) !important;
          }
        }
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
        /* Add will-change hints for better performance */
        [style*="transform: translateZ"] {
          will-change: transform;
        }
        [style*="rotateY"] {
          will-change: transform;
        }
      `}</style>
    </div>
  )
}
