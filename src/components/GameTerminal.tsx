'use client'

import { useState, useRef, useEffect } from 'react'

const COMMANDS: Record<string, string[]> = {
  help: [
    'Comandos disponibles:',
    '  projects  - Proyectos',
    '  certs     - Certificaciones aprobadas',
    '  skills    - Lenguajes y habilidades',
    '  about     - Sobre mí',
    '  contact   - Escribeme un mensaje',
    '  clear     - Limpiar pantalla',
  ],
  whoami: [
    'Estudiante de Ingeniería de Software',
    'Apasionado por el desarrollo web interactivo',
  ],
  skills: [
    'JavaScript / TypeScript',
    'React / Next.js',
    'Python / Flask',
    'Tailwind CSS',
  ],
  projects: ['Portafolio interactivo (este sitio)', 'Próximamente más...'],
  contact: [
    'GitHub: github.com/tu-usuario',
    'LinkedIn: linkedin.com/in/tu-perfil',
    'Email: tu@email.com',
  ],
}

export function GameTerminal({
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
  const [lines, setLines] = useState<string[]>([
    'Bienvenido. Escribe "help" para comenzar.',
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return
    if (trimmed === 'contact') {
  setLines(prev => [...prev, `> ${cmd}`, 'Abriendo canal de contacto...'])
  setTimeout(() => onNavigateToContact(), 300)
  return
}
    if (trimmed === 'certs') {
      setLines(prev => [...prev, `> ${cmd}`, 'Accediendo a certificaciones...'])
      setTimeout(() => onNavigateToCerts(), 300)
      return
    }
    if (trimmed === 'skills') {
  setLines(prev => [...prev, `> ${cmd}`, 'Cargando mapa de habilidades...'])
  setTimeout(() => onNavigateToSkills(), 300)
  return
}

if (trimmed === 'projects') {
  setLines(prev => [...prev, `> ${cmd}`, 'Cargando proyectos...'])
  setTimeout(() => onNavigateToProjects(), 300)
  return
}
if (trimmed === 'about') {
  setLines(prev => [...prev, `> ${cmd}`, 'Abriendo perfil...'])
  setTimeout(() => onNavigateToAbout(), 300)
  return
}

    if (trimmed === 'clear') {
      setLines([])
      return
    }

    const output = COMMANDS[trimmed] || [`Comando no encontrado: ${trimmed}`]
    setLines(prev => [...prev, `> ${cmd}`, ...output])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        background: '#0a0a0a',
        border: '2px solid #00ff41',
        borderRadius: '4px',
        padding: '1rem',
        fontFamily: '"Courier New", monospace',
        fontSize: '14px',
        color: '#00ff41',
        height: '320px',
        overflowY: 'auto',
        cursor: 'text',
        boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
      }}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
          {line}
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
        <span style={{ marginRight: '8px' }}>&gt;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#00ff41',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            flex: 1,
          }}
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  )
}