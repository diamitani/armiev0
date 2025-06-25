"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PenTool, ArrowLeft, Sparkles, Music, Heart, Zap, Copy, Download, RefreshCw, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useChat } from "ai/react"

export default function LyricGeneratorPage() {
  const [songTitle, setSongTitle] = useState("")
  const [genre, setGenre] = useState("")
  const [mood, setMood] = useState("")
  const [theme, setTheme] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      assistantType: "lyric-generator",
    },
  })

  const handleGenerateLyrics = async () => {
    if (!songTitle || !genre || !mood) return

    setIsGenerating(true)

    const prompt = `Generate lyrics for a song with these details:
    - Title: ${songTitle}
    - Genre: ${genre}
    - Mood: ${mood}
    - Theme: ${theme || "Not specified"}
    
    Please create complete lyrics with verses, chorus, and bridge. Make them emotionally resonant and genre-appropriate.`

    // Simulate the form submission to the chat
    const syntheticEvent = {
      preventDefault: () => {},
      target: { elements: { message: { value: prompt } } },
    } as any

    await handleSubmit(syntheticEvent)
    setIsGenerating(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-yellow-500/5">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/assistants" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Assistants
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-yellow-50 dark:bg-yellow-950/20 flex items-center justify-center mr-4">
              <PenTool className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-foreground">Lyric Generator</h1>
              <p className="text-xl text-muted-foreground">AI-powered songwriting assistant</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-400">
              <Music className="w-3 h-3 mr-1" />
              Creative Writing
            </Badge>
            <Badge className="bg-armie-secondary/20 text-armie-primary border-armie-secondary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PenTool className="w-5 h-5 mr-2 text-yellow-600" />
                Song Details
              </CardTitle>
              <CardDescription>Provide details about your song to generate personalized lyrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Song Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your song title..."
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Genre</Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                      <SelectItem value="country">Country</SelectItem>
                      <SelectItem value="r&b">R&B</SelectItem>
                      <SelectItem value="folk">Folk</SelectItem>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="indie">Indie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Mood</Label>
                  <Select value={mood} onValueChange={setMood}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="happy">Happy</SelectItem>
                      <SelectItem value="sad">Sad</SelectItem>
                      <SelectItem value="energetic">Energetic</SelectItem>
                      <SelectItem value="romantic">Romantic</SelectItem>
                      <SelectItem value="melancholic">Melancholic</SelectItem>
                      <SelectItem value="empowering">Empowering</SelectItem>
                      <SelectItem value="nostalgic">Nostalgic</SelectItem>
                      <SelectItem value="rebellious">Rebellious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme (Optional)</Label>
                <Textarea
                  id="theme"
                  placeholder="Describe the theme or story you want to tell..."
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={handleGenerateLyrics}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                disabled={!songTitle || !genre || !mood || isGenerating || isLoading}
              >
                {isGenerating || isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating Lyrics...
                  </>
                ) : (
                  <>
                    <PenTool className="w-4 h-4 mr-2" />
                    Generate Lyrics
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Content */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Music className="w-5 h-5 mr-2 text-yellow-600" />
                  Generated Lyrics
                </div>
                {messages.length > 0 && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(messages[messages.length - 1]?.content || "")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>Your AI-generated lyrics will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {messages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Music className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Fill out the song details and click "Generate Lyrics" to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={message.role === "user" ? "hidden" : "block"}>
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{message.content}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        {messages.length > 0 && (
          <Card className="mt-8 bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-yellow-600" />
                Refine Your Lyrics
              </CardTitle>
              <CardDescription>Chat with the assistant to make adjustments or ask questions</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask for changes or improvements..."
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Sparkles className="w-4 h-4 animate-spin" /> : "Send"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="text-center bg-card/50 backdrop-blur-sm border-0">
            <CardContent className="pt-6">
              <Heart className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Emotionally Resonant</h3>
              <p className="text-sm text-muted-foreground">
                Creates lyrics that connect with your audience on a deep emotional level
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-card/50 backdrop-blur-sm border-0">
            <CardContent className="pt-6">
              <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Genre-Adaptive</h3>
              <p className="text-sm text-muted-foreground">
                Adapts writing style and vocabulary to match your chosen genre perfectly
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-card/50 backdrop-blur-sm border-0">
            <CardContent className="pt-6">
              <RefreshCw className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Iterative Refinement</h3>
              <p className="text-sm text-muted-foreground">
                Continuously refine and improve lyrics through interactive feedback
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
