'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 transition-opacity duration-300">
            <Image
              src={scrolled ? '/Лого_синее.png' : '/Лого_белое.png'}
              alt="CVortex Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className={`text-xl sm:text-2xl font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            CVortex
          </span>
        </div>
        
        {/* Desktop Navigation */}
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
            href="#faq"
            className={`transition-colors hover:text-telegram-blue ${scrolled ? 'text-gray-700' : 'text-white'}`}
          >
            FAQ
          </a>
          <a
            href="#contact"
            className={`transition-colors hover:text-telegram-blue ${scrolled ? 'text-gray-700' : 'text-white'}`}
          >
            Контакты
          </a>
        </nav>

        {/* Desktop CTA Button */}
        <a
          href="#contact"
          className="hidden md:block bg-telegram-blue text-white px-6 py-2 rounded-lg btn-hover font-medium"
        >
          Попробовать
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 w-full transition-all ${scrolled ? 'bg-gray-900' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-full transition-all ${scrolled ? 'bg-gray-900' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-full transition-all ${scrolled ? 'bg-gray-900' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 border-t' : 'max-h-0'
        } ${scrolled ? 'bg-white border-gray-200' : 'bg-telegram-blue/95 backdrop-blur-lg border-white/20'}`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a
            href="#how-it-works"
            onClick={closeMobileMenu}
            className={`transition-colors py-2 ${scrolled ? 'text-gray-700 hover:text-telegram-blue' : 'text-white hover:text-blue-200'}`}
          >
            Как работает
          </a>
          <a
            href="#benefits"
            onClick={closeMobileMenu}
            className={`transition-colors py-2 ${scrolled ? 'text-gray-700 hover:text-telegram-blue' : 'text-white hover:text-blue-200'}`}
          >
            Преимущества
          </a>
          <a
            href="#faq"
            onClick={closeMobileMenu}
            className={`transition-colors py-2 ${scrolled ? 'text-gray-700 hover:text-telegram-blue' : 'text-white hover:text-blue-200'}`}
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={closeMobileMenu}
            className={`transition-colors py-2 ${scrolled ? 'text-gray-700 hover:text-telegram-blue' : 'text-white hover:text-blue-200'}`}
          >
            Контакты
          </a>
          <a
            href="#contact"
            onClick={closeMobileMenu}
            className="bg-telegram-blue text-white px-6 py-3 rounded-lg font-medium text-center mt-2"
          >
            Попробовать
          </a>
        </nav>
      </div>
    </header>
  )
}

