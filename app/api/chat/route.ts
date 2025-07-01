import { streamText } from "ai"
import { google } from "@ai-sdk/google"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { messages, assistantType = "general" } = await req.json()

    // System prompts for different assistant types
    const systemPrompts = {
      general: `You are Armie, an AI assistant specifically designed for independent artists and musicians. You help with:

- Music industry contracts and legal advice
- Artist development and career guidance  
- Marketing and promotion strategies
- Music production tips and techniques
- Industry networking and collaboration
- Publishing and distribution guidance
- Financial planning for artists
- Social media and branding advice

Always provide practical, actionable advice tailored to independent artists. Be encouraging, professional, and knowledgeable about the music industry.`,

      contracts: `You are Armie's Contracts Assistant, specializing in music industry legal documents. You help artists with:

- Contract review and explanation
- Negotiation strategies and tips
- Industry standard terms and rates
- Rights management and publishing
- Performance and recording agreements
- Management and booking contracts
- Licensing and sync deals
- Legal terminology clarification

Always emphasize the importance of professional legal review for important contracts.`,

      marketing: `You are Armie's Marketing Assistant, focused on artist promotion and branding. You help with:

- Social media strategy and content planning
- Brand development and positioning
- Fan engagement and community building
- Press releases and media outreach
- Tour promotion and event marketing
- Digital marketing and advertising
- Content creation and storytelling
- Analytics and performance tracking

Provide creative, data-driven marketing advice tailored to independent artists.`,
    }

    const systemPrompt = systemPrompts[assistantType as keyof typeof systemPrompts] || systemPrompts.general

    let result

    try {
      // Try Gemini first
      result = await streamText({
        model: google("gemini-1.5-flash"),
        system: systemPrompt,
        messages,
        maxTokens: 1000,
        temperature: 0.7,
      })
    } catch (geminiError) {
      console.log("Gemini failed, falling back to OpenAI:", geminiError)

      // Fallback to OpenAI
      result = await streamText({
        model: openai("gpt-3.5-turbo"),
        system: systemPrompt,
        messages,
        maxTokens: 1000,
        temperature: 0.7,
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
