"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import {
  Bot,
  Search,
  MessageSquare,
  Sparkles,
  Crown,
  Zap,
  Music,
  FileText,
  TrendingUp,
  Users,
  Calendar,
  Target,
  Mic,
  Palette,
  Share2,
  BarChart3,
  Headphones,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface AIAssistant {
  id: string
  name: string
  description: string
  category: "creative" | "marketing" | "business" | "production" | "analysis" | "social"
  icon: any
  color: string
  isPremium: boolean
  usageCount: number
  lastUsed?: Date
  features: string[]
  slug: string
}

interface ChatSession {
  id: string
  title: string
  assistant: string
  lastMessage: string
  timestamp: Date
  messageCount: number
}

export default function AssistantsHubPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("assistants")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"

  const assistants: AIAssistant[] = [
    {
      id: "1",
      name: "Lyric Generator",
      description: "Generate creative lyrics for any genre, mood, or theme with AI-powered songwriting assistance.",
      category: "creative",
      icon: Mic,
      color: "from-purple-500 to-pink-500",
      isPremium: false,
      usageCount: 23,
      lastUsed: new Date("2024-01-20"),
      features: ["Genre-specific lyrics", "Rhyme schemes", "Mood matching", "Theme exploration"],
      slug: "lyric-generator",
    },
    {
      id: "2",
      name: "Social Media Assistant",
      description: "Create engaging social media content, captions, and posting strategies for your music.",
      category: "marketing",
      icon: Share2,
      color: "from-blue-500 to-cyan-500",
      isPremium: false,
      usageCount: 45,
      lastUsed: new Date("2024-01-19"),
      features: ["Content creation", "Hashtag optimization", "Posting schedules", "Engagement strategies"],
      slug: "social-media-assistant",
    },
    {
      id: "3",
      name: "Artist Bio Generator",
      description: "Craft compelling artist biographies and press materials that capture your unique story.",
      category: "marketing",
      icon: FileText,
      color: "from-green-500 to-emerald-500",
      isPremium: false,
      usageCount: 12,
      lastUsed: new Date("2024-01-18"),
      features: ["Professional bios", "Press releases", "EPK content", "Story crafting"],
      slug: "artist-bio-generator",
    },
    {
      id: "4",
      name: "Music Analytics Advisor",
      description: "Analyze your streaming data and get actionable insights to grow your audience.",
      category: "analysis",
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
      isPremium: true,
      usageCount: 8,
      lastUsed: new Date("2024-01-17"),
      features: ["Data analysis", "Growth insights", "Audience demographics", "Performance tracking"],
      slug: "analytics-advisor",
    },
    {
      id: "5",
      name: "Cover Art Creator",
      description: "Design professional album covers and artwork with AI-powered visual generation.",
      category: "creative",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      isPremium: true,
      usageCount: 15,
      features: ["AI art generation", "Style customization", "Brand consistency", "High-resolution output"],
      slug: "cover-art-creator",
    },
    {
      id: "6",
      name: "Collaboration Finder",
      description: "Find and connect with artists, producers, and collaborators that match your style.",
      category: "business",
      icon: Users,
      color: "from-indigo-500 to-purple-500",
      isPremium: true,
      usageCount: 6,
      features: ["Artist matching", "Collaboration opportunities", "Network expansion", "Project management"],
      slug: "collaboration-finder",
    },
    {
      id: "7",
      name: "Release Strategy Planner",
      description: "Plan your music releases with optimal timing, platforms, and promotional strategies.",
      category: "marketing",
      icon: Calendar,
      color: "from-teal-500 to-green-500",
      isPremium: true,
      usageCount: 9,
      features: ["Release planning", "Platform optimization", "Promotional timelines", "Budget allocation"],
      slug: "release-planner",
    },
    {
      id: "8",
      name: "Melody Composer",
      description: "Generate original melodies and chord progressions for your songs using AI composition.",
      category: "production",
      icon: Music,
      color: "from-violet-500 to-purple-500",
      isPremium: true,
      usageCount: 18,
      features: ["Melody generation", "Chord progressions", "Genre adaptation", "MIDI export"],
      slug: "melody-composer",
    },
  ]

  const recentChats: ChatSession[] = [
    {
      id: "1",
      title: "Pop song lyrics about summer",
      assistant: "Lyric Generator",
      lastMessage: "Here's a catchy chorus for your summer anthem...",
      timestamp: new Date("2024-01-20T14:30:00"),
      messageCount: 12,
    },
    {
      id: "2",
      title: "Instagram content strategy",
      assistant: "Social Media Assistant",
      lastMessage: "I recommend posting 3-4 times per week with this content mix...",
      timestamp: new Date("2024-01-19T16:45:00"),
      messageCount: 8,
    },
    {
      id: "3",
      title: "Artist bio for press kit",
      assistant: "Artist Bio Generator",
      lastMessage: "Your updated bio emphasizes your unique sound and journey...",
      timestamp: new Date("2024-01-18T11:20:00"),
      messageCount: 6,
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "creative":
        return Sparkles
      case "marketing":
        return TrendingUp
      case "business":
        return Target
      case "production":
        return Headphones
      case "analysis":
        return BarChart3
      case "social":
        return Share2
      default:
        return Bot
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "creative":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
      case "marketing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "business":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "production":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
      case "analysis":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      case "social":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const filteredAssistants = assistants.filter((assistant) => {
    const matchesSearch =
      assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assistant.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || assistant.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const totalUsage = assistants.reduce((sum, assistant) => sum + assistant.usageCount, 0)
  const availableAssistants = assistants.filter((a) => !a.isPremium || isPremiumUser).length
  const premiumAssistants = assistants.filter((a) => a.isPremium).length
  const activeChats = recentChats.length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Bot className="h-8 w-8 text-pink-600" />
            Assistants Hub
          </h1>
          <p className="text-muted-foreground">AI-powered tools to accelerate your music career</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            className={`${isPremiumUser ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gray-500"} text-white`}
          >
            {isPremiumUser && <Crown className="w-3 h-3 mr-1" />}
            {user?.plan?.toUpperCase() || "FREE"}
          </Badge>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <MessageSquare className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Total AI Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-600">{totalUsage}</div>
            <p className="text-xs text-muted-foreground">Generations this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Bot className="w-4 h-4 mr-2" />
              Available Assistants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{availableAssistants}</div>
            <p className="text-xs text-muted-foreground">Ready to help</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Crown className="w-4 h-4 mr-2" />
              Premium Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{premiumAssistants}</div>
            <p className="text-xs text-muted-foreground">Advanced features</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Active Chats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeChats}</div>
            <p className="text-xs text-muted-foreground">Ongoing conversations</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assistants">AI Assistants</TabsTrigger>
          <TabsTrigger value="chats">Recent Chats</TabsTrigger>
        </TabsList>

        <TabsContent value="assistants" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search assistants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="analysis">Analysis</SelectItem>
                <SelectItem value="social">Social</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Assistants Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAssistants.map((assistant) => {
              const CategoryIcon = getCategoryIcon(assistant.category)
              const isAccessible = !assistant.isPremium || isPremiumUser

              return (
                <Card
                  key={assistant.id}
                  className={`group hover:shadow-lg transition-all duration-300 ${!isAccessible ? "opacity-60" : ""}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${assistant.color} flex items-center justify-center`}
                      >
                        <assistant.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        {assistant.isPremium && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                            <Crown className="w-3 h-3 mr-1" />
                            Pro
                          </Badge>
                        )}
                        <Badge className={`text-xs ${getCategoryColor(assistant.category)}`}>
                          <CategoryIcon className="w-3 h-3 mr-1" />
                          {assistant.category}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{assistant.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{assistant.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Used {assistant.usageCount} times</span>
                        {assistant.lastUsed && <span>Last: {assistant.lastUsed.toLocaleDateString()}</span>}
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Key Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {assistant.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {assistant.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{assistant.features.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Link href={isAccessible ? `/dashboard/assistants/${assistant.slug}` : "#"}>
                        <Button
                          className="w-full"
                          disabled={!isAccessible}
                          variant={isAccessible ? "default" : "outline"}
                        >
                          {isAccessible ? (
                            <>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Start Chat
                            </>
                          ) : (
                            <>
                              <Crown className="w-4 h-4 mr-2" />
                              Requires Pro
                            </>
                          )}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="chats" className="space-y-6">
          {recentChats.length > 0 ? (
            <div className="space-y-4">
              {recentChats.map((chat) => (
                <Card key={chat.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{chat.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {chat.assistant}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3 line-clamp-2">{chat.lastMessage}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {chat.messageCount} messages
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {chat.timestamp.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Continue Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No recent chats</h3>
                <p className="text-muted-foreground mb-6">
                  Start a conversation with one of our AI assistants to get help with your music career.
                </p>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Bot className="w-4 h-4 mr-2" />
                  Start Your First Chat
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Premium CTA for Free Users */}
      {!isPremiumUser && (
        <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200 dark:from-pink-950/20 dark:to-purple-950/20 dark:border-pink-800">
          <CardContent className="p-8 text-center">
            <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Unlock Advanced AI Assistants</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get access to premium AI tools including advanced analytics, collaboration finder, melody composer, cover
              art creator, and unlimited usage with Pro.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Analytics AI</p>
              </div>
              <div className="text-center">
                <Music className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Melody Composer</p>
              </div>
              <div className="text-center">
                <Palette className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Cover Art Creator</p>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Unlimited Usage</p>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600">
              <Sparkles className="w-5 h-5 mr-2" />
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
