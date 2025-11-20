'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const faqs = [
  {
    id: 1,
    question: 'Как быстро можно начать использовать CVortex?',
    answer: 'Вы можете начать использовать CVortex сразу после регистрации. Создание первой вакансии займет не более 10 минут. Наша команда поможет с настройкой и интеграцией Telegram-бота в течение одного рабочего дня.',
  },
  {
    id: 2,
    question: 'Насколько точен скрининг резюме с помощью ИИ?',
    answer: 'Точность нашей системы составляет 95%. ИИ анализирует резюме по множеству параметров: опыт работы, навыки, образование, ключевые слова. Система постоянно обучается и улучшает свои показатели на основе ваших решений о кандидатах.',
  },
  {
    id: 3,
    question: 'Можно ли настроить вопросы для интервью под свою компанию?',
    answer: 'Да, абсолютно! Вы полностью контролируете процесс интервью. При создании вакансии вы можете добавить любые вопросы, установить временные ограничения на ответы и даже задать эталонные ответы для более точной оценки.',
  },
  {
    id: 4,
    question: 'Как кандидаты попадают в сервис?',
    answer: 'Через любую прежнюю воронку кандидат получает специальную ссылку на телеграмм бот, которая генерируется уникально под каждую вакансию.',
  },
  {
    id: 5,
    question: 'Какая стоимость использования CVortex?',
    answer: 'Мы предлагаем гибкие тарифные планы под разные нужды. Есть бесплатный пробный период на 14 дней для полноценного тестирования системы. После этого стоимость зависит от количества вакансий и кандидатов. Свяжитесь с нами для подбора оптимального тарифа.',
  },
]

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
  const { ref, isVisible } = useScrollAnimation(0.1)

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Часто задаваемые <span className="gradient-text">вопросы</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Ответы на популярные вопросы о работе с CVortex
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-base sm:text-lg font-semibold text-gray-900 pr-4 sm:pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-telegram-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-4 sm:pb-6 text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA после FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-gray-600 mb-6">
            Не нашли ответ на свой вопрос?
          </p>
          <a
            href="#contact"
            className="inline-block bg-telegram-blue text-white px-10 py-4 rounded-lg btn-hover font-semibold text-lg"
          >
            Свяжитесь с нами
          </a>
        </motion.div>
      </div>
    </section>
  )
}

