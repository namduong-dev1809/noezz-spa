"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { durations, formatPrice, services, type Duration, type Service } from "@/lib/services";
import { photos } from "@/lib/photos";
import { useBooking } from "./BookingContext";

function ServiceCard({ service, dict, locale }: { service: Service; dict: Dictionary; locale: Locale }) {
  const t = dict.services;
  const { choose } = useBooking();
  const [duration, setDuration] = useState<Duration>(60);

  function book() {
    choose({ serviceId: service.id, duration });
    document.getElementById("book")?.scrollIntoView();
  }

  return (
    <article className="reveal flex flex-col bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={photos.services[service.id]} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-semibold text-slate">{service.name[locale]}</h3>
        <p className="mt-2 text-sm text-muted">{service.desc[locale]}</p>

        <fieldset className="mt-5">
          <legend className="text-xs uppercase tracking-widest text-muted">{t.durationLabel}</legend>
          <div className="mt-2 inline-flex border border-forest/30">
            {durations.map((d) => (
              <label key={d} className={`cursor-pointer px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-forest ${duration === d ? "bg-forest text-white" : "text-forest hover:bg-forest/10"}`}>
                <input type="radio" name={`dur-${service.id}`} value={d} checked={duration === d} onChange={() => setDuration(d)} className="sr-only" />
                {d} {t.minutes}
              </label>
            ))}
          </div>
        </fieldset>

        <p className="mt-5 font-display text-3xl font-semibold text-forest" aria-live="polite">
          {formatPrice(service.prices[duration], locale)}
        </p>
        <button type="button" onClick={book} className="mt-6 border border-forest px-5 py-3 text-xs uppercase tracking-[0.2em] text-forest transition-colors hover:bg-forest hover:text-white">
          {t.book}
        </button>
      </div>
    </article>
  );
}

export default function ServiceList({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <ServiceCard key={s.id} service={s} dict={dict} locale={locale} />
      ))}
    </div>
  );
}
