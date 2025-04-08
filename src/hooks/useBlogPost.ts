import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BlogPost } from './useBlogPosts';

interface UseBlogPostResult {
  post: BlogPost | null;
  loading: boolean;
  error: Error | null;
}

export function useBlogPost(id: string): UseBlogPostResult {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blog post'));
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { post, loading, error };
}