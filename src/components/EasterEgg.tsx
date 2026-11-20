'use client'

import Keyquence from 'react-keyquence'
import { useState } from 'react'

export function EasterEgg() {
  const [activated, setActivated] = useState(false)

  const handleActivate = () => {
    setActivated(true)
    document.body.style.transition = 'filter 0.5s'
    document.body.style.filter = 'hue-rotate(180deg)'
    setTimeout(() => {
      document.body.style.filter = ''
      setActivated(false)
    }, 3000)
  }

  return (
    <>
      <Keyquence
        sequences={[
          {
            keys: 'arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightba',
            onDetect: handleActivate,
          },
        ]}
      />
      {activated && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#00ff41',
          color: '#000',
          padding: '12px 24px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          zIndex: 9999,
          border: '2px solid #000',
        }}>
          🎮 CHEAT MODE ACTIVADO 🎮
        </div>
      )}
    </>
  )
}