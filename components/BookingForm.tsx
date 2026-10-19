"use client";

import { useRef, useState } from "react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { bookingText, durations, services, timeSlots, validateBooking, type Duration } from "@/lib/services";
import { useBooking } from "./BookingContext";

// shortcut: demo has no real inbox, so email goes to a reserved .example address and
// WhatsApp opens without a number; set the client's real ones when this goes live
const EMAIL = "hello@noezz-spa.example";

const field = "w-full border border-forest/25 bg-white px-4 py-3 font-normal focus:border-forest";

export default function BookingForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.booking;
  const { choice, choose } = useBooking();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);

  function send(channel: "whatsapp" | "email") {
    const data = new FormData(formRef.current!);
    const req = {
      name: String(data.get("name") ?? ""),
      serviceId: choice.serviceId,
      duration: choice.duration,
      date: String(data.get("date") ?? ""),
      time: String(data.get("time") ?? ""),
      note: String(data.get("note") ?? ""),
    };
    const today = new Date().toLocaleDateString("en-CA"); // yyyy-mm-dd in the visitor's time zone
    const problem = validateBooking(req, t, today);
    setError(problem);
    if (problem) return;

    const text = bookingText(req, t, locale);
    if (channel === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    } else {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t.requestText)}&body=${encodeURIComponent(text)}`;
    }
  }

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()} noValidate className="grid gap-4 bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-normal">
          {t.service}
          <select value={choice.serviceId} onChange={(e) => choose({ ...choice, serviceId: e.target.value })} className={field}>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name[locale]}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-normal">
          {t.duration}
          <select value={choice.duration} onChange={(e) => choose({ ...choice, duration: Number(e.target.value) as Duration })} className={field}>
            {durations.map((d) => (
              <option key={d} value={d}>
                {d} {t.minutes}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-normal">
          {t.date}
          <input type="date" name="date" required className={field} />
        </label>
        <label className="grid gap-1.5 text-sm font-normal">
          {t.time}
          <select name="time" defaultValue="" required className={field}>
            <option value="" disabled>
              --:--
            </option>
            {timeSlots.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-normal">
        {t.name}
        <input type="text" name="name" required autoComplete="name" className={field} />
      </label>
      <label className="grid gap-1.5 text-sm font-normal">
        {t.note}
        <textarea name="note" rows={3} className={field} />
      </label>

      <p role="alert" className="min-h-6 text-sm font-medium text-red-800">
        {error}
      </p>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => send("whatsapp")} className="bg-forest px-6 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-forest-dark">
          {t.sendWhatsapp}
        </button>
        <button type="button" onClick={() => send("email")} className="border border-forest px-6 py-3 text-xs uppercase tracking-[0.2em] text-forest hover:bg-forest hover:text-white">
          {t.sendEmail}
        </button>
      </div>
      <p className="text-xs text-muted">{t.demoNote}</p>
    </form>
  );
}
