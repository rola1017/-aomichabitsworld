import { supabase } from '@/lib/supabase';

/** 與 sync route 寫入 `articles` 的欄位對齊 */
export type Article = {
  wp_id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: string;
  category_main: string;
  category_sub: string;
  tags: string[] | null;
  featured_image_url: string | null;
  meta_description: string;
  structured_qa: unknown | null;
  direct_answer: unknown | null;
  updated_at?: string | null;
};

/** 依子分類抓文章列表 */
export async function getPostsByCategory(categorySub: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category_sub', categorySub)
    .eq('status', 'published')
    .order('wp_id', { ascending: false });

  if (error) throw error;
  return (data ?? []) as Article[];
}

/** 抓單篇文章 */
export async function getPostBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) throw error;
  return (data ?? null) as Article | null;
}

/** 依 WordPress wp_id 抓單篇文章 */
export async function getPostByWpId(wpId: number): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('wp_id', wpId)
    .eq('status', 'published')
    .maybeSingle();

  if (error) throw error;
  return (data ?? null) as Article | null;
}

/** 抓全部文章 */
export async function getAllPosts(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('wp_id', { ascending: false });

  if (error) throw error;
  return (data ?? []) as Article[];
}
