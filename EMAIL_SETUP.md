# Настройка отправки Email

Форма обратной связи сейчас работает, но не отправляет реальные email. Для настройки отправки есть несколько вариантов:

## Вариант 1: Resend (Рекомендуется для начинающих) ⭐

[Resend](https://resend.com/) - простой и современный сервис для отправки email.

### Шаги:
1. Зарегистрируйтесь на https://resend.com
2. Получите API ключ
3. Установите пакет:
```bash
npm install resend
```

4. Создайте файл `.env.local`:
```env
RESEND_API_KEY=your_api_key_here
```

5. Обновите `/app/api/contact/route.ts`:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, phone, message } = body

    await resend.emails.send({
      from: 'CVortex <onboarding@resend.dev>',
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
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
```

**Бесплатный план:** 3000 emails/месяц

---

## Вариант 2: Nodemailer (С вашим SMTP)

Используйте свой email сервер (например, Gmail, Yandex Mail, Mail.ru)

### Шаги:
1. Установите пакет:
```bash
npm install nodemailer
```

2. Создайте `.env.local`:
```env
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=your-email@yandex.ru
SMTP_PASS=your-app-password
```

3. Обновите `/app/api/contact/route.ts`:
```typescript
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, company, email, phone, message } = body

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: 'tima_grachev@cvortex.com',
    subject: `Новая заявка от ${name}`,
    html: `...`,
  })

  return NextResponse.json({ success: true }, { status: 200 })
}
```

---

## Вариант 3: SendGrid

### Шаги:
1. Зарегистрируйтесь на https://sendgrid.com
2. Установите:
```bash
npm install @sendgrid/mail
```

3. `.env.local`:
```env
SENDGRID_API_KEY=your_api_key
```

4. Код:
```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: Request) {
  const body = await request.json()
  
  await sgMail.send({
    to: 'tima_grachev@cvortex.com',
    from: 'verified@yourdomain.com',
    subject: `Новая заявка от ${body.name}`,
    html: `...`,
  })

  return NextResponse.json({ success: true })
}
```

**Бесплатный план:** 100 emails/день

---

## Вариант 4: Formspree (Самый простой) 🚀

Без кода на бэкенде!

1. Зарегистрируйтесь на https://formspree.io
2. Создайте новую форму
3. Получите endpoint (например: `https://formspree.io/f/xyzabc`)
4. Обновите `components/Contact.tsx`:

```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
})
```

**Бесплатный план:** 50 submissions/месяц

---

## Вариант 5: Telegram Bot API (Особый вариант для вас!)

Поскольку у вас уже есть Telegram инфраструктура, можно отправлять уведомления прямо в Telegram!

1. Создайте бота через @BotFather
2. Получите token и chat_id
3. `.env.local`:
```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

4. Обновите API:
```typescript
export async function POST(request: Request) {
  const body = await request.json()
  const { name, company, email, phone, message } = body

  const text = `
🆕 Новая заявка с сайта CVortex!

👤 Имя: ${name}
🏢 Компания: ${company}
📧 Email: ${email}
📱 Телефон: ${phone || 'Не указан'}
💬 Сообщение: ${message || 'Нет сообщения'}
  `

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: text,
      parse_mode: 'HTML',
    }),
  })

  return NextResponse.json({ success: true })
}
```

---

## Рекомендация

Для вашего проекта я рекомендую:
1. **На старте**: Telegram Bot API (быстро, просто, бесплатно)
2. **Для продакшена**: Resend (профессионально, надежно, есть free tier)

После выбора варианта не забудьте добавить `.env.local` в `.gitignore` (уже добавлено)!

