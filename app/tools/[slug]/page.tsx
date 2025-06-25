"use client"

import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Sparkles, Play, Download, Share } from "lucide-react"
import Link from "next/link"

// Tool configurations
const toolsConfig = {
  "general-assistant": {
    name: "General Assistant",
    description: "Your AI-powered strategic guide for music career planning",
    function: "NLP-driven strategic guide, step-by-step planning",
    benefit: "Removes guesswork, gives users daily actionable steps",
    category: "Core Management",
    icon: Sparkles,
    color: "bg-purple-100 text-purple-800",
    features: [
      "Strategic career planning",
      "Daily task recommendations",
      "Goal setting and tracking",
      "Industry insights and advice",
      "Personalized action plans",
    ],
    interface: "chat",
  },
  "lyric-generator": {
    name: "Lyric Generator",
    description: "AI-powered lyric creation and songwriting assistance",
    function: "NLP-based lyric suggestions or full drafts",
    benefit: "Creative inspiration and professional songwriting support",
    category: "Creative Tools",
    icon: Sparkles,
    color: "bg-pink-100 text-pink-800",
    features: [
      "Genre-specific lyric generation",
      "Rhyme scheme suggestions",
      "Mood and theme customization",
      "Collaborative editing",
      "Export to popular formats",
    ],
    interface: "form",
  },
  "cover-art-generator": {
    name: "Cover Art Generator",
    description: "Create professional album and single artwork with AI",
    function: "Creates AI-generated cover art + asset library",
    benefit: "Professional visuals without a designer",
    category: "Creative Tools",
    icon: Sparkles,
    color: "bg-red-100 text-red-800",
    features: [
      "Multiple art styles and genres",
      "High-resolution outputs",
      "Brand consistency tools",
      "Batch generation",
      "Commercial usage rights",
    ],
    interface: "form",
  },
  "contract-assistant": {
    name: "Music Contract Assistant",
    description: "Generate and review music industry contracts",
    function: "Generates contracts, edits templates, adds e-sign",
    benefit: "Legally sound deals without a lawyer",
    category: "Business & Admin",
    icon: Sparkles,
    color: "bg-red-100 text-red-800",
    features: [
      "Multiple contract types",
      "Legal clause explanations",
      "Industry-standard templates",
      "E-signature integration",
      "Revision tracking",
    ],
    interface: "form",
  },
  "social-media-assistant": {
    name: "Social Media Assistant",
    description: "Automate your social media content creation and scheduling",
    function: "Writes posts, creates images, content calendar",
    benefit: "Keeps socials active and on-brand",
    category: "Media & Promotion",
    icon: Sparkles,
    color: "bg-pink-100 text-pink-800",
    features: [
      "Multi-platform content creation",
      "Automated scheduling",
      "Brand voice consistency",
      "Hashtag optimization",
      "Performance analytics",
    ],
    interface: "form",
  },
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = toolsConfig[params.slug as keyof typeof toolsConfig]

  if (!tool) {
    notFound()
  }

  const renderInterface = () => {
    if (tool.interface === "chat") {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Chat with {tool.name}</CardTitle>
            <CardDescription>Ask questions and get strategic guidance for your music career</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-64 border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm">
                      Hi! I'm your AI music career assistant. I can help you with strategic planning, goal setting, and
                      daily task recommendations. What would you like to work on today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Input placeholder="Ask me anything about your music career..." className="flex-1" />
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Use {tool.name}</CardTitle>
          <CardDescription>Configure your settings and generate content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tool.name === "Lyric Generator" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Genre</label>
                    <Input placeholder="e.g., Pop, Rock, Hip-Hop" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mood</label>
                    <Input placeholder="e.g., Upbeat, Melancholic, Energetic" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Theme/Topic</label>
                  <Input placeholder="What is your song about?" />
                </div>
                <div>
                  <label className="text-sm font-medium">Additional Notes</label>
                  <Textarea placeholder="Any specific requirements or inspiration..." />
                </div>
              </>
            )}

            {tool.name === "Cover Art Generator" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Art Style</label>
                    <Input placeholder="e.g., Minimalist, Abstract, Vintage" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Color Scheme</label>
                    <Input placeholder="e.g., Dark, Vibrant, Monochrome" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Album/Song Title</label>
                  <Input placeholder="Enter your release title" />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Describe the visual concept you want..." />
                </div>
              </>
            )}

            {tool.name === "Social Media Assistant" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Platform</label>
                    <Input placeholder="Instagram, Twitter, TikTok, etc." />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Content Type</label>
                    <Input placeholder="Announcement, Behind-scenes, etc." />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Topic/Event</label>
                  <Input placeholder="What are you posting about?" />
                </div>
                <div>
                  <label className="text-sm font-medium">Brand Voice</label>
                  <Textarea placeholder="Describe your brand personality..." />
                </div>
              </>
            )}

            <Button className="w-full bg-purple-600 hover:bg-purple-700">Generate Content</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${tool.color}`}>
            <tool.icon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary">{tool.category}</Badge>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tool Interface */}
        <div className="lg:col-span-2">{renderInterface()}</div>

        {/* Tool Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How it Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-medium text-purple-600">
                    1
                  </div>
                  <p className="text-sm">Configure your preferences and requirements</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-medium text-purple-600">
                    2
                  </div>
                  <p className="text-sm">AI processes your input using advanced algorithms</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-medium text-purple-600">
                    3
                  </div>
                  <p className="text-sm">Receive professional-quality results instantly</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
