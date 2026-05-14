# AtomicHabitsWorld 專案交接文件
**最後更新：2026年5月14日（第八版）　　擁有者：Rola（sosturx@gmail.com）**

---

## ⚙️ 給下一個 Claude 的第一件事

**當你察覺這個對話快到上限時，主動製作交接文件讓 Rola 下載，並把這項設定寫進去。**

---

## 一、網站基本資料

| 項目 | 內容 |
|------|------|
| 網站名稱 | AtomicHabitsWorld 每天一點點 |
| 正式網域 | atomichabitsworld.com ✅ |
| WordPress 後台 | cms.atomichabitsworld.com/wp-admin ✅ |
| GitHub | https://github.com/Rola1017/AtomicHabitsWorld ✅ |
| Vercel 專案 | atomichabitsworld |

---

## 二、技術架構

| 層級 | 技術 |
|------|------|
| 前端 | Next.js 16 + Tailwind CSS（App Router）→ Vercel |
| 後端（過渡） | WordPress → Bluehost（cms.atomichabitsworld.com）|
| 資料庫 | Supabase（PostgreSQL）→ 東京 Region |
| 串接 | WPGraphQL + Supabase JS |
| 部署 | Vercel（免費 Hobby）+ GitHub 自動部署 |
| 本機開發 | Cursor（AI 程式碼編輯器）|

---

## 三、環境變數

```
WORDPRESS_API_URL=https://cms.atomichabitsworld.com/graphql
NEXT_PUBLIC_SUPABASE_URL=https://（你的Supabase Project URL）
SUPABASE_SERVICE_ROLE_KEY=（Secret key，絕不能上傳GitHub）
SYNC_SECRET_KEY=rola-super-secret-somuchgoodjob20260421
```

---

## 四、MCP 設定（Claude 桌面版）

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\User\\Desktop\\flowlife",
        "C:\\Users\\User\\Desktop\\主頁解壓縮\\b_KsywIqhwUZD-1774540624752"
      ]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

**重要：**
- Claude 可以直接用 filesystem MCP 讀取專案檔案，**不需要 Rola 複製貼上程式碼**
- puppeteer MCP 可以截圖確認網站，不需要 Rola 手動測試
- ⚠️ 不要同時開兩個對話調用 MCP，會互相卡住導致 timeout
- MCP timeout 時，請 Rola 貼檔案內容，比重試快

**專案根目錄：**
`C:\Users\User\Desktop\主頁解壓縮\b_KsywIqhwUZD-1774540624752`

---

## 五、Cursor 工作流程約定

### 預設流程（不需要 Rola 複製貼上）
```
Cursor 改好存檔 → Rola 說「存好了」→ Claude 用 MCP 自己讀檔確認 → 沒問題 → Rola push
```

### ⚠️ 例外：需要先給 Claude 看再存的情況

| 情況 | 原因 |
|------|------|
| Cursor 說要改 3 個以上檔案 | 很可能改到不該改的地方 |
| 改動 `.env.local` | 改錯會讓整個網站壞掉 |
| 改動 `next.config.mjs` | 影響全站設定 |
| 改動資料庫相關邏輯 | 可能造成資料遺失 |
| Cursor 顯示大量紅色刪除行 | 代表它刪了很多東西 |
| Claude 判斷重要的任何改動 | Claude 會主動說明原因 |

### 其他約定
- **Push 方式**：Rola 用 Cursor GUI 右側「提交與推送」，只勾選要改的檔案
- **git 返回**：改壞了用 git graph 撤銷
- **Cursor 指令格式**：要說「改完先存檔，不用貼給我看」或「改完先貼給 Claude 看，確認後再存」
- **pnpm**：專案使用 pnpm 管理套件，**不能用 npm install**（會造成 lockfile 不同步）

---

## 六、程式碼品質標準

所有寫出的程式碼必須符合以下原則：

1. **未來發展性**：考慮之後新增功能時是否能順利擴充
2. **安全第一**：不暴露敏感資訊，不做不可逆的操作
3. **方便維護**：一個地方改，全站同步生效
4. **一致性**：相關聯動的地方都要同步更改
5. **迭代友善**：新增分類、新增頁面時不需要大改程式碼

**實際案例：**
- `lib/article-content-styles.ts`：文章標題樣式統一放這裡，所有元件 import 同一個常數
- `config/reading-config.ts`：閱讀分類的名稱/顏色/路由全在這裡，新增分類只加一行
- `NavItem` 的 `menuTree` 欄位：有子分類加欄位，不用改渲染邏輯

