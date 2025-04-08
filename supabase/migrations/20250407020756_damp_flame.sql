/*
  # Update blog posts RLS policies

  1. Changes
    - Add new RLS policy to allow public read access to published blog posts
    - Keep existing policies for authenticated users

  2. Security
    - Public users can only read published blog posts
    - Authenticated users maintain full CRUD access to their own posts
*/

-- Add policy to allow public read access to published blog posts
CREATE POLICY "Allow public read access to published blog posts"
ON blog_posts
FOR SELECT
TO public
USING (published = true);