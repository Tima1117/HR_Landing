import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const sans = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'CVortex — ИИ-автоматизация первичного найма',
  description:
    'Скрининг резюме и автоматизированное интервью в Telegram-боте. ИИ отбирает кандидатов по вашим критериям, HR получает готовый отчёт. Освобождает до 80% времени HR.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={sans.variable}>
      <body>{children}</body>
    </html>
  )
}
