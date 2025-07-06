import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, artist_name } = body

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    // Ensure all inputs are strings and normalize
    const emailStr = String(email).toLowerCase().trim()
    const passwordStr = String(password)
    const nameStr = String(name).trim()
    const artistNameStr = artist_name ? String(artist_name).trim() : nameStr

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailStr)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Validate password length
    if (passwordStr.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      email: emailStr,
      name: nameStr,
      artist_name: artistNameStr,
      subscription_tier: "free",
      created_at: new Date().toISOString(),
    }

    // Create token
    const token = Buffer.from(
      JSON.stringify({
        userId: newUser.id,
        email: newUser.email,
        timestamp: Date.now(),
      }),
    ).toString("base64")

    return NextResponse.json({
      success: true,
      message: "Welcome to ARMIE! Your music career journey starts now.",
      user: newUser,
      token: token,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Account creation failed. Please try again." }, { status: 500 })
  }
}
