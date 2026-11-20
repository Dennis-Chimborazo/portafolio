'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fragments = Array.from({ length: 18 })

export function ContactView({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'destroying'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !message) return
    setStatus('sending')
    // Simula envío; aquí iría tu fetch real
    setTimeout(() => setStatus('success'), 900)
    setTimeout(() => setStatus('destroying'), 2000)
    setTimeout(() => onBack(), 3200)
  }

  return (
    <motion.div
      key="contact"
      initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.8 }}
      animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
      exit={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', maxWidth: '600px', willChange: 'clip-path, opacity' }}
    >
      <motion.div className="w-full text-white font-sans relative">
        <button
          onClick={onBack}
          className="text-[#00ff41] hover:underline mb-8 inline-block font-mono bg-transparent border-none cursor-pointer"
        >
          &lt; Volver al inicio
        </button>

        <h1 className="font-pixel arcade-title text-3xl md:text-4xl font-bold mb-4 border-b border-[#00ff41] pb-4">
          Contacto
        </h1>

        <p className="text-gray-400 mb-8 font-mono text-sm">
          &gt; Establece conexión. Deja tu correo y un mensaje.
        </p>

        <AnimatePresence mode="wait">
          {status !== 'destroying' && (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-mono text-[#00ff41] mb-1">
                  &gt; correo
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={status !== 'idle'}
                  placeholder="tu@email.com"
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded px-3 py-2 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff41] disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#00ff41] mb-1">
                  &gt; mensaje
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  disabled={status !== 'idle'}
                  rows={4}
                  placeholder="Escribe tu mensaje..."
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded px-3 py-2 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff41] resize-none disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={status !== 'idle' || !email || !message}
                className="w-full text-sm font-mono px-4 py-3 border border-[#00ff41] text-[#00ff41] rounded hover:bg-[#00ff41]/10 transition-colors cursor-pointer bg-transparent disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'idle' && '> ENVIAR MENSAJE'}
                {status === 'sending' && '> TRANSMITIENDO...'}
                {status === 'success' && '> MENSAJE ENVIADO'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.p
                animate={{ opacity: [1, 0.3, 1], x: [0, -2, 2, 0] }}
                transition={{ duration: 0.4, repeat: Infinity }}
                className="font-pixel text-2xl text-[#00ff41]"
                style={{ textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41' }}
              >
                ✓ MENSAJE ENVIADO
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {status === 'destroying' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {fragments.map((_, i) => {
              const angle = (i / fragments.length) * Math.PI * 2
              const distance = 120 + Math.random() * 180
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance + 80,
                    opacity: 0,
                    rotate: Math.random() * 720 - 360,
                  }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 border border-[#00ff41]"
                  style={{ backgroundColor: 'rgba(0,255,65,0.15)' }}
                />
              )
            })}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 1.4 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="font-pixel text-xl text-[#00ff41]">DESCONECTANDO...</span>
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}