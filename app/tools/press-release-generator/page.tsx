"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Radio, Download, Copy, RefreshCw, Sparkles } from "lucide-react"
import Link from "next/link"

export default function PressReleaseGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedRelease, setGeneratedRelease] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedRelease(`FOR IMMEDIATE RELEASE

Rising Indie Artist Alex Rodriguez Releases Captivating New Single "Midnight Dreams"

Austin-Based Musician Delivers Atmospheric Pop Anthem About Finding Hope in Dark Times

AUSTIN, TX – December 24, 2024 – Emerging indie-pop artist Alex Rodriguez has released their highly anticipated new single "Midnight Dreams," a haunting yet hopeful track that showcases the artist's evolving sound and introspective songwriting. The song is now available on all major streaming platforms.

"Midnight Dreams" represents a significant artistic milestone for Rodriguez, who wrote and produced the track during late-night studio sessions in Austin. The song explores themes of resilience, self-discovery, and finding light in moments of uncertainty – universal experiences that resonate deeply with listeners navigating their own challenges.

"This song came to me during a particularly reflective period in my life," says Rodriguez. "I was walking through the city at 3 AM, and there was something magical about that quiet, contemplative space. 'Midnight Dreams' captures that feeling of being alone with your thoughts but finding strength in that solitude."

The track features Rodriguez's signature atmospheric production style, blending ethereal vocals with lush instrumentation and subtle electronic elements. The result is a sonic landscape that feels both intimate and expansive, drawing listeners into Rodriguez's emotional world.

Since beginning their musical journey, Rodriguez has garnered attention for their authentic approach to songwriting and their ability to create deeply personal music that connects with a broad audience. "Midnight Dreams" builds on this foundation while showcasing new levels of artistic maturity and production sophistication.

The single is accompanied by a music video directed by local filmmaker Sarah Chen, featuring dreamlike visuals that complement the song's introspective nature. The video will premiere on Rodriguez's YouTube channel on December 26, 2024.

Rodriguez is currently working on their debut EP, expected to release in early 2025. The project will feature "Midnight Dreams" alongside several other tracks that explore similar themes of growth, connection, and artistic evolution.

"Midnight Dreams" is available now on Spotify, Apple Music, and all major streaming platforms.

About Alex Rodriguez:
Alex Rodriguez is an indie-pop artist based in Austin, Texas, known for their atmospheric soundscapes and introspective lyrics. Drawing inspiration from artists like Phoebe Bridgers and Bon Iver, Rodriguez creates music that explores the complexities of modern life with honesty and vulnerability.

For more information, interviews, or high-resolution images, please contact:
[Contact Information]

###`)
      setIsGenerating(false)
    }, 2000)
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
          <div className="p-3 rounded-lg bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-400">
            <Radio className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight armie-primary">Press Release Generator</h1>
            <p className="text-muted-foreground">Create professional press releases for your music and announcements</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-400">
                Media & Promotion
              </Badge>
              <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-400">Low Usage</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary">Create Press Release</CardTitle>
              <CardDescription>
                Generate professional press releases for media outlets and industry contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium armie-primary">Release Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">New Single Release</SelectItem>
                        <SelectItem value="album">Album Release</SelectItem>
                        <SelectItem value="tour">Tour Announcement</SelectItem>
                        <SelectItem value="collaboration">Collaboration</SelectItem>
                        <SelectItem value="award">Award/Achievement</SelectItem>
                        <SelectItem value="signing">Label Signing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium armie-primary">Priority</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">For Immediate Release</SelectItem>
                        <SelectItem value="embargo">Under Embargo</SelectItem>
                        <SelectItem value="scheduled">Scheduled Release</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Headline</label>
                  <Input placeholder="Main announcement (e.g., Artist Name Releases New Single 'Song Title')" />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Subheadline</label>
                  <Input placeholder="Supporting information or tagline" />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Location & Date</label>
                  <Input placeholder="CITY, STATE – December 24, 2024" />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Key Details</label>
                  <Textarea placeholder="Main announcement details: what, when, where, why it matters..." rows={4} />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Artist Quote</label>
                  <Textarea placeholder="A meaningful quote from you about this announcement" rows={3} />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Background Information</label>
                  <Textarea placeholder="Additional context, previous releases, achievements, etc." rows={3} />
                </div>

                <Button
                  className="w-full bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating Press Release...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Press Release
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {generatedRelease && (
            <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="armie-primary">Generated Press Release</CardTitle>
                <CardDescription>Your professional press release ready for distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-armie-accent/50 rounded-lg border max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm armie-primary font-mono">{generatedRelease}</pre>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Text
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
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
              <CardTitle className="armie-primary">Press Release Elements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Headline</h4>
                  <p className="text-xs text-muted-foreground">Clear, newsworthy, attention-grabbing</p>
                </div>
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Lead Paragraph</h4>
                  <p className="text-xs text-muted-foreground">Who, what, when, where, why</p>
                </div>
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Body</h4>
                  <p className="text-xs text-muted-foreground">Supporting details and quotes</p>
                </div>
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Boilerplate</h4>
                  <p className="text-xs text-muted-foreground">About section and contact info</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary">Distribution Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Send to relevant music journalists",
                  "Include high-resolution images",
                  "Follow up professionally",
                  "Time releases strategically",
                  "Personalize your pitch emails",
                ].map((tip, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-armie-secondary rounded-full" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
