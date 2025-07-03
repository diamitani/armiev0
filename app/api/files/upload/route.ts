import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { rateLimit } from "@/lib/rate-limit"
import { put } from "@vercel/blob"
import { DatabaseService } from "@/lib/database" // Declare the DatabaseService variable

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Rate limiting
    const rateLimitResult = await rateLimit(request, "file-upload", 20, 3600) // 20 per hour
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Too many file upload attempts. Please try again later." }, { status: 429 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "File type not allowed" }, { status: 400 })
    }

    // Generate secure filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop()
    const secureFilename = `${authResult.user.userId}/${timestamp}_${randomString}.${fileExtension}`

    // Upload to Vercel Blob
    const blob = await put(secureFilename, file, {
      access: "public",
    })

    // Save file metadata to database
    const fileRecord = await DatabaseService.createFile({
      artist_id: authResult.user.userId,
      filename: file.name,
      secure_filename: secureFilename,
      file_type: file.type,
      file_size: file.size,
      blob_url: blob.url,
    })

    return NextResponse.json({
      success: true,
      data: {
        id: fileRecord.id,
        filename: fileRecord.filename,
        url: blob.url,
        size: file.size,
        type: file.type,
      },
    })
  } catch (error) {
    console.error("File upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
