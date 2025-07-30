"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, Loader2, Plus, Download, Share2, Settings, Mic, Paperclip, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}

export default function ArmieChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with welcome message
    const welcomeContent = `🎵 Welcome to your dedicated ARMIE chat session! I'm your comprehensive AI music career development assistant.

**What I can help you with today:**

🚀 **Artist Development & Strategy**
• Career roadmaps and goal setting
• Business formation and legal structure
• Brand development and positioning

💰 **Financial Management**
• Budget planning and revenue forecasting
• Monetization strategies and income streams
• Grant opportunities and funding guidance

📈 **Distribution & Marketing**
• DSP optimization and playlist strategies
• Social media marketing and content planning
• Release campaigns and promotional tactics

🤝 **Industry Networking**
• Relationship building strategies
• Event networking and collaboration opportunities
• Partnership development and management

⚡ **Business Automation**
• Workflow optimization and SaaS tools
• Analytics and performance tracking
• Blockchain and NFT opportunities

What specific aspect of your music career would you like to focus on? I'm here to provide detailed, actionable guidance! 🎯`

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: welcomeContent,
        createdAt: new Date(),
      },
    ])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      createdAt: new Date(),
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
          message: userMessage.content, // Corrected: Send content directly as 'message'
          // Removed: assistantType as it's not used by this API
        }),
      })

      if (!response.ok) {
        // Parse error response from server if available
        const errorData = await response.json()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || "Unknown error"}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("No response body")
      }

      let assistantContent = ""
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
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
                assistantContent += parsed.content
                setMessages((prev) =>
                  prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: assistantContent } : msg)),
                )
              }
            } catch (e) {
              // Ignore parsing errors for streaming
              console.warn("Failed to parse streaming chunk:", e, "Chunk:", data)
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      toast.error(
        `Failed to send message: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
      )

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        createdAt: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const exportChat = () => {
    const chatContent = messages.map((msg) => `${msg.role === "user" ? "You" : "ARMIE"}: ${msg.content}`).join("\n\n")

    const blob = new Blob([chatContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `armie-chat-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Chat exported successfully!")
  }

  const shareChat = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ARMIE Chat Session",
          text: "Check out my conversation with ARMIE, my AI music career assistant!",
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Chat link copied to clipboard!")
    }
  }

  const startNewChat = () => {
    setMessages([
      {
        id: "welcome-new",
        role: "assistant",
        content: `🎵 Hi there! I'm ARMIE, ready to help with your music career. What would you like to work on?`,
        createdAt: new Date(),
      },
    ])
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-purple-900 dark:text-purple-100">ARMIE Assistant</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-purple-600 dark:text-purple-400">Online & Ready</span>
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Expert
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={exportChat} disabled={messages.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={shareChat}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-4 ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar className="w-10 h-10 flex-shrink-0">
                  {message.role === "user" ? (
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">U</AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium">{message.role === "user" ? "You" : "ARMIE"}</span>
                    <span className="text-xs text-muted-foreground">{formatTime(message.createdAt)}</span>
                  </div>
                  <div
                    className={`rounded-2xl px-6 py-4 shadow-sm ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white ml-auto"
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                    <span className="text-sm text-purple-600 dark:text-purple-400">
                      ARMIE is analyzing and preparing your response...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Chat Input */}
      <div className="border-t bg-white dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-end space-x-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-3">
              <Button type="button" variant="ghost" size="sm" className="h-10 w-10 p-0" disabled>
                <Paperclip className="w-5 h-5 text-gray-500" />
              </Button>
              <div className="flex-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask ARMIE about your music career strategy, business development, marketing, contracts, or any industry question..."
                  disabled={isLoading}
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 text-base min-h-[2.5rem] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e as any)
                    }
                  }}
                />
              </div>
              <Button type="button" variant="ghost" size="sm" className="h-10 w-10 p-0" disabled>
                <Mic className="w-5 h-5 text-gray-500" />
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="sm"
                className="h-10 w-10 p-0 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
            <div className="flex items-center justify-between px-3">
              <p className="text-xs text-gray-500">
                ARMIE has comprehensive knowledge of the music industry, business development, and career strategy
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-gray-500 hover:text-gray-700"
                  onClick={startNewChat}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  New Chat
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
