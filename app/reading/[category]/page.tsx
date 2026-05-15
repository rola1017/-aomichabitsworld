import type { Metadata } from "next"
import { ReadingLayout } from "@/components/reading/reading-layout"
import { READING_SUBCATEGORIES } from "@/config/reading-config"
import { getPostsByCategory } from "@/lib/supabase-posts"
import { ArticleCard } from "@/components/law/article-card"
import { stripHtml } from "@/lib/strip-html"

type Props = { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = READING_SUBCATEGORIES.find((c) => c.slug === category)
  if (!cat) return { title: "閱讀" }
  return {
    title: `${cat.label}｜AtomicHabitsWorld 每天一點點`,
    description: `${cat.label}相關書摘與閱讀心得，每天一點點累積知識複利。`,
    alternates: { canonical: `/reading/${category}` },
    openGraph: {
      title: `${cat.label}｜AtomicHabitsWorld 每天一點點`,
      url: `/reading/${category}`,
      siteName: "AtomicHabitsWorld 每天一點點",
      type: "website",
      locale: "zh_TW",
    },
  }
}

export default async function ReadingCategoryPage({ params }: Props) {
  const { category } = await params
  const cat = READING_SUBCATEGORIES.find((c) => c.slug === category)

  const articles = await getPostsByCategory(category)

  return (
    <ReadingLayout>
      <div className="rounded-2xl bg-[#fdfcf9] p-6 shadow-xl sm:p-8">
        <h1 className="mb-6 text-2xl font-bold text-[#3d3630]">{cat?.label ?? "閱讀"}</h1>
        {articles.length > 0 ? (
          <div className="flex flex-col gap-4">
            {articles.map((post) => {
              const plain = stripHtml(post.excerpt || post.meta_description || "").trim() || undefined
              return (
                <ArticleCard
                  key={post.slug}
                  title={post.title}
                  excerpt={plain}
                  href={`/reading/${category}/${post.wp_id}`}
                  variant="simple"
                />
              )
            })}
          </div>
        ) : (
          <p className="text-center text-[#9a8f85] py-8">這個分類目前還沒有文章，敬請期待。</p>
        )}
      </div>
    </ReadingLayout>
  )
}
