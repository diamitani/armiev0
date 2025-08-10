import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Server Route Handler that connects the homepage assistant to the AI SDK.
// Uses OpenAI via the AI SDK; API key is read from the environment on the server [^5].
export async function POST(req: NextRequest) {
  try {
    const { prompt } = (await req.json()) as { prompt?: string }

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const system =
      "You are Armie, an AI-powered artist career management assistant. Help independent and signed artists manage their business: contracts, releases, branding, licensing, tax/EIN, social, and tasks. Give concise, stepwise guidance with actionable next steps."

    const { text, usage } = await generateText({
      model: openai("gpt-4o-mini"),
      system,
      prompt,
    })

    return NextResponse.json({ text, usage })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("AI route error:", err)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
