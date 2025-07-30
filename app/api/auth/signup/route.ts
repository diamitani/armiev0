import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { hashPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Parse request body with error handling
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request format",
        },
        { status: 400 },
      )
    }

    const { email, password, name, artist_name } = body

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        {
          success: false,
          error: "Email, password, and name are required",
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address",
        },
        { status: 400 },
      )
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: "Password must be at least 6 characters long",
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await DatabaseService.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "An account with this email already exists",
        },
        { status: 409 },
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const newUser = await DatabaseService.createUser({
      email: email.toLowerCase().trim(),
      name: name.trim(),
      password_hash: passwordHash,
      artist_name: artist_name?.trim() || name.trim(),
    })

    // Remove sensitive data from response
    const userResponse = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      artist_name: newUser.artist_name,
      avatar_url: newUser.avatar_url,
    }

    // Set authentication cookie
    const response = NextResponse.json({
      success: true,
      user: userResponse,
      message: "Account created successfully",
    })

    response.cookies.set("auth-token", `token-${newUser.id}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Signup API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed",
    },
    { status: 405 },
  )
}
