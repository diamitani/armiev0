"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MessageSquare, Copy, RefreshCw, Sparkles } from "lucide-react"
import Link from "next/link"

export default function DMGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDM, setGeneratedDM] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedDM(`Hey [Name]! 👋

I've been following your work and really love what you're doing with [specific reference]. Your recent [post/project/song] really resonated with me, especially [specific detail].

I'm Alex Rodriguez, an indie-pop artist from Austin. I just released a new single called "Midnight Dreams" that I think you might connect with - it has a similar atmospheric vibe to some of your work.

I'd love to connect and maybe explore some collaboration opportunities. Would you be interested in checking out the track? I'd be happy to send you a private link.

No pressure at all - just thought we might vibe creatively! 

Best,
Alex

P.S. - That [specific recent work] was incredible. The [specific element] really stood out to me.`)
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
          <div className="p-3 rounded-lg bg-lime-100 text-lime-800 dark:bg-lime-950/30 dark:text-lime-400">
            <MessageSquare className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight armie-primary">DM Generator</h1>
            <p className="text-muted-foreground">
              Create personalized direct messages for networking and collaboration
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-lime-100 text-lime-800 dark:bg-lime-950/30 dark:text-lime-400">
                Business & Admin
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400">Weekly Usage</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary">Create Direct Message</CardTitle>
              <CardDescription>Generate personalized DMs for networking and collaboration outreach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium armie-primary">Message Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select message type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="collaboration">Collaboration Request</SelectItem>
                        <SelectItem value="networking">General Networking</SelectItem>
                        <SelectItem value="feedback">Feedback Request</SelectItem>
                        <SelectItem value="interview">Interview Request</SelectItem>
                        <SelectItem value="playlist">Playlist Submission</SelectItem>
                        <SelectItem value="booking">Booking Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium armie-primary">Platform</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="twitter">Twitter/X</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="discord">Discord</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Recipient Name/Handle</label>
                  <Input placeholder="Who are you messaging?" />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">What You Know About Them</label>
                  <Textarea
                    placeholder="Their recent work, achievements, style, or anything specific you can reference to personalize the message"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Your Goal</label>
                  <Textarea
                    placeholder="What do you want to achieve with this message? (collaboration, feedback, connection, etc.)"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Your Recent Work to Mention</label>
                  <Input placeholder="Your latest single, project, or achievement to share" />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Tone</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="respectful">Respectful & Humble</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating DM...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Direct Message
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {generatedDM && (
            <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="armie-primary">Generated Direct Message</CardTitle>
                <CardDescription>Your personalized outreach message</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-armie-accent/50 rounded-lg border">
                    <pre className="whitespace-pre-wrap text-sm armie-primary">{generatedDM}</pre>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Message
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
              <CardTitle className="armie-primary">DM Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Research the person first",
                  "Reference their specific work",
                  "Be genuine and authentic",
                  "Keep it concise but personal",
                  "Include a clear call-to-action",
                  "Follow up respectfully if no response",
                ].map((tip, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-armie-secondary rounded-full" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary">Message Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Collaboration</h4>
                  <p className="text-xs text-muted-foreground">Propose working together on music</p>
                </div>
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Networking</h4>
                  <p className="text-xs text-muted-foreground">Build industry relationships</p>
                </div>
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Feedback</h4>
                  <p className="text-xs text-muted-foreground">Request input on your work</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
