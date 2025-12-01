"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

interface Particle {
  x: number
  y: number
  speedX: number
  speedY: number
  size: number
  opacity: number
  hue: number
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const PARTICLE_COUNT = 80
    const CONNECTION_DISTANCE = 150

    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const initParticles = () => {
      particlesRef.current = []
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const exclusionRadius = 200

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let x, y
        let attempts = 0
        const maxAttempts = 50

        do {
          x = Math.random() * canvas.width
          y = Math.random() * canvas.height
          attempts++
        } while (attempts < maxAttempts && Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) < exclusionRadius)

        particlesRef.current.push({
          x,
          y,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          hue: Math.random() * 30 + 250,
        })
      }
    }

    initParticles()

    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime

      if (deltaTime >= frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval)

        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const particles = particlesRef.current

        ctx.shadowBlur = 0

        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i]

          for (let j = i + 1; j < particles.length; j++) {
            const otherParticle = particles[j]
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distanceSquared = dx * dx + dy * dy

            if (distanceSquared < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
              const distance = Math.sqrt(distanceSquared)
              const opacity = 0.35 * (1 - distance / CONNECTION_DISTANCE)

              ctx.strokeStyle = `rgba(168, 130, 255, ${opacity})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
            }
          }
        }

        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i]

          particle.x += particle.speedX
          particle.y += particle.speedY

          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const exclusionRadius = 200
          const distanceFromCenter = Math.sqrt((particle.x - centerX) ** 2 + (particle.y - centerY) ** 2)

          if (distanceFromCenter < exclusionRadius) {
            const angle = Math.atan2(particle.y - centerY, particle.x - centerX)
            particle.x = centerX + Math.cos(angle) * exclusionRadius
            particle.y = centerY + Math.sin(angle) * exclusionRadius
            particle.speedX = Math.cos(angle) * 0.5
            particle.speedY = Math.sin(angle) * 0.5
          }

          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0

          ctx.fillStyle = `rgba(180, 150, 255, ${particle.opacity})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, []) // Empty dependency array so effect only runs once

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          opacity: 0.9,
        }}
      />

      <div
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "1400px",
          height: "100vh",
          zIndex: 1,
          opacity: 0.4,
        }}
      >
        <div
          className="absolute inset-0 blur-3xl"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 50% 40%, rgba(139, 92, 246, 0.3), transparent),
              radial-gradient(ellipse 40% 30% at 50% 60%, rgba(109, 40, 217, 0.2), transparent)
            `,
          }}
        />
      </div>

      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  )
}
