"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  Sparkles,
  MessageSquare,
  PenTool,
  Palette,
  Share2,
  FileText,
  Radio,
  Mail,
} from "lucide-react"
import Link from "next/link"

const assistants = [
  {
    id: "armie-chat",
    name: "ARMIE Chat",
    description: "Your personal music career assistant for guidance and advice",
    icon: MessageSquare,
    href: "/dashboard",
    category: "General",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400",
  },
  {
    id: "lyric-generator",
    name: "Lyric Generator",
    description: "AI-powered songwriting tool for creating lyrics",
    icon: PenTool,
    href: "/dashboard/assistants/lyric-generator",
    category: "Creative",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-400",
  },
  {
    id: "cover-art-generator",
    name: "Cover Art Generator",
    description: "Create stunning album artwork with AI",
    icon: Palette,
    href: "/dashboard/assistants/cover-art-generator",
    category: "Creative",
    color: "bg-pink-100 text-pink-800 dark:bg-pink-950/30 dark:text-pink-400",
  },
  {
    id: "social-media-assistant",
    name: "Social Media Assistant",
    description: "Optimize your social media presence and content",
    icon: Share2,
    href: "/dashboard/assistants/social-media-assistant",
    category: "Marketing",
    color: "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400",
  },
  {
    id: "artist-bio-generator",
    name: "Artist Bio Generator",
    description: "Create professional artist biographies",
    icon: FileText,
    href: "/dashboard/assistants/artist-bio-generator",
    category: "Business",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-400",
  },
  {
    id: "press-release-generator",
    name: "Press Release Generator",
    description: "Create professional press releases for media outlets",
    icon: Radio,
    href: "/dashboard/assistants/press-release-generator",
    category: "Marketing",
    color: "bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-400",
  },
  {
    id: "email-generator",
    name: "Email Generator",
    description: "Craft professional emails for industry contacts",
    icon: Mail,
    href: "/dashboard/assistants/email-generator",
    category: "Business",
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-400",
  },
]

const categories = ["All", "General", "Creative", "Marketing", "Business"]

export default function AssistantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredAssistants = assistants.filter((assistant) => {
    const matchesSearch =
      assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assistant.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || assistant.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6 p-6 bg-armie-accent/30 min-h-screen">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400">
            <Sparkles className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight armie-primary">AI Assistants</h1>
            <p className="text-muted-foreground">Specialized AI tools to help with every aspect of your music career</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search assistants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-armie-secondary text-armie-primary" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssistants.map((assistant) => {
          const IconComponent = assistant.icon
          return (
            <Card
              key={assistant.id}
              className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${assistant.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {assistant.category}
                  </Badge>
                </div>
                <CardTitle className="armie-primary">{assistant.name}</CardTitle>
                <CardDescription>{assistant.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={assistant.href}>
                  <Button className="w-full bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary">
                    Open Assistant
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredAssistants.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No assistants found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search terms or category filter</p>
        </div>
      )}
    </div>
  )
}
