"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PenTool, ArrowRight, Check, Sparkles, Music, Users } from "lucide-react"
import Link from "next/link"

export default function LyricGeneratorInfoPage() {
  const features = [
    "Genre-specific lyric generation",
    "Rhyme scheme suggestions",
    "Mood and theme customization",
    "Multiple verse structures",
    "Hook and chorus creation",
    "Collaborative editing tools",
    "Export to popular formats",
    "Revision history tracking",
  ]

  const useCases = [
    {
      title: "Writer's Block",
      description: "Generate fresh ideas when creativity hits a wall",
      icon: Sparkles,
    },
    {
      title: "Genre Exploration",
      description: "Experiment with different musical styles and themes",
      icon: Music,
    },
    {
      title: "Collaboration",
      description: "Create lyrical foundations for co-writing sessions",
      icon: Users,
    },
  ]

  const examples = [
    {
      genre: "R&B",
      mood: "Romantic",
      sample:
        "Moonlight dancing on your skin tonight / Every moment feels so right / In your eyes I see the stars align / Baby you're forever mine...",
    },
    {
      genre: "Pop",
      mood: "Uplifting",
      sample:
        "Breaking through the clouds today / Nothing's gonna stop my way / Every dream is within reach / Practice what I preach...",
    },
    {
      genre: "Hip-Hop",
      mood: "Confident",
      sample:
        "Started from the bottom now I'm climbing up / Never giving up, always grinding up / Every beat drops like thunder in my soul / Music's my passion, it's my ultimate goal...",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-b border-yellow-500/20">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-2xl bg-yellow-500/20 border border-yellow-500/30">
                <PenTool className="h-12 w-12 text-yellow-400" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                AI Lyric Generator
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your musical ideas into compelling lyrics with AI-powered songwriting assistance that
              understands your style and genre
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Start Writing Lyrics
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-4 py-2">
                Free Trial Available
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Features Section */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Powerful Lyric Creation Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI understands musical structure, rhyme schemes, and genre conventions to help you create
              professional-quality lyrics
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-yellow-500/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-white font-medium">{feature}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Perfect For Every Songwriter</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Whether you're a beginner or professional, our AI adapts to your needs and skill level
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="bg-gray-900/30 border-gray-800 text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                    <useCase.icon className="h-8 w-8 text-yellow-400" />
                  </div>
                  <CardTitle className="text-white">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">AI-Generated Lyric Examples</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See how our AI creates lyrics tailored to different genres and moods
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">{example.genre}</Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {example.mood}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 italic leading-relaxed">{example.sample}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Write Your Next Hit?</h2>
            <p className="text-gray-400 mb-8">
              Join thousands of artists using AI to enhance their songwriting process
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
