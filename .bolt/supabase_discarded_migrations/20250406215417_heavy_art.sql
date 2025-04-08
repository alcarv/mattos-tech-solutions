/*
  # Create blog posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `website_id` (uuid, foreign key to websites)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `published_at` (timestamp with time zone)
      - `author` (text)
      - `featured_image` (text)
      - `url` (text)
      - `metadata` (jsonb)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policies for authenticated users to manage their own posts
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid REFERENCES websites(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  published_at timestamptz DEFAULT now(),
  author text NOT NULL,
  featured_image text,
  url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT fk_website FOREIGN KEY (website_id) REFERENCES websites(id) ON DELETE CASCADE
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy for selecting posts
CREATE POLICY "Users can read their own website's posts"
  ON blog_posts
  FOR SELECT
  USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

-- Policy for inserting posts
CREATE POLICY "Users can insert posts for their websites"
  ON blog_posts
  FOR INSERT
  WITH CHECK (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

-- Policy for updating posts
CREATE POLICY "Users can update their own website's posts"
  ON blog_posts
  FOR UPDATE
  USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

-- Policy for deleting posts
CREATE POLICY "Users can delete their own website's posts"
  ON blog_posts
  FOR DELETE
  USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_website_id ON blog_posts(website_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);