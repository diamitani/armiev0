import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { verifyAuth } from "@/lib/auth"
import { DatabaseService } from "@/lib/database"
import { rateLimit } from "@/lib/rate-limit"

const createContractSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum([
    "artist-management",
    "recording",
    "publishing",
    "producer",
    "performance",
    "collaboration",
    "licensing",
    "distribution",
  ]),
  counterparty_name: z.string().min(1, "Counterparty name is required"),
  counterparty_email: z.string().email("Invalid email format"),
  start_date: z.string().datetime(),
  end_date: z.string().datetime().optional(),
  value: z.number().min(0).optional(),
  currency: z.string().default("USD"),
  terms: z.string().min(1, "Terms are required"),
  status: z.enum(["draft", "pending", "active", "completed", "cancelled"]).default("draft"),
  metadata: z.record(z.any()).optional(),
})

const updateContractSchema = createContractSchema.partial()

// GET /api/contracts - List contracts
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "20"), 100)
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const contracts = await DatabaseService.getContractsByArtist(authResult.user.userId, {
      page,
      limit,
      type,
      status,
      search,
    })

    return NextResponse.json({
      success: true,
      data: contracts.data,
      pagination: contracts.pagination,
    })
  } catch (error) {
    console.error("Get contracts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/contracts - Create contract
export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Rate limiting
    const rateLimitResult = await rateLimit(request, "create-contract", 10, 3600) // 10 per hour
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many contract creation attempts. Please try again later." },
        { status: 429 },
      )
    }

    const body = await request.json()
    const validatedData = createContractSchema.parse(body)

    // Validate dates
    if (validatedData.end_date && new Date(validatedData.end_date) <= new Date(validatedData.start_date)) {
      return NextResponse.json({ error: "End date must be after start date" }, { status: 400 })
    }

    const contract = await DatabaseService.createContract({
      ...validatedData,
      artist_id: authResult.user.userId,
    })

    return NextResponse.json(
      {
        success: true,
        data: contract,
      },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Create contract error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
