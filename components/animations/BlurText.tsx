'use client'

import { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion'

interface BlurTextProps {
  text: string
  delay?: number
  animateBy?: 'words' | 'chars'
  direction?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  onAnimationComplete?: () => void
}

export function BlurText({
  text,
  delay = 100,
  animateBy = 'words',
  direction = 'bottom',
  className = '',
  onAnimationComplete
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()
  const [completedCount, setCompletedCount] = useState(0)
  const onCompleteRef = useRef(onAnimationComplete)

  useLayoutEffect(() => {
    onCompleteRef.current = onAnimationComplete
  }, [onAnimationComplete])

  const elements = animateBy === 'words' ? text.split(' ') : text.split('')

  const getDirectionOffset = () => {
    switch (direction) {
      case 'top':
        return { y: -20 }
      case 'bottom':
        return { y: 20 }
      case 'left':
        return { x: -20 }
      case 'right':
        return { x: 20 }
      default:
        return { y: 20 }
    }
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      ...getDirectionOffset()
    },
    visible: (i: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * (delay / 1000),
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  }

  useEffect(() => {
    if (completedCount === elements.length && onCompleteRef.current) {
      onCompleteRef.current()
    }
  }, [completedCount, elements.length])

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {elements.map((element, i) => (
        <motion.span
          key={`${element}-${i}`}
          custom={i}
          variants={variants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          onAnimationComplete={() => {
            if (i === elements.length - 1) {
              setCompletedCount(elements.length)
            }
          }}
          className={animateBy === 'words' ? 'mr-[0.25em]' : ''}
          style={{ display: 'inline-block' }}
        >
          {element}
          {animateBy === 'chars' && element === ' ' && '\u00A0'}
        </motion.span>
      ))}
    </span>
  )
}
