import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

export function useScrollAnimation(threshold: number = 0.1) {
  const [ref, inView] = useInView({ threshold })
  const [isVisible, setIsVisible] = useState(false)
  const lastScrollY = useRef(0)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY.current
      
      if (inView) {
        // Элемент в зоне видимости - всегда показываем
        setIsVisible(true)
      } else if (!inView && elementRef.current) {
        // Элемент вне зоны видимости - проверяем его позицию
        const rect = elementRef.current.getBoundingClientRect()
        const elementAboveViewport = rect.bottom < 0
        const elementBelowViewport = rect.top > window.innerHeight
        
        if (scrollingDown && elementAboveViewport) {
          // Скроллим вниз, элемент остался сверху - оставляем видимым
          setIsVisible(true)
        } else if (!scrollingDown && elementBelowViewport) {
          // Скроллим вверх, элемент остался внизу - скрываем
          setIsVisible(false)
        } else if (scrollingDown && elementBelowViewport) {
          // Скроллим вниз, элемент еще не появился - скрываем
          setIsVisible(false)
        } else if (!scrollingDown && elementAboveViewport) {
          // Скроллим вверх, элемент остался сверху - показываем
          setIsVisible(true)
        }
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Проверяем при маунте
    if (inView) {
      setIsVisible(true)
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [inView])

  // Объединяем ref из useInView с нашим ref для получения элемента
  const combinedRef = (node: HTMLElement | null) => {
    elementRef.current = node
    ref(node)
  }

  return { ref: combinedRef, isVisible }
}

