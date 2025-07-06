import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.success || !authResult.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const chatId = params.id

    // Verify chat belongs to user
    const chat = await DatabaseService.getChatById(chatId)
    if (!chat || chat.user_id !== authResult.user.id) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    const messages = await DatabaseService.getChatMessages(chatId)

    return NextResponse.json({
      success: true,
      messages,
    })
  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
