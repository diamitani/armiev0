import { NextResponse } from "next/server"
import OpenAI from "openai"
import { DatabaseService } from "@/lib/database"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET() {
  try {
    // Test OpenAI connection
    const assistants = await openai.beta.assistants.list({ limit: 1 })

    // Test database connection
    const testQuery = await DatabaseService.sql`SELECT NOW() as current_time`

    return NextResponse.json({
      success: true,
      openai_connected: true,
      database_connected: true,
      current_time: testQuery[0].current_time,
      assistants_available: assistants.data.length > 0,
    })
  } catch (error) {
    console.error("Test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
