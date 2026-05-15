import type { Metadata } from "next"
import { ReadingLayout } from "@/components/reading/reading-layout"
import {
  ReadingSupabaseArticle,
  generateReadingArticleMetadata,
} from "@/components/reading/reading-supabase-article"

type Props = { params: Promise<{ category: string; id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, id } = await params
  return generateReadingArticleMetadata(category, id)
}

export default async function ReadingArticlePage({ params }: Props) {
  const { id } = await params
  const wpId = Number(decodeURIComponent(id))
  return (
    <ReadingLayout showHero={false}>
      <ReadingSupabaseArticle wpId={wpId} />
    </ReadingLayout>
  )
}
