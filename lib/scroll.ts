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

/* Горизонтальная лента в закреплённой секции. */
export function pinnedTrack(section: HTMLElement | null, track: HTMLElement | null) {
  if (!section || !track || still() || innerWidth < 900) return
  const shift = () => Math.max(0, track.scrollWidth - innerWidth + 80)
  // fromTo с явным x:0, а не to: иначе GSAP берёт за старт текущее значение,
  // и при неверном замере лента приезжает уже прокрученной — видны сразу
  // последние карточки, а первые обрезаны слева.
  gsap.fromTo(track, { x: 0 }, {
    x: () => -shift(), ease: 'none', immediateRender: false,
    scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + shift(),
      pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 } })
}
