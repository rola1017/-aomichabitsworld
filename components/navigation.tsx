"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useState } from "react"

import { MenuTreeDropdown } from "@/components/ui/menu-tree-dropdown"
import { READING_SUBCATEGORIES } from "@/config/reading-config"

const navItems = [
  { label: "法律", href: "/law", bgColor: "rgba(222,230,255,.98)" },
  { label: "閱讀", href: "/reading", bgColor: "rgba(255,243,196,.98)" },
  { label: "科技", href: "#", bgColor: "rgba(215,243,234,.98)" },
  { label: "日常", href: "/daily", bgColor: "rgba(255,226,210,.98)" },
]

const lawMenuTree = [
  {
    label: "勞動社會法",
    href: "/law/labor",
    children: [
      {
        label: "個別勞動法",
        href: "/law/labor/individual",
        children: [
          { label: "勞動契約與入職管理", href: "/law/labor/individual/contract-onboarding" },
          { label: "工資、工時與休假", href: "/law/labor/individual/wage-hours-leave" },
          { label: "終止契約、資遣與退休", href: "/law/labor/individual/termination-layoff-retirement" },
          { label: "性別平等與職場霸凌", href: "/law/labor/individual/gender-equality-bullying" },
        ],
      },
      {
        label: "社會法",
        href: "/law/labor/social",
        children: [
          {
            label: "勞工保險(勞保)",
            href: "/law/labor/social/labor-insurance",
            children: [
              {
                label: "勞保1",
                href: "/law/labor/social/labor-insurance/labor-insurance1",
              },
            ],
          },
          { label: "職業災害保險與保護(災保法)", href: "/law/labor/social/occupational-accident-insurance" },
          { label: "就業保險與失業保障", href: "/law/labor/social/employment-insurance" },
          { label: "全民健保與二代健保", href: "/law/labor/social/nhi" },
          { label: "國民年金與社會福利", href: "/law/labor/social/national-pension-welfare" },
        ],
      },
      {
        label: "集體勞動法&程序法",
        href: "/law/labor/collective-procedure",
        children: [
          { label: "勞資爭議處理與調解程序", href: "/law/labor/collective-procedure/dispute-mediation" },
          { label: "行政救濟與勞檢應對", href: "/law/labor/collective-procedure/admin-remedies-labor-inspection" },
        ],
      },
    ],
  },
  {
    label: "保險法",
    href: "/law/insurance",
    children: [
      {
        label: "理賠實務與保險法總則",
        href: "/law/insurance/claims-and-general",
        children: [
          { label: "告知義務", href: "/law/insurance/claims-and-general/disclosure-duty" },
          { label: "契約效力", href: "/law/insurance/claims-and-general/contract-validity" },
          { label: "爭議處理", href: "/law/insurance/claims-and-general/dispute-resolution" },
        ],
      },
      {
        label: "人身保險規劃",
        href: "/law/insurance/personal-insurance",
        children: [
          {
            label: "壽險",
            href: "/law/insurance/personal-insurance/life-insurance",
            children: [
              {
                label: "儲蓄險",
                href: "/law/insurance/personal-insurance/life-insurance/savings",
              },
            ],
          },
          { label: "醫療險", href: "/law/insurance/personal-insurance/medical" },
          { label: "意外險", href: "/law/insurance/personal-insurance/accident" },
        ],
      },
      { label: "企業保險與責任險", href: "/law/insurance/corporate-liability" },
      { label: "金融消費者保護與法規", href: "/law/insurance/financial-consumer-protection" },
    ],
  },
  {
    label: "民法",
    href: "/law/civil",
    children: [
      { label: "契約法與債權實務", href: "/law/civil/contracts-and-obligations" },
      {
        label: "親屬與繼承法",
        href: "/law/civil/family-and-inheritance",
        children: [
          {
            label: "遺產繼承與特留分實務",
            href: "/law/civil/family-and-inheritance/inheritance-and-forced-heirship",
          },
          {
            label: "家族信託與資產保護",
            href: "/law/civil/family-and-inheritance/family-trust-and-asset-protection",
            children: [
              {
                label: "遺囑信託與身後傳承",
                href: "/law/civil/family-and-inheritance/family-trust-and-asset-protection/testamentary-trusts-and-succession",
              },
              {
                label: "子女保障與教育信託",
                href: "/law/civil/family-and-inheritance/family-trust-and-asset-protection/child-protection-and-education-trusts",
              },
              {
                label: "安養信託與意定監護",
                href: "/law/civil/family-and-inheritance/family-trust-and-asset-protection/retirement-trusts-and-guardianship",
              },
              {
                label: "企業傳承與股權信託",
                href: "/law/civil/family-and-inheritance/family-trust-and-asset-protection/corporate-succession-and-equity-trusts",
              },
            ],
          },
          {
            label: "婚姻契約與財產制",
            href: "/law/civil/family-and-inheritance/marriage-contracts-and-property-regimes",
          },
          {
            label: "遺囑撰擬與預立醫療決定",
            href: "/law/civil/family-and-inheritance/wills-and-advance-directives",
          },
        ],
      },
      { label: "侵權行為與損害賠償", href: "/law/civil/torts-and-damages" },
      { label: "物權與不動產法", href: "/law/civil/property-law" },
    ],
  },
  { label: "行政法", href: "/law/administrative" },
  { label: "刑法", href: "/law/criminal" },
  { label: "民事訴訟法", href: "/law/civil-procedure" },
] as const

