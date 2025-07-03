import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { verifyAuth } from "@/lib/auth"
import { DatabaseService } from "@/lib/database"

const updateContractSchema = z.object({
  title: z.string().min(1).optional(),
  counterparty_name: z.string().min(1).optional(),
  counterparty_email: z.string().email().optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  value: z.number().min(0).optional(),
  currency: z.string().optional(),
  terms: z.string().min(1).optional(),
  status: z.enum(["draft", "pending", "active", "completed", "cancelled"]).optional(),
  metadata: z.record(z.any()).optional(),
})

// GET /api/contracts/[id] - Get specific contract
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const contract = await DatabaseService.getContractById(params.id)
    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }

    // Check ownership
    if (contract.artist_id !== authResult.user.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      data: contract,
    })
  } catch (error) {
    console.error("Get contract error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/contracts/[id] - Update contract
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const contract = await DatabaseService.getContractById(params.id)
    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }

    // Check ownership
    if (contract.artist_id !== authResult.user.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = updateContractSchema.parse(body)

    // Validate dates if both are provided
    if (validatedData.start_date && validatedData.end_date) {
      if (new Date(validatedData.end_date) <= new Date(validatedData.start_date)) {
        return NextResponse.json({ error: "End date must be after start date" }, { status: 400 })
      }
    }

    const updatedContract = await DatabaseService.updateContract(params.id, validatedData)

    return NextResponse.json({
      success: true,
      data: updatedContract,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Update contract error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/contracts/[id] - Delete contract
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const contract = await DatabaseService.getContractById(params.id)
    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }

    // Check ownership
    if (contract.artist_id !== authResult.user.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Soft delete
    await DatabaseService.deleteContract(params.id)

    return NextResponse.json({
      success: true,
      message: "Contract deleted successfully",
    })
  } catch (error) {
    console.error("Delete contract error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
