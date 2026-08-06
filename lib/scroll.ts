import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* Инерционный скролл + scrub-анимации.
   Lenis обязан быть связан с тикером GSAP: без общего тикера они считают
   позицию по-разному и всё дёргается. */
export function initScroll() {
  if (typeof window === 'undefined') return () => {}
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  gsap.registerPlugin(ScrollTrigger)
  const lenis = new Lenis({
    duration: 1.05,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  // Шрифты грузятся асинхронно и сдвигают вёрстку. Без пересчёта ScrollTrigger
  // держит замеры от первого кадра, и закреплённая лента едет не туда.
  const refresh = () => ScrollTrigger.refresh()
  document.fonts?.ready.then(refresh)
  addEventListener('load', refresh)

  return () => {
    removeEventListener('load', refresh)
    gsap.ticker.remove(tick)
    lenis.destroy()
    ScrollTrigger.getAll().forEach((t) => t.kill())
  }
}

const still = () =>
  typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export function parallax(el: HTMLElement | null, y = -70) {
  if (!el || still()) return
  gsap.to(el, { y, ease: 'none',
    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
}

/* Пословное проявление. Стартовая непрозрачность 0.12, а не 0 — при любом
   сбое текст остаётся различим. */
export function scrubWords(el: HTMLElement | null) {
  if (!el) return
  const words = el.querySelectorAll('[data-w]')
  if (!words.length) return
  if (still()) { gsap.set(words, { opacity: 1 }); return }
  gsap.fromTo(words, { opacity: 0.12 }, {
    opacity: 1, ease: 'none', stagger: 0.3,
    scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 55%', scrub: 0.5 } })
}

/* Горизонтальная лента в закреплённой секции.

   Дважды ломалось, поэтому подробно. Симптом был такой: подходишь к секции —
   лента уже прокручена до конца и обратно не отматывается.

   Причина. Длина прокрутки считается как `scrollWidth - innerWidth`. Если
   замерить это до того, как применилась вёрстка и догрузились шрифты, выходит
   ноль или отрицательное число. Тогда `end: "+=0"` — триггер нулевой длины:
   прогресс мгновенно становится единицей и назад уже не идёт.

   Лечение:
   1. Ставим триггер только после `fonts.ready` и одного кадра — к этому моменту
      ширины настоящие.
   2. Если прокручивать нечего (лента уже помещается), триггер НЕ создаём вовсе,
      а делаем ленту обычной горизонтальной прокруткой — работает всегда.
   3. Пересчёт при ресайзе и обновлении. */
export function pinnedTrack(section: HTMLElement | null, track: HTMLElement | null) {
  if (!section || !track || still() || innerWidth < 900) {
    if (track) track.classList.add('overflow-x-auto')   // запасной режим
    return
  }

  const setup = () => {
    const shift = track.scrollWidth - innerWidth + 80
    if (shift < 80) {
      // Прокручивать нечего — пин создаст мёртвую зону. Оставляем обычную ленту.
      track.classList.add('overflow-x-auto')
      return
    }
    gsap.fromTo(track, { x: 0 }, {
      x: () => -(track.scrollWidth - innerWidth + 80),
      ease: 'none', immediateRender: false,
      scrollTrigger: {
        trigger: section, start: 'top top',
        end: () => '+=' + (track.scrollWidth - innerWidth + 80),
        pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
      },
    })
    ScrollTrigger.refresh()
  }

  // Ждём шрифты и один кадр: до этого ширины ещё не настоящие.
  const boot = () => requestAnimationFrame(setup)
  if (document.fonts?.status === 'loaded') boot()
  else document.fonts?.ready.then(boot) ?? boot()
}
