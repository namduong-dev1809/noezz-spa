"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitch({ label }: { label: string }) {
  const pathname = usePathname();
  const [, current, ...rest] = pathname.split("/");
  const target = current === "vi" ? "en" : "vi";

  return (
    <Link
      href={`/${[target, ...rest].join("/")}`}
      hrefLang={target}
      className="border border-forest/30 px-3 py-2 text-xs uppercase tracking-widest text-forest hover:border-forest"
    >
      {label}
    </Link>
  );
}
