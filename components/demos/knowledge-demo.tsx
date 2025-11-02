"use client"

import { useState, useEffect } from "react"

const qaExamples = [
  {
    question: "Wie funktioniert unser Onboarding-Prozess?",
    answer:
      "Der Onboarding-Prozess umfasst 3 Phasen: Dokumentenprüfung, Team-Integration und Schulung. Neue Mitarbeiter erhalten in den ersten 2 Wochen eine umfassende Einführung.",
    sources: ["HR-Handbuch S.12", "Onboarding-Guide"],
  },
  {
    question: "Welche Tools nutzen wir für Projektmanagement?",
    answer:
      "Wir verwenden Jira für Aufgabenverwaltung, Confluence für Dokumentation und Slack für die Kommunikation. Alle Tools sind miteinander integriert.",
    sources: ["IT-Richtlinien", "Tool-Übersicht"],
  },
]

const knowledgeNodes = [
  { label: "HR", angle: 0, distance: 110, connections: [1, 2] },
  { label: "IT", angle: 72, distance: 110, connections: [2, 3] },
  { label: "Sales", angle: 144, distance: 110, connections: [3, 4] },
  { label: "Marketing", angle: 216, distance: 110, connections: [4, 0] },
  { label: "Finance", angle: 288, distance: 110, connections: [0, 1] },
]

