import type { MetadataRoute } from "next"

import { WP_CATEGORY_SLUG_TO_LAW_PATH_PREFIX } from "@/config/wp-category-to-law-path"
import { getAllPosts } from "@/lib/supabase-posts"

const SITE_ORIGIN = "https://atomichabitsworld.com"

const DAILY_CATEGORY_SUB_TO_PATH: Record<string, string> = {
  study: "/daily/study",
  exam: "/daily/exam",
  essay: "/daily/essay",
  "left-hand-writing": "/daily/left-hand-writing",
  "life-wisdom": "/daily/life-wisdom",
  daily: "/daily",
}

function buildArticleUrl(
  wp_id: number,
  category_main: string,
  category_sub: string
): string | null {
  // 日常文章
  if (category_main === "daily") {
    const base = DAILY_CATEGORY_SUB_TO_PATH[category_sub]
    if (!base) return null
    return `${SITE_ORIGIN}${base}/${wp_id}`
  }
  // 法律文章
  if (category_main === "law") {
    const base = WP_CATEGORY_SLUG_TO_LAW_PATH_PREFIX[category_sub]
    if (!base) return null
    return `${SITE_ORIGIN}${base}/${wp_id}`
  }
  return null
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_ORIGIN}/`,            lastModified: now, changeFrequency: "daily",   priority: 1   },
    { url: `${SITE_ORIGIN}/law`,         lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_ORIGIN}/daily`,       lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_ORIGIN}/reading`,     lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_ORIGIN}/privacy`,     lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_ORIGIN}/terms`,       lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ]

  const posts = await getAllPosts()
  const seen = new Set<string>()

  const postRoutes: MetadataRoute.Sitemap = posts
    .map((p) => {
      const url = buildArticleUrl(p.wp_id, p.category_main, p.category_sub)
      if (!url) return null
      return {
        url,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }
    })
    .filter((entry): entry is NonNullable<typeof entry> => {
      if (!entry) return false
      if (seen.has(entry.url)) return false
      seen.add(entry.url)
      return true
    })

  return [...staticRoutes, ...postRoutes]
}
