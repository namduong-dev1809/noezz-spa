// Services and prices: the owner edits only this list.
export type Locale = "en" | "vi";
export type Duration = 60 | 90;

export type Service = {
  id: string;
  prices: Record<Duration, number>; // VND
  name: Record<Locale, string>;
  desc: Record<Locale, string>;
};

export const durations: Duration[] = [60, 90];

export const services: Service[] = [
  { id: "body", prices: { 60: 350000, 90: 480000 },
    name: { vi: "Massage body tinh dầu", en: "Aromatherapy body massage" },
    desc: { vi: "Tinh dầu sả chanh và oải hương, lực vừa, thả lỏng toàn thân.", en: "Lemongrass and lavender oils, medium pressure, full-body release." } },
  { id: "stone", prices: { 60: 420000, 90: 560000 },
    name: { vi: "Massage đá nóng", en: "Hot stone massage" },
    desc: { vi: "Đá bazan ấm đặt dọc lưng, làm mềm cơ sâu.", en: "Warm basalt stones along the back to soften deep muscles." } },
  { id: "head", prices: { 60: 250000, 90: 350000 },
    name: { vi: "Gội đầu dưỡng sinh", en: "Herbal head spa" },
    desc: { vi: "Gội thảo dược bồ kết, massage cổ vai gáy.", en: "Herbal soapberry wash with neck and shoulder massage." } },
  { id: "facial", prices: { 60: 380000, 90: 520000 },
    name: { vi: "Chăm sóc da mặt", en: "Signature facial" },
    desc: { vi: "Làm sạch, tẩy tế bào chết, đắp mặt nạ nghệ mật ong.", en: "Cleanse, exfoliate and a turmeric-honey mask." } },
  { id: "combo", prices: { 60: 590000, 90: 750000 },
    name: { vi: "Combo Noezz", en: "Noezz combo" },
    desc: { vi: "Massage body, chườm túi thảo dược và gội đầu dưỡng sinh.", en: "Body massage, herbal compress and head spa in one session." } },
];

// shortcut: fixed rate for the € hint on the English page, update it when prices change
const VND_PER_EUR = 30000;

export function formatPrice(vnd: number, locale: Locale): string {
  if (locale === "vi") return `${vnd.toLocaleString("de-DE")}đ`; // 350.000đ
  return `${vnd.toLocaleString("en-US")}₫ · ~€${(vnd / VND_PER_EUR).toFixed(1)}`;
}

/** Opening slots every 30 min; last start leaves room for a 90-minute treatment before 22:00. */
export const timeSlots: string[] = Array.from({ length: (20.5 - 9) * 2 + 1 }, (_, i) => {
  const minutes = 9 * 60 + i * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${minutes % 60 ? "30" : "00"}`;
});

export type BookingRequest = { name: string; serviceId: string; duration: Duration; date: string; time: string; note: string };
export type BookingLabels = {
  requestText: string; name: string; service: string; duration: string; minutes: string;
  date: string; time: string; errorRequired: string; errorPast: string;
};

/** Returns an error message, or null when the request can be sent. `today` is yyyy-mm-dd. */
export function validateBooking(r: BookingRequest, t: BookingLabels, today: string): string | null {
  if (!r.name.trim() || !r.date || !r.time) return t.errorRequired;
  if (r.date < today) return t.errorPast; // ISO dates compare correctly as strings
  return null;
}

export function bookingText(r: BookingRequest, t: BookingLabels, locale: Locale): string {
  const s = services.find((x) => x.id === r.serviceId);
  const lines = [
    `${t.requestText}:`,
    `${t.name}: ${r.name.trim()}`,
    `${t.service}: ${s ? s.name[locale] : r.serviceId} (${r.duration} ${t.minutes}${s ? `, ${formatPrice(s.prices[r.duration], locale)}` : ""})`,
    `${t.date}: ${r.date} ${r.time}`,
  ];
  if (r.note.trim()) lines.push("", r.note.trim());
  return lines.join("\n");
}
