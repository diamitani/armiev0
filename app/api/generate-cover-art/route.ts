import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { artistName, albumTitle, genre, mood, style, customPrompt } = body

    // Validate required fields
    if (!artistName || !albumTitle) {
      return NextResponse.json({ error: "Artist name and album title are required" }, { status: 400 })
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key not configured")
      return NextResponse.json({ error: "AI service not configured. Please contact support." }, { status: 500 })
    }

    // Build the prompt
    let prompt = `Create a professional album cover for "${albumTitle}" by ${artistName}.`

    if (genre) {
      const genreStyles = {
        "hip-hop": "urban street art style with bold typography and dynamic elements",
        rock: "powerful and energetic with bold imagery and strong contrasts",
        pop: "colorful and catchy with mainstream appeal and vibrant design",
        electronic: "futuristic with digital elements, neon colors, and geometric shapes",
        jazz: "sophisticated and elegant with classic elements and smooth aesthetics",
        classical: "refined and timeless with elegant typography and sophisticated design",
        country: "warm and authentic with rustic elements and earthy tones",
        "r&b": "smooth and soulful with warm colors and elegant styling",
        indie: "artistic and unique with creative elements and authentic feel",
        metal: "dark and powerful with intense imagery and bold design",
      }

      const genreStyle = genreStyles[genre as keyof typeof genreStyles]
      if (genreStyle) {
        prompt += ` Use a ${genreStyle}.`
      } else {
        prompt += ` This is a ${genre} album.`
      }
    }

    if (mood) {
      const moodDescriptions = {
        energetic: "vibrant, dynamic, and full of energy with bright colors",
        dark: "moody, mysterious, and atmospheric with deep shadows",
        dreamy: "ethereal, soft, and dreamlike with flowing elements",
        aggressive: "intense, powerful, and bold with strong contrasts",
        peaceful: "calm, serene, and tranquil with gentle colors",
        mysterious: "enigmatic, intriguing, and atmospheric",
        romantic: "warm, intimate, and emotionally evocative",
        futuristic: "modern, technological, and forward-looking",
        nostalgic: "vintage, retro, and emotionally resonant",
        rebellious: "edgy, unconventional, and bold",
      }

      const moodDesc = moodDescriptions[mood as keyof typeof moodDescriptions]
      if (moodDesc) {
        prompt += ` The overall mood should be ${moodDesc}.`
      }
    }

    if (style) {
      const styleDescriptions = {
        photorealistic: "photorealistic and highly detailed",
        "digital-art": "modern digital art style with clean lines",
        abstract: "abstract with geometric shapes and artistic elements",
        minimalist: "clean, simple, and minimalist design",
        vintage: "retro vintage aesthetic with aged textures",
        grunge: "grungy texture with distressed elements",
        neon: "neon cyberpunk style with glowing elements",
        watercolor: "soft watercolor painting style",
        "oil-painting": "traditional oil painting technique",
        comic: "comic book or graphic novel style",
      }

      const styleDesc = styleDescriptions[style as keyof typeof styleDescriptions]
      if (styleDesc) {
        prompt += ` Render in ${styleDesc}.`
      }
    }

    if (customPrompt && customPrompt.trim()) {
      prompt += ` Additional details: ${customPrompt.trim()}`
    }

    prompt += ` The image should be square format (1024x1024), high quality, professional album cover suitable for streaming platforms. Focus on visual impact and artistic composition rather than including text.`

    console.log("Generating cover art with prompt:", prompt)

    // Make request to OpenAI
    const openaiResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url",
      }),
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}))
      console.error("OpenAI API error:", errorData)

      if (openaiResponse.status === 400 && errorData.error?.code === "content_policy_violation") {
        return NextResponse.json(
          {
            error:
              "Content policy violation. Please try a different description that doesn't include inappropriate content.",
          },
          { status: 400 },
        )
      }

      if (openaiResponse.status === 429) {
        return NextResponse.json({ error: "Rate limit exceeded. Please wait a moment and try again." }, { status: 429 })
      }

      if (openaiResponse.status === 401) {
        return NextResponse.json({ error: "Authentication failed. Please contact support." }, { status: 500 })
      }

      throw new Error(`OpenAI API error: ${openaiResponse.status} ${openaiResponse.statusText}`)
    }

    const data = await openaiResponse.json()
    const imageUrl = data.data?.[0]?.url

    if (!imageUrl) {
      console.error("No image URL in response:", data)
      throw new Error("No image generated - OpenAI returned empty response")
    }

    // Validate that the URL is accessible
    try {
      const testResponse = await fetch(imageUrl, { method: "HEAD" })
      if (!testResponse.ok) {
        console.error("Generated image URL is not accessible:", imageUrl)
      }
    } catch (error) {
      console.error("Unable to verify image URL accessibility:", error)
    }

    console.log("Successfully generated image:", imageUrl)

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      prompt: prompt,
      metadata: {
        artistName,
        albumTitle,
        genre,
        mood,
        style,
      },
    })
  } catch (error: any) {
    console.error("Cover art generation error:", error)

    return NextResponse.json(
      {
        error: "Failed to generate cover art",
        details: error.message || "An unexpected error occurred",
      },
      { status: 500 },
    )
  }
}
