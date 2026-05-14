import type { ReactNode } from "react"
import { Footer } from "@/components/footer"
import { ReadingHeader } from "@/components/reading/reading-header"
import { ReadingHero } from "@/components/reading/reading-hero"
import { READING_BG_IMAGE } from "@/config/reading-config"

type ReadingLayoutProps = {
  children: ReactNode
  showHero?: boolean
}

export function ReadingLayout({ children, showHero = true }: ReadingLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* 背景：明亮圖書館，不加任何覆膜（法律頁有加米色透明膜，閱讀頁不加）*/}
      <div
        className="fixed inset-0 -z-10 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${READING_BG_IMAGE})` }}
      />

      <ReadingHeader />
      {showHero && <ReadingHero />}

      <main className="relative py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}
