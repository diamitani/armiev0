// Simplified database service for demo purposes
export interface User {
  id: string
  email: string
  name?: string
  artist_name?: string
  avatar_url?: string
  password_hash?: string
  oauth_provider?: string
  oauth_id?: string
  created_at?: string
  updated_at?: string
}

export interface CreateUserData {
  email: string
  password_hash?: string
  name?: string
  artist_name?: string
  avatar_url?: string
  oauth_provider?: string
  oauth_id?: string
}

export class DatabaseService {
  // In-memory storage for demo purposes - in production, this would be a real database
  private static users: User[] = [
    {
      id: "demo-user-id",
      email: "demo@armiemusic.com",
      name: "Demo Artist",
      artist_name: "Demo Artist",
      avatar_url: null,
      password_hash: "hashed-password-demo",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      return user || null
    } catch (error) {
      console.error("Database getUserByEmail error:", error)
      return null
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      const user = this.users.find((u) => u.id === id)
      return user || null
    } catch (error) {
      console.error("Database getUserById error:", error)
      return null
    }
  }

  static async createUser(data: CreateUserData): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.getUserByEmail(data.email)
      if (existingUser) {
        throw new Error("User with this email already exists")
      }

      const newUser: User = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        email: data.email.toLowerCase(),
        name: data.name,
        artist_name: data.artist_name || data.name,
        avatar_url: data.avatar_url,
        password_hash: data.password_hash,
        oauth_provider: data.oauth_provider,
        oauth_id: data.oauth_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      this.users.push(newUser)
      console.log(`User created: ${newUser.email} (ID: ${newUser.id})`)
      console.log(`Total users in database: ${this.users.length}`)

      return newUser
    } catch (error) {
      console.error("Database createUser error:", error)
      throw new Error("Failed to create user")
    }
  }

  static async updateUser(id: string, data: Partial<CreateUserData>): Promise<User | null> {
    try {
      const userIndex = this.users.findIndex((u) => u.id === id)
      if (userIndex === -1) {
        return null
      }

      this.users[userIndex] = {
        ...this.users[userIndex],
        ...data,
        updated_at: new Date().toISOString(),
      }

      return this.users[userIndex]
    } catch (error) {
      console.error("Database updateUser error:", error)
      return null
    }
  }

  static async getUserByOAuth(provider: string, oauthId: string): Promise<User | null> {
    try {
      const user = this.users.find((u) => u.oauth_provider === provider && u.oauth_id === oauthId)
      return user || null
    } catch (error) {
      console.error("Database getUserByOAuth error:", error)
      return null
    }
  }

  static async deleteUser(id: string): Promise<boolean> {
    try {
      const userIndex = this.users.findIndex((u) => u.id === id)
      if (userIndex === -1) {
        return false
      }

      this.users.splice(userIndex, 1)
      return true
    } catch (error) {
      console.error("Database deleteUser error:", error)
      return false
    }
  }

  // Helper method to get all users (for admin purposes)
  static async getAllUsers(): Promise<User[]> {
    try {
      return [...this.users]
    } catch (error) {
      console.error("Database getAllUsers error:", error)
      return []
    }
  }

  // Helper method to verify password
  static async verifyUserPassword(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.getUserByEmail(email)
      if (!user || !user.password_hash) {
        return null
      }

      // Simple password verification for demo
      if (email === "demo@armiemusic.com" && password === "password") {
        return user
      }

      // For other users, check if password hash contains the password (simplified for demo)
      if (user.password_hash.includes(password)) {
        return user
      }

      return null
    } catch (error) {
      console.error("Database verifyUserPassword error:", error)
      return null
    }
  }
}
