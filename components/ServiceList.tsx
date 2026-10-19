"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { durations, formatPrice, services, type Duration, type Service } from "@/lib/services";
import { useBooking } from "./BookingContext";
import ServiceIcon from "./ServiceIcon";

function ServiceCard({ service, dict, locale }: { service: Service; dict: Dictionary; locale: Locale }) {
  const t = dict.services;
  const { choose } = useBooking();
  const [duration, setDuration] = useState<Duration>(60);

  function book() {
    choose({ serviceId: service.id, duration });
    document.getElementById("book")?.scrollIntoView();
  }

  return (
    <article className="reveal flex flex-col items-center bg-white px-6 pt-10 pb-6 text-center">
      <div className="grid size-24 place-items-center rounded-full border border-sage/60 text-forest">
        <ServiceIcon id={service.id} className="size-12" />
      </div>
      <div className="mt-6 flex w-full flex-1 flex-col items-center">
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

        <p className="mt-5 mb-6 font-display text-3xl font-semibold text-forest" aria-live="polite">
          {formatPrice(service.prices[duration], locale)}
        </p>
        <button type="button" onClick={book} className="mt-auto w-full border border-forest px-5 py-3 text-xs uppercase tracking-[0.2em] text-forest transition-colors hover:bg-forest hover:text-white">
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
