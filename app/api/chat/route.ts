import { type NextRequest, NextResponse } from "next/server"

// Enhanced ARMIE personality and responses
const ARMIE_RESPONSES = {
  greeting: `Hey there! 👋 I'm ARMIE, your AI music career companion. I'm genuinely excited to help you navigate the music industry!

I've been trained on everything from contract negotiations to social media strategies, and I love helping artists like you build sustainable careers. 

**What's on your mind today?** I can help with:
• 📋 **Contracts & Legal** - Let's decode those confusing terms together
• 🚀 **Marketing & Promotion** - Time to get your music heard!
• 💰 **Revenue Streams** - Multiple ways to monetize your talent
• 🎨 **Branding & Identity** - Craft your unique artist persona
• 🤝 **Industry Navigation** - Connect with the right people

Just tell me what you're working on, and let's figure it out together! What's your biggest challenge right now?`,

  contract: `Ah, contracts! 📋 Don't worry, I've got your back on this one. The music industry can be tricky, but understanding your deals is crucial.

**Here's what I always tell artists:**

**Recording Contracts 🎵**
Think of these as partnerships, not just paperwork:
• **Advance vs. Royalties** - That upfront money? You'll pay it back through your earnings
• **Creative Control** - Who decides your sound, artwork, and release schedule?
• **Term Length** - How many albums or years are you committing to?
• **Reversion Rights** - When do you get your masters back?

**Management Deals 🤝**
Your manager should be your biggest advocate:
• **15-20% commission** is standard, but make sure they're earning it
• **Key person clauses** - What if your main contact leaves?
• **Exclusivity** - Are they handling everything or just specific areas?

**Publishing Agreements 📝**
This is about your songwriting money:
• **Admin deals** (10-15%) - You keep ownership, they handle paperwork
• **Co-publishing** (50/50 split) - Shared ownership, bigger advances
• **Full publishing** - They own it all, highest upfront payment

**My advice?** Never sign anything without a music lawyer. I know it costs money upfront, but it'll save you thousands later.

What specific contract situation are you dealing with? I can give you more targeted advice!`,

  marketing: `Marketing! 🚀 This is where the magic happens - getting your amazing music in front of the right ears.

**Let me share what's working right now:**

**Social Media Strategy 📱**
It's not just about posting - it's about connecting:
• **TikTok** - 15-30 second hooks, trending sounds, authentic moments
• **Instagram** - Stories for daily connection, Reels for discovery, posts for milestones
• **YouTube** - Music videos, behind-the-scenes, acoustic versions
• **Twitter/X** - Real-time engagement, industry conversations

**Release Campaign Timeline 📅**
Here's my proven formula:
• **6-8 weeks before**: Announce, start building anticipation
• **4 weeks before**: Release single, submit to playlists
• **2 weeks before**: Behind-the-scenes content, interviews
• **Release week**: Full promotional push, engage with every comment
• **Post-release**: Music videos, remixes, live performances

**Playlist Strategy 🎧**
This is huge for streaming growth:
• **Spotify for Artists** - Submit 2-4 weeks early
• **Independent playlists** - Research curators in your genre
• **User-generated playlists** - Engage with fans who add your music
• **Cross-platform promotion** - Don't just focus on Spotify

**Content Ideas That Actually Work:**
• Studio sessions and songwriting process
• "Day in the life" authentic content
• Collaborations with other artists
• Fan Q&As and live streams
• Covers of trending songs with your twist

The key is consistency and authenticity. Fans can smell fake from miles away!

What platform are you focusing on most? I can dive deeper into specific strategies!`,

  revenue: `Money talk! 💰 Let's be real - you need multiple income streams to make it as an artist today. The good news? There are more opportunities than ever.

**Here's your revenue roadmap:**

**Streaming Revenue 🎵**
The foundation, but not the whole house:
• **Spotify/Apple Music** - Aim for 1M+ streams to see real money
• **YouTube** - Ad revenue plus YouTube Premium payouts
• **Bandcamp** - Higher per-stream payouts, great for dedicated fans
• **SoundCloud** - Emerging monetization features

**Live Performance 🎤**
Still the biggest money maker for most artists:
• **Local venues** - Start at $100-300, build your draw
• **Festivals** - Network like crazy, these pay well
• **Private events** - Weddings, corporate gigs ($500-2000+)
• **Virtual concerts** - Lower overhead, global audience

**Merchandise & Physical Sales 👕**
Higher profit margins than streaming:
• **T-shirts & hoodies** - Classic, but make them unique
• **Vinyl records** - Huge comeback, collectors pay premium
• **Limited editions** - Signed items, special packaging
• **Digital products** - Sample packs, stems, tutorials

**Sync Licensing 📺**
The holy grail of music revenue:
• **TV shows** - $1,000-15,000 per placement
• **Commercials** - $5,000-100,000+ for major brands
• **Films** - Varies wildly, but great for exposure
• **Video games** - Growing market, especially indie games

**Teaching & Services 🎓**
Monetize your expertise:
• **Music lessons** - $30-100/hour depending on your level
• **Production services** - $200-1000+ per song
• **Mixing/mastering** - $100-500 per track
• **Songwriting collaborations** - Split publishing

**Advanced Strategies:**
• **Patreon/Fan subscriptions** - Monthly recurring revenue
• **NFTs & Web3** - Still experimental, but worth exploring
• **Brand partnerships** - Sponsored content, endorsements
• **Music library licensing** - Passive income from stock music

The secret? Don't put all your eggs in one basket. Diversify!

Which revenue stream interests you most? I can help you create a specific action plan!`,

  branding: `Branding! 🎨 This is where you get to be creative AND strategic. Your brand is how people feel when they think about you as an artist.

**Let's build something authentic:**

**Finding Your Core Identity 🎯**
Start with these questions:
• What emotions do you want your music to evoke?
• What's your origin story? What makes you unique?
• Who are you when you're not performing?
• What values do you want to represent?

**Visual Brand Elements 🖼️**
Consistency is everything:
• **Color palette** - 2-3 colors that feel like "you"
• **Typography** - Fonts that match your vibe (modern, vintage, bold, elegant)
• **Photography style** - Lighting, poses, editing that's recognizable
• **Logo/symbol** - Simple, memorable, works at any size

**Brand Voice & Personality 🗣️**
How do you communicate?
• **Tone** - Professional, casual, humorous, mysterious?
• **Language** - Do you use slang? Technical terms? Keep it simple?
• **Storytelling** - What stories do you tell? Personal struggles? Success journey?
• **Values** - What do you stand for? Social causes? Artistic integrity?

**Platform-Specific Branding 📱**
Adapt your brand for each platform:
• **Instagram** - Curated aesthetic, behind-the-scenes authenticity
• **TikTok** - Playful, trend-aware, quick personality glimpses
• **YouTube** - Longer-form storytelling, professional presentation
• **Spotify** - Playlist covers, artist photos, Canvas videos

**Brand Consistency Checklist ✅**
• Same profile picture across all platforms
• Consistent bio/description messaging
• Unified color scheme in all visuals
• Similar tone in all communications
• Regular content that reinforces your brand

**Common Branding Mistakes to Avoid:**
• Trying to appeal to everyone (you'll appeal to no one)
• Copying other artists instead of finding your unique angle
• Inconsistent messaging across platforms
• Changing your brand too frequently
• Ignoring your authentic personality

Remember: Your brand should feel natural to you. If it feels forced, your audience will notice.

What aspect of your brand feels unclear right now? Let's work on it together!`,

  general: `Hey! 👋 Great to meet you! I'm ARMIE, and I'm genuinely excited to help you with your music career.

I've worked with artists at every level - from bedroom producers uploading their first track to established artists navigating major label deals. Every journey is unique, and I'm here to help you figure out yours.

**What brings you here today?** Are you:
• 🎵 Just starting out and feeling overwhelmed?
• 📈 Looking to take your career to the next level?
• 🤔 Stuck on a specific challenge or decision?
• 💡 Exploring new opportunities or strategies?

**I love talking about:**
• Contract negotiations (I'll help you avoid the common traps!)
• Marketing strategies that actually work in 2024
• Building multiple revenue streams
• Developing your unique artist brand
• Navigating industry relationships and networking

Don't worry about asking "basic" questions - we all started somewhere, and the music industry changes so fast that even veterans need to stay updated.

**So, what's on your mind?** What's your biggest challenge or goal right now? Let's dive in and figure it out together! 🚀`,

  help: `I'm here to help with everything music industry related! 🎵

**Here's what I specialize in:**

**📋 Contracts & Legal**
• Recording, management, and publishing deals
• Understanding royalty splits and advance terms
• Negotiation strategies and red flags to avoid
• When to hire a music lawyer (spoiler: sooner than you think!)

**🚀 Marketing & Promotion**
• Social media strategies for each platform
• Release campaign planning and execution
• Playlist pitching and streaming optimization
• Building authentic fan engagement

**💰 Business & Revenue**
• Multiple income stream development
• Pricing your services and performances
• Understanding music royalties and collection
• Financial planning for artists

**🎨 Branding & Identity**
• Developing your unique artist persona
• Visual branding and consistency
• Storytelling and authentic messaging
• Platform-specific brand adaptation

**🤝 Industry Navigation**
• Building your team (manager, agent, publicist)
• Networking strategies that actually work
• Understanding industry roles and relationships
• Career planning and goal setting

**Just ask me anything!** I love specific questions like:
• "Should I sign this management deal?"
• "How do I get my music on popular playlists?"
• "What should I charge for live performances?"
• "How do I build my brand on TikTok?"

What would you like to explore first? 🎯`,
}

