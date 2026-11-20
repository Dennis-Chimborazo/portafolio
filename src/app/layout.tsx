import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dennis Chimborazo | Portafolio',
  description: 'Portafolio interactivo de Dennis Chimborazo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}