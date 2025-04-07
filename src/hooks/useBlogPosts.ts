import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface BlogPost {
  id: string;
  website_id: string;
  title: string;
  description: string;
  content: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  user_id: string;
  published_at: string | null;
  image_url: string | null;
}

interface UseBlogPostsOptions {
  websiteId: string;
  page?: number;
  perPage?: number;
  orderBy?: {
    column: 'published_at' | 'created_at' | 'title' | 'updated_at';
    ascending?: boolean;
  };
}

interface UseBlogPostsResult {
  posts: BlogPost[];
  loading: boolean;
  error: Error | null;
  totalPosts: number;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

export function useBlogPosts({
  websiteId,
  page = 1,
  perPage = 10,
  orderBy = { column: 'published_at', ascending: false }
}: UseBlogPostsOptions): UseBlogPostsResult {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchPosts = async (startIndex: number) => {
    try {
      setLoading(true);
      setError(null);

      // Get total count of posts for the website
      const { count } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })
        .eq('website_id', websiteId);

      setTotalPosts(count || 0);

      // Fetch posts with pagination
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('website_id', websiteId)
        .order(orderBy.column, { ascending: orderBy.ascending })
        .range(startIndex, startIndex + perPage - 1);

      if (error) throw error;

      setPosts(prevPosts => startIndex === 0 ? data : [...prevPosts, ...data]);
      setHasMore((count || 0) > startIndex + perPage);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(0);
  }, [websiteId]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      await fetchPosts(posts.length);
    }
  };

  return {
    posts,
    loading,
    error,
    totalPosts,
    hasMore,
    loadMore
  };
}