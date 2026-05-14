"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { READING_SUBCATEGORIES } from "@/config/reading-config"

export function ReadingHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const goToParent = () => {
    const segments = pathname.split("/").filter(Boolean)
    const parentSegments = segments.length <= 1 ? [] : segments.slice(0, -1)
    const parentPath = parentSegments.length ? `/${parentSegments.join("/")}` : "/"
    router.push(parentPath)
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="w-full px-2 sm:px-4 lg:px-6 py-3">
        <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl px-4 sm:px-6 lg:px-8 py-5 shadow-lg border border-white/50">
          <div className="flex items-center justify-between gap-4">

            {/* 左：Logo + 每天一點點 + 閱讀按鈕 */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AtomicHabitsWorld-3z8SeHYJL10EbNkkgMMxKYWJDZbFVn.png"
                  alt="AtomicHabitsWorld Logo"
                  width={44}
                  height={44}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl shadow-lg object-cover"
                />
                <span className="text-lg sm:text-xl font-bold text-[#1A2744] tracking-wide">
                  每天一點點
                </span>
              </Link>

              <Link
                href="/reading"
                className="hidden md:inline-flex items-center justify-center rounded-xl border-2 border-[#8B7355] px-4 py-2.5 text-sm lg:text-base font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #3d3630 0%, #5a4f45 55%, #2a2520 100%)" }}
              >
                閱讀
              </Link>
            </div>

            {/* 中：分類 Pills 置中 */}
            <nav className="hidden md:flex flex-1 min-w-0 items-center justify-center px-2">
              <div className="flex items-center gap-3 lg:gap-4 overflow-x-auto scrollbar-hide py-3">
                {READING_SUBCATEGORIES.map((cat) => {
                  const isActive = pathname.startsWith(cat.href)
                  return (
                    <Link
                      key={cat.slug}
                      href={cat.href}
                      className="shrink-0 rounded-full border px-5 py-2 text-sm lg:text-base font-semibold font-serif transition-all hover:opacity-80 whitespace-nowrap"
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
              </div>
            </nav>

            {/* 右：返回按鈕 */}
            <button
              type="button"
              onClick={goToParent}
              className="hidden lg:flex flex-shrink-0 cursor-pointer items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md"
              style={{ background: "linear-gradient(135deg, #A89880 0%, #8B7355 100%)" }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium text-white">返回</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  )
}
