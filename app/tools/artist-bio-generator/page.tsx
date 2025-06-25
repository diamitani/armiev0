"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Users, Download, Copy, RefreshCw, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ArtistBioGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBio, setGeneratedBio] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedBio(`Alex Rodriguez is an emerging indie-pop artist whose introspective lyrics and atmospheric soundscapes have been captivating audiences across the digital landscape. Born and raised in Austin, Texas, Alex discovered their passion for music at age 12 when they first picked up a guitar, leading to years of songwriting that would eventually shape their distinctive artistic voice.

Drawing inspiration from artists like Phoebe Bridgers, The 1975, and Bon Iver, Alex creates music that explores themes of personal growth, relationships, and the complexities of modern life. Their debut single "Midnight Dreams" garnered over 100,000 streams within its first month, establishing them as an artist to watch in the indie music scene.

Alex's music is characterized by lush production, thoughtful arrangements, and vocals that seamlessly blend vulnerability with strength. They write, produce, and perform all their material, showcasing a level of artistic control that's rare among emerging artists.

Currently working on their debut EP, Alex continues to build a dedicated fanbase through authentic storytelling and genuine connection with their audience. When not in the studio, they can be found exploring Austin's vibrant music scene and collaborating with other local artists.`)
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
          <div className="p-3 rounded-lg bg-indigo-100 text-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-400">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight armie-primary">Artist Bio Generator</h1>
            <p className="text-muted-foreground">Create compelling artist biographies for press and promotional use</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-400">
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
              <CardTitle className="armie-primary">Create Artist Bio</CardTitle>
              <CardDescription>Generate professional biographies for different platforms and purposes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium armie-primary">Bio Length</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (50-100 words)</SelectItem>
                        <SelectItem value="medium">Medium (150-250 words)</SelectItem>
                        <SelectItem value="long">Long (300-500 words)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium armie-primary">Purpose</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="press">Press Release</SelectItem>
                        <SelectItem value="website">Website/EPK</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="booking">Booking/Venues</SelectItem>
                        <SelectItem value="streaming">Streaming Platforms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Artist Name</label>
                  <Input placeholder="Your stage/artist name" />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Genre/Style</label>
                  <Input placeholder="e.g., Indie Pop, Electronic, Hip-Hop, Folk" />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Background & Origin</label>
                  <Textarea
                    placeholder="Where are you from? How did you start making music? Key life experiences..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Musical Influences</label>
                  <Input placeholder="Artists that inspire you (e.g., Radiohead, Billie Eilish, Kendrick Lamar)" />
                </div>

                <div>
                  <label className="text-sm font-medium armie-primary">Achievements & Releases</label>
                  <Textarea
                    placeholder="Notable releases, streaming numbers, performances, awards, collaborations..."
                    rows={3}
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
                      Generating Bio...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Artist Bio
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {generatedBio && (
            <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="armie-primary">Generated Bio</CardTitle>
                <CardDescription>Your professional artist biography</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-armie-accent/50 rounded-lg border">
                    <p className="text-sm armie-primary leading-relaxed">{generatedBio}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Bio
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

        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary">Bio Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Press Bio</h4>
                  <p className="text-xs text-muted-foreground">Professional, third-person, includes achievements</p>
                </div>
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Social Bio</h4>
                  <p className="text-xs text-muted-foreground">Casual, engaging, personality-focused</p>
                </div>
                <div className="p-3 bg-armie-secondary/10 rounded-lg">
                  <h4 className="font-medium armie-primary text-sm">Booking Bio</h4>
                  <p className="text-xs text-muted-foreground">Performance history, audience appeal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary">Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Keep it authentic and personal",
                  "Include specific achievements",
                  "Mention your unique sound",
                  "Add your origin story",
                  "Update regularly with new releases",
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
