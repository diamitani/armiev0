import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

// Create the SQL client
export const sql = neon(process.env.DATABASE_URL)

// Database utility functions
export class DatabaseService {
  // Artists
  static async createArtist(data: {
    name: string
    email: string
    password_hash: string
    bio?: string
    website_url?: string
    social_links?: Record<string, string>
    subscription_tier?: string
  }) {
    const result = await sql`
      INSERT INTO artists (name, email, password_hash, bio, website_url, social_links, subscription_tier)
      VALUES (${data.name}, ${data.email}, ${data.password_hash}, ${data.bio || null}, 
              ${data.website_url || null}, ${JSON.stringify(data.social_links || {})}, 
              ${data.subscription_tier || "free"})
      RETURNING id, name, email, bio, website_url, social_links, subscription_tier, created_at
    `
    return result[0]
  }

  static async getArtistByEmail(email: string) {
    const result = await sql`
      SELECT * FROM artists WHERE email = ${email} AND is_active = true
    `
    return result[0] || null
  }

  static async getArtistById(id: string) {
    const result = await sql`
      SELECT id, name, email, bio, website_url, social_links, subscription_tier, created_at
      FROM artists WHERE id = ${id} AND is_active = true
    `
    return result[0] || null
  }

  // Contracts
  static async createContract(data: {
    title: string
    type: string
    counterparty_name: string
    counterparty_email: string
    start_date: string
    end_date?: string
    value?: number
    currency: string
    terms: string
    status: string
    artist_id: string
    metadata?: Record<string, any>
  }) {
    const result = await sql`
      INSERT INTO contracts (
        title, type, counterparty_name, counterparty_email, start_date, end_date,
        value, currency, terms, status, artist_id, metadata
      )
      VALUES (
        ${data.title}, ${data.type}, ${data.counterparty_name}, ${data.counterparty_email},
        ${data.start_date}, ${data.end_date || null}, ${data.value || null}, ${data.currency},
        ${data.terms}, ${data.status}, ${data.artist_id}, ${JSON.stringify(data.metadata || {})}
      )
      RETURNING *
    `
    return result[0]
  }

  static async getContractById(id: string) {
    const result = await sql`
      SELECT * FROM contracts WHERE id = ${id} AND is_deleted = false
    `
    return result[0] || null
  }

