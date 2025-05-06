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

        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            description,
            content,
            created_at,
            updated_at,
            published,
            published_at,
            image_url,
            website_id,
            user_id
          `)
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;
        
        // Update page title and meta description for SEO
        if (data) {
          document.title = `${data.title} | Mattos Tech Solutions Blog`;
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', data.description || '');
          }
        }

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