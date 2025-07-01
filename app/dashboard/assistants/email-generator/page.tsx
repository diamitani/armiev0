"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Mail, Copy, RefreshCw, Sparkles } from "lucide-react"
import Link from "next/link"

export default function EmailGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedEmail, setGeneratedEmail] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedEmail(`Subject: Collaboration Opportunity - "Midnight Dreams" Single

Dear Sarah,

I hope this email finds you well. My name is Alex Rodriguez, and I'm an indie-pop artist based in Austin, Texas. I've been following your work as a music journalist at Rolling Stone, and I particularly enjoyed your recent piece on emerging artists in the indie scene.

I'm reaching out because I believe my latest single, "Midnight Dreams," would resonate with your readers. The track explores themes of resilience and self-discovery through atmospheric production and introspective lyrics - elements that align with the artists you've featured recently.

"Midnight Dreams" was written and produced during late-night studio sessions here in Austin, and it represents a significant artistic milestone in my journey. The song has been gaining traction on streaming platforms, with over 50,000 plays in its first month, and I believe it would be a great fit for your upcoming feature on rising indie artists.

I'd love to send you a private link to the track, along with high-resolution press photos and my full press kit. Would you be interested in learning more about the story behind "Midnight Dreams" and my artistic journey?

I understand you receive many pitches, so I've kept this brief. I'm happy to provide any additional information you might need, and I'm flexible with timing for any potential coverage.

Thank you for your time and consideration. I look forward to the possibility of connecting further.

Best regards,

Alex Rodriguez
Indie-Pop Artist
alex@alexrodriguezmusic.com
(555) 123-4567
Instagram: @alexrodriguezmusic
Spotify: Alex Rodriguez

P.S. - Your article on the evolution of indie music production really resonated with me as an artist who produces their own work. Thank you for highlighting the importance of artistic authenticity in today's music landscape.`)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6 p-6 bg-armie-accent/30 min-h-screen">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/assistants">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assistants
          </Button>
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg bg-cyan-100 text-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-400">
            <Mail className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight armie-primary">Email Generator</h1>
            <p className="text-muted-foreground">Craft professional emails for industry contacts and collaborations</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-400">Business</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary">Create Professional Email</CardTitle>
              <CardDescription>Generate personalized emails for industry outreach and networking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium armie-primary">Email Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select email type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="press-pitch">Press Pitch</SelectItem>
                        <SelectItem value="collaboration">Collaboration Request</SelectItem>
                        <SelectItem value="booking">Booking Inquiry</SelectItem>
                        <SelectItem value="playlist">Playlist Submission</SelectItem>
                        <SelectItem value="interview">Interview Request</SelectItem>
                        <SelectItem value="follow-up">Follow-up Email</SelectItem>
                        <SelectItem value="thank-you">Thank You Note</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium armie-primary">Tone</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Recipient Name/Title</label>
                  <Input placeholder="Who are you emailing? (e.g., Sarah Johnson, Music Editor)" />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Subject Line</label>
                  <Input placeholder="Email subject (leave blank for AI suggestion)" />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Main Purpose</label>
                  <Textarea
                    placeholder="What do you want to achieve with this email? (e.g., get press coverage, request collaboration, book a show)"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Key Information</label>
                  <Textarea
                    placeholder="Important details to include (your latest release, achievements, upcoming shows, etc.)"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Personal Connection</label>
                  <Textarea
                    placeholder="Any personal connection or reference to their work (optional but recommended)"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Call to Action</label>
                  <Input placeholder="What specific action do you want them to take?" />
                </div>

                <Button
                  className="w-full bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating Email...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Email
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {generatedEmail && (
            <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="armie-primary">Generated Email</CardTitle>
                <CardDescription>Your professional email ready to send</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-armie-accent/50 rounded-lg border max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm armie-primary">{generatedEmail}</pre>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Email
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
              <CardTitle className="armie-primary">Email Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Keep subject lines clear and specific",
                  "Personalize with recipient's name",
                  "Reference their recent work",
                  "Be concise but informative",
                  "Include a clear call-to-action",
                  "Follow up professionally",
                  "Proofread before sending",
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
              <CardTitle className="armie-primary">Email Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Press Pitch</h4>
                  <p className="text-xs text-muted-foreground">Media coverage requests</p>
                </div>
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Collaboration</h4>
                  <p className="text-xs text-muted-foreground">Artist partnership proposals</p>
                </div>
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Booking</h4>
                  <p className="text-xs text-muted-foreground">Venue and event inquiries</p>
                </div>
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Playlist</h4>
                  <p className="text-xs text-muted-foreground">Music submission requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
