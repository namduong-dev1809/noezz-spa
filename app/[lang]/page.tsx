import Image from "next/image";
import { getDictionary, getLocale } from "./dictionaries";
import { photos } from "@/lib/photos";
import LangSwitch from "@/components/LangSwitch";
import Leaf from "@/components/Leaf";
import ServiceList from "@/components/ServiceList";
import BookingForm from "@/components/BookingForm";
import { BookingProvider } from "@/components/BookingContext";

const PHONE_HREF = "tel:+840000000000"; // demo placeholder, not a real line
const SISTERS = [
  { name: "Noezz Homestay", href: "https://noezz-homestay.vercel.app" },
  { name: "Noezz Coffee", href: "https://noezz-coffee.vercel.app" },
];

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.3em] text-forest">{children}</p>;
}

export default async function Home() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const links = [
    { href: "#services", label: dict.nav.services },
    { href: "#why", label: dict.nav.why },
    { href: "#offer", label: dict.nav.offer },
    { href: "#book", label: dict.nav.book },
  ];

  return (
    <BookingProvider>
      <p className="bg-forest px-4 py-2 text-center text-xs tracking-wide text-white">{dict.demo}</p>
      <header className="sticky top-0 z-40 border-b border-forest/10 bg-sand/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-display text-2xl font-semibold text-forest">
            <Leaf className="h-8 w-6" /> Noezz Spa
          </a>
          <nav aria-label="Main" className="hidden gap-6 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-xs uppercase tracking-widest text-muted hover:text-forest">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <LangSwitch label={dict.nav.switchTo} />
            <a href="#book" className="hidden bg-forest px-4 py-2 text-xs uppercase tracking-widest text-white hover:bg-forest-dark sm:inline-block">
              {dict.nav.book}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="top" className="relative overflow-hidden">
          <Leaf className="pointer-events-none absolute -left-10 top-10 h-72 text-sage/60" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
            <div className="relative">
              <Kicker>{dict.hero.kicker}</Kicker>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.1] text-slate sm:text-6xl">{dict.hero.title}</h1>
              <p className="mt-6 max-w-md text-lg text-muted">{dict.hero.text}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#book" className="bg-forest px-7 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-forest-dark">
                  {dict.hero.ctaBook}
                </a>
                <a href="#services" className="border border-forest px-7 py-3 text-xs uppercase tracking-[0.2em] text-forest hover:bg-forest hover:text-white">
                  {dict.hero.ctaServices}
                </a>
              </div>
            </div>
            {/* arched frame echoes the soft, rounded shapes of a spa room */}
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-full">
              <Image src={photos.hero} alt="" fill priority sizes="(min-width: 768px) 450px, 100vw" className="object-cover" />
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#ecefe7] py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="reveal text-center">
              <Kicker>{dict.services.kicker}</Kicker>
              <h2 className="mt-3 font-display text-4xl font-semibold text-slate sm:text-5xl">{dict.services.title}</h2>
            </div>
            <div className="mt-12">
              <ServiceList dict={dict} locale={locale} />
            </div>
            <p className="mt-8 text-center text-sm text-muted">{dict.services.note}</p>
          </div>
        </section>

        <section id="why" className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 md:grid-cols-2">
          <div className="reveal relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full">
            <Image src={photos.why} alt="" fill sizes="(min-width: 768px) 400px, 100vw" className="object-cover" />
          </div>
          <div>
            <div className="reveal">
              <Kicker>{dict.why.kicker}</Kicker>
              <h2 className="mt-3 font-display text-4xl font-semibold text-slate sm:text-5xl">{dict.why.title}</h2>
            </div>
            <ul className="mt-8 grid gap-6">
              {dict.why.items.map((item, i) => (
                <li key={item.title} className="reveal flex gap-5">
                  <span className="font-display text-3xl font-semibold text-sage">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-slate">{item.title}</h3>
                    <p className="mt-1 text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="offer" className="relative isolate overflow-hidden bg-forest text-white">
          <Image src={photos.offer} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-15" />
          <div className="reveal mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-sage">{dict.offer.kicker}</p>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">{dict.offer.title}</h2>
            <p className="mt-4 text-white/85">{dict.offer.text}</p>
            <a href="#book" className="mt-8 inline-block border border-white px-7 py-3 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-forest">
              {dict.offer.cta}
            </a>
          </div>
        </section>

        <section id="book" className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="reveal">
            <Kicker>{dict.booking.kicker}</Kicker>
            <h2 className="mt-3 font-display text-4xl font-semibold text-slate sm:text-5xl">{dict.booking.title}</h2>
            <p className="mt-4 text-muted">{dict.booking.intro}</p>
            <dl className="mt-10 grid gap-5">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted">{dict.visit.hoursLabel}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-slate">{dict.visit.hours}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted">{dict.visit.addressLabel}</dt>
                <dd className="mt-1">{dict.visit.address}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted">{dict.visit.phoneLabel}</dt>
                <dd className="mt-1">{dict.visit.phone}</dd>
              </div>
            </dl>
            <iframe
              title="Map: An Thuong, Da Nang"
              src="https://www.google.com/maps?q=An+Thuong,+Ngu+Hanh+Son,+Da+Nang&output=embed"
              className="mt-8 aspect-[4/3] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="reveal">
            <BookingForm dict={dict} locale={locale} />
          </div>
        </section>
      </main>

      <footer className="border-t border-forest/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-display text-2xl font-semibold text-forest">Noezz Spa</p>
            <p>{dict.footer.tagline}</p>
          </div>
          <p>
            {dict.footer.family}{" "}
            {SISTERS.map((s, i) => (
              <span key={s.href}>
                {i > 0 && " · "}
                <a href={`${s.href}/${locale}`} className="underline hover:text-forest">
                  {s.name}
                </a>
              </span>
            ))}
            <br />
            {dict.footer.madeBy}{" "}
            <a href="https://duongthanhnam.vercel.app" className="underline hover:text-forest">
              Duong Thanh Nam
            </a>{" "}
            · Photos: Unsplash
          </p>
        </div>
      </footer>

      {/* floating hotline, like most Vietnamese spa sites */}
      <a
        href={PHONE_HREF}
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-forest px-4 py-3 text-sm text-white shadow-lg hover:bg-forest-dark"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
        </svg>
        {dict.nav.hotline}
      </a>
    </BookingProvider>
  );
}
