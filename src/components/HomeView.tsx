'use client'

import { motion } from 'framer-motion'
import { GameTerminal } from '@/components/GameTerminal'

export function HomeView({
  onNavigateToCerts,
  onNavigateToContact,
  onNavigateToSkills,
    onNavigateToProjects,
  onNavigateToAbout,
}: {
  onNavigateToCerts: () => void
  onNavigateToContact: () => void
  onNavigateToSkills: () => void
    onNavigateToProjects: () => void
  onNavigateToAbout: () => void
}) {
  return (
    <motion.div
      key="home"
      initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.8 }}
      animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
      exit={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        willChange: 'clip-path, opacity',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div
          className="font-pixel"
          style={{
            fontSize: '12px',
            color: '#ffd700',
            letterSpacing: '4px',
            marginBottom: '16px',
          }}
        >
          PLAYER 1
        </div>
        <h1
          className="font-pixel arcade-title"
          style={{ fontSize: 'clamp(24px, 5vw, 48px)', margin: 0, lineHeight: 1.4 }}
        >
          Dennis Chimborazo
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: '#aaa',
            marginTop: '16px',
            letterSpacing: '2px',
          }}
        >
          ESTUDIANTE DE INGENIERÍA DE SOFTWARE
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '700px' }}>
            <GameTerminal
            onNavigateToCerts={onNavigateToCerts}
            onNavigateToContact={onNavigateToContact}
            onNavigateToSkills={onNavigateToSkills}
            onNavigateToProjects={onNavigateToProjects}
            onNavigateToAbout={onNavigateToAbout}
            />
      </div>

      <p
        style={{
          marginTop: '2rem',
          fontSize: '10px',
          color: '#555',
          textAlign: 'center',
        }}
      >
        ↑↑↓↓←→←→BA
      </p>
    </motion.div>
  )
}