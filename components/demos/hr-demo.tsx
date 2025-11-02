"use client"

import { useState, useEffect } from "react"

const candidates = [
  {
    name: "Anna Schmidt",
    score: 95,
    skills: ["React", "TypeScript", "Leadership"],
    experience: "5 Jahre",
    status: "Interview",
  },
  {
    name: "Max Müller",
    score: 88,
    skills: ["Python", "Data Science", "ML"],
    experience: "3 Jahre",
    status: "Screening",
  },
  {
    name: "Lisa Weber",
    score: 82,
    skills: ["Vue.js", "UX Design", "Agile"],
    experience: "4 Jahre",
    status: "Bewerbung",
  },
]

const stages = [
  { name: "Bewerbung", count: 0, target: 45 },
  { name: "Screening", count: 0, target: 28 },
  { name: "Interview", count: 0, target: 12 },
  { name: "Einstellung", count: 0, target: 5 },
]

export function HRDemo({ isActive }: { isActive?: boolean }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStages, setCurrentStages] = useState(stages)
  const [selectedCandidate, setSelectedCandidate] = useState(0)

  useEffect(() => {
    if (isActive && !isAnimating) {
      handleStart()
    }
  }, [isActive])

  useEffect(() => {
    if (!isAnimating) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCurrentStages(
        stages.map((stage) => ({
          ...stage,
          count: Math.floor(stage.target * progress),
        })),
      )

      if (currentStep >= steps) {
        clearInterval(timer)
        setCurrentStages(stages.map((stage) => ({ ...stage, count: stage.target })))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isAnimating])

  const handleStart = () => {
    setIsAnimating(true)
  }

  const handleReset = () => {
    setIsAnimating(false)
    setCurrentStages(stages.map((stage) => ({ ...stage, count: 0 })))
  }

  return (
    <div className="bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/35 to-purple-500/35 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
            HR & Recruiting{" "}
            <span className="font-medium italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              mit KI
            </span>
          </h3>
          <p className="text-white/70 text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed">
            Unsere KI-Lösungen unterstützen das Recruiting von der Bewerberauswahl bis zum Onboarding. Sie analysieren
            Lebensläufe, vergleichen Kompetenzen und schlagen ideale Kandidaten objektiv vor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Candidate Dashboard */}
          <div className="space-y-6">
            <h4 className="text-xl font-light text-white mb-4">Top Kandidaten</h4>

            <div className="space-y-3">
              {candidates.map((candidate, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCandidate(i)}
                  className={`p-5 rounded-2xl backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                    selectedCandidate === i
                      ? "bg-violet-500/20 border-violet-500/30 scale-[1.02]"
                      : "bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h5 className="text-base font-light text-white mb-1">{candidate.name}</h5>
                      <p className="text-xs text-white/70">{candidate.experience} Erfahrung</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-light text-violet-400">{candidate.score}</div>
                      <div className="text-xs text-white/70">Match</div>
                    </div>
                  </div>

                  {/* Score Bar */}
                  <div className="mb-4 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${candidate.score}%` }}
                    />
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {candidate.skills.map((skill, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-white font-light"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <span className="text-xs text-white/80 font-light">Status: {candidate.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Features */}
            <div className="flex flex-wrap gap-2 pt-4">
              <div className="px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/40 text-white text-xs font-light shadow-lg shadow-violet-500/20">
                ✓ Bias-Checks aktiviert
              </div>
              <div className="px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/40 text-white text-xs font-light shadow-lg shadow-violet-500/20">
                ✓ Objektive Bewertung
              </div>
            </div>
          </div>

          {/* Right: Recruiting Pipeline */}
          <div className="space-y-6">
            <h4 className="text-xl font-light text-white mb-4">Recruiting-Pipeline</h4>

            {/* Pipeline Stages */}
            <div className="space-y-4">
              {currentStages.map((stage, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-light transition-all duration-500 ${
                          isAnimating && stage.count > 0
                            ? "bg-gradient-to-br from-violet-500/30 to-purple-500/30 border-2 border-violet-500/50 text-white shadow-lg shadow-violet-500/30"
                            : "bg-white/10 border border-white/10 text-white/70"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span className="text-white font-light">{stage.name}</span>
                    </div>
                    <span className="text-2xl font-light text-violet-400">{stage.count}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(stage.count / stage.target) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
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

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm text-center">
                <div className="text-2xl font-light text-violet-400 mb-1">78%</div>
                <div className="text-xs text-white/60">Erfolgsquote</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm text-center">
                <div className="text-2xl font-light text-violet-400 mb-1">12 Tage</div>
                <div className="text-xs text-white/60">Ø Time-to-Hire</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90 hover:shadow-lg">
            Mehr erfahren
          </button>
        </div>
      </div>
    </div>
  )
}
