"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import {
  Bot,
  Send,
  Copy,
  Download,
  RefreshCw,
  ArrowLeft,
  Sparkles,
  Crown,
  Mic,
  Share2,
  FileText,
  BarChart3,
  Palette,
  Users,
  Calendar,
  Music,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const assistantData: Record<string, any> = {
  "lyric-generator": {
    name: "Lyric Generator",
    description: "Generate creative lyrics for any genre, mood, or theme",
    icon: Mic,
    color: "from-purple-500 to-pink-500",
    systemPrompt:
      "You are a creative lyric writing assistant. Help users generate original, creative lyrics for songs in any genre. Consider mood, theme, rhyme schemes, and song structure. Provide multiple options and explain your creative choices.",
  },
  "social-media-assistant": {
    name: "Social Media Assistant",
    description: "Create engaging social media content and strategies",
    icon: Share2,
    color: "from-blue-500 to-cyan-500",
    systemPrompt:
      "You are a social media marketing expert for musicians. Help create engaging content, captions, hashtags, and posting strategies. Focus on building authentic connections with fans and growing social media presence.",
  },
  "artist-bio-generator": {
    name: "Artist Bio Generator",
    description: "Craft compelling artist biographies and press materials",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    systemPrompt:
      "You are a professional music publicist and writer. Help artists create compelling biographies, press releases, and promotional materials that capture their unique story and appeal to industry professionals and fans.",
  },
  "analytics-advisor": {
    name: "Music Analytics Advisor",
    description: "Analyze streaming data and provide growth insights",
    icon: BarChart3,
    color: "from-orange-500 to-red-500",
    systemPrompt:
      "You are a music industry data analyst. Help artists understand their streaming data, identify growth opportunities, and develop data-driven strategies to expand their audience and increase engagement.",
  },
  "cover-art-creator": {
    name: "Cover Art Creator",
    description: "Design professional album covers and artwork",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    systemPrompt:
      "You are a visual design expert specializing in music artwork. Help artists conceptualize and describe cover art designs that reflect their music style, brand, and artistic vision. Provide detailed creative direction.",
  },
  "collaboration-finder": {
    name: "Collaboration Finder",
    description: "Find and connect with potential collaborators",
    icon: Users,
    color: "from-indigo-500 to-purple-500",
    systemPrompt:
      "You are a music industry networking expert. Help artists identify potential collaborators, understand collaboration dynamics, and develop strategies for successful musical partnerships and networking.",
  },
  "release-planner": {
    name: "Release Strategy Planner",
    description: "Plan optimal music release strategies",
    icon: Calendar,
    color: "from-teal-500 to-green-500",
    systemPrompt:
      "You are a music release strategist. Help artists plan their releases with optimal timing, platform selection, promotional strategies, and budget allocation to maximize impact and reach.",
  },
  "melody-composer": {
    name: "Melody Composer",
    description: "Generate original melodies and chord progressions",
    icon: Music,
    color: "from-violet-500 to-purple-500",
    systemPrompt:
      "You are a music composition expert. Help artists generate original melodies, chord progressions, and musical ideas. Explain music theory concepts and provide creative suggestions for song development.",
  },
}

export default function AssistantChatPage() {
  const params = useParams()
  const { user } = useAuth()
  const slug = params.slug as string
  const assistant = assistantData[slug]

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"
  const isPremiumAssistant = [
    "analytics-advisor",
    "cover-art-creator",
    "collaboration-finder",
    "release-planner",
    "melody-composer",
  ].includes(slug)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Add welcome message
    if (assistant && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: `Hello! I'm your ${assistant.name}. ${assistant.description}. How can I help you today?`,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [assistant, messages.length])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return
    if (isPremiumAssistant && !isPremiumUser) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: assistant.systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: input },
          ],
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  if (!assistant) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-12 text-center">
            <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Assistant Not Found</h3>
            <p className="text-muted-foreground mb-6">
              The AI assistant you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/dashboard/assistants">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Assistants
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isPremiumAssistant && !isPremiumUser) {
    return (
      <div className="p-6">
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-950/20 dark:to-orange-950/20 dark:border-yellow-800">
          <CardContent className="p-12 text-center">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Premium Assistant</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              This AI assistant requires a Pro subscription to access advanced features and unlimited usage.
            </p>
            <div className="space-y-4">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                <Sparkles className="w-5 h-5 mr-2" />
                Upgrade to Pro
              </Button>
              <Link href="/dashboard/assistants">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Assistants
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/assistants">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-r ${assistant.color} flex items-center justify-center`}
            >
              <assistant.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{assistant.name}</h1>
              <p className="text-sm text-muted-foreground">{assistant.description}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isPremiumAssistant && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          )}
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback
                    className={
                      message.role === "user"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : `bg-gradient-to-r ${assistant.color} text-white`
                    }
                  >
                    {message.role === "user" ? "U" : <assistant.icon className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 max-w-3xl ${message.role === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block p-4 rounded-lg ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-muted"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                    {message.role === "assistant" && (
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => copyMessage(message.content)}>
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={`bg-gradient-to-r ${assistant.color} text-white`}>
                    <assistant.icon className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="inline-block p-4 rounded-lg bg-muted">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask ${assistant.name} anything...`}
                className="flex-1 min-h-[60px] max-h-32 resize-none"
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} className="self-end">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
