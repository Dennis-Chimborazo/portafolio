'use client'

import { motion } from 'framer-motion'

type Social = {
  name: string
  handle: string
  description: string
  url: string
  color: string
  icon: React.ReactNode
}

const socials: Social[] = [
  {
    name: 'GitHub',
    handle: '@Dennis-Chimborazo',
    description:
      'Repositorios de proyectos, código fuente y experimentos de desarrollo.',
    url: 'https://github.com/Dennis-Chimborazo',
    color: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'Dennis Chimborazo',
    description:
      'Perfil profesional, experiencia, formación y contacto directo.',
    url: 'https://www.linkedin.com/in/dennis-chimborazo-3b9934450/',
    color: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 2.99V21h-4V9Z" />
      </svg>
    ),
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45 } },
}

export function AboutView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      key="about"
      initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.8 }}
      animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
      exit={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', maxWidth: '800px', willChange: 'clip-path, opacity' }}
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
          Sobre mí
        </motion.h1>

        <motion.p variants={item} className="text-gray-300 leading-relaxed mb-8 font-mono text-sm">
          &gt; Estudiante de Ingeniería de Software apasionado por el desarrollo web
          interactivo. Aquí puedes encontrar mis perfiles profesionales y el código
          de mis proyectos.
        </motion.p>

        <motion.div variants={container} className="grid gap-5 md:grid-cols-2">
          {socials.map(social => (
            <motion.a
              key={social.name}
              variants={item}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group block border rounded-lg p-6 bg-gradient-to-br from-[#111] to-[#0a0a0a] no-underline text-white transition-colors duration-300"
              style={{ borderColor: '#1f2937' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = social.color
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#1f2937'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-lg"
                  style={{
                    backgroundColor: `${social.color}15`,
                    color: social.color,
                    boxShadow: `0 0 12px ${social.color}40`,
                  }}
                >
                  {social.icon}
                </span>
                <div>
                  <h2
                    className="font-pixel text-base md:text-lg"
                    style={{ color: social.color === '#ffffff' ? '#e5e7eb' : social.color }}
                  >
                    {social.name}
                  </h2>
                  <p className="text-xs font-mono text-gray-500 mt-1">{social.handle}</p>
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {social.description}
              </p>

              <span
                className="text-xs font-mono inline-flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: social.color === '#ffffff' ? '#e5e7eb' : social.color }}
              >
                Abrir perfil ↗
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}