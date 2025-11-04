"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [showToast, setShowToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("success")
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setToastType("success")
        setToastMessage("Nachricht erfolgreich gesendet!")
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      } else {
        setToastType("error")
        setToastMessage(data.error || "Fehler beim Senden der Nachricht")
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      setToastType("error")
      setToastMessage("Netzwerkfehler. Bitte versuchen Sie es später erneut.")
    } finally {
      setIsSubmitting(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 4000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section id="kontakt" className="relative z-50 bg-black py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight px-2">
            Kontaktieren Sie{" "}
            <span
              className="font-medium italic"
              style={{
                fontFamily: "'Instrument Serif', serif",
                background: "linear-gradient(to right, rgb(167, 139, 250), rgb(192, 132, 252), rgb(167, 139, 250))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "rgb(192, 132, 252)", // Fallback color for Safari
              }}
            >
              uns
            </span>
          </h2>
          <p className="text-white/80 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed px-4">
            Wir freuen uns darauf, von Ihrem Projekt zu hören
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white mb-6">Kontaktinformationen</h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-violet-500/20 border border-violet-500/30">
                    <Mail className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">E-Mail</h4>
                    <a href="mailto:hello@konekt.ai" className="text-white/70 hover:text-violet-400 transition-colors">
                      soeser@konektai.at
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Telefon</h4>
                    <a href="tel:+43123456789" className="text-white/70 hover:text-purple-400 transition-colors">
                      +43 680 4412871
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-violet-500/20 border border-violet-500/30">
                    <MapPin className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Standort</h4>
                    <p className="text-white/70">
                      Andreas-Hofer-Gasse 31
                      <br />
                      4800 Attnang-Puchheim
                      <br />
                      Österreich
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Öffnungszeiten</h4>
                    <p className="text-white/70">
                      Montag - Sonntag: 24/7 geöffnet
                      <br />
                      Rund um die Uhr erreichbar
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <h4 className="text-xl font-semibold text-white mb-4">Schnelle Antwort garantiert</h4>
              <p className="text-white/70 leading-relaxed">
                Wir antworten in der Regel innerhalb von 24 Stunden auf alle Anfragen. Für dringende Anliegen
                kontaktieren Sie uns bitte direkt per Telefon.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative max-w-2xl mx-auto px-6">
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
              <h3 className="text-2xl font-semibold text-white mb-6">Senden Sie uns eine Nachricht</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-white/80 mb-2 text-sm font-medium">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                    placeholder="Ihr Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-white/80 mb-2 text-sm font-medium">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                    placeholder="ihre.email@beispiel.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-white/80 mb-2 text-sm font-medium">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                    placeholder="+43 123 456 789"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-white/80 mb-2 text-sm font-medium">
                    Betreff *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                    placeholder="Worum geht es?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-white/80 mb-2 text-sm font-medium">
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none"
                    placeholder="Erzählen Sie uns von Ihrem Projekt..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-white rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: isButtonHovered
                      ? "linear-gradient(to right, rgb(139, 92, 246), rgb(168, 85, 247))"
                      : "linear-gradient(to right, rgb(124, 58, 237), rgb(147, 51, 234))",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Nachricht senden
                    </>
                  )}
                </button>

                <p className="text-white/50 text-xs text-center">
                  * Pflichtfelder. Ihre Daten werden vertraulich behandelt.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Toast */}
      {showToast && (
        <div
          className="fixed bottom-8 right-8 z-50 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl shadow-violet-500/20 animate-in slide-in-from-bottom-4 duration-500"
          style={{
            animation: "slideInUp 0.5s ease-out",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full ${toastType === "success" ? "bg-violet-500/20" : "bg-red-500/20"} flex items-center justify-center`}
            >
              {toastType === "success" ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <p className="text-white text-sm font-light">{toastMessage}</p>
          </div>
        </div>
      )}
    </section>
  )
}
