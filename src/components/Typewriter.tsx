'use client'
import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export function Typewriter({
  text,
  className = '',
  speed = 2.5,
  onComplete,
}: {
  text: string
  className?: string
  speed?: number
  onComplete?: () => void
}) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest))

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: 'tween',
      duration: speed,
      ease: 'easeInOut',
      onComplete,
    })
    return controls.stop
  }, [text, speed, count, onComplete])

  return <motion.span className={className}>{displayText}</motion.span>
}