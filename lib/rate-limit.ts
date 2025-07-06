interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export async function rateLimit(
  request: Request,
  identifier: string,
  limit: number,
  windowMs: number,
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
  const key = `${identifier}:${ip}`
  const now = Date.now()

  // Clean up expired entries
  Object.keys(store).forEach((k) => {
    if (store[k].resetTime < now) {
      delete store[k]
    }
  })

  const current = store[key]

  if (!current || current.resetTime < now) {
    // First request or window expired
    store[key] = {
      count: 1,
      resetTime: now + windowMs * 1000,
    }

    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: store[key].resetTime,
    }
  }

  if (current.count >= limit) {
    // Rate limit exceeded
    return {
      success: false,
      limit,
      remaining: 0,
      reset: current.resetTime,
    }
  }

  // Increment counter
  current.count++

  return {
    success: true,
    limit,
    remaining: limit - current.count,
    reset: current.resetTime,
  }
}
