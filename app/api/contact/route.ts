import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, phone, message } = body

    // Валидация
    if (!name || !company || !email) {
      return NextResponse.json(
        { error: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      )
    }

    // Email валидация
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Некорректный email адрес' },
        { status: 400 }
      )
    }

    // Здесь можно интегрировать отправку email через:
    // 1. SendGrid
    // 2. Nodemailer
    // 3. Resend
    // 4. AWS SES
    // 5. Mailgun
    // и т.д.

    // Пример данных для отправки
    const emailData = {
      to: 'tima_grachev@cvortex.com',
      subject: `Новая заявка от ${name} (${company})`,
      html: `
        <h2>Новая заявка с сайта CVortex</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Компания:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone || 'Не указан'}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message || 'Нет сообщения'}</p>
      `,
      text: `
Новая заявка с сайта CVortex

Имя: ${name}
Компания: ${company}
Email: ${email}
Телефон: ${phone || 'Не указан'}
Сообщение: ${message || 'Нет сообщения'}
      `,
    }

    // TODO: Здесь добавить реальную отправку через email сервис
    console.log('Email data:', emailData)

    // Для тестирования возвращаем успех
    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.' },
      { status: 500 }
    )
  }
}

