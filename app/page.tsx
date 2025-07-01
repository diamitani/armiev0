"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import {
  Bot,
  Music,
  FileText,
  Users,
  Calendar,
  DollarSign,
  Camera,
  Mic,
  Headphones,
  Building,
  Crown,
  Sparkles,
  MessageSquare,
  PenTool,
  Share2,
  Target,
  Briefcase,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { Loader2 } from "lucide-react"

const aiAgents = [
  {
    id: "armie-chat",
    name: "ARMIE Assistant",
    description: "Your personal AI music industry advisor and assistant",
    icon: Bot,
    color: "from-purple-500 to-indigo-500",
    usage: "high",
    href: "/dashboard/assistants/armie-chat",
    category: "General",
  },
  {
    id: "lyric-generator",
    name: "Lyric Generator",
    description: "AI-powered songwriting assistant for creating compelling lyrics",
    icon: PenTool,
    color: "from-blue-500 to-cyan-500",
    usage: "high",
    href: "/dashboard/assistants/lyric-generator",
    category: "Creative",
  },
  {
    id: "cover-art-generator",
    name: "Cover Art Generator",
    description: "Create stunning album covers and promotional artwork",
    icon: Camera,
    color: "from-pink-500 to-rose-500",
    usage: "high",
    href: "/dashboard/assistants/cover-art-generator",
    category: "Visual",
  },
  {
    id: "social-media-assistant",
    name: "Social Media Assistant",
    description: "Optimize your social media presence and engagement",
    icon: Share2,
    color: "from-green-500 to-emerald-500",
    usage: "medium",
    href: "/dashboard/assistants/social-media-assistant",
    category: "Marketing",
  },
  {
    id: "artist-bio-generator",
    name: "Artist Bio Generator",
    description: "Craft compelling artist biographies and press materials",
    icon: FileText,
    color: "from-orange-500 to-red-500",
    usage: "medium",
    href: "/dashboard/assistants/artist-bio-generator",
    category: "Content",
  },
  {
    id: "press-release-generator",
    name: "Press Release Generator",
    description: "Create professional press releases for your music",
    icon: FileText,
    color: "from-teal-500 to-blue-500",
    usage: "low",
    href: "/dashboard/assistants/press-release-generator",
    category: "PR",
  },
  {
    id: "contract-wizard",
    name: "Contract Wizard",
    description: "Navigate music industry contracts with AI guidance",
    icon: Briefcase,
    color: "from-indigo-500 to-purple-500",
    usage: "medium",
    href: "/dashboard/contracts/wizard",
    category: "Legal",
  },
  {
    id: "booking-assistant",
    name: "Booking Assistant",
    description: "Find venues and manage performance bookings",
    icon: Calendar,
    color: "from-yellow-500 to-orange-500",
    usage: "medium",
    href: "/dashboard/assistants/booking-assistant",
    category: "Business",
  },
  {
    id: "royalty-calculator",
    name: "Royalty Calculator",
    description: "Calculate and track your music royalties and earnings",
    icon: DollarSign,
    color: "from-green-600 to-teal-500",
    usage: "high",
    href: "/dashboard/assistants/royalty-calculator",
    category: "Finance",
  },
  {
    id: "playlist-curator",
    name: "Playlist Curator",
    description: "Get your music on the right playlists",
    icon: Music,
    color: "from-purple-600 to-pink-500",
    usage: "medium",
    href: "/dashboard/assistants/playlist-curator",
    category: "Distribution",
  },
  {
    id: "fan-engagement",
    name: "Fan Engagement",
    description: "Build and maintain relationships with your fanbase",
    icon: Users,
    color: "from-red-500 to-pink-500",
    usage: "medium",
    href: "/dashboard/assistants/fan-engagement",
    category: "Community",
  },
  {
    id: "music-producer",
    name: "Music Producer AI",
    description: "Get production tips and arrangement suggestions",
    icon: Headphones,
    color: "from-slate-500 to-gray-600",
    usage: "high",
    href: "/dashboard/assistants/music-producer",
    category: "Production",
  },
  {
    id: "label-finder",
    name: "Label Finder",
    description: "Find record labels that match your music style",
    icon: Building,
    color: "from-blue-600 to-indigo-600",
    usage: "low",
    href: "/dashboard/assistants/label-finder",
    category: "Business",
  },
  {
    id: "tour-planner",
    name: "Tour Planner",
    description: "Plan and organize your music tours efficiently",
    icon: Target,
    color: "from-emerald-500 to-green-600",
    usage: "low",
    href: "/dashboard/assistants/tour-planner",
    category: "Touring",
  },
  {
    id: "brand-strategist",
    name: "Brand Strategist",
    description: "Develop your unique artist brand and identity",
    icon: Sparkles,
    color: "from-violet-500 to-purple-600",
    usage: "medium",
    href: "/dashboard/assistants/brand-strategist",
    category: "Branding",
  },
  {
    id: "collaboration-finder",
    name: "Collaboration Finder",
    description: "Connect with other artists for collaborations",
    icon: Users,
    color: "from-cyan-500 to-blue-500",
    usage: "medium",
    href: "/dashboard/assistants/collaboration-finder",
    category: "Networking",
  },
  {
    id: "music-educator",
    name: "Music Educator",
    description: "Learn music theory, production, and industry knowledge",
    icon: BookOpen,
    color: "from-amber-500 to-yellow-500",
    usage: "high",
    href: "/dashboard/assistants/music-educator",
    category: "Education",
  },
  {
    id: "analytics-advisor",
    name: "Analytics Advisor",
    description: "Understand your music performance and audience data",
    icon: TrendingUp,
    color: "from-rose-500 to-red-500",
    usage: "medium",
    href: "/dashboard/assistants/analytics-advisor",
    category: "Analytics",
  },
  {
    id: "vocal-coach",
    name: "Vocal Coach AI",
    description: "Improve your vocal technique and performance",
    icon: Mic,
    color: "from-pink-600 to-rose-600",
    usage: "high",
    href: "/dashboard/assistants/vocal-coach",
    category: "Performance",
  },
]

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(aiAgents.map((agent) => agent.category)))]

  const filteredAgents =
    selectedCategory === "All" ? aiAgents : aiAgents.filter((agent) => agent.category === selectedCategory)

  const getUsageBadgeColor = (usage: string) => {
    switch (usage) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUsageBadgeText = (usage: string) => {
    switch (usage) {
      case "high":
        return "Popular"
      case "medium":
        return "Active"
      case "low":
        return "New"
      default:
        return "Available"
    }
  }

  useEffect(() => {
    if (!isLoading) {
      if (user?.signedIn) {
        // Redirect authenticated users to the main dashboard
        router.replace("/dashboard")
      } else {
        // Redirect unauthenticated users to landing page
        router.replace("/landing")
      }
    }
  }, [user, isLoading, router])

  // Show loading state while determining redirect
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
            <p className="text-white">Loading ARMIE...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Welcome back, {user?.name || "Artist"}! 👋</h1>
            <p className="text-xl text-muted-foreground mt-2">
              You have {aiAgents.length} AI agents ready to help with your music career
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              {user?.plan?.toUpperCase() || "PRO"} Plan
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/assistants/armie-chat">
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat with ARMIE
            </Button>
          </Link>
          <Link href="/dashboard/contracts/wizard">
            <Button variant="outline">
              <Zap className="w-4 h-4 mr-2" />
              Contract Wizard
            </Button>
          </Link>
          <Link href="/dashboard/assistants/cover-art-generator">
            <Button variant="outline">
              <Camera className="w-4 h-4 mr-2" />
              Generate Cover Art
            </Button>
          </Link>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* AI Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAgents.map((agent) => {
          const IconComponent = agent.icon
          return (
            <Link key={agent.id} href={agent.href}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-purple-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${agent.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={`text-xs ${getUsageBadgeColor(agent.usage)}`}>
                      {getUsageBadgeText(agent.usage)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">{agent.name}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{agent.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {agent.category}
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Featured Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 border-purple-200 dark:border-purple-800">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100">🚀 New: AI Contract Wizard</h3>
              <p className="text-purple-700 dark:text-purple-300 max-w-2xl">
                Get personalized legal guidance for music industry contracts. Our AI helps you understand terms,
                negotiate better deals, and avoid common pitfalls.
              </p>
            </div>
            <Link href="/dashboard/contracts/wizard">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Sparkles className="w-5 h-5 mr-2" />
                Try Now
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{aiAgents.length}</p>
                <p className="text-sm text-muted-foreground">AI Assistants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">∞</p>
                <p className="text-sm text-muted-foreground">Possibilities</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Crown className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">PRO</p>
                <p className="text-sm text-muted-foreground">Your Plan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
