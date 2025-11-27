"use client"

import { useState, useEffect } from "react"
import { Mail, FileText, FolderOpen, Table } from "lucide-react"

interface Email {
  id: number
  from: string
  subject: string
  x: number
  y: number
  processed: boolean
}

interface Invoice {
  id: number
  number: string
  amount: string
  date: string
  status: "processing" | "completed"
  x: number
  y: number
}

export function SalesDemo({ isActive }: { isActive?: boolean }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [emails, setEmails] = useState<Email[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [tableEntries, setTableEntries] = useState<any[]>([])
  const [currentStep, setCurrentStep] = useState(0)

  const emailData = [
    { from: "kunde@firma.de", subject: "Rechnung #2024-001" },
    { from: "lieferant@shop.com", subject: "RE: Bestellung #4532" },
    { from: "service@provider.at", subject: "Invoice March 2024" },
  ]

  useEffect(() => {
    if (isActive && !isAnimating) {
      handleStart()
    } else if (!isActive) {
      // Reset when tab becomes inactive
      setIsAnimating(false)
      setEmails([])
      setInvoices([])
      setTableEntries([])
      setCurrentStep(0)
    }
  }, [isActive])

  useEffect(() => {
    if (!isAnimating) return

    // Step 1: Show emails (0-2s)
    const emailTimer = setTimeout(() => {
      const newEmails = emailData.map((data, i) => ({
        id: i,
        ...data,
        x: 20,
        y: 20 + i * 80,
        processed: false,
      }))
      setEmails(newEmails)
      setCurrentStep(1)
    }, 500)

    // Step 2: Process emails to invoices (2-4s)
    const processTimer = setTimeout(() => {
      setCurrentStep(2)
      emailData.forEach((data, i) => {
        setTimeout(() => {
          setEmails((prev) => prev.map((email) => (email.id === i ? { ...email, processed: true } : email)))

          setTimeout(() => {
            const invoice = {
              id: i,
              number: `2024-${String(i + 1).padStart(3, "0")}`,
              amount: `€${(Math.random() * 1000 + 500).toFixed(2)}`,
              date: new Date().toLocaleDateString("de-DE"),
              status: "processing" as const,
              x: 50,
              y: 20 + i * 80,
            }
            setInvoices((prev) => [...prev, invoice])
          }, 300)
        }, i * 800)
      })
    }, 2000)

    // Step 3: Move to folder (4-5s)
    const folderTimer = setTimeout(() => {
      setCurrentStep(3)
      setInvoices((prev) => prev.map((inv) => ({ ...inv, x: 75, status: "completed" as const })))
    }, 4500)

    // Step 4: Trigger table population (5-7s)
    const tableTimer = setTimeout(() => {
      setCurrentStep(4)
    }, 5500)

    return () => {
      clearTimeout(emailTimer)
      clearTimeout(processTimer)
      clearTimeout(folderTimer)
      clearTimeout(tableTimer)
    }
  }, [isAnimating])

  useEffect(() => {
    if (currentStep === 4 && invoices.length > 0 && tableEntries.length === 0) {
      invoices.forEach((inv, i) => {
        setTimeout(() => {
          setTableEntries((prevEntries) => [
            ...prevEntries,
            {
              id: inv.id,
              number: inv.number,
              amount: inv.amount,
              date: inv.date,
              category: "Eingang",
            },
          ])
        }, i * 600)
      })
    }
  }, [currentStep, invoices.length])

  const handleStart = () => {
    setIsAnimating(true)
    setEmails([])
    setInvoices([])
    setTableEntries([])
    setCurrentStep(0)
  }

  return (
    <div
      className="border border-white/10 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden"
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
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-3 md:mb-4">
            <span className="font-medium italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Büro-Automatisierungen
            </span>
          </h3>
          <p className="text-white/70 text-xs sm:text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed px-2">
            Büro-Automatisierung bedeutet: KI übernimmt deine nervigsten Routineaufgaben.
            <br />
            Weniger Klicks, weniger Fehler, mehr Zeit für Umsatz.
            <br />
            Du machst das Wichtige — KI erledigt den Rest.
          </p>
        </div>

        {/* Animation Area */}
        <div className="min-h-[800px] md:min-h-[600px] relative mb-6 md:mb-8">
          {/* Email Inbox */}
          <div className="md:absolute relative md:left-0 md:top-0 md:w-1/4 w-full mb-4 md:mb-0">
            <div className="p-3 sm:p-4 rounded-xl border border-white/20 bg-white/5">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-violet-400" />
                <h4 className="text-white font-light text-xs sm:text-sm">Posteingang</h4>
              </div>
              <div className="space-y-2">
                {emails.map((email) => (
                  <div
                    key={email.id}
                    className={`p-2 sm:p-3 rounded-lg border transition-all duration-500 ${
                      email.processed ? "border-green-500/40 bg-green-500/10 opacity-50" : "border-white/20 bg-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <Mail className="w-3 sm:w-4 h-3 sm:h-4 text-white/70 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-white/90 font-light truncate">{email.from}</p>
                        <p className="text-[10px] sm:text-xs text-white/60 truncate">{email.subject}</p>
                      </div>
                    </div>
                    {email.processed && (
                      <div className="mt-2 text-[10px] sm:text-xs text-green-400 flex items-center gap-1">
                        <span>✓</span> Verarbeitet
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Processing Indicator */}
          {currentStep >= 2 && currentStep < 4 && (
            <div className="md:absolute relative md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 my-4 md:my-0 flex justify-center">
              <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-violet-500/30 border border-violet-500/50 text-white text-xs sm:text-sm font-light shadow-lg shadow-violet-500/30 animate-pulse">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                  KI verarbeitet...
                </span>
              </div>
            </div>
          )}

          {/* Invoice Folder */}
          <div className="md:absolute relative md:right-0 md:top-0 md:w-1/4 w-full mb-4 md:mb-0">
            <div className="p-3 sm:p-4 rounded-xl border border-white/20 bg-white/5">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <FolderOpen className="w-4 sm:w-5 h-4 sm:h-5 text-violet-400" />
                <h4 className="text-white font-light text-xs sm:text-sm">Rechnungen</h4>
              </div>
              <div className="space-y-2">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className={`p-2 sm:p-3 rounded-lg border transition-all duration-500 ${
                      invoice.status === "completed"
                        ? "border-violet-500/40 bg-violet-500/10"
                        : "border-white/20 bg-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <FileText className="w-3 sm:w-4 h-3 sm:h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-white/90 font-light">{invoice.number}</p>
                        <p className="text-[10px] sm:text-xs text-violet-400">{invoice.amount}</p>
                        <p className="text-[10px] sm:text-xs text-white/60">{invoice.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="md:absolute relative md:bottom-0 md:left-0 md:right-0 w-full mt-4 md:mt-8">
            <div className="p-3 sm:p-4 rounded-xl border border-white/20 bg-white/5">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Table className="w-4 sm:w-5 h-4 sm:h-5 text-violet-400" />
                <h4 className="text-white font-light text-xs sm:text-sm">Buchhaltungs-Tabelle</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] sm:text-xs">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-white/70 font-light py-2 px-2 sm:px-3">Rechnungsnr.</th>
                      <th className="text-left text-white/70 font-light py-2 px-2 sm:px-3">Betrag</th>
                      <th className="text-left text-white/70 font-light py-2 px-2 sm:px-3">Datum</th>
                      <th className="text-left text-white/70 font-light py-2 px-2 sm:px-3">Kategorie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableEntries.map((entry, i) => (
                      <tr
                        key={entry.id}
                        className="border-b border-white/5 animate-fadeIn"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        <td className="text-white/90 font-light py-2 px-2 sm:px-3">{entry.number}</td>
                        <td className="text-violet-400 font-light py-2 px-2 sm:px-3">{entry.amount}</td>
                        <td className="text-white/70 font-light py-2 px-2 sm:px-3">{entry.date}</td>
                        <td className="text-white/70 font-light py-2 px-2 sm:px-3">{entry.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
          {[
            { label: "Zeit gespart", value: "15h/Woche" },
            { label: "Fehlerrate", value: "-95%" },
            { label: "Automatisiert", value: "100%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/20 text-center"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            >
              <div className="text-sm sm:text-base md:text-lg font-light text-violet-400 mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-black font-normal text-xs sm:text-sm transition-all duration-300 hover:bg-white/90 hover:shadow-lg"
          >
            Jetzt KI integrieren!
          </a>
        </div>
      </div>
    </div>
  )
}
