'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

type Project = {
  name: string
  description: string
  stack: string[]
  summary: string[]
  repo: string
  color: string
  image: string
}

const projects: Project[] = [
  {
    name: 'Agente de seguimiento de proyectos',
    description:
      'Audita el avance en Trello, lo contrasta con la actividad de Git y envía un informe por WhatsApp.',
    stack: ['Python', 'Pydantic AI', 'Mistral', 'SQLite'],
    summary: [
      '> Revisa el avance por fase en el tablero de Trello.',
      '> Contrasta las tarjetas completadas con los commits del repositorio.',
      '> Detecta tareas sin descripción y referencias faltantes en Git.',
      '> Guarda hallazgos y recomendaciones en SQLite.',
      '> Envía un informe consolidado por WhatsApp.',
    ],
    repo: 'https://github.com/Dennis-Chimborazo/Agente.git',
    color: '#8B5CF6',
    image: '/proyectos/agente.png',
  },
  {
    name: 'Ahorro y metas financieras',
    description:
      'Aplicación para planificar el ahorro en torno a metas concretas, con seguimiento de aportes y avance.',
    stack: ['React 19', 'NestJS 11', 'TypeScript'],
    summary: [
      '> Define una meta con monto objetivo.',
      '> Registra aportes y calcula el ahorro acumulado.',
      '> Muestra el porcentaje de avance en una vista sencilla.',
      '> Estructura inicial con frontend en React y backend en NestJS.',
    ],
    repo: 'https://github.com/Dennis-Chimborazo/Ahorro-y-metas-financieras.git',
    color: '#087EA4',
    image: '/proyectos/ahorro.png',
  },
  {
    name: 'GalaxyCell',
    description:
      'Inventario de pantallas para celulares, clientes y ventas en un solo panel.',
    stack: ['Python', 'Django 6', 'Tailwind', 'HTMX', 'Alpine.js', 'PostgreSQL'],
    summary: [
      '> Controla existencias por modelo, tipo y precio.',
      '> Agrupa unidades con las mismas características en un solo registro.',
      '> Gestiona clientes con identificación, nombre y dirección.',
      '> Filtra ventas por cliente o por nombre de pantalla.',
      '> Acceso con inicio y cierre de sesión.',
    ],
    repo: 'https://github.com/Dennis-Chimborazo/GalaxyCell.git',
    color: '#10B981',
    image: '/proyectos/galaxycell.png',
  },
  {
    name: 'Gestión de Seguros',
    description:
      'De la ficha del cliente al formulario de solicitud de seguro, con vistas para administración, agentes y clientes.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    summary: [
      '> Lista, busca por cédula y edita clientes.',
      '> Selecciona titular y completa datos de dependientes.',
      '> Registra condiciones médicas y datos de facturación.',
      '> Selección de país, provincia y ciudad en formularios.',
      '> Navegación según el rol del usuario autenticado.',
    ],
    repo: 'https://github.com/Dennis-Chimborazo/Gestion-Seguros.git',
    color: '#F59E0B',
    image: '/proyectos/seguros.png',
  },
  {
    name: 'Hospital Distribuido',
    description:
      'Arquitectura para tres sedes hospitalarias en Quito, Guayaquil y Cuenca, cada una con su propia aplicación web.',
    stack: ['Vue 3', 'Next.js', 'React', 'Node.js'],
    summary: [
      '> Quito: frontend en Vue 3 con Vite.',
      '> Guayaquil y Cuenca: frontends en Next.js y React.',
      '> Gateway común como punto de entrada a los servicios.',
      '> Un paquete de backend por sede, inicializado con npm.',
      '> Estructura preparada para importación de datos.',
    ],
    repo: 'https://github.com/Dennis-Chimborazo/Hospital-Distribuido.git',
    color: '#2563EB',
    image: '/proyectos/hospital.png',
  },
  {
    name: 'ProjectReasons',
    description:
      'Portal público del grupo de investigación REASONS con panel para administrar su contenido.',
    stack: ['Angular 21', 'Express 5', 'PostgreSQL 16', 'Docker'],
    summary: [
      '> Inicio con presentación, objetivos y líneas de investigación.',
      '> Listado y fichas de proyectos y artículos científicos.',
      '> Perfiles de integrantes y enlaces a sus redes.',
      '> Panel administrativo con autenticación JWT.',
      '> API REST con Sequelize y Zod para validación.',
    ],
    repo: ' ',
    color: '#DD0031',
    image: '/proyectos/reasons.png',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45 } },
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (!hovered) {
      setVisibleCount(0)
      return
    }

    const total = project.summary.length
    setVisibleCount(0)

    intervalRef.current = setInterval(() => {
      setVisibleCount(prev => {
        if (prev >= total) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return prev
        }
        return prev + 1
      })
    }, 260)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [hovered, project.summary.length])

  return (
    <motion.a
      variants={item}
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block border rounded-lg bg-gradient-to-br from-[#111] to-[#0a0a0a] transition-colors duration-300 cursor-pointer no-underline text-white overflow-hidden"
      style={{ borderColor: hovered ? project.color : '#1f2937' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Miniatura */}
      <div className="relative h-36 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        {/* Degradado para fundir con el fondo oscuro */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.65) 70%, #0a0a0a 100%)`,
          }}
        />
        {/* Tinte del color del proyecto al hacer hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundColor: project.color,
            opacity: hovered ? 0.12 : 0,
            mixBlendMode: 'screen',
          }}
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2
            className="font-pixel text-sm md:text-base leading-relaxed"
            style={{ color: project.color }}
          >
            {project.name}
          </h2>
          <span className="text-xs font-mono text-gray-500 shrink-0">↗</span>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded border"
              style={{
                borderColor: `${project.color}50`,
                color: project.color,
                backgroundColor: `${project.color}08`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div
          className="overflow-hidden font-mono text-xs text-gray-400"
          style={{ minHeight: hovered ? 'auto' : 0 }}
        >
          {hovered &&
            project.summary.slice(0, visibleCount).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
                className="leading-relaxed"
              >
                {line}
              </motion.div>
            ))}
          {hovered && visibleCount < project.summary.length && (
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              style={{ color: project.color }}
            >
              _
            </motion.span>
          )}
        </div>
      </div>
    </motion.a>
  )
}

export function ProjectsView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      key="projects"
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
          Proyectos
        </motion.h1>

        <motion.p variants={item} className="text-gray-400 mb-8 font-mono text-sm">
          &gt; Pasa el cursor sobre cada tarjeta para ver el resumen. Haz clic para abrir el repositorio.
        </motion.p>

        <motion.div variants={container} className="grid gap-5 md:grid-cols-2">
          {projects.map(project => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}