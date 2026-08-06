'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { DEMO } from '@/lib/data'

/* Живая демонстрация продукта в первом экране.
   Скилл ui-ux-pro-max для AI/Chatbot-платформ прямо рекомендует паттерн
   «Interactive Product Demo» и разговорный интерфейс со стриминговым текстом —
   поэтому сердце лендинга не картинка, а работающий диалог: продукт
   показывает себя сам.

   Важное: при prefers-reduced-motion весь сценарий показывается сразу
   целиком. Пользователь, отключивший анимации, не должен ждать печати. */
export default function ChatDemo() {
  const still = useReducedMotion()
  const [shown, setShown] = useState(still ? DEMO.length : 0)
  const [typing, setTyping] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (still || !boxRef.current) return
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting || started.current) return
      started.current = true
      let i = 0
      const tick = () => {
        if (i >= DEMO.length) {
          // Цикл: подождать и начать заново — иначе демо «умирает» после
          // первого прохода и на неё уже неинтересно смотреть.
          setTimeout(() => { setShown(0); i = 0; setTimeout(tick, 700) }, 4200)
          return
        }
        const isBot = DEMO[i].from === 'bot'
        setTyping(isBot)
        setTimeout(() => {
          setTyping(false)
          setShown(++i)
          setTimeout(tick, isBot ? 1100 : 700)
        }, isBot ? 900 : 300)
      }
      tick()
    }, { threshold: 0.3 })
    io.observe(boxRef.current)
    return () => io.disconnect()
  }, [still])

  // Скроллим ленту к последнему сообщению
  useEffect(() => {
    const el = boxRef.current?.querySelector('[data-feed]')
    if (el) el.scrollTop = el.scrollHeight
  }, [shown, typing])

  return (
    <div ref={boxRef} className="relative mx-auto w-full max-w-[420px]">
      {/* свечение под окном чата */}
      <div className="absolute -inset-6 rounded-[36px] bg-indigo-500/15 blur-3xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10
                      bg-slate-950/80 shadow-[0_30px_90px_-25px_rgba(0,0,0,.9)] backdrop-blur-xl">
        {/* шапка окна */}
        <div className="flex items-center gap-3 border-b border-white/[.07] px-5 py-4">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold">
            CV
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold">CVortex&nbsp;Bot</div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              на связи 24/7
            </div>
          </div>
        </div>

        {/* лента сообщений */}
        <div data-feed className="h-[360px] space-y-3 overflow-y-auto px-5 py-5">
          <AnimatePresence initial={false}>
            {DEMO.slice(0, shown).map((m, i) => (
              <motion.div
                key={i}
                initial={still ? false : { opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
                className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                    m.from === 'user'
                      ? 'rounded-br-md bg-indigo-500 text-white'
                      : 'rounded-bl-md border border-white/[.07] bg-white/[.06] text-slate-200'
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/[.07] bg-white/[.06] px-4 py-3.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* строка ввода — неактивная, это витрина, а не рабочий чат */}
        <div className="flex items-center gap-2 border-t border-white/[.07] px-5 py-3.5">
          <div className="flex-1 rounded-full bg-white/[.05] px-4 py-2 text-[13px] text-slate-500">
            Сообщение…
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-500">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
