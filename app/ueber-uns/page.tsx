import Link from "next/link"
import { ArrowLeft, Target, Users, Lightbulb, Award } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Über uns - KonektAI",
  description: "Erfahren Sie mehr über KonektAI und unser Team",
}

export default function UeberUnsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black text-white overflow-hidden">
      <Header />

      <main className="relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Zurück zur Startseite
          </Link>

          {/* Hero section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-6 tracking-tight">
              Über{" "}
              <span className="font-medium italic instrument bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                KonektAI
              </span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Wir verbinden Unternehmen mit der Zukunft der künstlichen Intelligenz
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-12">
            {/* Mission */}
            <section className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-violet-500/20 border border-violet-500/30">
                  <Target className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-3">Unsere Mission</h2>
                  <p className="text-white/80 leading-relaxed">
                    Bei KonektAI glauben wir daran, dass künstliche Intelligenz nicht nur ein Werkzeug, sondern ein
                    strategischer Partner für Unternehmen sein sollte. Unsere Mission ist es, maßgeschneiderte
                    KI-Lösungen zu entwickeln, die echten Mehrwert schaffen und Geschäftsprozesse nachhaltig
                    transformieren.
                  </p>
                </div>
              </div>
            </section>

            {/* Team */}
            <section className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-3">Unser Team</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Wir sind ein interdisziplinäres Team aus KI-Experten, Softwareentwicklern und Unternehmensberatern
                    mit Sitz in Wien. Unsere Expertise erstreckt sich über Machine Learning, Natural Language
                    Processing, Computer Vision und moderne Webentwicklung.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Jedes Teammitglied bringt jahrelange Erfahrung in der Entwicklung und Implementierung von
                    KI-Lösungen für Unternehmen verschiedenster Branchen mit.
                  </p>
                </div>
              </div>
            </section>

            {/* Innovation */}
            <section className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-violet-500/20 border border-violet-500/30">
                  <Lightbulb className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-3">Innovation & Technologie</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Wir setzen auf modernste Technologien und bleiben stets am Puls der Zeit. Von Large Language Models
                    über Computer Vision bis hin zu Predictive Analytics – wir beherrschen das gesamte Spektrum der
                    KI-Technologien.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Unsere Lösungen sind nicht nur technologisch fortschrittlich, sondern auch praktisch umsetzbar und
                    auf die spezifischen Bedürfnisse unserer Kunden zugeschnitten.
                  </p>
                </div>
              </div>
            </section>

            {/* Values */}
            <section className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-3">Unsere Werte</h2>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400 mt-1">•</span>
                      <span>
                        <strong className="text-white">Qualität:</strong> Wir liefern nur Lösungen, die höchsten
                        Qualitätsstandards entsprechen
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400 mt-1">•</span>
                      <span>
                        <strong className="text-white">Transparenz:</strong> Offene Kommunikation und klare Prozesse
                        sind uns wichtig
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400 mt-1">•</span>
                      <span>
                        <strong className="text-white">Innovation:</strong> Wir bleiben neugierig und entwickeln uns
                        ständig weiter
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400 mt-1">•</span>
                      <span>
                        <strong className="text-white">Partnerschaft:</strong> Wir sehen uns als langfristiger Partner
                        unserer Kunden
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-white/80 mb-6">Möchten Sie mehr über uns erfahren oder ein Projekt starten?</p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50"
            >
              Kontaktieren Sie uns
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
