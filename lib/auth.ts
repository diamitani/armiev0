import { jwtVerify, SignJWT } from "jose"
import bcrypt from "bcryptjs"
import { DatabaseService } from "./database"
import { cookies } from "next/headers"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export interface AuthUser {
  id: string
  email: string
  name: string
  artist_name?: string
  subscription_tier: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createToken(user: AuthUser): Promise<string> {
  return new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    artist_name: user.artist_name,
    subscription_tier: user.subscription_tier,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string,
      artist_name: payload.artist_name as string,
      subscription_tier: payload.subscription_tier as string,
    }
  } catch {
    return null
  }
}

export async function verifyAuth(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    return await verifyToken(token)
  } catch {
    return null
  }
}

export async function createUser(data: {
  email: string
  password: string
  name: string
  artist_name?: string
}): Promise<AuthUser> {
  const passwordHash = await hashPassword(data.password)

  const user = await DatabaseService.createUser({
    email: data.email,
    password_hash: passwordHash,
    name: data.name,
    artist_name: data.artist_name,
  })

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    artist_name: user.artist_name,
    subscription_tier: user.subscription_tier,
  }
}

export async function createOAuthUser(data: {
  email: string
  name: string
  provider: string
  provider_id: string
  artist_name?: string
}): Promise<AuthUser> {
  const user = await DatabaseService.createUser({
    email: data.email,
    name: data.name,
    artist_name: data.artist_name,
    oauth_provider: data.provider,
    oauth_id: data.provider_id,
  })

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    artist_name: user.artist_name,
    subscription_tier: user.subscription_tier,
  }
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  const user = await DatabaseService.getUserByEmail(email)

  if (!user || !user.password_hash) {
    return null
  }

  const isValid = await verifyPassword(password, user.password_hash)

  if (!isValid) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    artist_name: user.artist_name,
    subscription_tier: user.subscription_tier,
  }
}

export async function authenticateOAuthUser(
  email: string,
  provider: string,
  provider_id: string,
): Promise<AuthUser | null> {
  const user = await DatabaseService.getUserByOAuth(provider, provider_id)

  if (!user) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    artist_name: user.artist_name,
    subscription_tier: user.subscription_tier,
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  return await verifyAuth()
}

export async function signOut(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}
