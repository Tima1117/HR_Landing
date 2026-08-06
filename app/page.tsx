'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Reveal, GridGlow, Glow, Counter, Magnetic, Scramble, ScrollMarquee } from '@/components/ui'
import ChatDemo from '@/components/ChatDemo'
import { initScroll, parallax, scrubWords, pinnedTrack } from '@/lib/scroll'
import { CONTACTS, STEPS, BENEFITS, FAQ, METRICS } from '@/lib/data'

/* ───────────────────────── шапка ───────────────────────── */
function Header() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setStuck(window.scrollY > 40)
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const links = [['Как работает', '#how'], ['Возможности', '#benefits'], ['Вопросы', '#faq']]
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500
      ${stuck ? 'border-b border-white/[.07] bg-ink/80 backdrop-blur-xl' : ''}`}>
      <div className="shell flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-iris to-violet-600 text-xs">CV</span>
          CVortex
        </a>
        <nav className="hidden gap-8 text-sm text-slate-400 md:flex">
          {links.map(([t, h]) => (
            <a key={h} href={h} className="transition-colors hover:text-slate-100">{t}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-solid hidden sm:inline-flex">Попробовать</a>
          <button onClick={() => setOpen(!open)} aria-label="Меню"
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/[.12] md:hidden">
            <span className="block h-px w-4 bg-slate-100 shadow-[0_-5px_0_#f1f5f9,0_5px_0_#f1f5f9]" />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/[.07] bg-ink/95 backdrop-blur-xl md:hidden">
          <div className="shell flex flex-col py-3">
            {links.map(([t, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-slate-300">{t}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-solid mt-3 justify-center">Попробовать</a>
          </div>
        </div>
      )}
    </header>
  )
}

/* ───────────────────────── первый экран ───────────────────────── */
function Hero() {
  const copy = useRef<HTMLDivElement>(null)
  useEffect(() => { parallax(copy.current, -60) }, [])
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10vw] -top-[12vw] h-[46vw] w-[46vw] rounded-full blur-[120px]
                        bg-[radial-gradient(circle,rgba(99,102,241,.22),transparent_66%)]" />
        <div className="absolute -right-[8vw] top-[36vh] h-[38vw] w-[38vw] rounded-full blur-[120px]
                        bg-[radial-gradient(circle,rgba(124,58,237,.18),transparent_66%)]" />
      </div>
      <GridGlow />

      <div className="shell relative grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
        <div ref={copy}>
          <Reveal><div className="eyebrow mb-6">ИИ-рекрутер в Telegram</div></Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-[clamp(34px,5.4vw,68px)] font-bold leading-[1.03] tracking-[-.03em]">
              Первичный отбор<br />
              <span className="bg-gradient-to-r from-iris via-iris-soft to-violet-400 bg-clip-text text-transparent">
                без участия HR
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[48ch] text-[clamp(15px,1.5vw,18px)] leading-relaxed text-slate-400">
              Бот принимает резюме, отсеивает неподходящих и проводит интервью по вашим вопросам.
              HR открывает CMS и видит готовые оценки — вместо сотни одинаковых созвонов.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic href="#contact" className="btn btn-solid">
                Попробовать бесплатно
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Magnetic>
              <Magnetic href="#how" className="btn btn-ghost">Как это работает</Magnetic>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-wrap gap-10">
              {METRICS.map((m) => (
                <div key={m.label}>
                  <div className="text-[clamp(26px,3vw,38px)] font-bold tracking-tight">
                    <Counter to={m.v} suffix={m.suffix} />
                  </div>
                  <div className="mt-1 max-w-[16ch] text-xs leading-snug text-slate-500">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18}><ChatDemo /></Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── как работает: закреплённая лента ───────────────────────── */
function How() {
  const sec = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const head = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    scrubWords(head.current)
    pinnedTrack(sec.current, track.current)
  }, [])
  const HEAD = 'Шесть шагов от создания вакансии до готового отчёта по каждому кандидату.'
  return (
    <section id="how" ref={sec} className="relative overflow-hidden py-24">
      <div className="shell">
        <div className="eyebrow mb-6">Как работает</div>
        <p ref={head} className="h-sec max-w-[24ch]">
          {HEAD.split(' ').map((w, i) => (
            <span key={i} data-w className="mr-[.26em] inline-block">{w}</span>
          ))}
        </p>
      </div>
      <div ref={track} className="mt-14 flex gap-5 px-[max(4vw,calc((100vw-1200px)/2))] lg:w-max">
        {STEPS.map((s) => (
          <Glow key={s.n} className="w-[min(84vw,340px)] shrink-0 p-8">
            <div className="text-5xl font-bold text-iris/[.25]">{s.n}</div>
            <h3 className="mt-5 text-xl font-semibold">{s.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.d}</p>
          </Glow>
        ))}
      </div>
    </section>
  )
}

/* ───────────────────────── возможности: бенто ───────────────────────── */
const SPANS = [
  'md:col-span-4', 'md:col-span-2',
  'md:col-span-2', 'md:col-span-2', 'md:col-span-2',
  'md:col-span-6',
]
function Benefits() {
  return (
    <section id="benefits" className="py-24">
      <div className="shell">
        <Reveal>
          <div className="eyebrow mb-6">Возможности</div>
          <h2 className="h-sec max-w-[18ch]"><Scramble text="Что это даёт команде" /></h2>
        </Reveal>
        {/* Сетка на 6 колонок: 4+2 / 2+2+2 / 6. Прежний вариант из трёх колонок
            с двумя широкими карточками давал 8 ячеек — ряды не сходились и
            справа внизу зияла дыра. */}
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.t} delay={0.04 * (i % 3)} className={SPANS[i]}>
              <Glow className="h-full p-8">
                <h3 className="text-xl font-semibold">{b.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{b.d}</p>
              </Glow>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── вопросы ───────────────────────── */
function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="py-24">
      <div className="shell max-w-[880px]">
        <Reveal>
          <div className="eyebrow mb-6">Вопросы</div>
          <h2 className="h-sec"><Scramble text="Часто спрашивают" /></h2>
        </Reveal>
        <div className="mt-10">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={0.03 * i}>
              <div className="border-b border-white/[.07]">
                <button onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left">
                  <span className="text-[clamp(16px,1.8vw,20px)] font-semibold">{f.q}</span>
                  <span className={`grid h-8 w-8 flex-none place-items-center rounded-lg border transition-all duration-300
                    ${open === i ? 'rotate-45 border-iris bg-iris text-white' : 'border-white/[.12] text-iris-soft'}`}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                <motion.div initial={false}
                  animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
                  className="overflow-hidden">
                  <p className="pb-6 leading-relaxed text-slate-400">{f.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── заявка ───────────────────────── */
function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <section id="contact" className="py-24">
      <div className="shell">
        <Glow className="p-8 md:p-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_.85fr]">
            <div>
              <div className="eyebrow mb-6">Связаться</div>
              <h2 className="h-sec max-w-[16ch]"><Scramble text="Покажем на ваших вакансиях" /></h2>
              <p className="mt-5 max-w-[42ch] leading-relaxed text-slate-400">
                Оставьте контакты — соберём демо под вашу позицию и покажем, как ИИ отсеивает
                кандидатов по вашим критериям.
              </p>
              <div className="mt-9 space-y-3 text-sm">
                <a href={`mailto:${CONTACTS.email}`} className="block text-slate-300 transition-colors hover:text-iris-soft">
                  {CONTACTS.email}
                </a>
                <a href={CONTACTS.phoneHref} className="block text-slate-300 transition-colors hover:text-iris-soft">
                  {CONTACTS.phone}
                </a>
                <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer"
                   className="block text-slate-300 transition-colors hover:text-iris-soft">
                  Telegram
                </a>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
              {[['Имя', 'text', 'Как к вам обращаться'], ['Компания', 'text', 'Название'],
                ['Контакт', 'text', 'Почта или телефон']].map(([l, t, ph]) => (
                <label key={l} className="block">
                  <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.14em] text-slate-500">{l}</span>
                  <input required type={t} placeholder={ph}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-[15px]
                               outline-none transition-all placeholder:text-slate-600
                               focus:border-iris focus:ring-2 focus:ring-iris/[.25]" />
                </label>
              ))}
              <button type="submit" className="btn btn-solid w-full justify-center">
                {sent ? 'Заявка отправлена' : 'Отправить заявку'}
              </button>
              {sent && (
                <p className="rounded-xl border border-iris/[.25] bg-iris/10 px-4 py-3 text-sm text-iris-soft">
                  Спасибо! Свяжемся в ближайшее время.
                </p>
              )}
            </form>
          </div>
        </Glow>
      </div>
    </section>
  )
}

/* ───────────────────────── страница ───────────────────────── */
export default function Page() {
  useEffect(() => initScroll(), [])
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 })

  return (
    <div id="top">
      <motion.div style={{ scaleX: bar }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-iris to-violet-500" />
      <Header />
      <main>
        <Hero />
        <div className="border-y border-white/[.07] bg-white/[.015] py-6">
          <ScrollMarquee baseVelocity={-2.4}
            className="mr-10 text-[clamp(20px,3.4vw,42px)] font-bold tracking-tight text-white/[.09]">
            {'Скрининг резюме · Автоинтервью · Оценка ответов · Отчёт в CMS · Telegram-бот · '}
          </ScrollMarquee>
        </div>
        <How />
        <Benefits />
        <Faq />
        <Contact />
      </main>
      <footer className="border-t border-white/[.07] py-12">
        <div className="shell flex flex-wrap items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2.5 font-bold text-slate-300">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-iris to-violet-600 text-[10px] text-white">CV</span>
            CVortex
          </div>
          <div>ИИ-автоматизация первичного найма</div>
          <a href={`mailto:${CONTACTS.email}`} className="transition-colors hover:text-iris-soft">{CONTACTS.email}</a>
        </div>
      </footer>
    </div>
  )
}
