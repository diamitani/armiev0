import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface User {
  id: string
  email: string
  password_hash?: string
  name: string
  artist_name?: string
  avatar_url?: string
  subscription_tier: string
  oauth_provider?: string
  oauth_id?: string
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface Chat {
  id: string
  user_id: string
  title: string
  created_at: Date
  updated_at: Date
}

export interface Message {
  id: string
  chat_id: string
  role: "user" | "assistant" | "system"
  content: string
  created_at: Date
}

export interface UserFile {
  id: string
  user_id: string
  filename: string
  original_name: string
  file_type: string
  file_size: number
  content_text?: string
  upload_path?: string
  created_at: Date
}

export class DatabaseService {
  static async createUser(data: {
    email: string
    password_hash?: string
    name: string
    artist_name?: string
    oauth_provider?: string
    oauth_id?: string
  }): Promise<User> {
    const result = await sql`
      INSERT INTO users (email, password_hash, name, artist_name, oauth_provider, oauth_id)
      VALUES (${data.email}, ${data.password_hash || null}, ${data.name}, ${data.artist_name || null}, ${data.oauth_provider || null}, ${data.oauth_id || null})
      RETURNING *
    `
    return result[0] as User
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email} AND is_active = true
    `
    return (result[0] as User) || null
  }

  static async getUserById(id: string): Promise<User | null> {
    const result = await sql`
      SELECT * FROM users WHERE id = ${id} AND is_active = true
    `
    return (result[0] as User) || null
  }

  static async getUserByOAuth(provider: string, oauthId: string): Promise<User | null> {
    const result = await sql`
      SELECT * FROM users WHERE oauth_provider = ${provider} AND oauth_id = ${oauthId} AND is_active = true
    `
    return (result[0] as User) || null
  }

  static async updateUser(id: string, data: Partial<User>): Promise<User> {
    const result = await sql`
      UPDATE users 
      SET name = COALESCE(${data.name}, name),
          artist_name = COALESCE(${data.artist_name}, artist_name),
          avatar_url = COALESCE(${data.avatar_url}, avatar_url),
          subscription_tier = COALESCE(${data.subscription_tier}, subscription_tier),
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0] as User
  }

  static async createChat(userId: string, title = "New Chat"): Promise<Chat> {
    const result = await sql`
      INSERT INTO chats (user_id, title)
      VALUES (${userId}, ${title})
      RETURNING *
    `
    return result[0] as Chat
  }

  static async getUserChats(userId: string): Promise<Chat[]> {
    const result = await sql`
      SELECT * FROM chats WHERE user_id = ${userId} ORDER BY updated_at DESC
    `
    return result as Chat[]
  }

  static async getChatById(chatId: string, userId: string): Promise<Chat | null> {
    const result = await sql`
      SELECT * FROM chats WHERE id = ${chatId} AND user_id = ${userId}
    `
    return (result[0] as Chat) || null
  }

  static async updateChat(chatId: string, data: Partial<Chat>): Promise<Chat> {
    const result = await sql`
      UPDATE chats 
      SET title = COALESCE(${data.title}, title),
          updated_at = NOW()
      WHERE id = ${chatId}
      RETURNING *
    `
    return result[0] as Chat
  }

  static async deleteChat(chatId: string): Promise<void> {
    await sql`DELETE FROM chats WHERE id = ${chatId}`
  }

  static async createMessage(chatId: string, role: "user" | "assistant" | "system", content: string): Promise<Message> {
    const result = await sql`
      INSERT INTO messages (chat_id, role, content)
      VALUES (${chatId}, ${role}, ${content})
      RETURNING *
    `
    return result[0] as Message
  }

  static async getChatMessages(chatId: string): Promise<Message[]> {
    const result = await sql`
      SELECT * FROM messages WHERE chat_id = ${chatId} ORDER BY created_at ASC
    `
    return result as Message[]
  }

  static async deleteMessage(messageId: string): Promise<void> {
    await sql`DELETE FROM messages WHERE id = ${messageId}`
  }

  static async createUserFile(data: {
    user_id: string
    filename: string
    original_name: string
    file_type: string
    file_size: number
    content_text?: string
    upload_path?: string
  }): Promise<UserFile> {
    const result = await sql`
      INSERT INTO user_files (user_id, filename, original_name, file_type, file_size, content_text, upload_path)
      VALUES (${data.user_id}, ${data.filename}, ${data.original_name}, ${data.file_type}, ${data.file_size}, ${data.content_text || null}, ${data.upload_path || null})
      RETURNING *
    `
    return result[0] as UserFile
  }

  static async getUserFiles(userId: string): Promise<UserFile[]> {
    const result = await sql`
      SELECT * FROM user_files WHERE user_id = ${userId} ORDER BY created_at DESC
    `
    return result as UserFile[]
  }

  static async getFileById(fileId: string, userId: string): Promise<UserFile | null> {
    const result = await sql`
      SELECT * FROM user_files WHERE id = ${fileId} AND user_id = ${userId}
    `
    return (result[0] as UserFile) || null
  }

  static async deleteFile(fileId: string): Promise<void> {
    await sql`DELETE FROM user_files WHERE id = ${fileId}`
  }
}

// Legacy exports for backward compatibility
export async function getUserByEmail(email: string): Promise<User | null> {
  return DatabaseService.getUserByEmail(email)
}

export async function getUserById(id: string): Promise<User | null> {
  return DatabaseService.getUserById(id)
}

export async function createUser(data: {
  email: string
  name: string
  password?: string
  oauth_provider?: string
  oauth_provider_id?: string
}): Promise<User> {
  return DatabaseService.createUser({
    email: data.email,
    name: data.name,
    password_hash: data.password,
    oauth_provider: data.oauth_provider,
    oauth_id: data.oauth_provider_id,
  })
}

export async function createChat(userId: string, title: string): Promise<Chat> {
  return DatabaseService.createChat(userId, title)
}

export async function getChatsByUserId(userId: string): Promise<Chat[]> {
  return DatabaseService.getUserChats(userId)
}

export async function getChatById(chatId: string, userId: string): Promise<Chat | null> {
  return DatabaseService.getChatById(chatId, userId)
}

export async function createMessage(chatId: string, role: "user" | "assistant", content: string): Promise<Message> {
  return DatabaseService.createMessage(chatId, role, content)
}

export async function getMessagesByChatId(chatId: string): Promise<Message[]> {
  return DatabaseService.getChatMessages(chatId)
}
