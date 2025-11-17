'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Benefits from '@/components/Benefits'
import Contact from '@/components/Contact'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className={`min-h-screen bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Contact />
      <Footer />
    </main>
  )
}

