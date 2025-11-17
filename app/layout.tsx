import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'CVortex - Автоматизация найма с ИИ',
  description: 'Автоматизация первичного найма: скрининг резюме и интервью с помощью искусственного интеллекта. Идеально для стартапов и малого бизнеса.',
  keywords: 'HR, рекрутинг, автоматизация, ИИ, скрининг резюме, интервью, Telegram бот',
  authors: [{ name: 'CVortex Team' }],
  creator: 'CVortex',
  publisher: 'CVortex',
  metadataBase: new URL('https://cvortex-landing.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://cvortex-landing.vercel.app',
    title: 'CVortex - Автоматизация найма с ИИ',
    description: 'Автоматизация первичного найма: скрининг резюме и интервью с помощью искусственного интеллекта. Экономьте до 80% времени на подборе персонала.',
    siteName: 'CVortex',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CVortex - Автоматизация найма с ИИ',
    description: 'Автоматизация первичного найма: скрининг резюме и интервью с помощью искусственного интеллекта.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

