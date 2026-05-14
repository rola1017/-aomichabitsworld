"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { READING_SUBCATEGORIES } from "@/config/reading-config"

export function ReadingHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/icon.svg" alt="AtomicHabitsWorld" width={32} height={32} className="rounded-md" />
          <span className="text-sm font-semibold text-[#1A2744] whitespace-nowrap">每天一點點</span>
        </Link>

        <Link
          href="/reading"
          className="shrink-0 rounded-md bg-[#3d3630] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#2a2520] transition-colors"
        >
          閱讀
        </Link>

        <div className="h-5 w-px bg-gray-300 shrink-0" />

        <nav className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {READING_SUBCATEGORIES.map((cat) => {
            const isActive = pathname.startsWith(cat.href)
            return (
              <Link
                key={cat.slug}
                href={cat.href}
                className="shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all hover:opacity-80"
                style={{
                  backgroundColor: isActive ? cat.borderColor : cat.bgColor,
                  borderColor: cat.borderColor,
                  color: isActive ? "#fff" : "#3d3630",
                }}
              >
                {cat.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