function getPersonalizedResponse(message: string, userName?: string): string {
  const lowerMessage = message.toLowerCase()
  const greeting = userName ? `Hey ${userName}! ` : "Hey there! "

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return greeting + ARMIE_RESPONSES.greeting
  }

  if (
    lowerMessage.includes("contract") ||
    lowerMessage.includes("deal") ||
    lowerMessage.includes("agreement") ||
    lowerMessage.includes("legal")
  ) {
    return ARMIE_RESPONSES.contract
  }

  if (
    lowerMessage.includes("marketing") ||
    lowerMessage.includes("promotion") ||
    lowerMessage.includes("social media") ||
    lowerMessage.includes("playlist") ||
    lowerMessage.includes("tiktok") ||
    lowerMessage.includes("instagram")
  ) {
    return ARMIE_RESPONSES.marketing
  }

  if (
    lowerMessage.includes("revenue") ||
    lowerMessage.includes("money") ||
    lowerMessage.includes("income") ||
    lowerMessage.includes("monetize") ||
    lowerMessage.includes("royalt") ||
    lowerMessage.includes("streaming")
  ) {
    return ARMIE_RESPONSES.revenue
  }

  if (
    lowerMessage.includes("brand") ||
    lowerMessage.includes("image") ||
    lowerMessage.includes("identity") ||
    lowerMessage.includes("visual") ||
    lowerMessage.includes("logo")
  ) {
    return ARMIE_RESPONSES.branding
  }

  if (lowerMessage.includes("help") || lowerMessage.includes("what can you do")) {
    return ARMIE_RESPONSES.help
  }

  return ARMIE_RESPONSES.general
}

export async function POST(request: NextRequest) {
  try {
    const { messages, user } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || !lastMessage.content) {
      return NextResponse.json({ error: "No message content provided" }, { status: 400 })
    }

    const userName = user?.artist_name || user?.name
    const response = getPersonalizedResponse(lastMessage.content, userName)

    // Create a more natural streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        const sentences = response.split(/(?<=[.!?])\s+/)
        let sentenceIndex = 0

        const sendSentence = () => {
          if (sentenceIndex < sentences.length) {
            const sentence = sentences[sentenceIndex]
            const words = sentence.split(" ")
            let wordIndex = 0

            const sendWord = () => {
              if (wordIndex < words.length) {
                const word = wordIndex === 0 ? words[wordIndex] : " " + words[wordIndex]
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: word })}\n\n`))
                wordIndex++
                setTimeout(sendWord, 80) // Slower, more natural pace
              } else {
                sentenceIndex++
                setTimeout(sendSentence, 200) // Pause between sentences
              }
            }

            sendWord()
          } else {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"))
            controller.close()
          }
        }

        setTimeout(sendSentence, 300) // Initial delay
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