  static async getContractsByArtist(
    artist_id: string,
    options: {
      page?: number
      limit?: number
      type?: string
      status?: string
      search?: string
    } = {},
  ) {
    const { page = 1, limit = 20, type, status, search } = options
    const offset = (page - 1) * limit

    let whereClause = `WHERE artist_id = ${artist_id} AND is_deleted = false`

    if (type) {
      whereClause += ` AND type = '${type}'`
    }

    if (status) {
      whereClause += ` AND status = '${status}'`
    }

    if (search) {
      whereClause += ` AND (title ILIKE '%${search}%' OR counterparty_name ILIKE '%${search}%')`
    }

    const [contracts, countResult] = await Promise.all([
      sql`
        SELECT * FROM contracts 
        ${sql.unsafe(whereClause)}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      sql`
        SELECT COUNT(*) as total FROM contracts 
        ${sql.unsafe(whereClause)}
      `,
    ])

    const total = Number.parseInt(countResult[0].total)
    const totalPages = Math.ceil(total / limit)

    return {
      data: contracts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    }
  }

  static async updateContract(
    id: string,
    data: Partial<{
      title: string
      counterparty_name: string
      counterparty_email: string
      start_date: string
      end_date: string
      value: number
      currency: string
      terms: string
      status: string
      metadata: Record<string, any>
    }>,
  ) {
    const updates = Object.entries(data)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        if (key === "metadata") {
          return `${key} = '${JSON.stringify(value)}'`
        }
        return `${key} = '${value}'`
      })
      .join(", ")

    if (!updates) {
      throw new Error("No valid updates provided")
    }

    const result = await sql`
      UPDATE contracts 
      SET ${sql.unsafe(updates)}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  }

  static async deleteContract(id: string) {
    await sql`
      UPDATE contracts 
      SET is_deleted = true, updated_at = NOW()
      WHERE id = ${id}
    `
  }

  // Assistants
  static async createAssistant(data: {
    name: string
    purpose: string
    openai_id: string
    artist_id: string
    description?: string
    category?: string
    configuration?: Record<string, any>
  }) {
    const result = await sql`
      INSERT INTO assistants (name, purpose, openai_id, artist_id, description, category, configuration)
      VALUES (${data.name}, ${data.purpose}, ${data.openai_id}, ${data.artist_id}, 
              ${data.description || null}, ${data.category || null}, 
              ${JSON.stringify(data.configuration || {})})
      RETURNING *
    `
    return result[0]
  }

  static async getAssistantById(id: string) {
    const result = await sql`
      SELECT * FROM assistants WHERE id = ${id} AND is_active = true
    `
    return result[0] || null
  }

  static async getAssistantsByArtist(artist_id: string, category?: string) {
    let query = sql`
      SELECT * FROM assistants 
      WHERE artist_id = ${artist_id} AND is_active = true
    `

    if (category) {
      query = sql`
        SELECT * FROM assistants 
        WHERE artist_id = ${artist_id} AND is_active = true AND category = ${category}
      `
    }

    const result = await query`
      ORDER BY usage_count DESC, created_at DESC
    `
    return result
  }

  static async incrementAssistantUsage(assistant_id: string) {
    await sql`
      UPDATE assistants 
      SET usage_count = usage_count + 1, last_used_at = NOW()
      WHERE id = ${assistant_id}
    `
  }

  // Files
  static async createFile(data: {
    artist_id: string
    filename: string
    secure_filename: string
    file_type: string
    file_size: number
    blob_url: string
  }) {
    const result = await sql`
      INSERT INTO files (artist_id, filename, secure_filename, file_type, file_size, blob_url)
      VALUES (${data.artist_id}, ${data.filename}, ${data.secure_filename}, 
              ${data.file_type}, ${data.file_size}, ${data.blob_url})
      RETURNING *
    `
    return result[0]
  }

  // Chats
  static async createChat(data: {
    assistant_id: string
    title: string
    topic?: string
    metadata?: Record<string, any>
  }) {
    const result = await sql`
      INSERT INTO chats (assistant_id, title, topic, metadata)
      VALUES (${data.assistant_id}, ${data.title}, ${data.topic || null}, 
              ${JSON.stringify(data.metadata || {})})
      RETURNING *
    `
    return result[0]
  }

  static async getChatsByAssistant(assistant_id: string, limit = 50) {
    const result = await sql`
      SELECT c.*, a.name as assistant_name
      FROM chats c
      JOIN assistants a ON c.assistant_id = a.id
      WHERE c.assistant_id = ${assistant_id} AND c.is_archived = false
      ORDER BY c.last_message_at DESC NULLS LAST, c.created_at DESC
      LIMIT ${limit}
    `
    return result
  }

  static async getChatById(id: string) {
    const result = await sql`
      SELECT c.*, a.name as assistant_name, a.purpose as assistant_purpose
      FROM chats c
      JOIN assistants a ON c.assistant_id = a.id
      WHERE c.id = ${id}
    `
    return result[0] || null
  }

  static async updateChatMetadata(chat_id: string, metadata: Record<string, any>) {
    await sql`
      UPDATE chats 
      SET metadata = ${JSON.stringify(metadata)}, updated_at = NOW()
      WHERE id = ${chat_id}
    `
  }

  static async updateChatLastMessage(chat_id: string) {
    await sql`
      UPDATE chats 
      SET last_message_at = NOW(), updated_at = NOW()
      WHERE id = ${chat_id}
    `
  }

  // Messages
  static async createMessage(data: {
    chat_id: string
    sender: "user" | "assistant"
    content: string
    token_count?: number
    processing_time_ms?: number
    metadata?: Record<string, any>
  }) {
    const result = await sql`
      INSERT INTO messages (chat_id, sender, content, token_count, processing_time_ms, metadata)
      VALUES (${data.chat_id}, ${data.sender}, ${data.content}, 
              ${data.token_count || null}, ${data.processing_time_ms || null},
              ${JSON.stringify(data.metadata || {})})
      RETURNING *
    `
    return result[0]
  }

  static async getMessagesByChat(chat_id: string, limit = 100, offset = 0) {
    const result = await sql`
      SELECT * FROM messages 
      WHERE chat_id = ${chat_id}
      ORDER BY created_at ASC
      LIMIT ${limit} OFFSET ${offset}
    `
    return result
  }

  // Analytics
  static async getArtistStats(artist_id: string) {
    const result = await sql`
      SELECT 
        COUNT(DISTINCT a.id) as total_assistants,
        COUNT(DISTINCT c.id) as total_chats,
        COUNT(DISTINCT m.id) as total_messages,
        SUM(a.usage_count) as total_assistant_usage
      FROM artists art
      LEFT JOIN assistants a ON art.id = a.artist_id AND a.is_active = true
      LEFT JOIN chats c ON a.id = c.assistant_id AND c.is_archived = false
      LEFT JOIN messages m ON c.id = m.chat_id
      WHERE art.id = ${artist_id}
      GROUP BY art.id
    `
    return (
      result[0] || {
        total_assistants: 0,
        total_chats: 0,
        total_messages: 0,
        total_assistant_usage: 0,
      }
    )
  }
}
