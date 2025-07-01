"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Bot, PenTool, Camera, Share2, FileText, ArrowRight, Search, Sparkles, MessageSquare } from "lucide-react"
import Link from "next/link"

const assistants = [
  {
    id: "armie-chat",
    name: "ARMIE Assistant",
    description: "Your personal AI music industry advisor and career development assistant",
    icon: Bot,
    color: "from-purple-500 to-indigo-500",
    category: "General",
    href: "/dashboard",
  },
  {
    id: "lyric-generator",
    name: "Lyric Generator",
    description: "AI-powered songwriting assistant for creating compelling lyrics",
    icon: PenTool,
    color: "from-blue-500 to-cyan-500",
    category: "Creative",
    href: "/dashboard/assistants/lyric-generator",
  },
  {
    id: "cover-art-generator",
    name: "Cover Art Generator",
    description: "Create stunning album covers and promotional artwork",
    icon: Camera,
    color: "from-pink-500 to-rose-500",
    category: "Visual",
    href: "/dashboard/assistants/cover-art-generator",
  },
  {
    id: "social-media-assistant",
    name: "Social Media Assistant",
    description: "Optimize your social media presence and engagement",
    icon: Share2,
    color: "from-green-500 to-emerald-500",
    category: "Marketing",
    href: "/dashboard/assistants/social-media-assistant",
  },
  {
    id: "artist-bio-generator",
    name: "Artist Bio Generator",
    description: "Craft compelling artist biographies and press materials",
    icon: FileText,
    color: "from-orange-500 to-red-500",
    category: "Content",
    href: "/dashboard/assistants/artist-bio-generator",
  },
]

export default function AssistantsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["All", ...Array.from(new Set(assistants.map((assistant) => assistant.category)))]

  const filteredAssistants = assistants.filter((assistant) => {
    const matchesCategory = selectedCategory === "All" || assistant.category === selectedCategory
    const matchesSearch =
      assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AI Assistants</h1>
            <p className="text-muted-foreground">Powerful AI tools to accelerate your music career</p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
            {filteredAssistants.length} Available
          </Badge>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search assistants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Assistant */}
      <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-indigo-950/20 border-purple-200 dark:border-purple-800">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                  Meet Your ARMIE Assistant
                </h3>
                <p className="text-purple-700 dark:text-purple-300 max-w-2xl">
                  Your comprehensive AI music career development assistant. Get expert guidance on contracts, marketing
                  strategies, industry insights, and strategic planning. Available 24/7 to support your music journey.
                </p>
              </div>
            </div>
            <Link href="/dashboard">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Chatting
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Assistants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssistants.map((assistant) => {
          const IconComponent = assistant.icon
          return (
            <Link key={assistant.id} href={assistant.href}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-blue-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${assistant.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {assistant.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {assistant.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{assistant.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Click to open</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredAssistants.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No assistants found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria to find the assistant you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
