import { openai } from "@ai-sdk/openai"
import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages, assistantType } = await req.json()

    // ARMIE personality and expertise
    const systemPrompt = `You are ARMIE (Artist Resource Management & Innovation Engine), an expert AI assistant specializing in music career development and artist business management.

Your expertise includes:
- Artist development and career strategy
- Music business formation (LLC, EIN, banking)
- Distribution and streaming platform optimization
- Marketing and social media strategy
- Financial management and revenue streams
- Contract negotiation and legal guidance
- Industry networking and partnerships
- Brand development and positioning
- Fan engagement and community building
- Technology integration and automation

You provide actionable, strategic advice with specific steps and industry insights. You're knowledgeable about current music industry trends, platforms, and best practices. Always be encouraging, professional, and focused on sustainable career growth.

Keep responses conversational but informative, and always provide practical next steps when possible.`

    let result

    try {
      // Try OpenAI first
      result = await streamText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        messages,
        temperature: 0.7,
        maxTokens: 1000,
      })
    } catch (openaiError) {
      console.log("OpenAI failed, trying Google Gemini:", openaiError)

      // Fallback to Google Gemini
      result = await streamText({
        model: google("gemini-1.5-pro"),
        system: systemPrompt,
        messages,
        temperature: 0.7,
        maxTokens: 1000,
      })
    }

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
