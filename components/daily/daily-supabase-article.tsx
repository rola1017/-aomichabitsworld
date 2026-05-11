import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DailySubcategoryBar } from "@/components/daily/daily-subcategory-bar"
import { ARTICLE_CONTENT_CLASSNAME } from "@/lib/article-content-styles"
import { getSiteOrigin } from "@/lib/site-url"
import { stripHtml } from "@/lib/strip-html"
import { getPostByWpId, getPostBySlug } from "@/lib/supabase-posts"

function absolutizeOgImage(
  url: string | undefined | null,
  siteOrigin: string
): string {
  if (!url?.trim()) return `${siteOrigin}/icon.svg`
  const u = url.trim()
  if (u.startsWith("http://") || u.startsWith("https://")) return u
  return `${siteOrigin}${u.startsWith("/") ? "" : "/"}${u}`
}

export async function generateDailySupabaseArticleMetadata(
  dailySubPath: string,
  rawSlug: string
): Promise<Metadata> {
  const wpId = Number(decodeURIComponent(rawSlug))
  if (!Number.isFinite(wpId)) return { title: "文章" }

  const post = await getPostByWpId(wpId)
  if (!post) return { title: "文章" }

  const siteOrigin = await getSiteOrigin()
  const canonical = `${siteOrigin}/daily/${dailySubPath}/${encodeURIComponent(String(wpId))}`
  const rawDesc = stripHtml(
    (post.excerpt?.trim() ? post.excerpt : null) ?? post.content ?? ""
  )
  const description = (rawDesc || post.title).slice(0, 160)
  const ogImage = absolutizeOgImage(post.featured_image_url ?? undefined, siteOrigin)

  return {
    title: post.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description,
      url: canonical,
      siteName: "AtomicHabitsWorld 每天一點點",
      type: "article",
      locale: "zh_TW",
      images: [{ url: ogImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [ogImage],
    },
  }
}

type DailySupabaseArticleProps = {
  rawSlug: string
}

export async function DailySupabaseArticle({ rawSlug }: DailySupabaseArticleProps) {
  const decoded = decodeURIComponent(rawSlug)
  const wpId = Number(decoded)
  const post = Number.isFinite(wpId) && wpId > 0
    ? await getPostByWpId(wpId)
    : await getPostBySlug(decoded)
  if (!post) notFound()

  return (
    <div className="flex flex-col gap-6">
      <DailySubcategoryBar />

      <div className="rounded-2xl border border-[#D1C7B7] bg-white/80 p-6 shadow-md sm:p-8">
        <h1 className="mb-3 text-2xl font-bold text-[#1A2744]">{post.title}</h1>
        <div
          className={ARTICLE_CONTENT_CLASSNAME}
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />
      </div>
    </div>
  )
}
