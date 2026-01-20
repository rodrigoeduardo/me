'use client'

import { useReducedMotion } from 'framer-motion'

interface ShinyTextProps {
  text: string
  speed?: number
  className?: string
}

export function ShinyText({ text, speed = 3, className = '' }: ShinyTextProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <span
      className={`inline-block bg-clip-text text-transparent bg-[length:200%_100%] animate-shine ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(90deg, currentColor 0%, currentColor 40%, var(--highlight) 50%, currentColor 60%, currentColor 100%)',
        animationDuration: `${speed}s`,
        WebkitBackgroundClip: 'text',
        color: 'var(--highlight)',
      }}
    >
      {text}
    </span>
  )
}