export function KnowledgeDemo({ isActive }: { isActive?: boolean }) {
  const [currentQA, setCurrentQA] = useState(-1)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeNodes, setActiveNodes] = useState<number[]>([])

  useEffect(() => {
    if (isActive && currentQA === -1) {
      handleAsk()
    }
  }, [isActive])

  useEffect(() => {
    if (currentQA >= 0) {
      // Activate random nodes when answer appears
      const nodesToActivate = [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)]
      setActiveNodes(nodesToActivate)

      setTimeout(() => {
        setActiveNodes([])
      }, 3000)
    }
  }, [currentQA])

  const handleAsk = () => {
    if (inputValue.trim() || currentQA < qaExamples.length - 1) {
      setIsTyping(true)
      setTimeout(() => {
        setCurrentQA((prev) => Math.min(prev + 1, qaExamples.length - 1))
        setIsTyping(false)
        setInputValue("")
      }, 1000)
    }
  }

  const handleReset = () => {
    setCurrentQA(-1)
    setInputValue("")
    setActiveNodes([])
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
            <span className="font-medium italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Wissensmanagement
            </span>
          </h3>
          <p className="text-white/70 text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed">
            Unser KI-Wissensmanagement vernetzt Ihr Unternehmenswissen. Dokumente, FAQs und interne Daten werden sofort
            durchsuchbar – Ihre Teams finden Antworten in Sekunden.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Chat Interface */}
          <div className="space-y-6">
            <h4 className="text-xl font-light text-white mb-4">KI-Chat über Dokumente</h4>

            {/* Chat Messages */}
            <div className="space-y-4 min-h-[350px] max-h-[450px] overflow-y-auto">
              {currentQA >= 0 &&
                qaExamples.slice(0, currentQA + 1).map((qa, i) => (
                  <div key={i} className="space-y-3 animate-in slide-in-from-bottom-4">
                    {/* Question */}
                    <div className="flex justify-end">
                      <div
                        className="max-w-[85%] p-4 rounded-2xl border border-white/30"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                      >
                        <p className="text-sm text-white font-light">{qa.question}</p>
                      </div>
                    </div>

                    {/* Answer */}
                    <div className="flex justify-start">
                      <div
                        className="max-w-[85%] p-4 rounded-2xl border border-violet-500/40"
                        style={{ backgroundColor: "rgba(139, 92, 246, 0.3)" }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-6 h-6 rounded-full border border-violet-500/50 flex items-center justify-center text-xs"
                            style={{
                              background:
                                "linear-gradient(to bottom right, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.3))",
                            }}
                          >
                            🤖
                          </div>
                          <span className="text-xs text-white/70 font-light">KI Assistant</span>
                        </div>
                        <p className="text-sm text-white font-light mb-3 leading-relaxed">{qa.answer}</p>

                        {/* Sources */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                          <span className="text-xs text-white/70 font-light">Quellen:</span>
                          {qa.sources.map((source, j) => (
                            <span
                              key={j}
                              className="px-2 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white/80 font-light hover:bg-white/20 transition-all cursor-pointer"
                            >
                              📄 {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="p-4 rounded-2xl border border-violet-500/40"
                    style={{ backgroundColor: "rgba(139, 92, 246, 0.3)" }}
                  >
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAsk()}
                placeholder="Stelle eine Frage über Unternehmenswissen..."
                className="flex-1 px-4 py-3 rounded-full bg-white/15 border border-white/20 text-white placeholder-white/50 text-sm font-light focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
                disabled={isTyping}
              />
              <button
                onClick={handleAsk}
                disabled={isTyping || currentQA >= qaExamples.length - 1}
                className="px-6 py-3 rounded-full text-white font-normal text-sm transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(to right, rgb(139, 92, 246), rgb(168, 85, 247))" }}
              >
                {isTyping ? "..." : "Fragen"}
              </button>
            </div>

            {currentQA >= 0 && (
              <button
                onClick={handleReset}
                className="w-full px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-normal text-sm transition-all duration-300 hover:bg-white/20"
              >
                Chat zurücksetzen
              </button>
            )}

            {/* Badge */}
            <div className="flex justify-center">
              <div className="px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/40 text-white text-xs font-light shadow-lg shadow-violet-500/20">
                ✓ Quellen automatisch zitiert
              </div>
            </div>
          </div>

          {/* Right: Knowledge Graph */}
          <div className="space-y-6">
            <h4 className="text-xl font-light text-white mb-4">Wissens-Netzwerk</h4>

            <div
              className="relative h-[400px] rounded-2xl border border-white/20 p-8 overflow-hidden"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                {knowledgeNodes.map((node, i) => {
                  const x1 = Math.cos((node.angle * Math.PI) / 180) * node.distance
                  const y1 = Math.sin((node.angle * Math.PI) / 180) * node.distance

                  return node.connections.map((targetIdx) => {
                    const targetNode = knowledgeNodes[targetIdx]
                    const x2 = Math.cos((targetNode.angle * Math.PI) / 180) * targetNode.distance
                    const y2 = Math.sin((targetNode.angle * Math.PI) / 180) * targetNode.distance

                    const isActive = activeNodes.includes(i) || activeNodes.includes(targetIdx)

                    return (
                      <line
                        key={`${i}-${targetIdx}`}
                        x1={`calc(50% + ${x1}px)`}
                        y1={`calc(50% + ${y1}px)`}
                        x2={`calc(50% + ${x2}px)`}
                        y2={`calc(50% + ${y2}px)`}
                        stroke={isActive ? "rgba(167, 139, 250, 0.6)" : "rgba(139, 92, 246, 0.2)"}
                        strokeWidth={isActive ? "2" : "1"}
                        strokeDasharray="4 4"
                        className="transition-all duration-500"
                      />
                    )
                  })
                })}
              </svg>

              {/* Central Node */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-violet-500/50 flex items-center justify-center shadow-lg shadow-violet-500/30 backdrop-blur-sm"
                style={{
                  zIndex: 3,
                  background: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.3))",
                }}
              >
                <span className="text-white text-xs font-light text-center leading-tight">
                  Unternehmens-
                  <br />
                  wissen
                </span>
              </div>

              {/* Surrounding Nodes */}
              {knowledgeNodes.map((node, i) => {
                const x = Math.cos((node.angle * Math.PI) / 180) * node.distance
                const y = Math.sin((node.angle * Math.PI) / 180) * node.distance
                const isActive = activeNodes.includes(i)

                return (
                  <div
                    key={i}
                    className={`absolute w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "bg-violet-500/35 border-2 border-violet-500/60 scale-110 shadow-lg shadow-violet-500/40"
                        : "bg-white/20 border border-white/30 hover:bg-violet-500/25 hover:border-violet-500/50 hover:scale-105"
                    }`}
                    style={{
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: `translate(-50%, -50%) ${isActive ? "scale(1.1)" : "scale(1)"}`,
                      zIndex: 2,
                    }}
                  >
                    <span className={`text-xs font-light ${isActive ? "text-white" : "text-white"}`}>{node.label}</span>
                  </div>
                )
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Dokumente", value: "2,847" },
                { label: "Verbindungen", value: "12,394" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-white/20 text-center"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <div className="text-2xl font-light text-violet-400 mb-1">{stat.value}</div>
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