const dailyMenuTree = [
  { label: "讀書", href: "/daily/study" },
  { label: "考試", href: "/daily/exam" },
  { label: "隨筆", href: "/daily/essay" },
  { label: "左手訓練", href: "/daily/left-hand-writing" },
  { label: "生活智慧王", href: "/daily/life-wisdom" },
] as const

/** 手機版「法律」下一層（規格：六項，無更深層） */
const mobileLawLinks = [
  { label: "勞動社會法", href: "/law/labor" },
  { label: "保險法", href: "/law/insurance" },
  { label: "民法", href: "/law/civil" },
  { label: "行政法", href: "/law/administrative" },
  { label: "刑法", href: "/law/criminal" },
  { label: "民事訴訟法", href: "/law/civil-procedure" },
] as const

const NAV_PILL_CLASS =
  "inline-flex touch-manipulation cursor-pointer items-center rounded-full border border-[#101A3A]/15 px-4 py-2 text-base font-medium whitespace-nowrap text-[#101A3A] shadow-sm ring-1 ring-black/5 transition-opacity hover:opacity-80 sm:px-6 sm:py-2.5 sm:text-lg"

const LOGO_SRC =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AtomicHabitsWorld-OV1EpY5UU1vffttWVWCcHGOdrWoPSF.png"

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpand, setMobileExpand] = useState<null | "law" | "daily">(null)

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    setMobileExpand(null)
  }, [])

  const toggleHamburger = useCallback(() => {
    setMobileOpen((o) => !o)
    setMobileExpand(null)
  }, [])

  const toggleLawExpand = useCallback(() => {
    setMobileExpand((e) => (e === "law" ? null : "law"))
  }, [])

  const toggleDailyExpand = useCallback(() => {
    setMobileExpand((e) => (e === "daily" ? null : "daily"))
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full min-w-0 overflow-x-hidden bg-white/90 backdrop-blur-md shadow-sm">
      <div className="relative mx-auto max-w-5xl px-3 py-2 sm:px-4 sm:py-3">
        {/* —— 電腦版 md+：維持原 pill + hover 下拉 —— */}
        <nav className="hidden w-full min-w-0 flex-row items-center gap-3 md:flex">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2"
          >
            <Image
              src={LOGO_SRC}
              alt="AtomicHabitsWorld Logo"
              width={42}
              height={42}
              className="shrink-0 rounded-lg"
            />
            <span className="whitespace-nowrap text-base font-semibold text-[#101A3A] sm:text-lg">
              每天一點點
            </span>
          </Link>

          <div className="flex min-w-0 flex-1 justify-center overflow-x-auto scrollbar-hide px-1">
            <div className="flex items-center justify-center gap-2">
              {navItems.map((item) =>
                item.label === "法律" ? (
                  <MenuTreeDropdown
                    key={item.label}
                    nodes={lawMenuTree as any}
                    openOnHover
                    contentClassName="min-w-[16rem]"
                    trigger={
                      <Link
                        href="/law"
                        style={{ backgroundColor: item.bgColor }}
                        className={NAV_PILL_CLASS}
                      >
                        {item.label}
                      </Link>
                    }
                  />
                ) : item.label === "日常" ? (
                  <MenuTreeDropdown
                    key={item.label}
                    nodes={dailyMenuTree as any}
                    openOnHover
                    contentClassName="min-w-[14rem]"
                    trigger={
                      <Link
                        href="/daily"
                        style={{ backgroundColor: item.bgColor }}
                        className={NAV_PILL_CLASS}
                      >
                        {item.label}
                      </Link>
                    }
                  />
                ) : item.label === "閱讀" ? (
                  <MenuTreeDropdown
                    key={item.label}
                    nodes={READING_SUBCATEGORIES.map((cat) => ({ label: cat.label, href: cat.href }))}
                    openOnHover
                    contentClassName="min-w-[14rem]"
                    trigger={
                      <Link
                        href="/reading"
                        style={{ backgroundColor: item.bgColor }}
                        className={NAV_PILL_CLASS}
                      >
                        {item.label}
                      </Link>
                    }
                  />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{ backgroundColor: item.bgColor }}
                    className={NAV_PILL_CLASS}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </nav>

        {/* —— 手機版：僅第一列（選單本體在 header 下層全寬，避免 w-screen + 負 margin 造成橫向捲動） —— */}
        <div className="flex w-full min-w-0 items-center justify-between gap-3 md:hidden">
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center gap-2"
            onClick={closeMobile}
          >
            <Image
              src={LOGO_SRC}
              alt="AtomicHabitsWorld Logo"
              width={42}
              height={42}
              className="size-[42px] shrink-0 rounded-full object-cover"
            />
            <span className="truncate text-base font-semibold text-[#101A3A]">每天一點點</span>
          </Link>

          <button
            type="button"
            className="shrink-0 rounded-lg p-2 transition-colors hover:bg-stone-100/50"
            aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={mobileOpen}
            onClick={toggleHamburger}
          >
            <svg
              className="h-6 w-6 text-[#1A2744]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 手機全寬選單：與 max-w-5xl 同層，寬度 = header = 100%，不再使用 100vw / 負 margin */}
      <div
        className={
          mobileOpen
            ? "md:hidden w-full min-w-0 border-t border-stone-200 bg-white py-2 shadow-md"
            : "hidden"
        }
      >
        <div className="border-b border-stone-100">
          <div
            className="flex w-full min-w-0 items-stretch"
            style={{ backgroundColor: "rgba(222,230,255,.98)" }}
          >
            <Link
              href="/law"
              className="flex min-w-0 flex-1 items-center px-4 py-3 text-base font-medium text-[#101A3A]"
              onClick={closeMobile}
            >
              法律
            </Link>
            <button
              type="button"
              className="flex shrink-0 items-center justify-center border-l border-stone-300/50 px-4 py-3 text-lg leading-none text-stone-600"
              aria-label={mobileExpand === "law" ? "收合法律子選單" : "展開法律子選單"}
              aria-expanded={mobileExpand === "law"}
              onClick={toggleLawExpand}
            >
              {mobileExpand === "law" ? "−" : "+"}
            </button>
          </div>
          {mobileExpand === "law" ? (
            <ul className="border-t border-stone-100 bg-stone-50/80">
              {mobileLawLinks.map((row) => (
                <li key={row.href} className="border-b border-stone-100/80 last:border-b-0">
                  <Link
                    href={row.href}
                    className="block px-6 py-2.5 text-sm text-[#2563eb]"
                    onClick={closeMobile}
                  >
                    {row.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <Link
          href="/reading"
          className="block border-b border-stone-100 px-4 py-3 text-base font-medium text-[#101A3A]"
          style={{ backgroundColor: "rgba(255,243,196,.98)" }}
          onClick={closeMobile}
        >
          閱讀
        </Link>

        <Link
          href="/tech"
          className="block border-b border-stone-100 px-4 py-3 text-base font-medium text-[#101A3A]"
          style={{ backgroundColor: "rgba(215,243,234,.98)" }}
          onClick={closeMobile}
        >
          科技
        </Link>

        <div>
          <div
            className="flex w-full min-w-0 items-stretch"
            style={{ backgroundColor: "rgba(255,226,210,.98)" }}
          >
            <Link
              href="/daily"
              className="flex min-w-0 flex-1 items-center px-4 py-3 text-base font-medium text-[#101A3A]"
              onClick={closeMobile}
            >
              日常
            </Link>
            <button
              type="button"
              className="flex shrink-0 items-center justify-center border-l border-stone-300/50 px-4 py-3 text-lg leading-none text-stone-600"
              aria-label={mobileExpand === "daily" ? "收合日常子選單" : "展開日常子選單"}
              aria-expanded={mobileExpand === "daily"}
              onClick={toggleDailyExpand}
            >
              {mobileExpand === "daily" ? "−" : "+"}
            </button>
          </div>
          {mobileExpand === "daily" ? (
            <ul className="border-t border-stone-100 bg-stone-50/80">
              {dailyMenuTree.map((row) => (
                <li key={row.href} className="border-b border-stone-100/80 last:border-b-0">
                  <Link
                    href={row.href}
                    className="block px-6 py-2.5 text-sm text-[#2563eb]"
                    onClick={closeMobile}
                  >
                    {row.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </header>
  )
}
