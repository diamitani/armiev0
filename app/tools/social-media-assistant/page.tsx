"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Share2, Download, Copy, RefreshCw, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SocialMediaAssistant() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`🎵 Just dropped my latest single "Midnight Dreams" and I'm feeling incredible! This track represents months of late-night studio sessions and pure creative flow. 

The melody came to me during a 3am walk through the city, and I knew I had to capture that feeling. Special thanks to my producer @StudioMagic for bringing this vision to life! 

Stream it now on all platforms 🔥
#NewMusic #MidnightDreams #IndieArtist #MusicProducer #StudioLife`)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6 p-6 bg-armie-accent/30 min-h-screen">
      {/* Header */}
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
          <div className="p-3 rounded-lg bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400">
            <Share2 className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight armie-primary">Social Media Assistant</h1>
            <p className="text-muted-foreground">Create engaging social media content and build your online presence</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400">
                Media & Promotion
              </Badge>
              <Badge className="bg-armie-secondary/20 text-armie-primary">Daily Usage</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tool Interface */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary">Create Social Media Content</CardTitle>
              <CardDescription>Generate engaging posts for your social media platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium armie-primary">Platform</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="twitter">Twitter/X</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium armie-primary">Content Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="announcement">New Release Announcement</SelectItem>
                        <SelectItem value="behind-scenes">Behind the Scenes</SelectItem>
                        <SelectItem value="personal">Personal Update</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="engagement">Fan Engagement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Topic/Event</label>
                  <Input placeholder="What are you posting about? (e.g., new single release, studio session)" />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Key Details</label>
                  <Textarea
                    placeholder="Provide key information: song title, collaborators, release date, streaming platforms, etc."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Brand Voice & Tone</label>
                  <Textarea
                    placeholder="Describe your brand personality (e.g., authentic, energetic, introspective, professional)"
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
                      Generating Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Social Media Post
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Generated Content */}
          {generatedContent && (
            <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="armie-primary">Generated Content</CardTitle>
                <CardDescription>Your AI-generated social media post</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-armie-accent/50 rounded-lg border">
                    <pre className="whitespace-pre-wrap text-sm armie-primary">{generatedContent}</pre>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Text
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
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

        {/* Tool Info */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Multi-platform content optimization",
                  "Brand voice consistency",
                  "Hashtag recommendations",
                  "Engagement-focused copy",
                  "Content calendar planning",
                  "Performance analytics insights",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-armie-secondary rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary">Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Authenticity</h4>
                  <p className="text-xs text-muted-foreground">
                    Keep your unique voice while optimizing for engagement
                  </p>
                </div>
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Consistency</h4>
                  <p className="text-xs text-muted-foreground">Maintain regular posting schedule and brand voice</p>
                </div>
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Engagement</h4>
                  <p className="text-xs text-muted-foreground">Include calls-to-action and conversation starters</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
