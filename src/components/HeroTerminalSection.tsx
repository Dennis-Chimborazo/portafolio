// 'use client'

// import { HeroTerminal } from '@dniskav/hero-terminal'
// import type { TerminalConfig } from '@dniskav/hero-terminal'
// import { useRouter } from 'next/navigation'

// export function HeroTerminalSection() {
//   const router = useRouter()

//   const config: TerminalConfig = {
//     onNavigate: (path) => router.push(path),
//     introLines: [
//       { prompt: 'whoami', output: ['Tu Nombre', 'Estudiante de Ingeniería de Software'] },
//       { prompt: 'ls habilidades/', output: ['JavaScript', 'Python', 'React', 'Next.js'] },
//       { prompt: 'cat contacto.txt', output: ['github.com/tu-usuario', 'linkedin.com/in/tu-perfil'] },
//     ],
//     extraCommands: {
//       about: {
//         description: 'Sobre mí',
//         action: () => <p style={{ paddingLeft: '1rem', opacity: 0.8 }}>Soy un desarrollador en formación apasionado por crear experiencias web interactivas.</p>
//       },
//       proyectos: {
//         description: 'Ver proyectos',
//         action: ({ navigate }) => {
//           navigate('/proyectos')
//           return <p style={{ paddingLeft: '1rem', opacity: 0.8 }}>Navegando a proyectos…</p>
//         }
//       },
//       // Puedes añadir más comandos: cursos, pasatiempos, etc.
//     }
//   }

//   return <HeroTerminal config={config} />
// }