'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 transition-opacity duration-300">
            <Image
              src={scrolled ? '/Лого_синее.png' : '/Лого_белое.png'}
              alt="CVortex Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className={`text-2xl font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            CVortex
          </span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a
            href="#how-it-works"
            className={`transition-colors hover:text-telegram-blue ${scrolled ? 'text-gray-700' : 'text-white'}`}
          >
            Как работает
          </a>
          <a
            href="#benefits"
            className={`transition-colors hover:text-telegram-blue ${scrolled ? 'text-gray-700' : 'text-white'}`}
          >
            Преимущества
          </a>
          <a
            href="#contact"
            className={`transition-colors hover:text-telegram-blue ${scrolled ? 'text-gray-700' : 'text-white'}`}
          >
            Контакты
          </a>
        </nav>

        <a
          href="#contact"
          className="bg-telegram-blue text-white px-6 py-2 rounded-lg btn-hover font-medium"
        >
          Попробовать
        </a>
      </div>
    </header>
  )
}

