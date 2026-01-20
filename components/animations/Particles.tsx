'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface ParticlesProps {
  particleCount?: number
  particleColors?: string[]
  speed?: number
  particleSize?: number
  moveParticlesOnHover?: boolean
  alphaParticles?: boolean
  className?: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  targetAlpha: number
}

export function Particles({
  particleCount = 60,
  particleColors = ['#22d3ee', '#67e8f9', '#a5f3fc', '#cffafe'],
  speed = 0.05,
  particleSize = 3,
  moveParticlesOnHover = true,
  alphaParticles = true,
  className = '',
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect()
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        size: Math.random() * particleSize + 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: alphaParticles ? Math.random() * 0.5 + 0.2 : 1,
        targetAlpha: alphaParticles ? Math.random() * 0.5 + 0.2 : 1,
      }))
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      particlesRef.current.forEach((particle) => {
        // Mouse interaction
        if (moveParticlesOnHover && mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            particle.vx -= (dx / distance) * force * 0.02
            particle.vy -= (dy / distance) * force * 0.02
          }
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Apply friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Add slight random movement
        particle.vx += (Math.random() - 0.5) * speed * 0.5
        particle.vy += (Math.random() - 0.5) * speed * 0.5

        // Wrap around edges
        if (particle.x < 0) particle.x = rect.width
        if (particle.x > rect.width) particle.x = 0
        if (particle.y < 0) particle.y = rect.height
        if (particle.y > rect.height) particle.y = 0

        // Fade alpha
        if (alphaParticles) {
          particle.alpha += (particle.targetAlpha - particle.alpha) * 0.01
          if (Math.abs(particle.alpha - particle.targetAlpha) < 0.01) {
            particle.targetAlpha = Math.random() * 0.5 + 0.2
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      initParticles()
    })

    if (moveParticlesOnHover) {
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      if (moveParticlesOnHover) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [
    particleCount,
    particleColors,
    speed,
    particleSize,
    moveParticlesOnHover,
    alphaParticles,
    prefersReducedMotion,
  ])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
