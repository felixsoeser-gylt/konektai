"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"
import ServicesSection from "@/components/services-section"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import AnimatedLogoBackground from "@/components/animated-logo-background"
import DataStreamOrbit from "@/components/data-stream-orbit"

export default function ShaderShowcase() {
  return (
    <div className="scroll-smooth">
      <ShaderBackground>
        <Header />
        <div className="min-h-screen relative">
          <DataStreamOrbit />
          <AnimatedLogoBackground />
          <HeroContent />
          <PulsingCircle />
        </div>
      </ShaderBackground>
      <div className="relative bg-black">
        {/* Subtle shader continuation effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-black pointer-events-none" />
        <ServicesSection />
        <div id="kontakt">
          <ContactForm />
        </div>
        <Footer />
      </div>
    </div>
  )
}
