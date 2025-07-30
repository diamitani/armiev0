"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Send, ArrowLeft, Copy, Heart, Share2, Music, Disc3, User, Mic, Paperclip, RotateCcw } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { toast } from "sonner"
import Link from "next/link"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface AssistantConfig {
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  prompts: string[]
}

const assistantConfigs: Record<string, AssistantConfig> = {
  "lyric-generator": {
    name: "Lyric Generator",
    description: "AI-powered songwriting assistant for creating compelling lyrics",
    icon: Music,
    color: "from-purple-500 to-pink-500",
    prompts: [
      "Write a chorus about overcoming challenges",
      "Help me with a verse about summer love",
      "Create lyrics for a country song about hometown",
      "Write a bridge that builds emotional intensity",
      "Help me finish this song about chasing dreams",
    ],
  },
  "social-media-assistant": {
    name: "Social Media Assistant",
    description: "Expert guidance for building your online presence and engaging fans",
    icon: Share2,
    color: "from-blue-500 to-cyan-500",
    prompts: [
      "Create a TikTok content strategy for my new single",
      "Write Instagram captions for my studio sessions",
      "Help me plan a social media campaign",
      "What hashtags should I use for my genre?",
      "How can I increase engagement on my posts?",
    ],
  },
  "artist-bio-generator": {
    name: "Artist Bio Generator",
    description: "Professional bio writing for press kits, websites, and social media",
    icon: User,
    color: "from-green-500 to-emerald-500",
    prompts: [
      "Write a professional bio for my press kit",
      "Create a short bio for my social media",
      "Help me highlight my musical achievements",
      "Write a bio that captures my unique style",
      "Create a bio for my website about page",
    ],
  },
  "cover-art-generator": {
    name: "Cover Art Generator",
    description: "Create stunning album artwork and visual concepts",
    icon: Disc3,
    color: "from-orange-500 to-red-500",
    prompts: [
      "Design concept for a moody R&B album cover",
      "Create artwork for an upbeat pop single",
      "Design a minimalist cover for my EP",
      "Generate ideas for a vintage-style album",
      "Create cover art that matches my brand",
    ],
  },
}

