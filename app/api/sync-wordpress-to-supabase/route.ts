import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// 初始化 Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRole);

// WordPress GraphQL 端點
const WP_GRAPHQL_URL = 'https://cms.atomichabitsworld.com/graphql';

// 分類對應表（WordPress 分類 slug → Supabase 分類）
const categoryMapping: Record<string, { main: string; sub: string }> = {
  // 日常
  'daily': { main: 'daily', sub: 'daily' },
  'essay': { main: 'daily', sub: 'essay' },
  'exam': { main: 'daily', sub: 'exam' },
  'left-hand-writing': { main: 'daily', sub: 'left-hand-writing' },
  'life-wisdom': { main: 'daily', sub: 'life-wisdom' },
  'study': { main: 'daily', sub: 'study' },
  'founder-story': { main: 'daily', sub: 'founder-story' },
  'science-and-technology': { main: 'daily', sub: 'tech' },
  // 閱讀一級
  'reading': { main: 'reading', sub: 'reading' },
  'business':    { main: 'reading', sub: 'business' },
  'learning':    { main: 'reading', sub: 'learning' },
  'psychology':  { main: 'reading', sub: 'psychology' },
  'medicine':    { main: 'reading', sub: 'medicine' },
  'finance':     { main: 'reading', sub: 'finance' },
  'brain-games': { main: 'reading', sub: 'brain-games' },
  'reading-law': { main: 'reading', sub: 'reading-law' },
  'science':     { main: 'reading', sub: 'science' },
  'english':     { main: 'reading', sub: 'english' },
  // 閱讀二級
  'reading-skills':               { main: 'reading', sub: 'reading-skills' },
  'habit-formation':              { main: 'reading', sub: 'habit-formation' },
  'communication':                { main: 'reading', sub: 'communication' },
  'nutrition':                    { main: 'reading', sub: 'nutrition' },
  'traditional-chinese-medicine': { main: 'reading', sub: 'traditional-chinese-medicine' },
  'law': { main: 'law', sub: 'law' },
  // 勞動法－個別
  'individual': { main: 'law', sub: 'individual' },
  'contract-onboarding': { main: 'law', sub: 'contract-onboarding' },
  'wage-hours-leave': { main: 'law', sub: 'wage-hours-leave' },
  'termination-layoff-retirement': { main: 'law', sub: 'termination-layoff-retirement' },
  'gender-equality-bullying': { main: 'law', sub: 'gender-equality-bullying' },
  // 勞動法－社會
  'social': { main: 'law', sub: 'social' },
  'labor-social-law': { main: 'law', sub: 'labor-social-law' },
  'labor-insurance': { main: 'law', sub: 'labor-insurance' },
  'labor-insurance1': { main: 'law', sub: 'labor-insurance1' },
  'occupational-accident-insurance': { main: 'law', sub: 'occupational-accident-insurance' },
  'employment-insurance': { main: 'law', sub: 'employment-insurance' },
  'nhi': { main: 'law', sub: 'nhi' },
  'national-pension-welfare': { main: 'law', sub: 'national-pension-welfare' },
  // 勞動法－集體
  'collective-procedure': { main: 'law', sub: 'collective-procedure' },
  'dispute-mediation': { main: 'law', sub: 'dispute-mediation' },
  'admin-remedies-labor-inspection': { main: 'law', sub: 'admin-remedies-labor-inspection' },
  // 保險法
  'insurance': { main: 'law', sub: 'insurance' },
  'claims-and-general': { main: 'law', sub: 'claims-and-general' },
  'claims-and-general-disclosure-duty': { main: 'law', sub: 'claims-and-general-disclosure-duty' },
  'contract-validity': { main: 'law', sub: 'contract-validity' },
  'dispute-resolution': { main: 'law', sub: 'dispute-resolution' },
  'personal-insurance': { main: 'law', sub: 'personal-insurance' },
  'corporate-liability': { main: 'law', sub: 'corporate-liability' },
  'financial-consumer-protection': { main: 'law', sub: 'financial-consumer-protection' },
  'life-insurance': { main: 'law', sub: 'life-insurance' },
  'medical': { main: 'law', sub: 'medical' },
  'accident': { main: 'law', sub: 'accident' },
  'savings-insurance': { main: 'law', sub: 'savings-insurance' },
  // 民法
  'civil': { main: 'law', sub: 'civil' },
  'contracts-and-obligations': { main: 'law', sub: 'contracts-and-obligations' },
  'family-and-inheritance': { main: 'law', sub: 'family-and-inheritance' },
  'torts-and-damages': { main: 'law', sub: 'torts-and-damages' },
  'property-law': { main: 'law', sub: 'property-law' },
  'inheritance-and-forced-heirship': { main: 'law', sub: 'inheritance-and-forced-heirship' },
  'family-trust-and-asset-protection': { main: 'law', sub: 'family-trust-and-asset-protection' },
  'marriage-contracts-and-property-regimes': { main: 'law', sub: 'marriage-contracts-and-property-regimes' },
  'wills-and-advance-directives': { main: 'law', sub: 'wills-and-advance-directives' },
  'testamentary-trusts-and-succession': { main: 'law', sub: 'testamentary-trusts-and-succession' },
  'child-protection-and-education-trusts': { main: 'law', sub: 'child-protection-and-education-trusts' },
  'retirement-trusts-and-guardianship': { main: 'law', sub: 'retirement-trusts-and-guardianship' },
  'corporate-succession-and-equity-trusts': { main: 'law', sub: 'corporate-succession-and-equity-trusts' },
  // 其他法律
  'administrative': { main: 'law', sub: 'administrative' },
  'criminal': { main: 'law', sub: 'criminal' },
  'civil-procedure': { main: 'law', sub: 'civil-procedure' },
};

