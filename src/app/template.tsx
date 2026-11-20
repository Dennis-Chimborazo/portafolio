'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.8 }}
        animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
        exit={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.8 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen"
        style={{ willChange: 'clip-path, opacity' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}