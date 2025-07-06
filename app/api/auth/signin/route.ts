import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Ensure email is a string and normalize
    const emailStr = String(email).toLowerCase().trim()
    const passwordStr = String(password)

    // Demo user for testing
    const demoUser = {
      id: "demo-user-123",
      email: "demo@armiemusic.com",
      password: "password",
      name: "Demo Artist",
      artist_name: "Demo Artist",
      subscription_tier: "pro",
      created_at: new Date().toISOString(),
    }

    // Check if it's the demo user
    if (emailStr === demoUser.email && passwordStr === demoUser.password) {
      const token = Buffer.from(
        JSON.stringify({
          userId: demoUser.id,
          email: demoUser.email,
          timestamp: Date.now(),
        }),
      ).toString("base64")

      const userResponse = {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        artist_name: demoUser.artist_name,
        subscription_tier: demoUser.subscription_tier,
        created_at: demoUser.created_at,
      }

      return NextResponse.json({
        success: true,
        message: "Welcome back to ARMIE!",
        user: userResponse,
        token: token,
      })
    }

    // For any other email/password combination, create a new user
    const emailParts = emailStr.includes("@") ? emailStr.split("@") : [emailStr]
    const username = emailParts[0] || "Artist"

    const newUser = {
      id: `user-${Date.now()}`,
      email: emailStr,
      name: username.charAt(0).toUpperCase() + username.slice(1),
      artist_name: username.charAt(0).toUpperCase() + username.slice(1),
      subscription_tier: "free",
      created_at: new Date().toISOString(),
    }

    const token = Buffer.from(
      JSON.stringify({
        userId: newUser.id,
        email: newUser.email,
        timestamp: Date.now(),
      }),
    ).toString("base64")

    return NextResponse.json({
      success: true,
      message: "Welcome to ARMIE!",
      user: newUser,
      token: token,
    })
  } catch (error) {
    console.error("Signin error:", error)
    return NextResponse.json({ error: "Authentication failed. Please try again." }, { status: 500 })
  }
}
