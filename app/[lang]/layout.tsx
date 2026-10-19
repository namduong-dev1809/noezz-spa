import type { Metadata } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";
import "../globals.css";
import { getDictionary, getLocale, locales } from "./dictionaries";
import RevealOnScroll from "@/components/RevealOnScroll";

const display = Cormorant_Garamond({
  weight: ["500", "600"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-display-face",
});

const body = Be_Vietnam_Pro({
  weight: ["300", "400", "500"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();

  return (
    // suppressHydrationWarning: the inline script below adds the "js" class before React hydrates
    <html lang={locale} className={`${display.variable} ${body.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen font-sans font-light">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <RevealOnScroll />
        {children}
      </body>
    </html>
  );
}