export default function AssistantPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const slug = params.slug as string
  const assistant = assistantConfigs[slug]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin")
      return
    }
  }, [user, router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Add welcome message when component mounts
    if (messages.length === 0 && assistant && user) {
      const welcomeMessage: Message = {
        id: "welcome",
        content: `Hey ${user.artist_name || user.name}! 👋 I'm ARMIE's ${assistant.name}, and I'm excited to help you today!

${assistant.description}

**Ready to get started?** Here are some things I can help you with:

${assistant.prompts.map((prompt, index) => `• ${prompt}`).join("\n")}

What would you like to work on first? Just describe what you need, and I'll help you create something amazing! 🚀`,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [assistant, user, messages.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "",
      role: "assistant",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          user: user,
          assistantType: slug,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)
              if (data === "[DONE]") {
                setIsLoading(false)
                return
              }

              try {
                const parsed = JSON.parse(data)
                if (parsed.content) {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessage.id ? { ...msg, content: msg.content + parsed.content } : msg,
                    ),
                  )
                }
              } catch (e) {
                // Ignore parsing errors for streaming
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id
            ? {
                ...msg,
                content:
                  "I'm having trouble connecting right now. Please try again in a moment, or check that you have a valid OpenAI API key configured! 🔄",
              }
            : msg,
        ),
      )
      toast.error("Connection error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePromptClick = (prompt: string) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast.success("Message copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy message")
    }
  }

  const likeMessage = () => {
    toast.success("Thanks for the feedback!")
  }

  const shareMessage = async (content: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ARMIE ${assistant?.name} Response`,
          text: content,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      copyMessage(content)
    }
  }

  const clearChat = () => {
    setMessages([])
    toast.success("Chat cleared")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!assistant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Assistant Not Found</h1>
            <p className="text-slate-600 mb-6">The assistant you're looking for doesn't exist.</p>
            <Link href="/dashboard">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-slate-600 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className={`p-2 rounded-xl bg-gradient-to-r ${assistant.color} flex items-center justify-center`}>
              <assistant.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{assistant.name}</h1>
              <p className="text-sm text-slate-600 hidden sm:block">{assistant.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex">
              AI Assistant
            </Badge>
            <Button variant="ghost" size="sm" onClick={clearChat}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-4xl">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl h-[calc(100vh-8rem)]">
          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4 sm:p-6" ref={scrollAreaRef}>
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 sm:gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 border border-purple-200 flex-shrink-0">
                        <AvatarImage src="/images/armie-logo-icon.png" alt="ARMIE" />
                        <AvatarFallback className="bg-purple-500 text-white text-xs">
                          <assistant.icon className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className={`max-w-[85%] sm:max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-slate-700">
                          {message.role === "user" ? user.artist_name || user.name : assistant.name}
                        </span>
                        <span className="text-xs text-slate-500">{formatTime(message.timestamp)}</span>
                      </div>

                      <div
                        className={`p-4 rounded-2xl ${
                          message.role === "user"
                            ? `bg-gradient-to-r ${assistant.color} text-white`
                            : "bg-slate-100 text-slate-900"
                        }`}
                      >
                        <div className="prose prose-sm max-w-none">
                          {message.content.split("\n").map((line, index) => {
                            if (line.startsWith("**") && line.endsWith("**")) {
                              return (
                                <p key={index} className="font-semibold mb-2">
                                  {line.slice(2, -2)}
                                </p>
                              )
                            }
                            if (line.startsWith("• ")) {
                              return (
                                <li key={index} className="ml-4 mb-1 list-disc">
                                  {line.slice(2)}
                                </li>
                              )
                            }
                            if (line.trim() === "") {
                              return <br key={index} />
                            }
                            return (
                              <p key={index} className="mb-2 leading-relaxed">
                                {line}
                              </p>
                            )
                          })}
                        </div>

                        {message.role === "assistant" && message.content && (
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyMessage(message.content)}
                              className="h-8 px-2"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={likeMessage} className="h-8 px-2">
                              <Heart className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => shareMessage(message.content)}
                              className="h-8 px-2"
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 border border-blue-200 flex-shrink-0">
                        <AvatarFallback className="bg-blue-500 text-white text-xs">
                          {(user.artist_name || user.name)?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 sm:gap-4 justify-start">
                    <Avatar className="h-8 w-8 border border-purple-200 flex-shrink-0">
                      <AvatarImage src="/images/armie-logo-icon.png" alt="ARMIE" />
                      <AvatarFallback className="bg-purple-500 text-white text-xs">
                        <assistant.icon className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-slate-100 rounded-2xl p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                        <span className="text-sm text-slate-600">{assistant.name} is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Suggested Prompts */}
            {messages.length <= 1 && (
              <div className="px-4 sm:px-6 pb-4">
                <Separator className="mb-4" />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-700">Try asking:</h3>
                  <div className="flex flex-wrap gap-2">
                    {assistant.prompts.slice(0, 3).map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePromptClick(prompt)}
                        className="text-xs bg-white/50 hover:bg-white/80"
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Input Form */}
            <div className="p-4 sm:p-6 border-t bg-slate-50/50">
              <form onSubmit={handleSubmit}>
                <div className="flex gap-2 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600 flex-shrink-0"
                    disabled
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>

                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Ask ${assistant.name} anything...`}
                    className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400"
                    disabled={isLoading}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600 flex-shrink-0"
                    disabled
                  >
                    <Mic className="h-4 w-4" />
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    size="sm"
                    className={`h-8 w-8 p-0 bg-gradient-to-r ${assistant.color} hover:opacity-90 flex-shrink-0`}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
