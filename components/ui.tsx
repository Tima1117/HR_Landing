'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/* Появление при скролле.
   Наблюдателем управляет сам framer (whileInView) — ручная связка useInView +
   setState на прошлых лендингах намертво оставляла блоки в opacity:0.
   Плюс через секунду скрытие снимается принудительно: видимость контента не
   должна зависеть от того, отработала анимация или нет. */
export function Reveal({
  children, delay = 0, y = 24, className = '',
}: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const still = useReducedMotion()
  const [armed, setArmed] = useState(true)
  useEffect(() => {
    const id = setTimeout(() => setArmed(false), 1000)
    return () => clearTimeout(id)
  }, [])
  if (still || !armed) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -5% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* SVG-сетка со свечением за курсором.
   Основа — Modern Hero section с 21st.dev (uniquesonu). Что изменено:
   сетка рисуется программно вместо простыни готовых <rect>, палитра переведена
   на индиго под AI-эстетику, добавлено отключение при prefers-reduced-motion,
   а слушатель мыши повешен на сам блок, а не на window — иначе свечение ползло
   за курсором по всей странице, включая секции ниже. */
export function GridGlow({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState({ x: -600, y: -600 })
  const still = useReducedMotion()

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      onMouseMove={(e) => {
        if (still) return
        const r = ref.current!.getBoundingClientRect()
        setP({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      style={{ pointerEvents: still ? 'none' : 'auto' }}
    >
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="cv-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M56 0H0V56" fill="none" stroke="rgba(148,163,184,.10)" strokeWidth="1" />
          </pattern>
          <radialGradient id="cv-fade">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="cv-mask">
            <rect width="100%" height="100%" fill="url(#cv-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#cv-grid)" mask="url(#cv-mask)" />
      </svg>
      {!still && (
        <div
          className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full
                     bg-[radial-gradient(circle,rgba(99,102,241,.18),transparent_66%)] blur-2xl
                     transition-opacity duration-500"
          style={{ left: p.x, top: p.y }}
        />
      )}
    </div>
  )
}

/* Карточка с подсветкой за курсором и лёгким подъёмом. */
export function Glow({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState({ x: -400, y: -400 })
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        setP({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      onMouseLeave={() => setP({ x: -400, y: -400 })}
      className={`group relative overflow-hidden rounded-3xl border border-white/[.08]
                  bg-white/[.025] transition-all duration-500
                  hover:-translate-y-1 hover:border-indigo-400/[.35] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(400px circle at ${p.x}px ${p.y}px, rgba(99,102,241,.16), transparent 62%)` }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

/* Счётчик. Анимируем только значения от 10 — на мелких числах промежуточный
   кадр читается как настоящая цифра (уже стреляло на прошлом лендинге). */
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const still = useReducedMotion()
  const [n, setN] = useState(to < 10 || still ? to : 0)
  const ref = useRef<HTMLSpanElement>(null)
  const fired = useRef(false)

  useEffect(() => {
    if (to < 10 || still || !ref.current) return
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting || fired.current) return
      fired.current = true
      let cur = 0
      const step = Math.ceil(to / 26)
      const id = setInterval(() => {
        cur += step
        if (cur >= to) { setN(to); clearInterval(id) } else setN(cur)
      }, 26)
    }, { threshold: 0.5 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [to, still])

  return <span ref={ref}>{n}{suffix}</span>
}