---

## 七、發文標準流程

1. WordPress 寫文章 → 發布
2. 在 Cursor 終端機跑**單篇同步**（換 wpId 數字）：
```powershell
Invoke-RestMethod -Uri "https://atomichabitsworld.com/api/sync-wordpress-to-supabase" -Method POST -ContentType "application/json" -Body '{"secret":"rola-super-secret-somuchgoodjob20260421","wpId":你的文章ID}'
```
3. 去網站確認文章出現

**注意：批次同步（不加 wpId）有 WordPress 快取問題，新文章用單篇同步。**
**注意：從 WordPress 刪文章後，要手動去 Supabase → articles 刪除對應資料。**

---

## 八、本次對話完成的事項

### ✅ SEO metadata 補文字 slug 支援
- 檔案：`components/daily/daily-supabase-article.tsx`
- 函式：`generateDailySupabaseArticleMetadata`
- 改前：文字 slug 進來的頁面標題顯示「文章」
- 改後：數字走 `getPostByWpId`，文字走 `getPostBySlug`，canonical URL 也正確

### ✅ sitemap 加入 `updated_at`
- 檔案：`app/sitemap.ts`
- 檔案：`lib/supabase-posts.ts`（Article 型別加 `updated_at?: string | null`）
- 改前：所有文章 `lastModified` 都是當下時間
- 改後：`p.updated_at ? new Date(p.updated_at) : now`

---

## 九、🔴 中斷點：閱讀頁面（尚未建立）

### 背景資訊
- 背景圖已放入：`public/reading-background.jpg` ✅
- 設計規格已確認（見下方）
- **Cursor 還沒動手，這是下一個對話要做的第一件事**

### 要建立的 6 個新檔案（全部新建，不動現有檔案）

#### 檔案一：`config/reading-config.ts`
```typescript
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
```

#### 檔案二：`components/reading/reading-header.tsx`
```tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { READING_SUBCATEGORIES } from "@/config/reading-config"

export function ReadingHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/icon.svg" alt="AtomicHabitsWorld" width={32} height={32} className="rounded-md" />
          <span className="text-sm font-semibold text-[#1A2744] whitespace-nowrap">每天一點點</span>
        </Link>

        <Link
          href="/reading"
          className="shrink-0 rounded-md bg-[#3d3630] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#2a2520] transition-colors"
        >
          閱讀
        </Link>

        <div className="h-5 w-px bg-gray-300 shrink-0" />

        <nav className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {READING_SUBCATEGORIES.map((cat) => {
            const isActive = pathname.startsWith(cat.href)
            return (
              <Link
                key={cat.slug}
                href={cat.href}
                className="shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all hover:opacity-80"
                style={{
                  backgroundColor: isActive ? cat.borderColor : cat.bgColor,
                  borderColor: cat.borderColor,
                  color: isActive ? "#fff" : "#3d3630",
                }}
              >
                {cat.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
```

#### 檔案三：`components/reading/reading-hero.tsx`
```tsx
import { Corinthia } from "next/font/google"
import { READING_BG_IMAGE, READING_HERO_QUOTE } from "@/config/reading-config"

const corinthia = Corinthia({ weight: "400", subsets: ["latin"] })

export function ReadingHero() {
  const q = READING_HERO_QUOTE
  return (
    <section
      className="relative flex min-h-[40vh] items-center justify-center py-16"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(30,26,22,0.4) 0%, rgba(45,40,34,0.75) 40%, rgba(35,30,26,0.88) 100%), url(${READING_BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-center">
        <p className="text-base font-bold font-serif text-[#c4bcb0]">{q.attribution}</p>
        <p className="text-2xl font-bold font-serif leading-normal text-[#e8e2d8] md:text-3xl">
          {q.chinesePrefix}
          <span
            className="font-bold text-[#f5f0e8]"
            style={{
              textShadow:
                "0 0 12px rgba(255,248,240,0.9), 0 0 24px rgba(255,235,205,0.6), 0 0 36px rgba(255,218,185,0.4)",
            }}
          >
            {q.chineseGlow}
          </span>
          {q.chinesesuffix}
        </p>
        <p className={`${corinthia.className} text-2xl text-[#c4bcb0]`}>{q.english}</p>
      </div>
    </section>
  )
}
```

#### 檔案四：`components/reading/reading-layout.tsx`
```tsx
import type { ReactNode } from "react"
import { Footer } from "@/components/footer"
import { ReadingHeader } from "@/components/reading/reading-header"
import { ReadingHero } from "@/components/reading/reading-hero"
import { READING_BG_IMAGE } from "@/config/reading-config"

