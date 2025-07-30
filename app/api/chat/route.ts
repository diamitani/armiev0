import { type NextRequest, NextResponse } from "next/server"

// Comprehensive music industry knowledge base
const MUSIC_INDUSTRY_RESPONSES = {
  // Contract and Legal Advice
  contracts: {
    keywords: ["contract", "legal", "agreement", "terms", "rights", "royalties", "publishing", "licensing"],
    responses: [
      "When reviewing music contracts, always pay attention to these key areas: royalty splits, publishing rights, creative control, and termination clauses. Never sign without understanding every term.",
      "For recording contracts, negotiate for: higher royalty percentages after recoupment, creative control over your music, ownership of masters after a certain period, and transparent accounting.",
      "Publishing deals can be complex. Ensure you understand the difference between administration deals (10-20%) vs. co-publishing deals (50/50 split). Keep as much of your publishing as possible.",
      "Performance contracts should specify: payment terms, technical requirements, cancellation policies, and force majeure clauses. Always have a rider for your specific needs.",
    ],
  },

  // Marketing and Promotion
  marketing: {
    keywords: ["marketing", "promotion", "social media", "fans", "audience", "brand", "instagram", "tiktok", "spotify"],
    responses: [
      "Build your fanbase authentically by: consistently releasing quality content, engaging genuinely with your audience, collaborating with other artists, and telling your unique story.",
      "Social media strategy: Post consistently, use trending sounds on TikTok, share behind-the-scenes content, engage with comments, and cross-promote across platforms.",
      "For Spotify growth: Release music regularly, pitch to playlist curators, use Spotify for Artists tools, collaborate with other artists, and encourage saves/shares from your fans.",
      "Email marketing is crucial - collect emails at shows and online, send monthly newsletters with exclusive content, and build a direct relationship with your most dedicated fans.",
    ],
  },

  // Revenue and Monetization
  revenue: {
    keywords: ["money", "income", "revenue", "monetize", "streaming", "sales", "merch", "touring", "sync"],
    responses: [
      "Diversify your income streams: streaming royalties, live performances, merchandise, sync licensing, teaching/workshops, and brand partnerships.",
      "Streaming pays little per play, but focus on: playlist placements, growing your monthly listeners, encouraging saves/adds to libraries, and building long-term fan relationships.",
      "Merchandise can be highly profitable: start with simple items like t-shirts and stickers, use print-on-demand services, and sell at shows and online.",
      "Sync licensing (TV, films, ads) can be lucrative. Create instrumental versions of your songs, register with sync agencies, and network with music supervisors.",
    ],
  },

  // Music Production and Creation
  production: {
    keywords: ["production", "recording", "mixing", "mastering", "studio", "equipment", "software", "daw"],
    responses: [
      "For home recording: invest in a good audio interface, studio monitors, and acoustic treatment. Popular DAWs include Logic Pro, Ableto n Live, and Pro Tools.",
      "When working with producers: clearly communicate your vision, bring reference tracks, be open to creative input, and establish ownership/credit agreements upfront.",
      "Mixing tips: leave headroom, use reference tracks, take breaks to rest your ears, and consider hiring a professional mixer for important releases.",
      "Mastering is crucial for competitive loudness and clarity. While you can learn basic mastering, consider professional mastering for releases you're pitching to labels or major playlists.",
    ],
  },

  // Industry Networking
  networking: {
    keywords: ["network", "connections", "industry", "contacts", "relationships", "collaboration", "manager", "agent"],
    responses: [
      "Build genuine relationships in the music industry: attend local shows, join music organizations, participate in songwriting sessions, and support other artists.",
      "Finding a manager: look for someone who believes in your vision, has relevant connections, and demonstrates good communication. Avoid anyone asking for upfront fees.",
      "Booking agents help with live shows. You typically need a strong local following and regular gigging before approaching agents. Start with smaller, regional agents.",
      "Collaborate strategically: work with artists in complementary genres, cross-promote each other's work, and maintain professional relationships even after projects end.",
    ],
  },

  // Career Development
  career: {
    keywords: ["career", "goals", "planning", "strategy", "growth", "success", "breakthrough", "next level"],
    responses: [
      "Set SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound. Break big goals into smaller, actionable steps you can work on daily.",
      "Consistency beats perfection. Regular releases, consistent branding, and steady fan engagement will build momentum over time.",
      "Invest in yourself: take music business courses, learn new instruments/software, attend industry conferences, and never stop improving your craft.",
      "Track your progress: monitor streaming numbers, social media growth, email list size, and revenue. Use data to make informed decisions about your career.",
    ],
  },

  // General Music Business
  general: {
    keywords: ["music business", "industry", "advice", "tips", "help", "guidance", "artist", "musician"],
    responses: [
      "The music industry rewards persistence and professionalism. Treat your music career like a business: set goals, track metrics, and make strategic decisions.",
      "Focus on building a sustainable career rather than chasing viral moments. Consistent growth and genuine fan connections are more valuable than temporary fame.",
      "Learn the business side: understand royalty structures, copyright law, marketing principles, and basic accounting. Knowledge is power in negotiations.",
      "Stay authentic to your artistic vision while being open to feedback and market realities. The best careers balance artistic integrity with commercial awareness.",
    ],
  },
}

function getRandomResponse(category: string): string {
  const responses =
    MUSIC_INDUSTRY_RESPONSES[category as keyof typeof MUSIC_INDUSTRY_RESPONSES]?.responses ||
    MUSIC_INDUSTRY_RESPONSES.general.responses
  return responses[Math.floor(Math.random() * responses.length)]
}

function categorizeMessage(message: string): string {
  const lowerMessage = message.toLowerCase()

  for (const [category, data] of Object.entries(MUSIC_INDUSTRY_RESPONSES)) {
    if (data.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return category
    }
  }

  return "general"
}

function generatePersonalizedResponse(message: string, userName?: string): string {
  const category = categorizeMessage(message)
  const baseResponse = getRandomResponse(category)

  const greeting = userName ? `Hey ${userName}! ` : "Hi there! "

  // Add context-specific advice based on message content
  let contextualAdvice = ""
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("contract") && lowerMessage.includes("sign")) {
    contextualAdvice =
      " Remember: never sign anything without having a music lawyer review it first. It's worth the investment to protect your rights."
  } else if (lowerMessage.includes("streaming") && lowerMessage.includes("money")) {
    contextualAdvice =
      " Pro tip: while streaming payouts are low, focus on building a loyal fanbase who will support you through multiple revenue streams."
  } else if (lowerMessage.includes("social media") && lowerMessage.includes("grow")) {
    contextualAdvice =
      " Key insight: authenticity beats algorithms. Focus on genuine connections rather than just follower counts."
  } else if (lowerMessage.includes("producer") || lowerMessage.includes("collaboration")) {
    contextualAdvice =
      " Important: always establish clear agreements about credits, ownership, and splits before starting any collaboration."
  }

  return greeting + baseResponse + contextualAdvice
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, chatId, userId, userName } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Generate AI response using our knowledge base
    const aiResponse = generatePersonalizedResponse(message, userName)

    // Create a streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        // Simulate streaming by sending the response in chunks
        const words = aiResponse.split(" ")
        let currentIndex = 0

        const sendNextChunk = () => {
          if (currentIndex < words.length) {
            const chunk = words.slice(currentIndex, currentIndex + 3).join(" ") + " "
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`))
            currentIndex += 3
            setTimeout(sendNextChunk, 50) // Delay between chunks for realistic streaming
          } else {
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
            controller.close()
          }
        }

        sendNextChunk()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
