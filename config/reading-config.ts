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
    slug: "learning", label: "學習的方法",
    bgColor: "#fff4ea", borderColor: "#FFBB77",
    href: "/reading/learning",
    children: [
      { label: "讀書技巧", href: "/reading/reading-skills" },
      { label: "習慣養成", href: "/reading/habit-formation" },
    ],
  },
  {
    slug: "psychology", label: "心理學",
    bgColor: "#fff8ff", borderColor: "#FFD0FF",
    href: "/reading/psychology",
    children: [
      { label: "溝通", href: "/reading/communication" },
    ],
  },
  {
    slug: "reading-law", label: "法律",
    bgColor: "#f2f2ff", borderColor: "#9393FF",
    href: "/reading/reading-law",
  },
  {
    slug: "business", label: "商業",
    bgColor: "#fff2f2", borderColor: "#FF5151",
    href: "/reading/business",
  },
  {
    slug: "finance", label: "理財",
    bgColor: "#efefff", borderColor: "#6A6AFF",
    href: "/reading/finance",
  },
  {
    slug: "english", label: "英文",
    bgColor: "#fff5ff", borderColor: "#FFA6FF",
    href: "/reading/english",
  },
  {
    slug: "medicine", label: "醫學",
    bgColor: "#f4fffb", borderColor: "#ADFEDC",
    href: "/reading/medicine",
    children: [
      { label: "營養學", href: "/reading/nutrition" },
      { label: "中醫", href: "/reading/traditional-chinese-medicine" },
    ],
  },
  {
    slug: "science", label: "科學",
    bgColor: "#eff6ff", borderColor: "#ACD6FF",
    href: "/reading/science",
  },
  {
    slug: "brain-games", label: "益智遊戲",
    bgColor: "#fffce8", borderColor: "#FFDC35",
    href: "/reading/brain-games",
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
