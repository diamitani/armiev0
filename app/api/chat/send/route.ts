import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { DatabaseService } from "@/lib/database"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { assistant_id, chat_id, message, user_id } = body

    // Validate required fields
    if (!assistant_id || !message) {
      return NextResponse.json({ error: "Missing required fields: assistant_id, message" }, { status: 400 })
    }

    // Get assistant from database
    const assistant = await DatabaseService.getAssistantById(assistant_id)
    if (!assistant) {
      return NextResponse.json({ error: "Assistant not found" }, { status: 404 })
    }

    // Verify user owns this assistant
    if (user_id && assistant.artist_id !== user_id) {
      return NextResponse.json({ error: "Unauthorized access to assistant" }, { status: 403 })
    }

    let currentChatId = chat_id
    let thread_id = null

    // If no chat_id provided, create a new chat
    if (!currentChatId) {
      const newChat = await DatabaseService.createChat({
        assistant_id,
        title: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
        topic: "General Discussion",
        metadata: { created_from: "api" },
      })
      currentChatId = newChat.id
    } else {
      // Get existing chat to retrieve thread_id
      const existingChat = await DatabaseService.getChatById(currentChatId)
      if (!existingChat) {
        return NextResponse.json({ error: "Chat not found" }, { status: 404 })
      }
      thread_id = existingChat.metadata?.thread_id
    }

    // Create or get OpenAI thread
    let thread
    if (!thread_id) {
      thread = await openai.beta.threads.create()
      thread_id = thread.id

      // Update chat with thread_id
      await DatabaseService.updateChatMetadata(currentChatId, { thread_id })
    } else {
      thread = await openai.beta.threads.retrieve(thread_id)
    }

    // Store user message in database
    const userMessage = await DatabaseService.createMessage({
      chat_id: currentChatId,
      sender: "user",
      content: message,
      metadata: { thread_id },
    })

    // Add message to OpenAI thread
    await openai.beta.threads.messages.create(thread_id, {
      role: "user",
      content: message,
    })

    // Create and run the assistant
    const run = await openai.beta.threads.runs.create(thread_id, {
      assistant_id: assistant.openai_id,
      instructions: `You are ${assistant.name}, ${assistant.purpose}. Provide helpful, creative, and professional assistance for music industry tasks.`,
    })

    // Poll for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread_id, run.id)
    const maxAttempts = 30
    let attempts = 0

    while (runStatus.status === "queued" || runStatus.status === "in_progress") {
      if (attempts >= maxAttempts) {
        throw new Error("Assistant response timeout")
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread_id, run.id)
      attempts++
    }

    if (runStatus.status === "failed") {
      throw new Error(`Assistant run failed: ${runStatus.last_error?.message || "Unknown error"}`)
    }

    if (runStatus.status === "requires_action") {
      // Handle function calls if needed
      console.log("Assistant requires action:", runStatus.required_action)
    }

    // Get the assistant's response
    const messages = await openai.beta.threads.messages.list(thread_id, {
      order: "desc",
      limit: 1,
    })

    const assistantMessage = messages.data[0]
    if (!assistantMessage || assistantMessage.role !== "assistant") {
      throw new Error("No assistant response received")
    }

    // Extract text content
    const textContent = assistantMessage.content
      .filter((content) => content.type === "text")
      .map((content) => content.text.value)
      .join("\n")

    // Store assistant message in database
    const storedAssistantMessage = await DatabaseService.createMessage({
      chat_id: currentChatId,
      sender: "assistant",
      content: textContent,
      token_count: runStatus.usage?.total_tokens || null,
      processing_time_ms: Date.now() - new Date(run.created_at * 1000).getTime(),
      metadata: {
        thread_id,
        run_id: run.id,
        openai_message_id: assistantMessage.id,
      },
    })

    // Update assistant usage count
    await DatabaseService.incrementAssistantUsage(assistant_id)

    // Update chat last message time
    await DatabaseService.updateChatLastMessage(currentChatId)

    return NextResponse.json({
      success: true,
      chat_id: currentChatId,
      message: {
        id: storedAssistantMessage.id,
        content: textContent,
        sender: "assistant",
        created_at: storedAssistantMessage.created_at,
      },
      user_message: {
        id: userMessage.id,
        content: message,
        sender: "user",
        created_at: userMessage.created_at,
      },
      usage: {
        total_tokens: runStatus.usage?.total_tokens || 0,
        processing_time_ms: storedAssistantMessage.processing_time_ms,
      },
    })
  } catch (error) {
    console.error("Chat send error:", error)

    // Return appropriate error response
    if (error instanceof Error) {
      if (error.message.includes("timeout")) {
        return NextResponse.json({ error: "Assistant response timeout. Please try again." }, { status: 408 })
      }

      if (error.message.includes("rate limit")) {
        return NextResponse.json({ error: "Rate limit exceeded. Please wait a moment and try again." }, { status: 429 })
      }

      if (error.message.includes("insufficient_quota")) {
        return NextResponse.json({ error: "OpenAI quota exceeded. Please contact support." }, { status: 402 })
      }
    }

    return NextResponse.json({ error: "Failed to process message. Please try again." }, { status: 500 })
  }
}
