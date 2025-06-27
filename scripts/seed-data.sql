-- Seed data for ARMIE Artist Manager
-- This script populates the database with sample data

-- Insert sample artists
INSERT INTO artists (id, name, email, bio, website_url, social_links, subscription_tier) VALUES
(
    uuid_generate_v4(),
    'Alex Rivera',
    'alex@example.com',
    'Independent hip-hop artist and producer from Los Angeles',
    'https://alexrivera.com',
    '{"instagram": "@alexrivera", "twitter": "@alexrmusic", "spotify": "alexrivera"}',
    'pro'
),
(
    uuid_generate_v4(),
    'Sarah Chen',
    'sarah@example.com',
    'Singer-songwriter specializing in indie folk and acoustic music',
    'https://sarahchenmusic.com',
    '{"instagram": "@sarahchenmusic", "youtube": "SarahChenOfficial"}',
    'free'
),
(
    uuid_generate_v4(),
    'Marcus Johnson',
    'marcus@example.com',
    'Electronic music producer and DJ based in Berlin',
    'https://marcusjohnson.de',
    '{"soundcloud": "marcusjohnson", "instagram": "@marcusjdj"}',
    'premium'
);

-- Insert AI assistants for each artist
INSERT INTO assistants (name, purpose, openai_id, artist_id, description, category) 
SELECT 
    'Lyric Generator',
    'Generate creative lyrics for songs based on themes, emotions, and musical styles',
    'asst_lyric_gen_001',
    a.id,
    'AI-powered lyric generation assistant that helps create compelling song lyrics',
    'songwriting'
FROM artists a WHERE a.email = 'alex@example.com';

INSERT INTO assistants (name, purpose, openai_id, artist_id, description, category) 
SELECT 
    'Social Media Assistant',
    'Create engaging social media content and captions for music promotion',
    'asst_social_001',
    a.id,
    'Specialized assistant for creating social media content that resonates with music fans',
    'marketing'
FROM artists a WHERE a.email = 'alex@example.com';

INSERT INTO assistants (name, purpose, openai_id, artist_id, description, category) 
SELECT 
    'Artist Bio Generator',
    'Create professional artist biographies for press kits and promotional materials',
    'asst_bio_gen_001',
    a.id,
    'Professional bio writing assistant for artists and musicians',
    'branding'
FROM artists a WHERE a.email = 'sarah@example.com';

INSERT INTO assistants (name, purpose, openai_id, artist_id, description, category) 
SELECT 
    'EPK Assistant',
    'Help create comprehensive Electronic Press Kits for media outreach',
    'asst_epk_001',
    a.id,
    'Complete EPK creation assistant for professional music promotion',
    'promotion'
FROM artists a WHERE a.email = 'sarah@example.com';

INSERT INTO assistants (name, purpose, openai_id, artist_id, description, category) 
SELECT 
    'Branding Assistant',
    'Develop cohesive brand identity and visual concepts for artists',
    'asst_brand_001',
    a.id,
    'Creative branding assistant for developing unique artist identities',
    'branding'
FROM artists a WHERE a.email = 'marcus@example.com';

-- Insert sample chats
INSERT INTO chats (assistant_id, title, topic)
SELECT 
    ast.id,
    'Hip-hop track about overcoming challenges',
    'motivational hip-hop'
FROM assistants ast 
JOIN artists art ON ast.artist_id = art.id
WHERE art.email = 'alex@example.com' AND ast.name = 'Lyric Generator';

INSERT INTO chats (assistant_id, title, topic)
SELECT 
    ast.id,
    'Instagram post for new single release',
    'single promotion'
FROM assistants ast 
JOIN artists art ON ast.artist_id = art.id
WHERE art.email = 'alex@example.com' AND ast.name = 'Social Media Assistant';

INSERT INTO chats (assistant_id, title, topic)
SELECT 
    ast.id,
    'Professional bio for folk album',
    'artist biography'
FROM assistants ast 
JOIN artists art ON ast.artist_id = art.id
WHERE art.email = 'sarah@example.com' AND ast.name = 'Artist Bio Generator';

-- Insert sample messages
INSERT INTO messages (chat_id, sender, content, token_count)
SELECT 
    c.id,
    'user',
    'I need lyrics for a hip-hop track about overcoming personal struggles and finding success. The beat is energetic and uplifting.',
    25
FROM chats c 
JOIN assistants ast ON c.assistant_id = ast.id
JOIN artists art ON ast.artist_id = art.id
WHERE art.email = 'alex@example.com' AND c.title = 'Hip-hop track about overcoming challenges';

INSERT INTO messages (chat_id, sender, content, token_count)
SELECT 
    c.id,
    'assistant',
    'Here''s a powerful verse for your track:

[Verse 1]
Started from the bottom, now I''m climbing every day
Obstacles in front of me, but I won''t fade away
Every setback taught me lessons, made me who I am
Now I''m standing tall and proud, executing every plan

The chorus could focus on the transformation theme. Would you like me to continue with the hook?',
    85
FROM chats c 
JOIN assistants ast ON c.assistant_id = ast.id
JOIN artists art ON ast.artist_id = art.id
WHERE art.email = 'alex@example.com' AND c.title = 'Hip-hop track about overcoming challenges';

INSERT INTO messages (chat_id, sender, content, token_count)
SELECT 
    c.id,
    'user',
    'Create an Instagram caption for my new single "Midnight Dreams" - it''s an indie folk song about late-night reflections.',
    20
FROM chats c 
JOIN assistants ast ON c.assistant_id = ast.id
JOIN artists art ON ast.artist_id = art.id
WHERE art.email = 'alex@example.com' AND c.title = 'Instagram post for new single release';
