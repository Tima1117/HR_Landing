'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1E9EDB]">
      {/* Анимированный фон */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Большой логотип в центре */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-24 h-24 mr-4">
              <Image
                src="/Лого_белое.png"
                alt="CVortex Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-7xl md:text-8xl font-bold text-white">CVortex</h1>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Автоматизация найма с помощью <span className="text-white">ИИ</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Скрининг резюме и первичные интервью в Telegram. 
              Сэкономьте до 80% времени на подборе персонала.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-white text-telegram-blue px-8 py-4 rounded-lg btn-hover font-semibold text-lg text-center"
              >
                Начать бесплатно
              </a>
              <a
                href="#how-it-works"
                className="border-2 border-white text-white px-8 py-4 rounded-lg btn-hover font-semibold text-lg text-center hover:bg-white hover:text-telegram-blue transition-colors"
              >
                Узнать больше
              </a>
            </div>
            
            {/* Статистика */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">80%</div>
                <div className="text-sm text-gray-300 mt-1">Экономия времени</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-300 mt-1">Работа бота</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-gray-300 mt-1">Точность анализа</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Иллюстрация */}
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="space-y-4">
                {/* Имитация интерфейса бота */}
                <div className="bg-white rounded-lg p-4 shadow-lg animate-slide-up">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-telegram-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">CVortex Bot</div>
                      <div className="text-gray-600 mt-1">Здравствуйте! Я помогу вам пройти отбор на вакансию "Frontend Developer"</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-telegram-blue rounded-lg p-4 ml-auto max-w-xs shadow-lg animate-slide-up delay-100">
                  <div className="text-white">Отправил резюме</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-lg animate-slide-up delay-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-telegram-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">CVortex Bot</div>
                      <div className="text-gray-600 mt-1">✅ Ваше резюме прошло скрининг! Перейдем к интервью?</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Декоративные элементы */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-telegram-light rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full blur-2xl opacity-50 animate-pulse delay-500"></div>
          </motion.div>
        </div>
      </div>

      {/* Стрелка вниз */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a href="#how-it-works" className="text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}

