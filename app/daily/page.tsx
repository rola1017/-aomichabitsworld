import type { Metadata } from "next"

import { DailySupabaseCategoryPostList } from "@/components/daily/daily-supabase-category-post-list"
import { DailySubcategoryBar } from "@/components/daily/daily-subcategory-bar"

export const metadata: Metadata = {
  title: "日常｜AtomicHabitsWorld 每天一點點",
  description:
    "日常專區聚合讀書、考試、隨筆、左手訓練與生活智慧王，快速掌握每個主題的最新文章與實用重點。",
  alternates: {
    canonical: "/daily",
  },
  openGraph: {
    title: "日常｜AtomicHabitsWorld 每天一點點",
    description:
      "日常專區聚合讀書、考試、隨筆、左手訓練與生活智慧王，快速掌握每個主題的最新文章與實用重點。",
    url: "/daily",
    siteName: "AtomicHabitsWorld 每天一點點",
    type: "website",
    locale: "zh_TW",
  },
}

export default function DailyPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* 子分類按鈕：置於文章列表上方 */}
      <DailySubcategoryBar />

      <section>
        <h2 className="text-xl font-bold text-[#101A3A] mb-4 text-center">讀書</h2>
        <DailySupabaseCategoryPostList
          categorySub="study"
          listBase="/daily/study"
          emptyLabel="目前尚無「讀書」文章，請稍後再試。"
        />
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#101A3A] mb-4 text-center">考試</h2>
        <DailySupabaseCategoryPostList
          categorySub="exam"
          listBase="/daily/exam"
          emptyLabel="目前尚無「考試」文章，請稍後再試。"
        />
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#101A3A] mb-4 text-center">隨筆</h2>
        <DailySupabaseCategoryPostList
          categorySub="essay"
          listBase="/daily/essay"
          emptyLabel="目前尚無「隨筆」文章，請稍後再試。"
        />
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#101A3A] mb-4 text-center">生活智慧王</h2>
        <DailySupabaseCategoryPostList
          categorySub="life-wisdom"
          listBase="/daily/life-wisdom"
          emptyLabel="目前尚無「生活智慧王」文章，請稍後再試。"
        />
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#101A3A] mb-4 text-center">左手訓練</h2>
        <DailySupabaseCategoryPostList
          categorySub="left-hand-writing"
          listBase="/daily/left-hand-writing"
          emptyLabel="目前尚無「左手訓練」文章，請稍後再試。"
        />
      </section>
    </div>
  )
}
