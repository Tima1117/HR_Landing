import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* О компании */}
          <div className="sm:col-span-2 md:col-span-2">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/Лого_белое.png"
                  alt="CVortex Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold">CVortex</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-4">
              Автоматизация первичного найма с помощью искусственного интеллекта. 
              Скрининг резюме и интервью в Telegram для стартапов и малого бизнеса.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://t.me/Tima_a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-telegram-blue rounded-lg flex items-center justify-center hover:bg-telegram-light transition-colors"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>
              <a
                href="mailto:a_rogovoy@bk.ru"
                className="w-10 h-10 bg-telegram-blue rounded-lg flex items-center justify-center hover:bg-telegram-light transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Навигация</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  Как работает
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-gray-400 hover:text-white transition-colors">
                  Преимущества
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:a_rogovoy@bk.ru" className="hover:text-white transition-colors">
                  a_rogovoy@bk.ru
                </a>
              </li>
              <li>
                <a href="tel:+79169000671" className="hover:text-white transition-colors">
                  +7 (916) 900 06 71
                </a>
              </li>
              <li>
                <a href="https://t.me/Tima_a" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  @Tima_a
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm">
              © {currentYear} CVortex. Все права защищены.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-400 text-center">
              <a href="#" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

