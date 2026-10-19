# Noezz Spa — demo website

A one-page, bilingual (Vietnamese / English) landing page for a **fictional** herbal spa in Da Nang. Third demo of the Noezz family: [Noezz Homestay](https://github.com/namduong-dev1809/noezz-homestay) · [Noezz Coffee](https://github.com/namduong-dev1809/noezz-coffee).

> Noezz Spa is not a real business. Address, phone number and prices are sample content. Photos are from [Unsplash](https://unsplash.com).

## Features

- **Price cards with a 60 / 90 minute switch**: the price updates as you choose
- **"Book this" pre-fills the booking form** with the treatment and duration you picked
- **Booking form without a backend**: checks name, date and time, rejects past dates, then opens WhatsApp or the email app with the request written out
- Hotline button that stays on screen, botanical line art, fade-in on scroll
- `/vi` (default) and `/en` routes, mobile-first layout

## Tech

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · deployed on Vercel

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # prices, time slots and booking checks
```

## Where things are

| Path | What it holds |
|---|---|
| `lib/services.ts` | Treatments, prices, time slots, booking checks |
| `app/[lang]/dictionaries/*.json` | All other text, one file per language |
| `app/[lang]/page.tsx` | The page sections |
| `components/` | Price cards, booking form and the context that links them |

Made by [Duong Thanh Nam](https://duongthanhnam.vercel.app).
