"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { READING_SUBCATEGORIES } from "@/config/reading-config"
import { MenuTreeDropdown } from "@/components/ui/menu-tree-dropdown"

export function ReadingHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const goToParent = () => {
    const segments = pathname.split("/").filter(Boolean)

    // 特例：閱讀大分類文章路徑是 /reading/reading/[id]
    // 按返回應該回到 /reading 主頁，而不是 /reading/reading 列表
    if (segments.length >= 2 && segments[1] === "reading") {
      router.push("/reading")
      return
    }

    const parentPath = segments.length <= 1 ? "/" : `/${segments.slice(0, -1).join("/")}`
    router.push(parentPath)
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="w-full px-2 sm:px-4 lg:px-6 py-3">
        <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl px-4 sm:px-6 lg:px-8 py-5 shadow-lg border border-white/50">
          <div className="flex items-center justify-between gap-4">

            {/* 左：Logo + 閱讀按鈕 */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AtomicHabitsWorld-OV1EpY5UU1vffttWVWCcHGOdrWoPSF.png"
                  alt="AtomicHabitsWorld Logo"
                  width={44}
                  height={44}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl shadow-lg object-cover"
                />
                <span className="text-sm font-semibold text-[#1A2744] whitespace-nowrap hidden sm:inline">
                  每天一點點
                </span>
              </Link>

              <Link
                href="/reading"
                className="shrink-0 rounded-xl border-2 border-[#8B7355] px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #3d3630 0%, #5a4f45 55%, #2a2520 100%)" }}
              >
                閱讀
              </Link>
            </div>

            {/* 中：分類 Pills 置中（有子分類的用下拉） */}
            <nav className="hidden md:flex flex-1 min-w-0 items-center justify-center px-2">
              <div className="flex items-center gap-2 lg:gap-3 overflow-x-auto scrollbar-hide py-1">
                {READING_SUBCATEGORIES.map((cat) => {
                  const isActive = pathname.startsWith(cat.href)
                  const pillClass = "shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold font-serif whitespace-nowrap cursor-pointer transition-all duration-200 hover:brightness-110 active:shadow-inner"
                  const pillStyle = isActive
                    ? {
                        backgroundColor: cat.bgColor,
                        borderColor: cat.borderColor,
                        color: "#3d3630",
                        boxShadow: "inset 0 2px 3px rgba(0,0,0,0.15)",
                      }
                    : {
                        background: `linear-gradient(180deg, rgba(232,228,220,0.75) 0%, rgba(232,228,220,0.60) 100%), ${cat.borderColor}`,
                        borderColor: "rgba(0,0,0,0.30)",
                        color: "#1a1a1a",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.28), 0 2px 5px rgba(0,0,0,0.22)",
                      }

                  if (cat.children && cat.children.length > 0) {
                    return (
                      <MenuTreeDropdown
                        key={cat.slug}
                        nodes={cat.children.map(c => ({ label: c.label, href: c.href }))}
                        openOnHover
                        contentClassName="min-w-[10rem]"
                        trigger={
                          <Link
                            href={cat.href}
                            className={pillClass}
                            style={pillStyle}
                          >
                            {cat.label}
                          </Link>
                        }
                      />
                    )
                  }

                  return (
                    <Link
                      key={cat.slug}
                      href={cat.href}
                      className={pillClass}
                      style={pillStyle}
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
              className="hidden lg:flex flex-shrink-0 items-center gap-2 px-4 py-2 rounded-lg transition-all hover:shadow-md"
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
