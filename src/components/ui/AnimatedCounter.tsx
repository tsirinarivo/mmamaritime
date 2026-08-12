'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface AnimatedCounterProps {
  target: string
  duration?: number
}

export default function AnimatedCounter({ target, duration = 2000 }: AnimatedCounterProps) {
  const [display, setDisplay] = useState('0')
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Extract numeric portion and suffix/prefix
  const numericMatch = target.match(/[\d,.]+/)
  const numericStr = numericMatch ? numericMatch[0].replace(',', '.') : ''
  const numericValue = parseFloat(numericStr)
  const prefix = target.slice(0, numericMatch?.index ?? 0)
  const suffix = numericMatch
    ? target.slice((numericMatch.index ?? 0) + numericMatch[0].length)
    : ''

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          observer.disconnect()

          if (isNaN(numericValue) || shouldReduceMotion) {
            setDisplay(isNaN(numericValue) ? target : (Number.isInteger(numericValue) ? String(numericValue) : numericValue.toFixed(1)))
            return
          }

          const start = performance.now()
          const isInt = Number.isInteger(numericValue)

          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = numericValue * eased
            setDisplay(isInt ? Math.floor(current).toString() : current.toFixed(1))
            if (progress < 1) requestAnimationFrame(animate)
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [numericValue, duration, hasAnimated, target])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
