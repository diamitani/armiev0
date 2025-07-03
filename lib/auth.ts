import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export interface AuthUser {
  userId: string
  email: string
  subscription_tier: string
}

export interface AuthResult {
  success: boolean
  user?: AuthUser
  error?: string
}

export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  try {
    // Get token from cookie or Authorization header
    let token = request.cookies.get("auth-token")?.value

    if (!token) {
      const authHeader = request.headers.get("Authorization")
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.substring(7)
      }
    }

    if (!token) {
      return { success: false, error: "No token provided" }
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    return {
      success: true,
      user: {
        userId: decoded.userId,
        email: decoded.email,
        subscription_tier: decoded.subscription_tier,
      },
    }
  } catch (error) {
    console.error("Auth verification error:", error)
    return { success: false, error: "Invalid token" }
  }
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }
    return handler(request, ...args, authResult.user)
  }
}
