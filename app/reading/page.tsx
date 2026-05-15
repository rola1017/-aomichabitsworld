import type { Metadata } from "next"
import Link from "next/link"
import { ReadingLayout } from "@/components/reading/reading-layout"
import { READING_SUBCATEGORIES } from "@/config/reading-config"
import { getPostsByCategory } from "@/lib/supabase-posts"
import { stripHtml } from "@/lib/strip-html"
import { ArticleCard } from "@/components/law/article-card"

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

export default async function ReadingPage() {
  const articles = await getPostsByCategory("reading")

  return (
    <ReadingLayout>
      <div className="flex flex-col gap-6">

        {/* 佳詞美句靜態卡片 */}
        <div className="rounded-lg bg-[#fdfcf9] p-8 shadow-xl">
          <h2 className="mb-4 text-xl font-bold text-[#3d3630]">佳詞美句</h2>
          <p className="text-[#5a4f45] leading-relaxed">
            威克家：「讀一本好書，就像交了一個益友。」
            凱勒 (Helen Keller)：「一本書像一艘船，帶領我們從狹隘的地方，駛向生命的無限海洋。」
          </p>
        </div>

        {/* 直屬「閱讀」分類的文章列表 */}
        {articles.length > 0 && (
          <div className="flex flex-col gap-4">
            {articles.map((post) => {
              const plain = stripHtml(post.excerpt || post.meta_description || "").trim() || undefined
              return (
                <ArticleCard
                  key={post.slug}
                  title={post.title}
                  excerpt={plain}
                  href={`/reading/reading/${post.wp_id}`}
                  variant="simple"
                />
              )
            })}
          </div>
        )}

      </div>
    </ReadingLayout>
  )
}