type ReadingLayoutProps = {
  children: ReactNode
  showHero?: boolean
}

export function ReadingLayout({ children, showHero = true }: ReadingLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* 背景：明亮圖書館，不加任何覆膜（法律頁有加米色透明膜，閱讀頁不加）*/}
      <div
        className="fixed inset-0 -z-10 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${READING_BG_IMAGE})` }}
      />

      <ReadingHeader />
      {showHero && <ReadingHero />}

      <main className="relative py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}
```

#### 檔案五：`app/reading/page.tsx`
```tsx
import type { Metadata } from "next"
import Link from "next/link"
import { ReadingLayout } from "@/components/reading/reading-layout"
import { READING_SUBCATEGORIES } from "@/config/reading-config"

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

export default function ReadingPage() {
  return (
    <ReadingLayout>
      <div className="rounded-lg bg-[#fdfcf9] p-8 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-[#3d3630]">佳詞美句</h2>
        <p className="text-[#5a4f45] leading-relaxed">
          威克家：「讀一本好書，就像交了一個益友。」
          凱勒 (Helen Keller)：「一本書像一艘船，帶領我們從狹隘的地方，駛向生命的無限海洋。」
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {READING_SUBCATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="rounded-full border px-4 py-1.5 text-sm font-semibold text-[#3d3630] transition-all hover:opacity-80"
              style={{ backgroundColor: cat.bgColor, borderColor: cat.borderColor }}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </ReadingLayout>
  )
}
```

#### 檔案六：`app/reading/[category]/page.tsx`
```tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"
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
  if (!cat) notFound()

  const articles = await getPostsByCategory(cat.slug)

  return (
    <ReadingLayout>
      <div className="rounded-2xl bg-[#fdfcf9] p-6 shadow-xl sm:p-8">
        <h1 className="mb-6 text-2xl font-bold text-[#3d3630]">{cat.label}</h1>
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
```

### 閱讀頁設計規格（供確認對照）

| 項目 | 規格 |
|------|------|
| 全頁背景 | `reading-background.jpg`，bg-fixed，**不加任何覆膜** |
| Header 高度 | `h-16`（slim），白色半透明 + blur |
| Hero 暗罩 | 棕色漸層 `rgba(30,26,22,0.4)→rgba(45,40,34,0.75)→rgba(35,30,26,0.88)` |
| 發光字 | 「巨大的享受時刻」三層暖光暈 text-shadow |
| 英文字型 | Corinthia（Dancing Script 風格） |
| 內容卡片 | `bg-[#fdfcf9] shadow-xl rounded-lg`，浮於背景上 |
| 子分類路由 | 動態路由 `[category]`，新增分類只改 config |

---

## 十、待辦清單（按優先順序）

| 優先 | 項目 | 說明 |
|------|------|------|
| 🔴 | **閱讀頁面 6 個檔案** | 中斷點，下一個對話第一件事（指令見第九節）|
| 🔴 | 閱讀文章詳頁 | `/reading/[category]/[id]/page.tsx`，有文章再做 |
| 🟡 | 主導覽列加「閱讀」入口 | 目前首頁點閱讀還是 404，建好頁面後要加上去 |
| 🟡 | sitemap 加入 `/reading` 靜態路由 | 閱讀頁建好後補上 |
| 🟠 | /tech 頁面 | 設計風格：玻璃未來感按鈕，待 Rola 確認內容方向 |
| 🟠 | AI 對話框（RAG） | Supabase embedding 完成後才能做 |
| 🔵 | structured_qa 填充 | 每篇文章補上結構化問答（GEO/AEO 優化）|
| 🔵 | llms.txt 動態化 | 目前是靜態 |
| 🔵 | 自製後台 | Bluehost 到期前完成，取代 WordPress |

---

## 十一、重要技術檔案

| 檔案路徑 | 用途 |
|------|------|
| `config/reading-config.ts` | 閱讀分類單一來源（名稱/顏色/路由）|
| `lib/article-content-styles.ts` | 文章內文統一樣式（H1–H5）|
| `app/api/sync-wordpress-to-supabase/route.ts` | WordPress → Supabase 同步 API（支援單篇）|
| `lib/supabase-posts.ts` | Supabase 查詢函式（getPostsByCategory、getPostByWpId、getPostBySlug、getAllPosts）|
| `components/daily/daily-supabase-article.tsx` | 日常文章詳頁（支援數字+文字 slug 雙格式）|
| `components/law/law-insurance-wp-article.tsx` | 法律文章詳頁（非勞動法）|
| `app/law/[slug]/page.tsx` | 直屬「法律」分類文章的詳頁 |
| `lib/labor-wp-breadcrumb.ts` | 麵包屑邏輯（含 buildLawArticleBreadcrumb）|
| `config/wp-category-to-law-path.ts` | WP 分類對應路由表（sitemap 也用這個）|
| `components/law/law-header.tsx` | 法律導覽列（含 NavItem 型別、menuTree 通用下拉）|
| `next.config.mjs` | 圖片 remotePatterns |
| `app/sitemap.ts` | sitemap（Supabase 格式，路徑用數字，含 updated_at）|

---

## 十二、law-header.tsx 導覽邏輯說明

### NavItem 型別
```typescript
type MenuNode = { label: string; href: string; children?: MenuNode[] }
type NavItem = {
  name: string
  href: string
  baseColor: string
  accentColor: string
  menuTree?: MenuNode[]  // 有這個欄位 → 自動顯示 hover 下拉
}
```

### 判斷鏈（先深後淺）
```
isCollectiveProcedure → collectiveProcedureNavItems
isClaimsAndGeneral → claimsGeneralNavItems
isPersonalInsurance → personalInsuranceNavItems
isInsuranceLaw → insuranceLawNavItems
isFamilyTrustAndAssetProtection（只用 startsWith，不含父頁面）→ familyTrustAndAssetProtectionNavItems
isCivilFamilyAndInheritance → familyAndInheritanceNavItems
isCivilLaw → civilLawNavItems
isSocialLaw → socialLawNavItems
isIndividualLabor → individualLaborNavItems
isLabor → laborNavItems
（預設）→ mainNavItems
```

---

## 十三、Bluehost 重要資訊

- WordPress 檔案位置：`/home1/lblxojmy/public_html`
- cPanel 帳號：lblxojmy
- A Record 指向 Vercel：`216.198.79.1`
- WordPress 後台：`cms.atomichabitsworld.com/wp-admin`

---

## 十四、Supabase 重要資訊

- 專案：atomichabitsworld（Rola1017's Org）
- Region：東北亞（東京）
- `category_sub = "law"` 代表直屬「法律」分類的文章
- `category_sub = "daily"` 代表直屬「日常」分類的文章
- 從 WordPress 刪文章後，要手動去 Supabase articles 刪除對應資料

---

## 十五、給下一個 Claude 的提醒

1. **當對話快到上限時，主動製作交接文件讓 Rola 下載，並把這項設定寫進下一版文件**
2. Rola 是初學者，用類比和日常例子說明最有效
3. 一步一步來，一次告訴多個步驟 + 注意事項 + 判斷標準
4. Claude 可以直接用 filesystem MCP 讀取專案檔案（路徑見第四節），不需要 Rola 複製貼上
5. Claude 可以用 puppeteer MCP 截圖測試網站
6. 不要同時開兩個對話調用 MCP（會互相卡住）
7. Cursor 直接存檔，有問題用 git 返回（例外情況見第五節）
8. Push 方式：Rola 用 Cursor GUI，不用終端機 git 指令
9. 不要複製 Gemini 的指令，以交接文件的判斷為準
10. WordPress 後台入口是 `cms.atomichabitsworld.com/wp-admin`
11. 專案使用 pnpm 管理套件，不能用 npm install
12. Rola 的身份定位：對外是「法律顧問」，內核是「系統架構師」
13. Rola 同時在開發另一個 APP「Flowlife」（在 `C:\Users\User\Desktop\flowlife`）
14. **所有程式碼必須符合：未來發展性、安全第一、方便維護、一致性、迭代友善（詳見第六節）**
15. **相關聯動的地方都要同步更改，不能只改一個地方讓其他地方不一致**
16. **Rola 不喜歡複製貼上，Claude 要盡量自己用 MCP 讀檔，只有 MCP timeout 才請 Rola 貼**

---

文件結束
