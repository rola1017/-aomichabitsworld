import type { Metadata } from "next"
import { ReadingLayout } from "@/components/reading/reading-layout"
import { getPostsByCategory } from "@/lib/supabase-posts"
import { stripHtml } from "@/lib/strip-html"
import { ArticleCard } from "@/components/law/article-card"

export const metadata: Metadata = {
  title: "閱讀｜AtomicHabitsWorld 每天一點點",
  description: "精選商業、心理學、學習方法、理財、益智遊戲等閱讀書摘與心得，每天一點點，累積複利人生。",
  alternates: { canonical: "/reading" },
  openGraph: {
    title: "閱讀｜AtomicHabitsWorld 每天一點點",
    description: "精選商業、心理學、學習方法、理財、益智遊戲等閱讀書摘與心得。",
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
      <div className="flex flex-col gap-4">
        {articles.length > 0 ? (
          articles.map((post) => {
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
          })
        ) : (
          <div className="rounded-2xl border border-[#D1C7B7] bg-white/70 p-6 text-center text-[#6b7280] sm:p-8">
            目前尚無文章，請稍後再試。
          </div>
        )}
      </div>
    </ReadingLayout>
  )
}
