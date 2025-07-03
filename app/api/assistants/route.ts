import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { verifyAuth } from "@/lib/auth"
import { DatabaseService } from "@/lib/database"
import { rateLimit } from "@/lib/rate-limit"

const createAssistantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  purpose: z.string().min(1, "Purpose is required"),
  description: z.string().optional(),
  category: z.enum(["creative", "business", "marketing", "legal", "technical"]).optional(),
  configuration: z.record(z.any()).optional(),
})

// GET /api/assistants - List assistants
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const assistants = await DatabaseService.getAssistantsByArtist(authResult.user.userId, category || undefined)

    return NextResponse.json({
      success: true,
      data: assistants,
    })
  } catch (error) {
    console.error("Get assistants error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/assistants - Create assistant
export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Rate limiting
    const rateLimitResult = await rateLimit(request, "create-assistant", 5, 3600) // 5 per hour
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many assistant creation attempts. Please try again later." },
        { status: 429 },
      )
    }

    const body = await request.json()
    const validatedData = createAssistantSchema.parse(body)

    // Create OpenAI assistant (mock for now)
    const openaiId = `asst_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const assistant = await DatabaseService.createAssistant({
      ...validatedData,
      openai_id: openaiId,
      artist_id: authResult.user.userId,
    })

    return NextResponse.json(
      {
        success: true,
        data: assistant,
      },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Create assistant error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
