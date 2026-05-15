/**
 * 閱讀分類設定 — 單一來源
 * 新增分類：在 READING_SUBCATEGORIES 加一筆
 * 新增子分類：在對應項目加 children 陣列
 * 待辦：溝通-職場(communication-workplace)、溝通-人際(communication-interpersonal) 有文章再加
 */

export type ReadingChild = {
  label: string
  href: string
}

export type ReadingSubcategory = {
  slug: string
  label: string
  bgColor: string
  borderColor: string
  href: string
  children?: ReadingChild[]
}

export const READING_SUBCATEGORIES: ReadingSubcategory[] = [
  {
    slug: "business", label: "商業",
    bgColor: "#fdf3ea", borderColor: "#e3a76a",
    href: "/reading/business",
  },
  {
    slug: "learning", label: "學習的方法",
    bgColor: "#ecf6f3", borderColor: "#5fb8a1",
    href: "/reading/learning",
    children: [
      { label: "讀書技巧", href: "/reading/reading-skills" },
      { label: "習慣養成", href: "/reading/habit-formation" },
    ],
  },
  {
    slug: "psychology", label: "心理學",
    bgColor: "#f3f1fb", borderColor: "#9a8ad9",
    href: "/reading/psychology",
    children: [
      { label: "溝通", href: "/reading/communication" },
    ],
  },
  {
    slug: "medicine", label: "醫學",
    bgColor: "#f0fff4", borderColor: "#68d391",
    href: "/reading/medicine",
    children: [
      { label: "營養學", href: "/reading/nutrition" },
      { label: "中醫", href: "/reading/traditional-chinese-medicine" },
    ],
  },
  {
    slug: "finance", label: "理財",
    bgColor: "#f0f9ff", borderColor: "#65a3e5",
    href: "/reading/finance",
  },
  {
    slug: "brain-games", label: "益智遊戲",
    bgColor: "#f4fff3", borderColor: "#7ac46b",
    href: "/reading/brain-games",
  },
  {
    slug: "reading-law", label: "閱讀-法律",
    bgColor: "#fef3f3", borderColor: "#e08080",
    href: "/reading/reading-law",
  },
  {
    slug: "science", label: "科學",
    bgColor: "#eff6ff", borderColor: "#6ba3d6",
    href: "/reading/science",
  },
  {
    slug: "english", label: "英文",
    bgColor: "#fffbf0", borderColor: "#d4a840",
    href: "/reading/english",
  },
]

export const READING_BG_IMAGE = "/reading-background.jpg"

export const READING_HERO_QUOTE = {
  attribution: "孟德斯鳩 (Montesquieu)：",
  chinesePrefix: "喜歡閱讀，等於將生活的寂寞時光，轉換成",
  chineseGlow: "巨大的享受時刻",
  chinesesuffix: "❤️",
  english: "To love to read is to exchange hours of ennui for hours of delight.",
}
