// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { bookingText, formatPrice, services, timeSlots, validateBooking, type BookingRequest } from "./services.ts";
import en from "../app/[lang]/dictionaries/en.json" with { type: "json" };

const t = en.booking;
const ok: BookingRequest = { name: " Lena ", serviceId: "stone", duration: 90, date: "2026-11-02", time: "18:30", note: "" };

test("prices are formatted per language", () => {
  assert.equal(formatPrice(350000, "vi"), "350.000đ");
  assert.equal(formatPrice(450000, "en"), "450,000₫ · ~€15.0");
});

test("90 minutes always costs more than 60", () => {
  for (const s of services) assert.ok(s.prices[90] > s.prices[60], s.id);
});

test("time slots run 09:00 to 20:30 every 30 minutes", () => {
  assert.equal(timeSlots[0], "09:00");
  assert.equal(timeSlots[1], "09:30");
  assert.equal(timeSlots.at(-1), "20:30");
  assert.equal(timeSlots.length, 24);
});

test("booking validation", () => {
  assert.equal(validateBooking(ok, t, "2026-10-20"), null);
  assert.equal(validateBooking(ok, t, "2026-11-02"), null); // today is fine
  assert.equal(validateBooking({ ...ok, name: " " }, t, "2026-10-20"), t.errorRequired);
  assert.equal(validateBooking({ ...ok, time: "" }, t, "2026-10-20"), t.errorRequired);
  assert.equal(validateBooking(ok, t, "2026-11-03"), t.errorPast);
});

test("booking text names the treatment, length and price", () => {
  const text = bookingText({ ...ok, note: " Strong pressure " }, t, "en");
  assert.match(text, /Treatment: Hot stone massage \(90 min, 560,000₫ · ~€18\.7\)/);
  assert.match(text, /Date: 2026-11-02 18:30/);
  assert.ok(text.endsWith("\n\nStrong pressure"));
});
