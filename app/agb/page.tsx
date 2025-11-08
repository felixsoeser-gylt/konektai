"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"

export default function AGBPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-violet-950/30 via-purple-950/20 to-black pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 mb-8 sm:mb-12 group text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="relative">
            Zurück zur Startseite
            <span className="absolute inset-0 blur-md bg-violet-400/0 group-hover:bg-violet-400/30 transition-all duration-300 -z-10" />
          </span>
        </Link>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 md:p-12 space-y-6 sm:space-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-8 leading-tight">
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">1. Geltungsbereich</h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der KonektAI GmbH
              (nachfolgend "Anbieter") und ihren Kunden über die Erbringung von Dienstleistungen im Bereich künstliche
              Intelligenz, Softwareentwicklung und digitale Lösungen.
            </p>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">2. Vertragsabschluss</h2>
            <div className="text-sm sm:text-base text-white/80 space-y-2 leading-relaxed">
              <p>
                Der Vertrag kommt durch die Annahme eines vom Anbieter unterbreiteten Angebots durch den Kunden
                zustande. Die Annahme kann schriftlich, per E-Mail oder durch konkludentes Handeln erfolgen.
              </p>
              <p>
                Angebote des Anbieters sind freibleibend und unverbindlich, sofern nicht ausdrücklich als verbindlich
                gekennzeichnet.
              </p>
            </div>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">3. Leistungen von WirVerstehenAI </h2>
            <div className="text-sm sm:text-base text-white/80 space-y-2 leading-relaxed">
              <p>Der Anbieter erbringt folgende Dienstleistungen:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-4">
                <li>Entwicklung und Implementierung von KI-gestützten Call Agents</li>
                <li>Erstellung von Websites und Webanwendungen mit KI</li>
                <li>HR & Recruiting-Lösungen mit künstlicher Intelligenz</li>
                <li>Vertrieb &amp; Leadgenerierungs-Systeme mit KI  </li>
                <li>Wissensmanagement-Plattformen mit KI  </li>
                <li>Beratung und Support im Bereich künstliche Intelligenz</li>
              </ul>
              <p className="mt-4">
                Der genaue Leistungsumfang wird in einem individuellen Projektvertrag oder Leistungsbeschreibung
                festgelegt.
              </p>
            </div>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">4. Preise und Zahlungsbedingungen</h2>
            <div className="text-sm sm:text-base text-white/80 space-y-2 leading-relaxed">
              <p>
                Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer. Die Preise richten sich nach der
                zum Zeitpunkt des Vertragsabschlusses gültigen Preisliste oder dem individuellen Angebot.
              </p>
              <p>
                Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zur Zahlung fällig, sofern nicht
                anders vereinbart.
              </p>
              <p>
                Bei Zahlungsverzug ist der Anbieter berechtigt, Verzugszinsen in Höhe von 9 Prozentpunkten über dem
                Basiszinssatz zu berechnen.
              </p>
            </div>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">5. Mitwirkungspflichten des Kunden</h2>
            <div className="text-sm sm:text-base text-white/80 space-y-2 leading-relaxed">
              <p>Der Kunde verpflichtet sich:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-4">
                <li>
                  Alle für die Leistungserbringung erforderlichen Informationen und Unterlagen rechtzeitig
                  bereitzustellen
                </li>
                <li>Ansprechpartner zu benennen und deren Erreichbarkeit sicherzustellen</li>
                <li>Notwendige Entscheidungen zeitnah zu treffen</li>
                <li>Die erforderliche technische Infrastruktur bereitzustellen</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">6. Urheberrechte und Nutzungsrechte</h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Alle im Rahmen der Leistungserbringung erstellten Werke (Software, Designs, Konzepte, etc.) bleiben bis
              zur vollständigen Bezahlung Eigentum des Anbieters. Nach vollständiger Bezahlung erhält der Kunde die
              vereinbarten Nutzungsrechte.
            </p>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">7. Vertraulichkeit</h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Beide Parteien verpflichten sich, alle im Rahmen der Geschäftsbeziehung bekannt gewordenen vertraulichen
              Informationen streng vertraulich zu behandeln und nur für die vereinbarten Zwecke zu verwenden.
            </p>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">8. Haftung und Gewährleistung</h2>
            <div className="text-sm sm:text-base text-white/80 space-y-2 leading-relaxed">
              <p>
                Der Anbieter haftet für Vorsatz und grobe Fahrlässigkeit. Bei leichter Fahrlässigkeit haftet der
                Anbieter nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten).
              </p>
              <p>
                Die Gewährleistungsfrist beträgt 12 Monate ab Abnahme der Leistung. Der Kunde hat auftretende Mängel
                unverzüglich schriftlich anzuzeigen.
              </p>
            </div>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">9. Kündigung</h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Die Kündigungsfristen und -modalitäten werden im jeweiligen Projektvertrag festgelegt. Das Recht zur
              außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
            </p>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">10. Schlussbestimmungen</h2>
            <div className="text-sm sm:text-base text-white/80 space-y-2 leading-relaxed">
              <p>Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts.</p>
              <p>Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist Wien, sofern der Kunde Kaufmann ist.</p>
              <p>
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen
                unberührt.
              </p>
            </div>
          </section>

          <p className="text-white/60 text-xs sm:text-sm mt-6 sm:mt-8">Stand: Januar 2025</p>
        </div>
      </div>
    </div>
  )
}
