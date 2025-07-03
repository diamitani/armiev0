import type { NextRequest } from "next/server"

interface RateLimitResult {
  success: boolean
  remaining?: number
  resetTime?: number
}

// In-memory store for rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export async function rateLimit(
  request: NextRequest,
  identifier: string,
  maxRequests: number,
  windowMs: number,
): Promise<RateLimitResult> {
  try {
    // Get client IP
    const ip =
      request.ip ||
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown"

    const key = `${identifier}:${ip}`
    const now = Date.now()
    const windowStart = now - windowMs * 1000

    // Clean up expired entries
    for (const [k, v] of rateLimitStore.entries()) {
      if (v.resetTime < now) {
        rateLimitStore.delete(k)
      }
    }

    const current = rateLimitStore.get(key)

    if (!current || current.resetTime < now) {
      // First request or window expired
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + windowMs * 1000,
      })
      return { success: true, remaining: maxRequests - 1 }
    }

    if (current.count >= maxRequests) {
      return {
        success: false,
        remaining: 0,
        resetTime: current.resetTime,
      }
    }

    // Increment counter
    current.count++
    rateLimitStore.set(key, current)

    return {
      success: true,
      remaining: maxRequests - current.count,
    }
  } catch (error) {
    console.error("Rate limit error:", error)
    // Allow request on error
    return { success: true }
  }
}
