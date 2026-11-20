'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { EasterEgg } from '@/components/EasterEgg'
import { HomeView } from '@/components/HomeView'
import { CertificationsView } from '@/components/CertificationsView'
import { ContactView } from '@/components/ContactView'
import { SkillsView } from '@/components/SkillsView'
import { ProjectsView } from '@/components/ProjectsView'
import { AboutView } from '@/components/AboutView'

type View = 'home' | 'certificaciones' | 'contacto'| 'skills'| 'projects'| 'about'

export default function Home() {
  const [view, setView] = useState<View>('home')

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0d0208 0%, #1a1a2e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: '"Press Start 2P", monospace',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <EasterEgg />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <HomeView
            onNavigateToCerts={() => setView('certificaciones')}
            onNavigateToContact={() => setView('contacto')}
            onNavigateToSkills={() => setView('skills')}
            onNavigateToProjects={() => setView('projects')}
            onNavigateToAbout={() => setView('about')}
          />
        )}
        {view === 'certificaciones' && (
          <CertificationsView onBack={() => setView('home')} />
        )}
        {view === 'contacto' && (
          <ContactView onBack={() => setView('home')} />
        )}
        {view === 'skills' && (
  <SkillsView onBack={() => setView('home')} />
)}
{view === 'projects' && (
  <ProjectsView onBack={() => setView('home')} />
)}
{view === 'about' && (
  <AboutView onBack={() => setView('home')} />
)}
      </AnimatePresence>
    </main>
  )
}