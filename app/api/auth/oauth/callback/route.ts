import { type NextRequest, NextResponse } from "next/server"
import { createOAuthUser, authenticateOAuthUser, createToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const provider = searchParams.get("provider") || "google"

    if (!code) {
      return NextResponse.redirect(new URL("/auth/signin?error=oauth_error", request.url))
    }

    // Exchange code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/oauth/callback`,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      throw new Error("Failed to get access token")
    }

    // Get user info from Google
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    if (!userData.email) {
      throw new Error("Failed to get user email")
    }

    // Check if user exists
    let user = await authenticateOAuthUser(provider, userData.id)

    if (!user) {
      // Create new user
      user = await createOAuthUser({
        email: userData.email,
        name: userData.name || userData.email.split("@")[0],
        avatar_url: userData.picture,
        oauth_provider: provider,
        oauth_id: userData.id,
      })
    }

    // Create JWT token
    const token = await createToken(user)

    // Redirect to dashboard with token
    const response = NextResponse.redirect(new URL("/dashboard", request.url))
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("OAuth callback error:", error)
    return NextResponse.redirect(new URL("/auth/signin?error=oauth_error", request.url))
  }
}
