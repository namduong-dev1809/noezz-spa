"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { services, type Duration } from "@/lib/services";

type Choice = { serviceId: string; duration: Duration };
type Ctx = { choice: Choice; choose: (c: Choice) => void };

// lets a price card pre-fill the booking form further down the page
const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<Choice>({ serviceId: services[0].id, duration: 60 });
  return <BookingContext.Provider value={{ choice, choose: setChoice }}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
