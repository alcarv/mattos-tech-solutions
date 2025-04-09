import React, { useState, useRef } from 'react';
import { useBlogPosts, BlogPost } from '../hooks/useBlogPosts';
import { Loader2, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Pagination } from './Pagination';
import { Link, useNavigate } from 'react-router-dom';

interface BlogPostsListProps {
  websiteId: string;
  perPage?: number;
}

export const BlogPostsList: React.FC<BlogPostsListProps> = ({ websiteId, perPage = 6 }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const {
    posts,
    loading,
    error,
    totalPosts,
    fetchPage
  } = useBlogPosts({
    websiteId,
    page: currentPage,
    perPage,
    orderBy: { column: 'published_at', ascending: false }
  });

  const totalPages = Math.ceil(totalPosts / perPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPage(page);
    
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePostClick = (e: React.MouseEvent<HTMLAnchorElement>, postId: string) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate(`/blog/${postId}`);
    }, 300);
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Sem data';
    return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400 p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-8" ref={listRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: BlogPost) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            onClick={(e) => handlePostClick(e, post.id)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
          >
            {post.image_url ? (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(post.published_at || post.updated_at)}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  post.published
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {post.published ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.description}
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Ler Mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center p-4">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400 p-8">
          No blog posts found.
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};