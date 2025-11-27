"use client"

import { useState, useEffect, useRef } from "react"
import { CallAgentsDemo } from "./demos/call-agents-demo"
import { WebAppsDemo } from "./demos/web-apps-demo"
import { HRDemo } from "./demos/hr-demo"
import { SalesDemo } from "./demos/sales-demo"
import { KnowledgeDemo } from "./demos/knowledge-demo"
import { ChevronDown } from "lucide-react"

const tabs = [
  {
    id: "call-agents",
    label: "KI Call Agents",
    description: "Intelligente Sprachassistenten für automatisierte Kundenbetreuung",
    component: CallAgentsDemo,
  },
  {
    id: "hr",
    label: "HR & Recruiting",
    description: "KI-gestützte Lösungen für effizientes Bewerbermanagement",
    component: HRDemo,
  },
  {
    id: "knowledge",
    label: "Wissensmanagement",
    description: "Intelligente Systeme zur Organisation Ihres Unternehmenswissens",
    component: KnowledgeDemo,
  },
  {
    id: "webapps",
    label: "Websites & Apps mit KI",
    description: "Moderne Webanwendungen mit integrierten KI-Funktionen",
    component: WebAppsDemo,
  },
  {
    id: "sales",
    label: "Büro-Automatisierungen",
    description: "Automatisierte Prozesse zur Lead-Qualifizierung",
    component: SalesDemo,
  },
]

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [isSticky, setIsSticky] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const introRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Handle hash navigation
    const hash = window.location.hash.slice(1)
    const validTab = tabs.find((tab) => tab.id === hash)
    if (validTab) {
      setShowIntro(false)
      setActiveTab(hash)
    }

    // Handle scroll for sticky tabs
    const handleScroll = () => {
      const section = document.getElementById("leistungen")
      if (section) {
        const rect = section.getBoundingClientRect()
        setIsSticky(rect.top <= 0 && rect.bottom > 100)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!showIntro) return

    const handleMouseMove = (e: MouseEvent) => {
      if (introRef.current) {
        const rect = introRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [showIntro])

  const handleTabClick = (tabId: string) => {
    if (showIntro) {
      setShowIntro(false)
      setTimeout(() => {
        setActiveTab(tabId)
        window.history.pushState(null, "", `#${tabId}`)
      }, 400)
    } else {
      setActiveTab(tabId)
      window.history.pushState(null, "", `#${tabId}`)
    }
  }

  const ActiveComponent = activeTab ? tabs.find((tab) => tab.id === activeTab)?.component : null

  return (
    <section id="leistungen" className="relative z-50 px-6 py-32 max-w-7xl mx-auto bg-black">
      {showIntro && (
        <div
          ref={introRef}
          className="relative min-h-[60vh] flex flex-col items-center justify-center mb-16"
          style={{
            animation: "fadeIn 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
          }}
        >
          {/* Animated Title */}
          <h2
            className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight text-center"
            style={{
              animation: "scaleIn 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
              textShadow: "0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(139, 92, 252, 0.1)",
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            Unsere{" "}
            <span
              className="font-medium italic"
              style={{
                fontFamily: "'Instrument Serif', serif",
                background: "linear-gradient(to right, rgb(167, 139, 250), rgb(192, 132, 252), rgb(167, 139, 250))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "rgb(192, 132, 252)",
              }}
            >
              Leistungen
            </span>
          </h2>

          {/* Subline */}
          <p
            className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-center mb-12"
            style={{
              animation: "fadeInUp 800ms cubic-bezier(0.4, 0, 0.2, 1) 300ms forwards",
              opacity: 0,
              transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            Maßgeschneiderte KI-Lösungen für Ihr Unternehmen
          </p>

          {/* Scroll Indication */}
          <div
            className="flex flex-col items-center gap-3 mb-12"
            style={{
              animation:
                "fadeInUp 800ms cubic-bezier(0.4, 0, 0.2, 1) 600ms forwards, float 3s ease-in-out 1.4s infinite",
              opacity: 0,
            }}
          >
            <span className="text-white/60 text-sm font-light tracking-wide uppercase">{"KI - Lösungen"}</span>
            <ChevronDown className="w-6 h-6 text-white/60" />
          </div>

          <div className="flex justify-center items-center w-full px-2 sm:px-4">
            <div
              className="relative flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-6 justify-center items-center max-w-5xl w-full sm:w-auto"
              role="tablist"
              aria-label="Service categories"
            >
              {/* Optional: Neural network connecting lines */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none hidden sm:block" />

              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    relative px-6 py-3 rounded-full 
                    text-sm font-light whitespace-nowrap
                    transition-all duration-400 ease-out
                    backdrop-blur-md border
                    w-full sm:w-auto
                    ${
                      activeTab === tab.id
                        ? "bg-white/10 text-white border-white/30 shadow-lg shadow-violet-500/30"
                        : "bg-white/5 text-white/70 border-white/10"
                    }
                    hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/20
                    focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-black
                    group
                  `}
                  style={{
                    animation: `assembleTab 600ms cubic-bezier(0.4, 0, 0.2, 1) ${900 + index * 100}ms forwards`,
                    opacity: 0,
                    transform: "translateY(20px)",
                  }}
                >
                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
                    <div className="absolute inset-[1px] rounded-full bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-violet-500/20 animate-pulse-glow" />
                  </div>

                  {/* Active state gradient */}
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-violet-500/10 blur-sm -z-10 animate-gradient-shift" />
                  )}

                  {/* Light reflection effect */}
                  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>

                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Glass effect overlay */}
          <div
            className="absolute inset-0 -z-10 rounded-3xl"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>
      )}

      {!showIntro && (
        <>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
              Unsere{" "}
              <span
                className="font-medium italic"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  background: "linear-gradient(to right, rgb(167, 139, 250), rgb(192, 132, 252), rgb(167, 139, 250))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "rgb(192, 132, 252)",
                }}
              >
                Leistungen
              </span>
            </h2>
            <p className="text-white/70 text-sm font-light max-w-2xl mx-auto leading-relaxed">
              Maßgeschneiderte KI-Lösungen für Ihr Unternehmen
            </p>
          </div>

          <div
            className={`sm:sticky sm:top-0 z-30 transition-all duration-300 mb-8 ${
              isSticky
                ? "sm:bg-black/80 sm:backdrop-blur-xl sm:py-4 sm:-mx-6 sm:px-6 sm:shadow-lg sm:shadow-violet-500/10"
                : ""
            }`}
          >
            <div className="flex justify-center items-center">
              <div
                className="relative flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-6 justify-center items-center w-full sm:w-auto max-w-full px-2 sm:px-0"
                role="tablist"
                aria-label="Service categories"
              >
                {/* Optional: Neural network connecting lines */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none hidden sm:block" />

                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      relative px-6 py-3 rounded-full 
                      text-sm font-light whitespace-nowrap
                      transition-all duration-400 ease-out
                      backdrop-blur-md border
                      w-full sm:w-auto
                      ${
                        activeTab === tab.id
                          ? "bg-white/10 text-white border-white/30 shadow-lg shadow-violet-500/30"
                          : "bg-white/5 text-white/70 border-white/10"
                      }
                      hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/20
                      focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-black
                      group
                    `}
                  >
                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
                      <div className="absolute inset-[1px] rounded-full bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-violet-500/20 animate-pulse-glow" />
                    </div>

                    {/* Active state gradient */}
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-violet-500/10 blur-sm -z-10 animate-gradient-shift" />
                    )}

                    {/* Light reflection effect */}
                    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    </div>

                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <div
        className={`transition-all duration-400 ease-out ${
          showIntro ? "opacity-0 blur-sm pointer-events-none h-0 overflow-hidden" : "opacity-100 blur-0"
        }`}
      >
        {activeTab && (
          <div className="mt-12">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                id={`panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={tab.id}
                className={`
                  transition-all duration-500 ease-out
                  ${activeTab === tab.id ? "opacity-100 translate-y-0 block" : "opacity-0 translate-y-4 hidden"}
                `}
                style={{
                  transitionProperty: "opacity, transform",
                }}
              >
                {/* Tab Description */}
                <div className="text-center mb-12">
                  <p className="text-white/80 text-base font-light max-w-2xl mx-auto leading-relaxed">
                    {tab.description}
                  </p>
                </div>

                {/* Demo Component */}
                <div className="relative">
                  <tab.component isActive={activeTab === tab.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes assembleTab {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
