import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Enhanced logging utility
const log = {
  info: (message: string, data?: any) => {
    console.log(`[ARMIE-API] ${new Date().toISOString()} - INFO: ${message}`, data || "")
  },
  error: (message: string, error?: any) => {
    console.error(`[ARMIE-API] ${new Date().toISOString()} - ERROR: ${message}`, error || "")
  },
  warn: (message: string, data?: any) => {
    console.warn(`[ARMIE-API] ${new Date().toISOString()} - WARN: ${message}`, data || "")
  },
}

// Assistant configurations
const ASSISTANTS = {
  armie: "asst_iVa1jbKXsz0MG5JmGtGvdhin",
  "music-contract": "asst_Nymek457SSrroXFq5NN7jI8c",
  "pro-manager": "asst_JzS3uAozUXoSSQKTOGwcZq9b",
  "cover-art": "asst_Z5ph6wcWbN0lQtHhhcaOk22e",
  "bio-generator": "asst_KJT77mSv8sJ8TU7OzBs7yhfR",
  "email-generator": "asst_MHNXJQMA2zZEUUjgVV9a4EuH",
  "dm-generator": "asst_ivGHChOaLkRCiovPkGQXtSm1",
  "lyric-transcriber": "asst_XpzzTdNKL3paQ9NoP9vVWAUj",
  "lyric-generator": "asst_DTX9YgbEBJF3CUEhTSFLKcpX",
  "press-release": "asst_SUj354vflrMlN0CPsZyAJHmX",
  "epk-assistant": "asst_ZwJ1mFl5YmqKLbXaFC4vlDfV",
  branding: "asst_VMlI4tdNLNRyXW59oxxZCdAk",
  "social-media": "asst_72K2zP1pLWfYvzZKuPckcpPI",
  "grant-finder": "asst_68xWYrwKf0jC8GTKENI7qnHp",
  "ein-assistant": "asst_xbXRpLZ1bdZY1Ta58OVOm0se",
}

// System prompts for different assistants
const getSystemPrompt = (assistantType: string) => {
  const prompts = {
    "lyric-generator": `You are a professional lyric writing assistant specializing in creating compelling, emotionally resonant lyrics for various music genres. You understand song structure, rhyme schemes, meter, and how to craft lyrics that connect with audiences.

CAPABILITIES:
- Generate original lyrics for any genre or style
- Create hooks, verses, choruses, and bridges
- Adapt tone and style to match artist vision
- Provide rhyme suggestions and alternatives
- Explain songwriting techniques and structure

APPROACH:
- Ask clarifying questions about genre, mood, theme, and target audience
- Provide multiple creative options
- Explain your creative choices
- Offer constructive feedback on existing lyrics
- Help with song structure and flow

SONG STRUCTURE GUIDELINES:
- Verse 1: Set the scene, introduce the story
- Chorus: Main hook, memorable and repeatable
- Verse 2: Develop the story, add new perspective
- Chorus: Repeat with slight variations if needed
- Bridge: Contrast, new perspective, emotional peak
- Final Chorus: Resolution, often with variations

Always be creative, supportive, and focused on helping artists express their authentic voice through compelling lyrics.`,

    "cover-art": `You are a professional cover art and visual branding specialist for musicians. You understand visual design principles, music industry aesthetics, and how to create compelling artwork that represents an artist's brand and music.

CAPABILITIES:
- Generate detailed cover art concepts and descriptions
- Provide color palette and typography recommendations
- Suggest visual themes that match musical genres
- Create mood boards and style guides
- Advise on industry-standard formats and specifications

APPROACH:
- Understand the music's mood, genre, and target audience
- Ask about existing brand elements and preferences
- Provide multiple creative directions
- Explain design choices and their psychological impact
- Ensure commercial viability and industry standards

Focus on creating visually striking, memorable artwork that enhances the artist's brand and appeals to their target audience.`,

    armie: `You are Armie, an AI-powered music career assistant and manager. You have access to a comprehensive suite of specialized tools and assistants to help artists build, manage, and grow their music careers.

CORE CAPABILITIES:
- Strategic career planning and daily task recommendations
- Creative assistance (songwriting, lyrics, cover art, branding)
- Business and administrative support (contracts, EIN setup, PRO registration, tax management)
- Marketing and promotion (social media, press releases, EPKs, email campaigns)
- Revenue optimization (grant finding, licensing, monetization strategies)

PERSONALITY:
- Professional yet approachable
- Industry-savvy and up-to-date with music trends
- Encouraging and supportive of artistic goals
- Practical and action-oriented
- Knowledgeable about both creative and business aspects of music

Always provide actionable advice, suggest relevant tools, and help users move forward in their music careers.`,
  }

  return prompts[assistantType as keyof typeof prompts] || prompts.armie
}

export async function POST(req: Request) {
  const startTime = Date.now()

  try {
    log.info("Chat API request received")

    // Validate environment variables
    if (!process.env.GROQ_API_KEY) {
      log.error("Missing GROQ_API_KEY environment variable")
      return new Response("API configuration error", { status: 500 })
    }

    const body = await req.json()
    const { messages, assistantType = "armie" } = body

    log.info("Request details", {
      assistantType,
      messageCount: messages?.length || 0,
      lastMessagePreview: messages?.[messages.length - 1]?.content?.substring(0, 100) || "N/A",
    })

    // Validate request body
    if (!messages || !Array.isArray(messages)) {
      log.warn("Invalid messages format", { messages })
      return new Response("Invalid request format", { status: 400 })
    }

    if (messages.length === 0) {
      log.warn("Empty messages array")
      return new Response("No messages provided", { status: 400 })
    }

    // Get system prompt
    const systemPrompt = getSystemPrompt(assistantType)
    log.info("Using assistant type", { assistantType })

    // Make API call with error handling
    const result = await streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxTokens: 1500,
    })

    const duration = Date.now() - startTime
    log.info("API call successful", { duration: `${duration}ms`, assistantType })

    return result.toDataStreamResponse()
  } catch (error: any) {
    const duration = Date.now() - startTime
    log.error("Chat API error", {
      error: error.message,
      stack: error.stack,
      duration: `${duration}ms`,
    })

    // Handle specific error types
    if (error.name === "APIError") {
      log.error("OpenAI API Error", {
        status: error.status,
        message: error.message,
      })
      return new Response("AI service temporarily unavailable", { status: 503 })
    }

    if (error.name === "RateLimitError") {
      log.error("Rate limit exceeded")
      return new Response("Too many requests, please try again later", { status: 429 })
    }

    if (error.name === "AuthenticationError") {
      log.error("Authentication failed - check API key")
      return new Response("Authentication error", { status: 401 })
    }

    // Generic error response
    return new Response("Internal server error", { status: 500 })
  }
}

// Health check endpoint
export async function GET() {
  try {
    const hasApiKey = !!process.env.GROQ_API_KEY

    log.info("Health check", { hasApiKey })

    return Response.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      hasApiKey,
      assistants: Object.keys(ASSISTANTS).length,
    })
  } catch (error) {
    log.error("Health check failed", error)
    return Response.json({ status: "unhealthy" }, { status: 500 })
  }
}
