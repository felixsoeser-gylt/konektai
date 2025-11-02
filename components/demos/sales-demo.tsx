"use client"

import { useState, useEffect } from "react"

const funnelStages = [
  {
    name: "Prospect",
    count: 0,
    target: 150,
    gradient: "linear-gradient(to right, rgb(167, 139, 250), rgb(139, 92, 246))",
  },
  {
    name: "Qualified",
    count: 0,
    target: 85,
    gradient: "linear-gradient(to right, rgb(192, 132, 252), rgb(168, 85, 247))",
  },
  { name: "Kunde", count: 0, target: 32, gradient: "linear-gradient(to right, rgb(244, 114, 182), rgb(236, 72, 153))" },
]

const leads = [
  { name: "TechCorp GmbH", score: 92, action: "Follow-up Call", priority: "Hoch", potential: "€125k" },
  { name: "Digital Solutions AG", score: 78, action: "Proposal senden", priority: "Mittel", potential: "€78k" },
  { name: "Innovation Labs", score: 65, action: "Demo vereinbaren", priority: "Mittel", potential: "€45k" },
]

export function SalesDemo({ isActive }: { isActive?: boolean }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStages, setCurrentStages] = useState(funnelStages)
  const [activeLeadIndex, setActiveLeadIndex] = useState(0)

  useEffect(() => {
    if (isActive && !isAnimating) {
      handleStart()
    }
  }, [isActive])

  useEffect(() => {
    if (!isAnimating) return

    const duration = 2500
    const steps = 60
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCurrentStages(
        funnelStages.map((stage) => ({
          ...stage,
          count: Math.floor(stage.target * progress),
        })),
      )

      if (currentStep >= steps) {
        clearInterval(timer)
        setCurrentStages(funnelStages.map((stage) => ({ ...stage, count: stage.target })))
      }
    }, interval)

    // Cycle through leads
    const leadInterval = setInterval(() => {
      setActiveLeadIndex((prev) => (prev + 1) % leads.length)
    }, 2000)

    return () => {
      clearInterval(timer)
      clearInterval(leadInterval)
    }
  }, [isAnimating])

  const handleStart = () => {
    setIsAnimating(true)
  }

  const handleReset = () => {
    setIsAnimating(false)
    setCurrentStages(funnelStages.map((stage) => ({ ...stage, count: 0 })))
    setActiveLeadIndex(0)
  }

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

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
            Vertrieb &{" "}
            <span className="font-medium italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Leadgenerierung
            </span>
          </h3>
          <p className="text-white/70 text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed">
            KIntegration automatisiert Ihre Vertriebsprozesse – von der Lead-Analyse über die Kontaktaufnahme bis zur
            Nachverfolgung. KI erkennt Potenziale und sorgt dafür, dass kein Kunde verloren geht.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Sales Funnel */}
          <div className="space-y-6">
            <h4 className="text-xl font-light text-white mb-4">Sales Funnel</h4>

            <div className="space-y-4">
              {currentStages.map((stage, i) => {
                const width = 100 - i * 25
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white font-light">{stage.name}</span>
                      <span className="text-white/70 font-light">{stage.count} Leads</span>
                    </div>
                    <div
                      className="relative h-20 rounded-2xl border border-white/20 overflow-hidden transition-all duration-1000 shadow-lg"
                      style={{ width: `${width}%` }}
                    >
                      <div className="absolute inset-0" style={{ background: stage.gradient }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-light text-2xl">{stage.count}</span>
                      </div>
                      {/* Animated particles */}
                      {isAnimating && stage.count > 0 && (
                        <>
                          <div className="absolute top-2 left-4 w-2 h-2 rounded-full bg-white/50 animate-ping" />
                          <div
                            className="absolute bottom-2 right-4 w-2 h-2 rounded-full bg-white/50 animate-ping"
                            style={{ animationDelay: "0.5s" }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Control Buttons */}
            {isAnimating && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-normal text-sm transition-all duration-300 hover:bg-white/20"
                >
                  Zurücksetzen
                </button>
              </div>
            )}

            {/* AI Badge */}
            <div className="flex justify-center pt-2">
              <div className="px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/40 text-white text-xs font-light shadow-lg shadow-violet-500/20">
                ✓ KI-Priorisierung aktiv
              </div>
            </div>
          </div>

          {/* Right: Lead Dashboard */}
          <div className="space-y-4">
            <h4 className="text-xl font-light text-white mb-4">Prioritäre Leads</h4>

            <div className="space-y-3">
              {leads.map((lead, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl border transition-all duration-500 ${
                    isAnimating && i === activeLeadIndex
                      ? "border-violet-500/40 scale-[1.02] shadow-lg shadow-violet-500/20"
                      : "border-white/20"
                  }`}
                  style={{
                    backgroundColor:
                      isAnimating && i === activeLeadIndex ? "rgba(139, 92, 246, 0.3)" : "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="text-base font-light text-white mb-1">{lead.name}</h5>
                      <p className="text-xs text-white/70 mb-2">Nächste Aktion: {lead.action}</p>
                      <p className="text-sm text-violet-400 font-light">Potenzial: {lead.potential}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-light ${
                        lead.priority === "Hoch"
                          ? "bg-rose-500/20 border border-rose-500/40 text-rose-300"
                          : "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                      }`}
                    >
                      {lead.priority}
                    </div>
                  </div>

                  {/* Score Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/70">Lead Score</span>
                      <span className="text-violet-400 font-light">{lead.score}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${lead.score}%`,
                          background: "linear-gradient(to right, rgb(139, 92, 246), rgb(168, 85, 247))",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { label: "Conversion", value: "21%" },
                { label: "Avg. Deal", value: "€83k" },
                { label: "Pipeline", value: "€2.8M" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-white/20 text-center"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <div className="text-lg font-light text-violet-400 mb-1">{stat.value}</div>
                  <div className="text-xs text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="inline-block px-8 py-3 rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90 hover:shadow-lg"
          >
            Jetzt KI integrieren!
          </a>
        </div>
      </div>
    </div>
  )
}
