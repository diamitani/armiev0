"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Bot,
  PenTool,
  Camera,
  Share2,
  FileText,
  ArrowRight,
  Search,
  Sparkles,
  MessageSquare,
  Radio,
  Mail,
} from "lucide-react"
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
  {
    id: "press-release-generator",
    name: "Press Release Generator",
    description: "Create professional press releases for media outlets and industry contacts",
    icon: Radio,
    color: "from-violet-500 to-purple-500",
    category: "Marketing",
    href: "/dashboard/assistants/press-release-generator",
  },
  {
    id: "email-generator",
    name: "Email Generator",
    description: "Craft professional emails for industry outreach and networking",
    icon: Mail,
    color: "from-teal-500 to-cyan-500",
    category: "Business",
    href: "/dashboard/assistants/email-generator",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">ARMIE AI Assistants</h1>
              <p className="text-xl text-gray-600">Powerful AI tools to accelerate your music career</p>
            </div>
          </div>

          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 text-lg px-4 py-2">
            {filteredAssistants.length} AI Tools Available
          </Badge>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search AI assistants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Assistant */}
        <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-purple-900 mb-3">Meet Your ARMIE Assistant</h3>
                  <p className="text-purple-700 text-lg max-w-2xl">
                    Your comprehensive AI music career development assistant. Get expert guidance on contracts,
                    marketing strategies, industry insights, and strategic planning. Available 24/7 to support your
                    music journey.
                  </p>
                </div>
              </div>
              <Link href="/dashboard">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4">
                  <MessageSquare className="w-6 h-6 mr-3" />
                  Start Chatting Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Assistants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAssistants.map((assistant) => {
            const IconComponent = assistant.icon
            return (
              <Link key={assistant.id} href={assistant.href}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-blue-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${assistant.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        {assistant.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {assistant.name}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-gray-600">
                      {assistant.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-medium">Launch Assistant</span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAssistants.length === 0 && (
          <Card className="text-center py-16 bg-white/80 backdrop-blur-sm">
            <CardContent>
              <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No assistants found</h3>
              <p className="text-gray-500 text-lg mb-6">
                Try adjusting your search or filter criteria to find the assistant you're looking for.
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Music Career?</h3>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of artists using ARMIE's AI-powered tools to create, promote, and grow their music careers.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get Started Free
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
