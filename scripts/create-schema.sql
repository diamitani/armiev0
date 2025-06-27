-- ARMIE Artist Manager Database Schema
-- PostgreSQL schema for Neon database

-- Enable UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Artists table - Main user entities
CREATE TABLE artists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    profile_image_url TEXT,
    bio TEXT,
    website_url TEXT,
    social_links JSONB DEFAULT '{}',
    subscription_tier VARCHAR(50) DEFAULT 'free',
    is_active BOOLEAN DEFAULT true
);

-- Assistants table - AI assistants linked to artists
CREATE TABLE assistants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    purpose TEXT NOT NULL,
    openai_id VARCHAR(255) UNIQUE NOT NULL,
    artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    configuration JSONB DEFAULT '{}'
);

-- Chats table - Conversation sessions
CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assistant_id UUID NOT NULL REFERENCES assistants(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    topic VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_archived BOOLEAN DEFAULT false,
    message_count INTEGER DEFAULT 0,
    last_message_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'
);

-- Messages table - Individual messages in chats
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    token_count INTEGER,
    processing_time_ms INTEGER,
    metadata JSONB DEFAULT '{}'
);

-- Create indexes for better query performance
CREATE INDEX idx_artists_email ON artists(email);
CREATE INDEX idx_artists_created_at ON artists(created_at);
CREATE INDEX idx_artists_subscription_tier ON artists(subscription_tier);

CREATE INDEX idx_assistants_artist_id ON assistants(artist_id);
CREATE INDEX idx_assistants_openai_id ON assistants(openai_id);
CREATE INDEX idx_assistants_category ON assistants(category);
CREATE INDEX idx_assistants_created_at ON assistants(created_at);
CREATE INDEX idx_assistants_last_used_at ON assistants(last_used_at);

CREATE INDEX idx_chats_assistant_id ON chats(assistant_id);
CREATE INDEX idx_chats_created_at ON chats(created_at);
CREATE INDEX idx_chats_updated_at ON chats(updated_at);
CREATE INDEX idx_chats_last_message_at ON chats(last_message_at);
CREATE INDEX idx_chats_is_archived ON chats(is_archived);

CREATE INDEX idx_messages_chat_id ON messages(chat_id);
CREATE INDEX idx_messages_sender ON messages(sender);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- Composite indexes for common query patterns
CREATE INDEX idx_assistants_artist_category ON assistants(artist_id, category);
CREATE INDEX idx_chats_assistant_archived ON chats(assistant_id, is_archived);
CREATE INDEX idx_messages_chat_sender ON messages(chat_id, sender);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_artists_updated_at BEFORE UPDATE ON artists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assistants_updated_at BEFORE UPDATE ON assistants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chats_updated_at BEFORE UPDATE ON chats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update message count in chats
CREATE OR REPLACE FUNCTION update_chat_message_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE chats 
        SET message_count = message_count + 1,
            last_message_at = NEW.created_at,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.chat_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE chats 
        SET message_count = message_count - 1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = OLD.chat_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Trigger to maintain message count
CREATE TRIGGER update_chat_message_count_trigger
    AFTER INSERT OR DELETE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_chat_message_count();

-- Function to update assistant usage count
CREATE OR REPLACE FUNCTION update_assistant_usage()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE assistants 
    SET usage_count = usage_count + 1,
        last_used_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.assistant_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to track assistant usage
CREATE TRIGGER update_assistant_usage_trigger
    AFTER INSERT ON chats
    FOR EACH ROW EXECUTE FUNCTION update_assistant_usage();
