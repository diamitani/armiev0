import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { DatabaseService } from "@/lib/database"
import { rateLimit } from "@/lib/rate-limit"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number",
    ),
  bio: z.string().optional(),
  website_url: z.string().url().optional().or(z.literal("")),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request, "signup", 3, 3600) // 3 attempts per hour
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Too many signup attempts. Please try again later." }, { status: 429 })
    }

    const body = await request.json()
    const validatedData = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await DatabaseService.getArtistByEmail(validatedData.email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(validatedData.password, saltRounds)

    // Create user
    const newUser = await DatabaseService.createArtist({
      name: validatedData.name,
      email: validatedData.email,
      password_hash: passwordHash,
      bio: validatedData.bio,
      website_url: validatedData.website_url || null,
      subscription_tier: "free",
    })

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        subscription_tier: newUser.subscription_tier,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    )

    // Create response with secure cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        subscription_tier: newUser.subscription_tier,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
