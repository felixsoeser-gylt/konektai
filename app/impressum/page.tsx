"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"

export default function ImpressumPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-violet-950/30 via-purple-950/20 to-black pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 py-16">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="relative">
            Zurück zur Startseite
            <span className="absolute inset-0 blur-md bg-violet-400/0 group-hover:bg-violet-400/30 transition-all duration-300 -z-10" />
          </span>
        </Link>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Impressum</h1>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Angaben gemäß § 5 TMG</h2>
            <div className="text-white/80 space-y-2">
              <p className="font-semibold text-white">KonektAI e.U. </p>
              <p>Andreas-Hofer-Gasse 31 / 3 </p>
              <p>4800 Attnang-Puchheim </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Vertreten durch</h2>
            <p className="text-white/80">Geschäftsführer: Felix Söser </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Kontakt</h2>
            <div className="text-white/80 space-y-2">
              <p>E-Mail: soeser@konektai.at</p>
              <p>Telefon: +43 680 4412871 </p>
            </div>
          </section>

          <section className="space-y-4">{/* Additional section can be added here if needed */}</section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Aufsichtsbehörde</h2>
            <p className="text-white/80">Bezirkshauptmannschaft Vöcklabruck</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Haftungsausschluss</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Haftung für Inhalte</h3>
                <p className="text-white/80">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
                  und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir
                  gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Haftung für Links</h3>
                <p className="text-white/80">
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss
                  haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                  verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Urheberrecht</h3>
                <p className="text-white/80">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                  österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
                  jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
