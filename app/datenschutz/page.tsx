"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"

export default function DatenschutzPage() {
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
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 mb-8 sm:mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="relative text-sm sm:text-base">
            Zurück zur Startseite
            <span className="absolute inset-0 blur-md bg-violet-400/0 group-hover:bg-violet-400/30 transition-all duration-300 -z-10" />
          </span>
        </Link>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 md:p-12 space-y-6 sm:space-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-8">
            Datenschutzerklärung
          </h1>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">1. Allgemeine Hinweise</h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
              passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
              persönlich identifiziert werden können.
            </p>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">2. Verantwortlicher Anbieter</h2>
            <div className="text-white/80 text-sm sm:text-base space-y-2 leading-relaxed">
              <p className="font-semibold text-white">WirVerstehenAI e. U.   </p>
              <p>Andreas-Hofer-Gasse 31 </p>
              <p>4800 Attnang-Puchheim, Österreich</p>
              <p className="mt-4">E-Mail: soeser@wirverstehen.ai </p>
              <p>Telefon: +43 680 4412871 </p>
            </div>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">3. Datenerfassung auf unserer Website</h2>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Wer ist verantwortlich für die Datenerfassung?
                </h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                  können Sie dem Impressum dieser Website entnehmen.
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Wie erfassen wir Ihre Daten?</h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B.
                  um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch beim Besuch
                  der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B.
                  Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Wofür nutzen wir Ihre Daten?</h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                  Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">4. Cookies</h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät
              speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
              Einige Cookies sind "Session-Cookies." Solche Cookies werden nach Ende Ihrer Browser-Sitzung von selbst
              gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen.
            </p>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              5. Analyse-Tools und Tools von Drittanbietern
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor
              allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der
              Regel anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden.
            </p>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">6. Ihre Rechte</h2>
            <div className="text-white/80 text-sm sm:text-base space-y-2 leading-relaxed">
              <p>Sie haben jederzeit das Recht:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 sm:ml-4">
                <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten</li>
                <li>Berichtigung unrichtiger personenbezogener Daten zu verlangen</li>
                <li>Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
                <li>Einschränkung der Datenverarbeitung zu verlangen</li>
                <li>Widerspruch gegen die Verarbeitung Ihrer Daten einzulegen</li>
                <li>Datenübertragbarkeit zu verlangen</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">7. Kontakt für Datenschutzanfragen</h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Für Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte wenden Sie sich bitte an:
            </p>
            <div className="text-white/80 text-sm sm:text-base space-y-2 leading-relaxed">
              <p>E-Mail: soeser@wirverstehen.ai</p>
              <p>Telefon: +43 680 4412871 </p>
            </div>
          </section>

          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              8. Beschwerderecht bei der Aufsichtsbehörde
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
              personenbezogenen Daten durch uns zu beschweren.
            </p>
          </section>

          <p className="text-white/60 text-xs sm:text-sm mt-6 sm:mt-8">Stand: Januar 2025</p>
        </div>
      </div>
    </div>
  )
}
