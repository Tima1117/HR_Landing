'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const benefits = [
  {
    title: 'Экономия времени',
    description: 'Автоматизация первичного отбора освобождает до 80% времени HR-специалистов',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-blue-500 to-telegram-blue',
  },
  {
    title: 'Работа 24/7',
    description: 'Бот работает круглосуточно, кандидаты могут проходить отбор в любое время',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Объективность',
    description: 'ИИ оценивает всех кандидатов по одним и тем же критериям без предвзятости',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-green-500 to-teal-500',
  },
  {
    title: 'Масштабируемость',
    description: 'Обрабатывайте неограниченное количество кандидатов одновременно',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Простая интеграция',
    description: 'Не нужно устанавливать дополнительное ПО — все работает в Telegram',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    color: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Доступная цена',
    description: 'Стоимость в разы ниже традиционного найма и содержания HR-отдела',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-yellow-500 to-orange-500',
  },
]

export default function Benefits() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Преимущества <span className="gradient-text">CVortex</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Комплексное решение для автоматизации найма, разработанное специально для стартапов и малого бизнеса
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Градиентный фон при наведении */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`bg-gradient-to-br ${benefit.color} text-white w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Дополнительная секция с цифрами */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 bg-gradient-to-br from-telegram-blue to-telegram-dark rounded-3xl p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Почему выбирают CVortex</h3>
            <p className="text-xl text-blue-100">Цифры говорят сами за себя</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10x</div>
              <div className="text-blue-100">Быстрее традиционного найма</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Точность скрининга</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">80%</div>
              <div className="text-blue-100">Экономия бюджета на HR</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Непрерывная работа</div>
            </div>
          </div>
        </motion.div>

        {/* CTA блок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-gray-600 mb-6">
            Готовы оптимизировать процесс найма в вашей компании?
          </p>
          <a
            href="#contact"
            className="inline-block bg-telegram-blue text-white px-10 py-4 rounded-lg btn-hover font-semibold text-lg"
          >
            Попробовать бесплатно
          </a>
        </motion.div>
      </div>
    </section>
  )
}

