/*
  # Add published flag to blog posts

  1. Changes
    - Add `published` boolean column to blog_posts table
    - Set default value to false
    - Update existing rows to have published = true if they have a published_at date

  2. Security
    - No changes to RLS policies needed
*/

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false;

-- Set published = true for existing posts with a published_at date
UPDATE blog_posts 
SET published = true 
WHERE published_at IS NOT NULL;