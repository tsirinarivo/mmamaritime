'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })
  const shouldReduceMotion = useReducedMotion()

  const initial: Record<string, number | string> = { opacity: 0 }
  if (!shouldReduceMotion) {
    if (direction === 'up') initial.y = 28
    if (direction === 'left') initial.x = -28
    if (direction === 'right') initial.x = 28
  }

  const animate: Record<string, number | string> = isInView
    ? { opacity: 1, y: 0, x: 0 }
    : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.03, 0.26, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
