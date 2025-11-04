"use client"

import { useEffect, useRef } from "react"

export default function DataStreamOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = 600 * dpr
      canvas.height = 600 * dpr
      canvas.style.width = "600px"
      canvas.style.height = "600px"
      ctx.scale(dpr, dpr)
    }
    updateSize()

    // Particle system
    interface Particle {
      angle: number
      radius: number
      speed: number
      size: number
      opacity: number
    }

    const particles: Particle[] = []
    const numOrbits = 3
    const particlesPerOrbit = 8

    // Create particles on different orbital rings
    for (let orbit = 0; orbit < numOrbits; orbit++) {
      const radius = 120 + orbit * 40
      const speed = 0.3 + orbit * 0.1

      for (let i = 0; i < particlesPerOrbit; i++) {
        particles.push({
          angle: (i / particlesPerOrbit) * Math.PI * 2,
          radius,
          speed: speed * (Math.random() > 0.5 ? 1 : -1), // Some clockwise, some counter-clockwise
          size: 2 + Math.random() * 2,
          opacity: 0.6 + Math.random() * 0.3,
        })
      }
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, 600, 600)

      const centerX = 300
      const centerY = 300

      // Draw orbital paths (faint circles)
      for (let orbit = 0; orbit < numOrbits; orbit++) {
        const radius = 120 + orbit * 40
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 - orbit * 0.03})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Update and draw particles
      particles.forEach((particle) => {
        // Update angle
        particle.angle += particle.speed * 0.01

        // Calculate position
        const x = centerX + Math.cos(particle.angle) * particle.radius
        const y = centerY + Math.sin(particle.angle) * particle.radius

        // Draw particle
        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`
        ctx.fill()

        // Draw trailing line
        const prevAngle = particle.angle - 0.3
        const prevX = centerX + Math.cos(prevAngle) * particle.radius
        const prevY = centerY + Math.sin(prevAngle) * particle.radius

        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = `rgba(139, 92, 246, ${particle.opacity * 0.5})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
      style={{ willChange: "transform" }}
    >
      <canvas
        ref={canvasRef}
        className="opacity-85"
        style={{
          width: "600px",
          height: "600px",
        }}
      />
    </div>
  )
}
