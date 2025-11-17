import { ImageResponse } from 'next/og'

// Размер изображения для Open Graph
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Генерация Open Graph изображения
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0088CC 0%, #0077B5 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              background: 'white',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '30px',
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#0088CC',
            }}
          >
            CV
          </div>
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            CVortex
          </div>
        </div>
        
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '20px',
            maxWidth: '900px',
          }}
        >
          Автоматизация найма с помощью ИИ
        </div>
        
        <div
          style={{
            fontSize: '32px',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Скрининг резюме и первичные интервью в Telegram
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: '50px',
            gap: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <div style={{ fontSize: '56px', fontWeight: 'bold' }}>80%</div>
            <div style={{ fontSize: '24px', opacity: 0.9 }}>Экономия времени</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <div style={{ fontSize: '56px', fontWeight: 'bold' }}>24/7</div>
            <div style={{ fontSize: '24px', opacity: 0.9 }}>Работа бота</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <div style={{ fontSize: '56px', fontWeight: 'bold' }}>95%</div>
            <div style={{ fontSize: '24px', opacity: 0.9 }}>Точность</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

