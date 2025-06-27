import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")
    const artistId = searchParams.get("artistId")

    switch (action) {
      case "stats":
        if (!artistId) {
          return NextResponse.json({ error: "Artist ID required" }, { status: 400 })
        }
        const stats = await DatabaseService.getArtistStats(artistId)
        return NextResponse.json(stats)

      case "assistants":
        if (!artistId) {
          return NextResponse.json({ error: "Artist ID required" }, { status: 400 })
        }
        const assistants = await DatabaseService.getAssistantsByArtist(artistId)
        return NextResponse.json(assistants)

      case "popular-assistants":
        if (!artistId) {
          return NextResponse.json({ error: "Artist ID required" }, { status: 400 })
        }
        const popular = await DatabaseService.getPopularAssistants(artistId)
        return NextResponse.json(popular)

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Database API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case "create-artist":
        const artist = await DatabaseService.createArtist(data)
        return NextResponse.json(artist)

      case "create-assistant":
        const assistant = await DatabaseService.createAssistant(data)
        return NextResponse.json(assistant)

      case "create-chat":
        const chat = await DatabaseService.createChat(data)
        return NextResponse.json(chat)

      case "create-message":
        const message = await DatabaseService.createMessage(data)
        return NextResponse.json(message)

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Database API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
