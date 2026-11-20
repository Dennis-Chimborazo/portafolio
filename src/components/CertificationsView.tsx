'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const certifications = [
  {
    name: 'C++ Essentials 1',
    issuer: 'Cisco Networking Academy',
    description:
      'Desarrolla tus habilidades de programación en C++ y prepárate para la certificación CPE – C++ Certified Entry-Level Programmer.',
    category: 'Programación',
    pdf: '/certificados/cpp-essentials-1.pdf',
    syllabus: [
      'CPPE1: Bienvenido a C++ Essentials 1',
      'CPPE1 Módulo 1: Introducción a la programación y fundamentos de C++',
      'CPPE1 Módulo 2: Estructuras de control y tipos de datos en C++',
      'CPPE1 Módulo 3: Funciones, punteros y gestión de memoria',
      'CPPE1 Módulo 4: Manejo avanzado de datos y excepciones en C++',
      'Encuesta de fin de curso',
      'CPPE1 Examen de fin de curso',
      'CPPE1: Realizar el examen CPE',
    ],
  },
  {
    name: 'Ethical Hacker',
    issuer: 'Cisco Networking Academy',
    description:
      'Aprende el arte de la seguridad ofensiva para descubrir amenazas y vulnerabilidades antes que los ciberdelincuentes.',
    category: 'Ciberseguridad',
    pdf: '/certificados/ethical-hacker.pdf',
    syllabus: [
      'Introducción al curso',
      'Módulo 1: Introducción al hacking ético y pruebas de penetración',
      'Módulo 2: Planificación y alcance de una evaluación de penetración',
      'Módulo 3: Recolección de información y escaneo de vulnerabilidades',
      'Módulo 4: Ataques de ingeniería social',
      'Módulo 5: Explotación de redes cableadas e inalámbricas',
      'Módulo 6: Explotación de vulnerabilidades en aplicaciones',
      'Módulo 7: Seguridad en la nube, móviles e IoT',
      'Módulo 8: Técnicas de post-explotación',
      'Módulo 9: Informes y comunicación',
      'Módulo 10: Herramientas y análisis de código',
      'Actividad final integradora',
      'Encuesta de fin de curso',
      'Examen final del curso Ethical Hacker',
    ],
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } },
}

export function CertificationsView({ onBack }: { onBack: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  useEffect(() => {
    // Limpia cualquier intervalo anterior
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (openIndex === null) {
      setVisibleCount(0)
      return
    }

    const total = certifications[openIndex].syllabus.length
    setVisibleCount(0)

    intervalRef.current = setInterval(() => {
      setVisibleCount(prev => {
        if (prev >= total) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return prev
        }
        return prev + 1
      })
    }, 220)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [openIndex])

  return (
    <motion.div
      key="certificaciones"
      initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.8 }}
      animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
      exit={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', maxWidth: '900px', willChange: 'clip-path, opacity' }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full text-white font-sans"
      >
        <motion.div variants={item}>
          <button
            onClick={onBack}
            className="text-[#00ff41] hover:underline mb-8 inline-block font-mono bg-transparent border-none cursor-pointer"
          >
            &lt; Volver al inicio
          </button>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-pixel arcade-title text-3xl md:text-4xl font-bold mb-4 border-b border-[#00ff41] pb-4"
        >
          Certificaciones
        </motion.h1>

        <motion.p variants={item} className="text-gray-400 mb-12">
          Credenciales profesionales verificadas por Cisco Networking Academy.
        </motion.p>

        <motion.div variants={container} className="grid gap-6">
          {certifications.map((cert, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                variants={item}
                key={cert.name}
                className="border border-gray-800 rounded-lg bg-gradient-to-br from-[#111] to-[#0a0a0a] hover:border-[#00ff41] transition-colors duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <span className="text-xs font-mono text-[#00ff41] bg-[#00ff41]/10 px-2 py-1 rounded mb-3 inline-block">
                    {cert.category}
                  </span>
                  <h2 className="font-pixel text-lg md:text-xl mb-2">{cert.name}</h2>
                  <p className="text-sm text-gray-500 mb-3">{cert.issuer}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => toggle(index)}
                      className="text-sm font-mono px-4 py-2 border border-[#00ff41] text-[#00ff41] rounded hover:bg-[#00ff41]/10 transition-colors cursor-pointer bg-transparent"
                    >
                      {isOpen ? 'Ocultar temario ▲' : 'Ver temario ▼'}
                    </button>
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono px-4 py-2 border border-gray-600 text-gray-300 rounded hover:border-[#00ff41] hover:text-[#00ff41] transition-colors"
                    >
                      Ver PDF de la certificación ↗
                    </a>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="syllabus"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gray-800 pt-4">
                        <p className="font-pixel text-xs text-[#ffd700] mb-3 tracking-wider">
                          TEMAS DE ESTUDIO
                        </p>
                        <ul className="space-y-2 font-mono">
                          {cert.syllabus.map((topic, i) => {
                            if (i >= visibleCount) return null
                            return (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-sm text-gray-300 leading-relaxed flex gap-2"
                              >
                                <span className="text-[#00ff41] shrink-0">
                                  &gt;
                                </span>
                                <span>{topic}</span>
                              </motion.li>
                            )
                          })}
                          {visibleCount < cert.syllabus.length && (
                            <li className="text-sm text-[#00ff41] flex gap-2">
                              <span>&gt;</span>
                              <motion.span
                                animate={{ opacity: [1, 0.2, 1] }}
                                transition={{ duration: 0.9, repeat: Infinity }}
                              >
                                _
                              </motion.span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}