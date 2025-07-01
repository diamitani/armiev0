"use client"

import { useState, useEffect, useRef } from "react"
import { useChat } from "ai/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/components/auth-provider"
import {
  Bot,
  Music,
  FileText,
  Users,
  Camera,
  MessageSquare,
  Wand2,
  ArrowRight,
  Clock,
  Star,
  Send,
  Loader2,
  Plus,
  Mic,
  Paperclip,
  PenTool,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function DashboardPage() {
  const { user } = useAuth()
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages } = useChat({
    api: "/api/chat",
    body: {
      assistantType: "armie",
    },
    onError: (error) => {
      console.error("Chat error:", error)
      toast.error("Failed to send message. Please try again.")
    },
  })

  useEffect(() => {
    // Initialize with welcome message if no messages
    if (messages.length === 0) {
      const welcomeContent = `🎵 Welcome back, ${user?.name || "Artist"}! I'm ARMIE (Artist Resource Management & Innovation Engine) — your comprehensive AI-powered career development assistant.

I'm here to help you build a sustainable, scalable music career with:

**🚀 Artist Development & Strategy**
• Personalized career roadmaps and goal setting
• Business formation (LLC, EIN registration, bank accounts)
• Intellectual property protection and copyright guidance

**💰 Financial Management & Revenue**
• Budget planning and expense tracking
• Revenue forecasting and monetization strategies
• Grant opportunities and crowdfunding guidance

**📈 Distribution & Marketing**
• DSP optimization and metadata management
• Promotional campaign development
• Social media and playlist strategies

**🤝 Networking & Partnerships**
• Industry relationship building
• Event networking and collaboration opportunities
• Strategic partnership development

**⚡ Business Automation & Tech**
• Workflow automation and SaaS integration
• Blockchain and NFT guidance
• Performance analytics and reporting

What aspect of your music career would you like to focus on today? I'm here to provide actionable, data-driven insights to help you succeed! 🎯`

      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: welcomeContent,
          createdAt: new Date(),
        },
      ])
    }
  }, [user, setMessages])

  useEffect(() => {
    if (isExpanded) {
      scrollToBottom()
    }
  }, [messages, isExpanded])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const recentActivity = [
    {
      id: 1,
      type: "contract",
      title: "Artist Management Agreement created",
      time: "2 hours ago",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "cover-art",
      title: "Album cover generated for 'Summer Vibes'",
      time: "5 hours ago",
      icon: Camera,
      color: "text-pink-600",
    },
    {
      id: 3,
      type: "chat",
      title: "ARMIE consultation about royalty splits",
      time: "1 day ago",
      icon: Bot,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "social",
      title: "Social media posts scheduled",
      time: "2 days ago",
      icon: Users,
      color: "text-green-600",
    },
  ]

  const featuredTools = [
    {
      id: "lyric-generator",
      name: "Lyric Generator",
      description: "AI-powered songwriting assistant",
      icon: PenTool,
      color: "from-purple-500 to-indigo-500",
      href: "/dashboard/assistants/lyric-generator",
      featured: true,
    },
    {
      id: "contract-wizard",
      name: "Contract Wizard",
      description: "AI-powered contract creation and guidance",
      icon: Wand2,
      color: "from-blue-500 to-cyan-500",
      href: "/dashboard/contracts/wizard",
      featured: true,
    },
    {
      id: "cover-art",
      name: "Cover Art Generator",
      description: "Create stunning album artwork",
      icon: Camera,
      color: "from-pink-500 to-rose-500",
      href: "/dashboard/assistants/cover-art-generator",
      featured: true,
    },
    {
      id: "social-media",
      name: "Social Media Assistant",
      description: "Optimize your social media presence",
      icon: Share2,
      color: "from-green-500 to-emerald-500",
      href: "/dashboard/assistants/social-media-assistant",
      featured: true,
    },
  ]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name || "Artist"}! 👋</h1>
            <p className="text-muted-foreground">Let's continue building your music career together</p>
          </div>
        </div>
      </div>

      {/* ARMIE Chat Assistant */}
      <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-indigo-950/20 border-purple-200 dark:border-purple-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-1">
                  Chat with ARMIE
                </CardTitle>
                <CardDescription className="text-purple-700 dark:text-purple-300">
                  Your comprehensive AI music career development assistant - from strategy to execution
                </CardDescription>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-purple-600 dark:text-purple-400">Online Now</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-purple-600 dark:text-purple-400">Expert Level</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-white/50 hover:bg-white/70"
              >
                {isExpanded ? "Minimize" : "Expand"}
              </Button>
              <Link href="/dashboard/assistants/armie-chat">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Full Chat
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <div className={`transition-all duration-300 ${isExpanded ? "h-96" : "h-48"}`}>
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      {message.role === "user" ? (
                        <>
                          <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm">
                            {user?.name
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase() || "U"}
                          </AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className={`flex-1 max-w-[85%] ${message.role === "user" ? "text-right" : ""}`}>
                      <div
                        className={`rounded-2xl px-4 py-3 shadow-sm ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white ml-auto"
                            : "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                      </div>
                      <div className="text-xs text-purple-600/70 dark:text-purple-400/70 mt-1 px-1">
                        {message.createdAt ? formatTime(message.createdAt) : formatTime(new Date())}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                        <span className="text-sm text-purple-600 dark:text-purple-400">ARMIE is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 p-2">
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/50" disabled>
                <Paperclip className="w-4 h-4 text-purple-600" />
              </Button>
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask ARMIE about your music career strategy, contracts, marketing, or business development..."
                disabled={isLoading}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-purple-600/50"
              />
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/50" disabled>
                <Mic className="w-4 h-4 text-purple-600" />
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="sm"
                className="h-8 w-8 p-0 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            {error && <p className="text-sm text-red-500 px-2">Error: {error.message}</p>}
            <div className="flex items-center justify-between px-2">
              <p className="text-xs text-purple-600/70 dark:text-purple-400/70">
                ARMIE is your comprehensive music career development assistant with industry expertise
              </p>
              <div className="flex items-center space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs text-purple-600/70 hover:text-purple-600"
                  onClick={() => {
                    setMessages([])
                    setMessages([
                      {
                        id: "welcome-new",
                        role: "assistant",
                        content: `🎵 Hi ${user?.name || "there"}! I'm ARMIE, your AI music career development assistant. What would you like to work on today?`,
                        createdAt: new Date(),
                      },
                    ])
                  }}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  New Chat
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Tools */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Tools</h2>
            <Link href="/dashboard/assistants">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredTools.map((tool) => {
              const IconComponent = tool.icon
              return (
                <Link key={tool.id} href={tool.href}>
                  <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        {tool.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="text-sm">{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Click to open</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to get you started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link href="/dashboard/contracts/wizard">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Create New Contract
                  </Button>
                </Link>
                <Link href="/dashboard/assistants/cover-art-generator">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Camera className="w-4 h-4 mr-2" />
                    Generate Cover Art
                  </Button>
                </Link>
                <Link href="/dashboard/assistants/lyric-generator">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Music className="w-4 h-4 mr-2" />
                    Write Song Lyrics
                  </Button>
                </Link>
                <Link href="/dashboard/assistants/social-media-assistant">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Plan Social Media
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Your latest interactions with ARMIE</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => {
                const IconComponent = activity.icon
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <IconComponent className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>This Week</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Consultations</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Content Created</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Contracts Reviewed</span>
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
