"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Share2, Instagram, Twitter, Music, Copy, RefreshCw, Sparkles, TrendingUp, Calendar, Hash } from "lucide-react"
import { toast } from "sonner"

export default function SocialMediaAssistantPage() {
  const [platform, setPlatform] = useState("instagram")
  const [contentType, setContentType] = useState("post")
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const platforms = [
    { value: "instagram", label: "Instagram", icon: Instagram },
    { value: "twitter", label: "Twitter/X", icon: Twitter },
    { value: "tiktok", label: "TikTok", icon: Music },
    { value: "facebook", label: "Facebook", icon: Share2 },
  ]

  const contentTypes = [
    { value: "post", label: "Regular Post" },
    { value: "story", label: "Story" },
    { value: "reel", label: "Reel/Video" },
    { value: "caption", label: "Caption Only" },
    { value: "hashtags", label: "Hashtags" },
    { value: "bio", label: "Bio/Profile" },
  ]

  const tones = [
    { value: "casual", label: "Casual & Friendly" },
    { value: "professional", label: "Professional" },
    { value: "energetic", label: "Energetic & Hype" },
    { value: "inspirational", label: "Inspirational" },
    { value: "humorous", label: "Humorous" },
    { value: "authentic", label: "Authentic & Personal" },
  ]

  const generateContent = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic for your social media content")
      return
    }

    setIsGenerating(true)
    try {
      const prompt = `Create ${contentType} content for ${platform} about: ${topic}

Platform: ${platform}
Content Type: ${contentType}
Tone: ${tone || "casual and engaging"}

Requirements:
- Make it engaging and shareable
- Include relevant hashtags if appropriate
- Keep it platform-appropriate (character limits, style, etc.)
- Make it authentic to a musician/artist's voice
- Include call-to-action when relevant

Please provide creative, engaging content that will help grow the artist's social media presence.`

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          assistantType: "social-media-assistant",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()
      setGeneratedContent(data.content)
      toast.success("Social media content generated!")
    } catch (error) {
      console.error("Error generating content:", error)
      toast.error("Failed to generate content. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyContent = async () => {
    if (!generatedContent) return

    try {
      await navigator.clipboard.writeText(generatedContent)
      toast.success("Content copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy content")
    }
  }

  const exampleTopics = [
    "New single release announcement",
    "Behind the scenes in the studio",
    "Upcoming live performance",
    "Music inspiration and creative process",
    "Fan appreciation post",
    "Collaboration announcement",
    "Music industry tips for artists",
    "Personal story about songwriting",
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Share2 className="w-8 h-8 mr-3 text-blue-600" />
            Social Media Assistant
          </h1>
          <p className="text-muted-foreground">Create engaging social media content that grows your fanbase</p>
        </div>
      </div>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Content</TabsTrigger>
          <TabsTrigger value="strategy">Strategy Tips</TabsTrigger>
          <TabsTrigger value="analytics">Growth Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                  Content Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Platform Selection */}
                <div>
                  <Label>Platform *</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          <div className="flex items-center">
                            <p.icon className="w-4 h-4 mr-2" />
                            {p.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Content Type */}
                <div>
                  <Label>Content Type *</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Topic */}
                <div>
                  <Label htmlFor="topic">Topic/Content Idea *</Label>
                  <Textarea
                    id="topic"
                    placeholder="What do you want to post about?"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={3}
                    className="mt-2"
                  />
                </div>

                {/* Tone */}
                <div>
                  <Label>Tone & Style</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateContent}
                  disabled={!topic.trim() || isGenerating}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Creating Content...
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>

                {/* Example Topics */}
                <div>
                  <Label className="text-sm font-medium">Quick Ideas</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {exampleTopics.map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setTopic(example)}
                        className="justify-start text-left h-auto py-2 px-3"
                      >
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
                    <Share2 className="w-5 h-5 mr-2 text-blue-600" />
                    Generated Content
                  </CardTitle>
                  {generatedContent && (
                    <Button variant="outline" size="sm" onClick={copyContent}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4 min-h-[400px]">
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed">{generatedContent}</pre>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="capitalize">
                        {platform} • {contentType}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={generateContent} disabled={isGenerating}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Share2 className="w-16 h-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Create Content</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Choose your platform, content type, and topic to generate engaging social media content.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Growth Strategies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p>• Post consistently (3-5 times per week)</p>
                  <p>• Engage with your audience daily</p>
                  <p>• Use trending hashtags and sounds</p>
                  <p>• Share behind-the-scenes content</p>
                  <p>• Collaborate with other artists</p>
                  <p>• Cross-promote on all platforms</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                  Content Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p>• Monday: Motivation Monday</p>
                  <p>• Tuesday: New Music Tuesday</p>
                  <p>• Wednesday: Behind the Scenes</p>
                  <p>• Thursday: Throwback Thursday</p>
                  <p>• Friday: New Release Friday</p>
                  <p>• Weekend: Personal/Lifestyle</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hash className="w-5 h-5 mr-2 text-blue-600" />
                  Hashtag Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p>• Mix popular and niche hashtags</p>
                  <p>• Use 5-10 hashtags per post</p>
                  <p>• Create a branded hashtag</p>
                  <p>• Research trending music tags</p>
                  <p>• Include location-based tags</p>
                  <p>• Track hashtag performance</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Growth Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Key Metrics to Track</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Engagement Rate (likes, comments, shares)</p>
                    <p>• Reach and Impressions</p>
                    <p>• Follower Growth Rate</p>
                    <p>• Click-through Rate to Music</p>
                    <p>• Story Completion Rate</p>
                    <p>• Save/Share Rate</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Best Posting Times</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Instagram: 6-9 AM, 12-2 PM, 5-7 PM</p>
                    <p>• TikTok: 6-10 AM, 7-9 PM</p>
                    <p>• Twitter: 8-10 AM, 7-9 PM</p>
                    <p>• Facebook: 9 AM-10 AM, 3-4 PM</p>
                    <p>• Test different times for your audience</p>
                    <p>• Use analytics to find your optimal times</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
