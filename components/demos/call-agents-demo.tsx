"use client"

import { useState, useEffect } from "react"

const transcript = [
  { speaker: "Kunde", text: "Guten Tag, ich hätte gerne einen Beratungstermin." },
  {
    speaker: "AI Agent",
    text: "Guten Tag! Gerne. Welcher Zeitraum passt Ihnen?",
  },
  { speaker: "Kunde", text: "Nächste Woche Dienstag oder Mittwoch wäre ideal." },
  {
    speaker: "AI Agent",
    text: "Am Dienstag um 10:00 Uhr hätte ich einen Termin frei. Passt das?",
  },
  { speaker: "Kunde", text: "Ja, perfekt!" },
  {
    speaker: "AI Agent",
    text: "Sehr gut! Ich habe den Termin für Sie reserviert. Sie erhalten eine Bestätigung per E-Mail.",
  },
]

export function CallAgentsDemo({ isActive }: { isActive?: boolean }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentLine, setCurrentLine] = useState(-1)
  const [waveformHeights, setWaveformHeights] = useState<number[]>(Array(24).fill(20))

  useEffect(() => {
    if (isActive && !isAnimating) {
      handleStart()
    } else if (!isActive) {
      // Reset when tab becomes inactive
      setIsAnimating(false)
      setCurrentLine(-1)
      setWaveformHeights(Array(24).fill(20))
    }
  }, [isActive])

  useEffect(() => {
    if (!isAnimating) return

    // Animate waveform
    const waveInterval = setInterval(() => {
      setWaveformHeights(
        Array(24)
          .fill(0)
          .map(() => Math.random() * 70 + 20),
      )
    }, 150)

    const initialTimeout = setTimeout(() => {
      setCurrentLine(0)
    }, 500)

    const transcriptInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < transcript.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 3000)

    return () => {
      clearInterval(waveInterval)
      clearInterval(transcriptInterval)
      clearTimeout(initialTimeout)
    }
  }, [isAnimating])

  const handleStart = () => {
    setIsAnimating(true)
    setCurrentLine(-1)
  }

  const handleReset = () => {
    setIsAnimating(false)
    setCurrentLine(-1)
    setWaveformHeights(Array(24).fill(20))
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
            {" "}
            <span className="font-medium italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              KI Call Agents
            </span>
          </h3>
          <p className="text-white/70 text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed">
            {"Unsere KI Call Agents beantworten Anrufe automatisch – rund um die Uhr oder genau dann, wenn Sie es wünschen.\nOb außerhalb der Geschäftszeiten, bei besetzter Leitung oder als erste Anlaufstelle: die KI versteht Anliegen, vereinbart Termine und leitet Gespräche gezielt weiter."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: Agent Visual with Headset */}
          <div className="flex flex-col items-center gap-6">
            {/* 3D Agent Avatar */}
            <div className="relative w-full max-w-sm aspect-square">
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.2))",
                }}
              />
              <div
                className="relative w-full h-full rounded-full border border-white/20 backdrop-blur-xl flex items-center justify-center overflow-hidden"
                style={{
                  background: "linear-gradient(to bottom right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1))",
                }}
              >
                {/* Agent silhouette with headset */}
                <div className="relative">
                  <div
                    className="w-32 h-32 rounded-full border-2 border-white/30 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(to bottom right, rgba(167, 139, 250, 0.3), rgba(168, 85, 247, 0.3))",
                    }}
                  >
                    <div className="text-6xl">🎧</div>
                  </div>
                  {/* Sound waves */}
                  {isAnimating && (
                    <>
                      <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-violet-400/50 animate-ping" />
                      <div
                        className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-purple-400/50 animate-ping"
                        style={{ animationDelay: "0.5s" }}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Waveform Visualization */}
            <div className="w-full max-w-sm">
              <div
                className="flex items-end justify-center gap-1 h-24 rounded-2xl border border-white/10 p-4"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              >
                {waveformHeights.map((height, i) => (
                  <div
                    key={i}
                    className={`w-full rounded-full transition-all duration-150`}
                    style={{
                      height: `${height}%`,
                      background: isAnimating
                        ? "linear-gradient(to top, rgb(139, 92, 246), rgb(168, 85, 247))"
                        : "rgba(255, 255, 255, 0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Conversation Transcript */}
          <div className="space-y-4">
            <div className="min-h-[400px] space-y-3">
              {currentLine >= 0 &&
                transcript.slice(0, currentLine + 1).map((line, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border transition-all duration-500 animate-in slide-in-from-bottom-4 ${
                      line.speaker === "AI Agent"
                        ? "border-violet-500/40 text-white ml-4"
                        : "border-white/20 text-white mr-4"
                    }`}
                    style={{
                      backgroundColor:
                        line.speaker === "AI Agent" ? "rgba(139, 92, 246, 0.3)" : "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div className="text-xs font-medium mb-2 text-white/90">{line.speaker}</div>
                    <div className="text-sm font-light leading-relaxed text-white">{line.text}</div>
                  </div>
                ))}
            </div>

            {/* AI Capabilities Indicators */}
            {currentLine >= 1 && (
              <div className="flex flex-wrap gap-2 pt-4">
                <div className="px-4 py-2 rounded-full text-xs font-light border bg-violet-500/20 border-violet-500/40 text-white shadow-lg shadow-violet-500/20">
                  ✓ Intent erkannt
                </div>
                {currentLine >= 3 && (
                  <div className="px-4 py-2 rounded-full text-xs font-light border bg-violet-500/20 border-violet-500/40 text-white shadow-lg shadow-violet-500/20 animate-in fade-in">
                    ✓ Kalender geprüft
                  </div>
                )}
                {currentLine >= 5 && (
                  <div className="px-4 py-2 rounded-full text-xs font-light border bg-violet-500/20 border-violet-500/40 text-white shadow-lg shadow-violet-500/20 animate-in fade-in">
                    ✓ Terminangebot gestellt
                  </div>
                )}
                {currentLine >= 7 && (
                  <div className="px-4 py-2 rounded-full text-xs font-light border bg-violet-500/20 border-violet-500/40 text-white shadow-lg shadow-violet-500/20 animate-in fade-in">
                    ✓ Termin gebucht
                  </div>
                )}
              </div>
            )}
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
            {"Jetzt KI integrieren!"}
          </a>
        </div>
      </div>
    </div>
  )
}
