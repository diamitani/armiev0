import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { DatabaseService } from "@/lib/database"
import { rateLimit } from "@/lib/rate-limit"
import { v4 as uuidv4 } from "uuid"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = [
  "text/plain",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/markdown",
  "application/json",
]

async function extractTextFromFile(file: File): Promise<string> {
  const text = await file.text()

  // For now, just return the text content
  // In a production app, you'd want to use proper PDF parsing libraries
  if (file.type === "application/pdf") {
    return `[PDF Content] ${text.substring(0, 5000)}` // Truncate for demo
  }

  return text.substring(0, 10000) // Limit text length
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request, "file-upload", 5, 300) // 5 uploads per 5 minutes
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Too many file uploads. Please try again later." }, { status: 429 })
    }

    const authResult = await verifyAuth(request)
    if (!authResult.success || !authResult.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "File type not supported. Please upload text, PDF, Word, or Markdown files." },
        { status: 400 },
      )
    }

    // Generate unique filename
    const fileExtension = file.name.split(".").pop()
    const uniqueFilename = `${uuidv4()}.${fileExtension}`

    // Extract text content
    let extractedText = ""
    try {
      extractedText = await extractTextFromFile(file)
    } catch (error) {
      console.error("Text extraction error:", error)
      // Continue without extracted text
    }

    // In a real app, you'd upload to cloud storage (S3, etc.)
    // For demo, we'll just store the filename
    const fileUrl = `/uploads/${uniqueFilename}`

    // Save file record to database
    const savedFile = await DatabaseService.createUserFile({
      user_id: authResult.user.id,
      filename: uniqueFilename,
      original_name: file.name,
      file_type: file.type,
      file_size: file.size,
      file_url: fileUrl,
      extracted_text: extractedText,
      metadata: {
        uploadedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json({
      success: true,
      file: {
        id: savedFile.id,
        filename: savedFile.original_name,
        size: savedFile.file_size,
        type: savedFile.file_type,
        uploadedAt: savedFile.created_at,
      },
    })
  } catch (error) {
    console.error("File upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
