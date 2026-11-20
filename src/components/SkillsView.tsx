'use client'

import { motion } from 'framer-motion'

type Level = 'bajo' | 'medio'

type Language = {
  name: string
  level: Level
  color: string
  branches: { name: string; type: 'framework' | 'librería' }[]
}

const languages: Language[] = [
  {
    name: 'Python',
    level: 'medio',
    color: '#3776AB',
    branches: [
      { name: 'Flask', type: 'librería' },
      { name: 'Django', type: 'framework' },
    ],
  },
  {
    name: 'JavaScript',
    level: 'medio',
    color: '#F7DF1E',
    branches: [
      { name: 'React', type: 'librería' },
      { name: 'Angular', type: 'framework' },
      { name: 'Node', type: 'librería' },
      { name: 'NestJS', type: 'framework' },
    ],
  },
  { name: 'Java', level: 'medio', color: '#ED8B00', branches: [] },
  { name: 'Kotlin', level: 'medio', color: '#7F52FF', branches: [] },
  { name: 'C++', level: 'bajo', color: '#00599C', branches: [] },
  { name: 'Go', level: 'bajo', color: '#00ADD8', branches: [] },
  { name: 'Rust', level: 'bajo', color: '#DEA584', branches: [] },
]

const levelLabel: Record<Level, string> = { bajo: 'Bajo', medio: 'Medio' }
const levelPercent: Record<Level, number> = { bajo: 35, medio: 65 }

export function SkillsView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      key="skills"
      initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.8 }}
      animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
      exit={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', maxWidth: '900px', willChange: 'clip-path, opacity' }}
    >
      <div className="w-full text-white font-sans">
        <button
          onClick={onBack}
          className="text-[#00ff41] hover:underline mb-8 inline-block font-mono bg-transparent border-none cursor-pointer"
        >
          &lt; Volver al inicio
        </button>

        <h1 className="font-pixel arcade-title text-3xl md:text-4xl font-bold mb-4 border-b border-[#00ff41] pb-4">
          Lenguajes y Habilidades
        </h1>

        <p className="text-gray-400 mb-8 font-mono text-sm">
          &gt; Mapa de tecnologías dominadas y sus ramificaciones.
        </p>

        {/* Panel de lenguajes con nivel */}
        <div className="grid gap-3 md:grid-cols-2 mb-10">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              className="border rounded-lg p-4 bg-[#0a0a0a]"
              style={{ borderColor: `${lang.color}40` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: lang.color, boxShadow: `0 0 8px ${lang.color}` }}
                  />
                  <span className="font-mono text-sm">{lang.name}</span>
                </div>
                <span className="font-pixel text-[10px]" style={{ color: lang.color }}>
                  {levelLabel[lang.level]}
                </span>
              </div>
              <div className="h-1.5 rounded bg-gray-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelPercent[lang.level]}%` }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: 'easeOut' }}
                  className="h-full rounded"
                  style={{ backgroundColor: lang.color, boxShadow: `0 0 10px ${lang.color}` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Árbol de ramificaciones en formato de filas */}
        <div className="border border-gray-800 rounded-lg p-6 bg-[#0a0a0a]">
          <p className="font-pixel text-xs text-[#ffd700] mb-6 tracking-wider">
            ÁRBOL DE TECNOLOGÍAS
          </p>

          <div className="flex flex-col gap-4">
            {languages
              .filter(lang => lang.branches.length > 0)
              .map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
                >
                  {/* Nodo del lenguaje */}
                  <div
                    className="shrink-0 w-full md:w-44 flex items-center gap-2 rounded-md border px-3 py-2"
                    style={{
                      borderColor: `${lang.color}60`,
                      backgroundColor: `${lang.color}10`,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: lang.color, boxShadow: `0 0 6px ${lang.color}` }}
                    />
                    <span className="font-mono text-sm" style={{ color: lang.color }}>
                      {lang.name}
                    </span>
                  </div>

                  {/* Conector */}
                  <div className="hidden md:flex items-center shrink-0">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 32 }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.3 }}
                      className="h-px"
                      style={{ backgroundColor: `${lang.color}80` }}
                    />
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.2 }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 24 }}
                      transition={{ delay: 0.9 + i * 0.15, duration: 0.3 }}
                      className="h-px"
                      style={{ backgroundColor: `${lang.color}80` }}
                    />
                  </div>

                  {/* Ramas */}
                  <div className="flex flex-wrap gap-2">
                    {lang.branches.map((branch, j) => (
                      <motion.span
                        key={branch.name}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 + i * 0.15 + j * 0.08, duration: 0.3 }}
                        className="text-xs font-mono px-3 py-1.5 rounded border"
                        style={{
                          borderColor: `${lang.color}50`,
                          color: lang.color,
                          backgroundColor: `${lang.color}08`,
                        }}
                        title={branch.type}
                      >
                        {branch.name}
                        <span className="ml-1.5 text-[9px] opacity-60">
                          {branch.type === 'framework' ? 'fw' : 'lib'}
                        </span>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800 flex flex-wrap gap-4 text-[10px] font-mono text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff41]" /> Lenguaje
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-2 border border-[#00ff41] rounded" /> Framework / Librería
            </span>
            <span className="text-gray-600">fw = framework · lib = librería</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}