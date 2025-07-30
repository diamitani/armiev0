import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get("auth-token")?.value

    if (!authToken) {
      return NextResponse.json({
        success: false,
        error: "Not authenticated",
      })
    }

    // Extract user ID from token (simplified for demo)
    let userId: string | null = null

    if (authToken === "demo-token") {
      userId = "demo-user-id"
    } else if (authToken.startsWith("token-")) {
      userId = authToken.replace("token-", "")
    }

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: "Invalid token",
      })
    }

    const user = await DatabaseService.getUserById(userId)

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found",
      })
    }

    // Remove sensitive data from response
    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      artist_name: user.artist_name,
      avatar_url: user.avatar_url,
    }

    return NextResponse.json({
      success: true,
      user: userResponse,
    })
  } catch (error) {
    console.error("Auth me API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Authentication check failed",
      },
      { status: 500 },
    )
  }
}
