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
        <p className="text-2xl font-bold font-serif leading-normal text-[#c8c2b8] md:text-3xl">
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
        <p className={`${corinthia.className} text-4xl md:text-5xl text-[#c4bcb0]`}>{q.english}</p>
      </div>
    </section>
  )
}
