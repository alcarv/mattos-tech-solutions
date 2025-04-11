import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function generateSitemap() {
  try {
    // Fetch all published blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('published', true);

    if (error) throw error;

    // Base URL of your website
    const baseUrl = 'https://mattostechsolutions.com';

    // Start XML sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Add blog posts to sitemap
    posts.forEach(post => {
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Close sitemap
    sitemap += '\n</urlset>';

    // Write sitemap to public directory
    fs.writeFileSync('./public/sitemap.xml', sitemap);
    console.log('Sitemap generated successfully!');

  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();