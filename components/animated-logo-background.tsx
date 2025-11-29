"use client"

import { useState, useEffect } from "react"

export default function AnimatedLogoBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(1)

  useEffect(() => {
    const img = new Image()
    img.src = "/images/geometric-head-logo.png"
    img.onload = () => {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const fadeStart = 100 // Start fading after 100px
      const fadeEnd = 300 // Fully transparent at 300px

      if (scrollY <= fadeStart) {
        setScrollOpacity(1)
      } else if (scrollY >= fadeEnd) {
        setScrollOpacity(0)
      } else {
        const opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart)
        setScrollOpacity(opacity)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isLoaded) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      style={{
        animation: "floatLogo 10s ease-in-out infinite",
        willChange: "transform, opacity",
        opacity: scrollOpacity,
        transition: "opacity 0.1s ease-out",
        transform: "translate(-50%, -50%) translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        perspective: 1000,
        WebkitPerspective: 1000,
      }}
    >
      <img
        src="/images/geometric-head-logo.png"
        alt=""
        style={{
          width: "auto",
          maxWidth: "360px",
          opacity: 0.25,
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          filter: "none",
        }}
      />
    </div>
  )
}
