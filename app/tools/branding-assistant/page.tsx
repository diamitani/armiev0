"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Award, Download, RefreshCw, Sparkles, Palette, MessageSquare, Target } from "lucide-react"
import Link from "next/link"

export default function BrandingAssistant() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [brandStrategy, setBrandStrategy] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setBrandStrategy(`# Alex Rodriguez Brand Strategy

## Brand Identity
**Core Message:** Authentic indie-pop artist creating atmospheric music for introspective souls
**Mission:** To create music that helps people feel less alone in their journey of self-discovery

## Brand Personality
- **Authentic** - Genuine, honest, vulnerable in storytelling
- **Introspective** - Thoughtful, deep, contemplative
- **Atmospheric** - Dreamy, ethereal, immersive
- **Accessible** - Relatable, down-to-earth, approachable
- **Evolving** - Growing, learning, constantly developing

## Visual Identity
**Color Palette:**
- Primary: Deep midnight blue (#1a1a2e)
- Secondary: Soft teal (#16213e)
- Accent: Warm gold (#eee2dc)
- Supporting: Muted rose (#ed8a63)

**Typography:**
- Headers: Modern, clean sans-serif
- Body: Readable, friendly font
- Accent: Handwritten style for personal touches

## Voice & Tone
**Voice Characteristics:**
- Conversational yet thoughtful
- Honest and vulnerable
- Encouraging and supportive
- Poetic but not pretentious

**Tone Variations:**
- Social Media: Casual, friendly, engaging
- Press Materials: Professional, articulate, confident
- Fan Communication: Warm, grateful, personal

## Content Themes
1. **Creative Process** - Behind-the-scenes studio content
2. **Personal Growth** - Life lessons and reflections
3. **Music Discovery** - Sharing influences and recommendations
4. **Community Building** - Connecting with fans and other artists
5. **Artistic Evolution** - Documenting the journey

## Brand Applications
**Social Media Strategy:**
- Instagram: Visual storytelling, studio shots, lifestyle
- Twitter: Thoughts, interactions, music sharing
- TikTok: Creative process, song snippets, personality
- YouTube: Music videos, vlogs, acoustic sessions

**Merchandise Concepts:**
- Minimalist designs reflecting song themes
- Sustainable materials aligning with values
- Limited edition items for special releases
- Personal touches like handwritten lyrics`)
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="space-y-6 p-6 bg-armie-accent/30 min-h-screen">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
            <Award className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight armie-primary">Branding Assistant</h1>
            <p className="text-muted-foreground">Build a cohesive brand identity and strategy for your music career</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
                Marketing & Social
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-400">
                Medium Usage
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="strategy" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="strategy">Brand Strategy</TabsTrigger>
          <TabsTrigger value="visual">Visual Identity</TabsTrigger>
          <TabsTrigger value="voice">Voice & Tone</TabsTrigger>
          <TabsTrigger value="content">Content Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="strategy" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="armie-primary flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Brand Strategy Development
                  </CardTitle>
                  <CardDescription>Define your core brand identity and positioning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium armie-primary">Artist Name/Brand</label>
                      <Input placeholder="Your artist or band name" />
                    </div>

                    <div>
                      <label className="text-sm font-medium armie-primary">Genre/Style</label>
                      <Input placeholder="e.g., Indie Pop, Electronic, Alternative" />
                    </div>

                    <div>
                      <label className="text-sm font-medium armie-primary">Target Audience</label>
                      <Textarea
                        placeholder="Describe your ideal listeners: age, interests, lifestyle, values..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium armie-primary">Core Message</label>
                      <Textarea
                        placeholder="What's the main message or feeling you want to convey through your music?"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium armie-primary">Unique Value Proposition</label>
                      <Textarea placeholder="What makes you different from other artists in your genre?" rows={3} />
                    </div>

                    <div>
                      <label className="text-sm font-medium armie-primary">Brand Personality Traits</label>
                      <Textarea
                        placeholder="Describe your brand personality (e.g., authentic, energetic, mysterious, playful)"
                        rows={2}
                      />
                    </div>

                    <Button
                      className="w-full bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating Brand Strategy...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Brand Strategy
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {brandStrategy && (
                <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm mt-6">
                  <CardHeader>
                    <CardTitle className="armie-primary">Your Brand Strategy</CardTitle>
                    <CardDescription>Comprehensive brand guidelines and strategy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-armie-accent/50 rounded-lg border max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm armie-primary">{brandStrategy}</pre>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download Strategy
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="armie-primary">Brand Elements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-armie-secondary/10 rounded-lg">
                      <h4 className="font-medium armie-primary text-sm">Identity</h4>
                      <p className="text-xs text-muted-foreground">Core message and values</p>
                    </div>
                    <div className="p-3 bg-armie-secondary/10 rounded-lg">
                      <h4 className="font-medium armie-primary text-sm">Personality</h4>
                      <p className="text-xs text-muted-foreground">Brand characteristics and traits</p>
                    </div>
                    <div className="p-3 bg-armie-secondary/10 rounded-lg">
                      <h4 className="font-medium armie-primary text-sm">Positioning</h4>
                      <p className="text-xs text-muted-foreground">Market position and differentiation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="visual" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Visual Identity Guidelines
              </CardTitle>
              <CardDescription>Define your visual brand elements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium armie-primary">Color Palette</label>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      <div className="h-12 bg-blue-900 rounded border"></div>
                      <div className="h-12 bg-teal-600 rounded border"></div>
                      <div className="h-12 bg-amber-200 rounded border"></div>
                      <div className="h-12 bg-rose-400 rounded border"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Suggested palette based on your genre</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium armie-primary">Typography Style</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select typography style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern & Clean</SelectItem>
                        <SelectItem value="vintage">Vintage & Retro</SelectItem>
                        <SelectItem value="handwritten">Handwritten & Personal</SelectItem>
                        <SelectItem value="bold">Bold & Impactful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium armie-primary">Logo Style Preference</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select logo style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text-based/Wordmark</SelectItem>
                        <SelectItem value="symbol">Symbol/Icon</SelectItem>
                        <SelectItem value="combination">Combination Mark</SelectItem>
                        <SelectItem value="minimal">Minimal/Abstract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium armie-primary">Visual Mood</label>
                    <Textarea
                      placeholder="Describe the visual feeling you want (e.g., dreamy, edgy, warm, futuristic)"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Voice & Tone Guidelines
              </CardTitle>
              <CardDescription>Define how your brand communicates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium armie-primary">Brand Voice Characteristics</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {[
                      "Authentic",
                      "Professional",
                      "Casual",
                      "Energetic",
                      "Thoughtful",
                      "Playful",
                      "Mysterious",
                      "Confident",
                    ].map((trait) => (
                      <label key={trait} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{trait}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Communication Style</label>
                  <Textarea
                    placeholder="How do you want to sound when communicating with fans? (e.g., like a friend, mentor, storyteller)"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Topics You'll Discuss</label>
                  <Textarea
                    placeholder="What subjects will you talk about? (music process, personal life, industry insights, etc.)"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Words/Phrases to Avoid</label>
                  <Input placeholder="Any language that doesn't fit your brand" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary">Content Strategy</CardTitle>
              <CardDescription>Plan your content themes and posting strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium armie-primary">Content Pillars</label>
                    <div className="mt-2 space-y-2">
                      {[
                        "Behind the Scenes",
                        "New Music/Releases",
                        "Personal Stories",
                        "Fan Interaction",
                        "Industry Insights",
                      ].map((pillar, index) => (
                        <div key={index} className="p-2 bg-armie-accent/30 rounded text-sm">
                          {pillar}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium armie-primary">Posting Frequency</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="How often will you post?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="few-times-week">Few times per week</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium armie-primary">Content Mix</label>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Music Content</span>
                        <span className="text-armie-secondary">40%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal/Lifestyle</span>
                        <span className="text-armie-secondary">30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Behind the Scenes</span>
                        <span className="text-armie-secondary">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fan Interaction</span>
                        <span className="text-armie-secondary">10%</span>
                      </div>
                    </div>
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
