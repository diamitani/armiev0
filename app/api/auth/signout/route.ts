import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: "Successfully signed out. See you soon!",
    })
  } catch (error) {
    console.error("Signout error:", error)
    return NextResponse.json({ error: "Signout failed" }, { status: 500 })
  }
}
