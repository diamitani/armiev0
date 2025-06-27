import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { chat_id: string } }) {
  try {
    const { chat_id } = params
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const user_id = searchParams.get("user_id")

    // Validate chat_id
    if (!chat_id) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 })
    }

    // Get chat details
    const chat = await DatabaseService.getChatById(chat_id)
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 })
    }

    // Verify user owns this chat (if user_id provided)
    if (user_id) {
      const assistant = await DatabaseService.getAssistantById(chat.assistant_id)
      if (!assistant || assistant.artist_id !== user_id) {
        return NextResponse.json({ error: "Unauthorized access to chat" }, { status: 403 })
      }
    }

    // Get messages with pagination
    const messages = await DatabaseService.getMessagesByChat(chat_id, limit, offset)

    // Get total message count for pagination
    const totalMessages = await DatabaseService.getChatMessageCount(chat_id)

    // Format response
    const formattedMessages = messages.map((message) => ({
      id: message.id,
      content: message.content,
      sender: message.sender,
      created_at: message.created_at,
      token_count: message.token_count,
      processing_time_ms: message.processing_time_ms,
      metadata: message.metadata,
    }))

    return NextResponse.json({
      success: true,
      chat: {
        id: chat.id,
        title: chat.title,
        topic: chat.topic,
        assistant_name: chat.assistant_name,
        assistant_purpose: chat.assistant_purpose,
        created_at: chat.created_at,
        last_message_at: chat.last_message_at,
        message_count: chat.message_count,
      },
      messages: formattedMessages,
      pagination: {
        total: totalMessages,
        limit,
        offset,
        has_more: offset + messages.length < totalMessages,
      },
    })
  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json({ error: "Failed to retrieve messages" }, { status: 500 })
  }
}
