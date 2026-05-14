/**
 * 閱讀分類設定 — 單一來源
 * header 按鈕、subcategory 頁面、路由全部從這裡讀取
 * 新增分類：只需在 READING_SUBCATEGORIES 加一筆資料
 */

export type ReadingSubcategory = {
  slug: string
  label: string
  bgColor: string
  borderColor: string
  href: string
}

export const READING_SUBCATEGORIES: ReadingSubcategory[] = [
  { slug: "business",    label: "商業",      bgColor: "#fdf3ea", borderColor: "#e3a76a", href: "/reading/business"    },
  { slug: "learning",    label: "學習的方法", bgColor: "#ecf6f3", borderColor: "#5fb8a1", href: "/reading/learning"    },
  { slug: "psychology",  label: "心理學",     bgColor: "#f3f1fb", borderColor: "#9a8ad9", href: "/reading/psychology"  },
  { slug: "nutrition",   label: "營養學",     bgColor: "#fff3f5", borderColor: "#e48aa3", href: "/reading/nutrition"   },
  { slug: "finance",     label: "理財",       bgColor: "#f0f9ff", borderColor: "#65a3e5", href: "/reading/finance"     },
  { slug: "brain-games", label: "益智遊戲",   bgColor: "#f4fff3", borderColor: "#7ac46b", href: "/reading/brain-games" },
]

export const READING_BG_IMAGE = "/reading-background.jpg"

export const READING_HERO_QUOTE = {
  attribution: "孟德斯鳩 (Montesquieu)：",
  chinesePrefix: "喜歡閱讀，等於將生活的寂寞時光，轉換成",
  chineseGlow:   "巨大的享受時刻",
  chinesesuffix: "❤️",
  english: "To love to read is to exchange hours of ennui for hours of delight.",
}