type WpPost = {
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  featuredImage?: { node?: { sourceUrl?: string | null } | null } | null;
  categories?: { edges?: Array<{ node?: { slug?: string } | null }> } | null;
  seo?: { metaDesc?: string | null } | null;
};

async function fetchSingleWordPressPost(wpId: number): Promise<WpPost | null> {
  const query = `
    query GetSinglePost($id: ID!) {
      post(id: $id, idType: DATABASE_ID) {
        id
        databaseId
        title
        slug
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories(first: 5) {
          edges {
            node {
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      cache: 'no-store',
      body: JSON.stringify({
        query,
        variables: { id: String(wpId) },
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data?.data?.post ?? null;
  } catch (error) {
    console.error('Failed to fetch single WordPress post:', error);
    return null;
  }
}

// 從 WordPress 抓文章
async function fetchWordPressPosts(): Promise<WpPost[]> {
  const query = `
    query GetAllPosts {
      posts(first: 100) {
        edges {
          node {
            id
            databaseId
            title
            slug
            content
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories(first: 5) {
              edges {
                node {
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      cache: 'no-store',
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.error('WordPress GraphQL HTTP error:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    const edges = data?.data?.posts?.edges;

    if (!Array.isArray(edges)) return [];
    return edges.map((edge: { node: WpPost }) => edge.node).filter(Boolean);
  } catch (error) {
    console.error('Failed to fetch WordPress posts:', error);
    return [];
  }
}

// 轉換資料格式
function transformPost(wpPost: WpPost) {
  // 找出主分類和子分類
  const categories = wpPost.categories?.edges?.map((e) => e?.node?.slug).filter(Boolean) as string[] || [];
  const categorySlug = [...categories].reverse().find(slug => categoryMapping[slug]) || categories[0] || 'law';
  const categoryInfo = categoryMapping[categorySlug] || { main: 'law', sub: 'law' };

  return {
    wp_id: wpPost.databaseId,
    title: wpPost.title,
    slug: wpPost.slug,
    content: wpPost.content,
    excerpt: wpPost.excerpt || '',
    status: 'published',
    category_main: categoryInfo.main,
    category_sub: categoryInfo.sub || categorySlug,
    tags: categories,
    featured_image_url: wpPost.featuredImage?.node?.sourceUrl || null,
    meta_description: wpPost.seo?.metaDesc || wpPost.excerpt || '',
    structured_qa: null,
    direct_answer: null,
  };
}

// 主要同步邏輯
export async function POST(request: NextRequest) {
  try {
    // 驗證密鑰（防止濫用）
    const body = await request.json().catch(() => ({}));
    if (body.secret !== process.env.SYNC_SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 如果有指定 wp_id，只同步單篇
    if (body.wpId) {
      const wpPost = await fetchSingleWordPressPost(Number(body.wpId));
      if (!wpPost) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      const post = transformPost(wpPost);
      const { error } = await supabase
        .from('articles')
        .upsert(post, { onConflict: 'wp_id' });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ message: 'Single post synced', title: post.title });
    }

    // 抓 WordPress 文章
    const wpPosts = await fetchWordPressPosts();
    console.log(`Found ${wpPosts.length} WordPress posts`);

    // 轉換格式
    const transformedPosts = wpPosts.map(transformPost);

    // 存進 Supabase（更新或插入）
    const results: Array<{ slug: string; status: 'success' | 'failed'; error?: string }> = [];
    for (const post of transformedPosts) {
      const { data: _data, error } = await supabase
        .from('articles')
        .upsert(post, { onConflict: 'wp_id' });

      if (error) {
        console.error(`Failed to sync post ${post.slug}:`, error);
        results.push({ slug: post.slug, status: 'failed', error: error.message });
      } else {
        results.push({ slug: post.slug, status: 'success' });
      }
    }

    // 計算統計
    const successCount = results.filter((r) => r.status === 'success').length;
    const failureCount = results.filter((r) => r.status === 'failed').length;

    return NextResponse.json({
      message: 'Sync completed',
      total: transformedPosts.length,
      success: successCount,
      failed: failureCount,
      details: results,
    });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
