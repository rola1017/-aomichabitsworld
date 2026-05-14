import type { Metadata } from "next"
import Link from "next/link"
import { ReadingLayout } from "@/components/reading/reading-layout"
import { READING_SUBCATEGORIES } from "@/config/reading-config"

export const metadata: Metadata = {
  title: "閱讀｜AtomicHabitsWorld 每天一點點",
  description: "精選商業、心理學、學習方法、營養學、理財、益智遊戲等閱讀書摘與心得，每天一點點，累積複利人生。",
  alternates: { canonical: "/reading" },
  openGraph: {
    title: "閱讀｜AtomicHabitsWorld 每天一點點",
    description: "精選商業、心理學、學習方法、營養學、理財、益智遊戲等閱讀書摘與心得。",
    url: "/reading",
    siteName: "AtomicHabitsWorld 每天一點點",
    type: "website",
    locale: "zh_TW",
  },
}

export default function ReadingPage() {
  return (
    <ReadingLayout>
      <div className="rounded-lg bg-[#fdfcf9] p-8 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-[#3d3630]">佳詞美句</h2>
        <p className="text-[#5a4f45] leading-relaxed">
          威克家：「讀一本好書，就像交了一個益友。」
          凱勒 (Helen Keller)：「一本書像一艘船，帶領我們從狹隘的地方，駛向生命的無限海洋。」
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {READING_SUBCATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="rounded-full border px-4 py-1.5 text-sm font-semibold text-[#3d3630] transition-all hover:opacity-80"
              style={{ backgroundColor: cat.bgColor, borderColor: cat.borderColor }}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </ReadingLayout>
  )
}
