/**
 * 文章內文統一樣式
 * 所有顯示 WordPress/Supabase 內文的元件都應引用這個常數
 * 未來想改文章排版，只需改這裡
 */
export const ARTICLE_CONTENT_CLASSNAME =
  "max-w-none leading-relaxed text-[#334155] " +
  "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:text-[#1A2744] " +
  "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:text-[#1A2744] " +
  "[&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-1 [&_h3]:text-[#1A2744] " +
  "[&_p]:mb-4 " +
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 " +
  "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 " +
  "[&_li]:mb-1 " +
  "[&_strong]:font-semibold"
