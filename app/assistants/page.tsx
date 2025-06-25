"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bot,
  Sparkles,
  FileText,
  Palette,
  Share2,
  PenTool,
  Mail,
  Search,
  Filter,
  ArrowRight,
  Zap,
  Star,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AssistantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const assistants = [
    {
      id: "general-assistant",
      name: "General Assistant",
      description:
        "Your main AI companion for strategic planning, daily guidance, and comprehensive music career management.",
      longDescription:
        "The General Assistant is your primary AI companion, designed to understand your unique music career goals and provide strategic guidance. It can help with career planning, daily task management, industry insights, and connecting you with specialized assistants when needed.",
      icon: Sparkles,
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      category: "core",
      usage: "High",
      capabilities: [
        "Strategic career planning",
        "Daily task recommendations",
        "Industry trend analysis",
        "Goal setting and tracking",
        "Assistant coordination",
      ],
      useCases: [
        "Planning your next album release",
        "Setting quarterly career goals",
        "Getting industry insights",
        "Coordinating multiple projects",
      ],
      href: "/assistants/general-assistant",
    },
    {
      id: "lyric-generator",
      name: "Lyric Generator",
      description: "AI-powered songwriting assistant for creating compelling lyrics across all genres.",
      longDescription:
        "The Lyric Generator specializes in creating emotionally resonant lyrics that connect with audiences. It understands song structure, rhyme schemes, and can adapt to any genre or style while helping you express your authentic voice.",
      icon: PenTool,
      color: "from-yellow-500 to-yellow-600",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
      category: "creative",
      usage: "High",
      capabilities: [
        "Original lyric generation",
        "Genre-specific writing",
        "Rhyme scheme optimization",
        "Song structure guidance",
        "Collaborative editing",
      ],
      useCases: [
        "Writing hooks that stick",
        "Completing unfinished songs",
        "Exploring new genres",
        "Overcoming writer's block",
      ],
      href: "/assistants/lyric-generator",
    },
    {
      id: "cover-art-generator",
      name: "Cover Art Generator",
      description: "Professional visual branding specialist for creating stunning album artwork and visual identity.",
      longDescription:
        "The Cover Art Generator combines artistic vision with industry knowledge to create compelling visual representations of your music. It understands color psychology, typography, and current design trends.",
      icon: Palette,
      color: "from-pink-500 to-pink-600",
      textColor: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-950/20",
      category: "creative",
      usage: "High",
      capabilities: [
        "Concept development",
        "Color palette creation",
        "Typography recommendations",
        "Brand consistency",
        "Industry format specs",
      ],
      useCases: ["Album cover design", "Single artwork creation", "Brand identity development", "Social media visuals"],
      href: "/assistants/cover-art-generator",
    },
    {
      id: "social-media-assistant",
      name: "Social Media Assistant",
      description: "Content creation and social media strategy specialist for building your online presence.",
      longDescription:
        "The Social Media Assistant helps you build and maintain a strong online presence across all platforms. It creates engaging content, develops posting strategies, and helps you connect authentically with your audience.",
      icon: Share2,
      color: "from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      category: "marketing",
      usage: "Daily",
      capabilities: [
        "Content calendar planning",
        "Platform-specific optimization",
        "Engagement strategies",
        "Hashtag research",
        "Analytics interpretation",
      ],
      useCases: [
        "Daily content creation",
        "Album promotion campaigns",
        "Fan engagement strategies",
        "Cross-platform consistency",
      ],
      href: "/assistants/social-media-assistant",
    },
    {
      id: "contract-assistant",
      name: "Contract Assistant",
      description: "Legal document specialist for generating, reviewing, and understanding music industry contracts.",
      longDescription:
        "The Contract Assistant provides legal guidance and document generation for all your music business needs. It helps you understand complex agreements and creates industry-standard contracts.",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      category: "business",
      usage: "Medium",
      capabilities: [
        "Contract generation",
        "Legal document review",
        "Terms explanation",
        "Industry standards",
        "Risk assessment",
      ],
      useCases: ["Recording agreements", "Performance contracts", "Licensing deals", "Collaboration agreements"],
      href: "/assistants/contract-assistant",
    },
    {
      id: "email-generator",
      name: "Email Generator",
      description: "Professional communication specialist for outreach, networking, and business correspondence.",
      longDescription:
        "The Email Generator crafts professional, persuasive emails for all your music business communications. From cold outreach to follow-ups, it helps you communicate effectively with industry professionals.",
      icon: Mail,
      color: "from-cyan-500 to-cyan-600",
      textColor: "text-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
      category: "marketing",
      usage: "Weekly",
      capabilities: [
        "Professional email drafting",
        "Industry-specific templates",
        "Follow-up sequences",
        "Pitch optimization",
        "Relationship building",
      ],
      useCases: ["Label submissions", "Booking inquiries", "Press outreach", "Collaboration requests"],
      href: "/assistants/email-generator",
    },
  ]

  const categories = [
    { id: "all", name: "All Assistants", count: assistants.length },
    { id: "core", name: "Core", count: assistants.filter((a) => a.category === "core").length },
    { id: "creative", name: "Creative", count: assistants.filter((a) => a.category === "creative").length },
    { id: "marketing", name: "Marketing", count: assistants.filter((a) => a.category === "marketing").length },
    { id: "business", name: "Business", count: assistants.filter((a) => a.category === "business").length },
  ]

  const filteredAssistants = assistants.filter((assistant) => {
    const matchesSearch =
      assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || assistant.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getUsageBadgeColor = (usage: string) => {
    switch (usage) {
      case "Daily":
        return "bg-armie-secondary text-armie-primary"
      case "High":
        return "bg-emerald-500 text-white"
      case "Medium":
        return "bg-yellow-500 text-white"
      case "Weekly":
        return "bg-blue-500 text-white"
      case "Monthly":
        return "bg-purple-500 text-white"
      case "Low":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-armie-primary/5">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bot className="w-12 h-12 text-armie-secondary mr-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-armie-primary to-armie-secondary bg-clip-text text-transparent">
              AI Assistants
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your specialized AI team for every aspect of your music career
          </p>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <Badge className="bg-armie-secondary/20 text-armie-primary border-armie-secondary/30 px-4 py-2">
              <Zap className="w-3 h-3 mr-1" />
              {assistants.length} Specialized Assistants
            </Badge>
            <Badge className="bg-armie-primary text-armie-accent px-4 py-2">
              <Star className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search assistants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-armie-secondary text-armie-primary hover:bg-armie-secondary/80"
                    : ""
                }
              >
                <Filter className="w-3 h-3 mr-1" />
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Assistants Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssistants.map((assistant) => (
            <Card
              key={assistant.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${assistant.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <assistant.icon className={`w-6 h-6 ${assistant.textColor}`} />
                  </div>
                  <Badge className={`text-xs ${getUsageBadgeColor(assistant.usage)}`}>{assistant.usage}</Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-armie-secondary transition-colors">
                  {assistant.name}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">{assistant.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-foreground">Key Capabilities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {assistant.capabilities.slice(0, 3).map((capability, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                      {assistant.capabilities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{assistant.capabilities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Link href={assistant.href}>
                    <Button className="w-full bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary group-hover:shadow-md transition-all">
                      Launch Assistant
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAssistants.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No assistants found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
