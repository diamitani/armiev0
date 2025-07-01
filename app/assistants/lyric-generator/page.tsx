"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { PenTool, Sparkles, Download, Copy, RefreshCw, Music, Heart, Zap, Crown, Save, Share } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function LyricGeneratorPage() {
  const { user } = useAuth()
  const [prompt, setPrompt] = useState("")
  const [genre, setGenre] = useState("")
  const [mood, setMood] = useState("")
  const [theme, setTheme] = useState("")
  const [generatedLyrics, setGeneratedLyrics] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"

  const genres = [
    "Pop",
    "Rock",
    "Hip-Hop",
    "R&B",
    "Country",
    "Folk",
    "Electronic",
    "Jazz",
    "Blues",
    "Reggae",
    "Punk",
    "Metal",
    "Indie",
    "Alternative",
  ]

  const moods = [
    "Happy",
    "Sad",
    "Energetic",
    "Melancholic",
    "Romantic",
    "Angry",
    "Peaceful",
    "Nostalgic",
    "Hopeful",
    "Dark",
    "Uplifting",
    "Mysterious",
  ]

  const themes = [
    "Love",
    "Heartbreak",
    "Friendship",
    "Family",
    "Dreams",
    "Success",
    "Struggle",
    "Freedom",
    "Adventure",
    "Home",
    "Change",
    "Hope",
    "Loss",
    "Growth",
  ]

  const generateLyrics = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const fullPrompt = `Write song lyrics with the following specifications:
      
Topic/Prompt: ${prompt}
${genre ? `Genre: ${genre}` : ""}
${mood ? `Mood: ${mood}` : ""}
${theme ? `Theme: ${theme}` : ""}

Please create complete lyrics with verses, chorus, and bridge. Make them emotionally resonant and suitable for the specified genre and mood.`

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: fullPrompt }],
          assistantType: "lyric-generator",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate lyrics")
      }

      const data = await response.json()
      setGeneratedLyrics(data.content)
    } catch (error) {
      console.error("Error generating lyrics:", error)
      setGeneratedLyrics("Sorry, there was an error generating lyrics. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLyrics)
  }

  const downloadLyrics = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedLyrics], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `lyrics-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const examplePrompts = [
    "A song about chasing dreams in a big city",
    "Heartbreak after a long relationship ends",
    "Celebrating friendship and good times",
    "Overcoming personal struggles and finding strength",
    "A love song about finding 'the one'",
    "Nostalgia for childhood memories",
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <PenTool className="w-8 h-8 mr-3 text-yellow-600" />
            Lyric Generator
          </h1>
          <p className="text-muted-foreground">Create compelling song lyrics with AI assistance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            className={`${isPremiumUser ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gray-500"} text-white`}
          >
            {isPremiumUser && <Crown className="w-3 h-3 mr-1" />}
            {user?.plan?.toUpperCase() || "FREE"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-600" />
              Lyric Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Prompt */}
            <div>
              <Label htmlFor="prompt">Song Topic or Prompt *</Label>
              <Textarea
                id="prompt"
                placeholder="Describe what you want your song to be about..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="mt-2"
              />
            </div>

            {/* Genre, Mood, Theme */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Genre (Optional)</Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((g) => (
                      <SelectItem key={g} value={g.toLowerCase()}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Mood (Optional)</Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {moods.map((m) => (
                      <SelectItem key={m} value={m.toLowerCase()}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Theme (Optional)</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((t) => (
                      <SelectItem key={t} value={t.toLowerCase()}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateLyrics}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating Lyrics...
                </>
              ) : (
                <>
                  <PenTool className="w-4 h-4 mr-2" />
                  Generate Lyrics
                </>
              )}
            </Button>

            <Separator />

            {/* Example Prompts */}
            <div>
              <Label className="text-sm font-medium">Example Prompts</Label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {examplePrompts.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(example)}
                    className="justify-start text-left h-auto py-2 px-3"
                  >
                    <Music className="w-3 h-3 mr-2 flex-shrink-0" />
                    <span className="text-xs">{example}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Music className="w-5 h-5 mr-2 text-yellow-600" />
                Generated Lyrics
              </CardTitle>
              {generatedLyrics && (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadLyrics}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedLyrics ? (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 min-h-[400px]">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">{generatedLyrics}</pre>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save to Files
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={generateLyrics} disabled={isGenerating}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <PenTool className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Create Lyrics</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Enter your song topic and preferences, then click "Generate Lyrics" to create your custom song lyrics.
                </p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Powered by AI songwriting expertise</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-600" />
            Songwriting Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Be Specific</h4>
              <p className="text-sm text-muted-foreground">
                The more specific your prompt, the better the lyrics. Include emotions, situations, or stories you want
                to tell.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Set the Mood</h4>
              <p className="text-sm text-muted-foreground">
                Choose a mood that matches your vision. This helps create lyrics with the right emotional tone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Genre Matters</h4>
              <p className="text-sm text-muted-foreground">
                Different genres have different lyrical styles. Select a genre to get lyrics that fit the musical style.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Edit and Refine</h4>
              <p className="text-sm text-muted-foreground">
                Use the generated lyrics as a starting point. Feel free to edit, rearrange, or combine different
                versions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Try Multiple Versions</h4>
              <p className="text-sm text-muted-foreground">
                Generate multiple versions of the same concept to find the perfect lyrics for your song.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Personal Touch</h4>
              <p className="text-sm text-muted-foreground">
                Add your personal experiences and unique perspective to make the lyrics truly yours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
