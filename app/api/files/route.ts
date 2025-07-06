import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.success || !authResult.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const files = await DatabaseService.getUserFiles(authResult.user.id)

    const formattedFiles = files.map((file) => ({
      id: file.id,
      filename: file.original_name,
      size: file.file_size,
      type: file.file_type,
      uploadedAt: file.created_at,
    }))

    return NextResponse.json({
      success: true,
      files: formattedFiles,
    })
  } catch (error) {
    console.error("Get files error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
