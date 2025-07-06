"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Download, Share2, RotateCcw, Sparkles, Music, LogOut, Menu, X, Mic, Paperclip } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
    // Add personalized welcome message when component mounts
    if (messages.length === 0 && user) {
      const welcomeMessage: Message = {
        id: "welcome",
        content: `Hey ${user.artist_name || user.name}! 👋 Welcome to ARMIE!

I'm your AI music industry assistant, and I'm genuinely excited to help you build an amazing career. Whether you're just starting out or looking to level up, I've got your back.

**What's on your mind today?** I can help with:

🎯 **Quick wins you can implement today:**
• Social media strategy that actually converts
• Revenue streams you might be missing
• Contract red flags to watch out for
• Branding tweaks that make a big difference

🚀 **Bigger picture stuff:**
• Career planning and goal setting
• Building your team (manager, agent, etc.)
• Industry networking strategies
• Long-term business development

Just tell me what you're working on or what's challenging you right now. I love diving deep into specific situations!

What would you like to tackle first? 🎵`,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [user, messages.length])

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
            ? { ...msg, content: "Sorry, I'm having trouble connecting right now. Please try again in a moment! 🔄" }
            : msg,
        ),
      )
      toast.error("Connection error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const exportChat = () => {
    const chatText = messages.map((msg) => `${msg.role === "user" ? "You" : "ARMIE"}: ${msg.content}\n\n`).join("")

    const blob = new Blob([chatText], { type: "text/plain" })
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
    const shareText = `Check out my conversation with ARMIE, my AI music career assistant! 🎵`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "ARMIE Chat Session",
          text: shareText,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`)
        toast.success("Chat link copied to clipboard!")
      } catch (error) {
        console.error("Error copying to clipboard:", error)
        toast.error("Unable to copy link")
      }
    }
  }

  const startNewChat = () => {
    setMessages([])
    setInput("")
    toast.success("Started new chat session")
  }

  const handleSignOut = async () => {
    await signOut()
    toast.success("Signed out successfully")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-purple-400">
              <AvatarImage src="/images/armie-logo-icon.png" alt="ARMIE" />
              <AvatarFallback className="bg-purple-600 text-white font-bold text-xs sm:text-sm">
                <Music className="h-4 w-4 sm:h-5 sm:w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 sm:h-4 sm:w-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-1 sm:gap-2 truncate">
              ARMIE <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 flex-shrink-0" />
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 truncate">AI Music Career Assistant</p>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2">
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
            {user.subscription_tier}
          </Badge>
          <Button variant="ghost" size="sm" onClick={exportChat} className="text-white hover:bg-white/10">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={shareChat} className="text-white hover:bg-white/10">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={startNewChat} className="text-white hover:bg-white/10">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-white hover:bg-white/10">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="sm:hidden text-white hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-black/30 backdrop-blur-sm border-b border-white/10 p-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
              {user.subscription_tier}
            </Badge>
            <Button variant="ghost" size="sm" onClick={exportChat} className="text-white hover:bg-white/10 text-xs">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={shareChat} className="text-white hover:bg-white/10 text-xs">
              <Share2 className="h-3 w-3 mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="sm" onClick={startNewChat} className="text-white hover:bg-white/10 text-xs">
              <RotateCcw className="h-3 w-3 mr-1" />
              New
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-white hover:bg-white/10 text-xs">
              <LogOut className="h-3 w-3 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-2 sm:p-4" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 sm:gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border border-purple-400 flex-shrink-0 mt-1">
                  <AvatarImage src="/images/armie-logo-icon.png" alt="ARMIE" />
                  <AvatarFallback className="bg-purple-600 text-white text-xs font-bold">
                    <Music className="h-3 w-3 sm:h-4 sm:w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={`max-w-[85%] sm:max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">
                    {message.role === "user" ? user.artist_name || user.name : "ARMIE"}
                  </span>
                  <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                </div>

                <Card
                  className={`p-3 sm:p-4 ${
                    message.role === "user"
                      ? "bg-purple-600 text-white border-purple-500"
                      : "bg-white/10 backdrop-blur-sm text-white border-white/20"
                  }`}
                >
                  <div className="prose prose-invert max-w-none text-sm sm:text-base">
                    {message.content.split("\n").map((line, index) => {
                      if (line.startsWith("# ")) {
                        return (
                          <h1 key={index} className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">
                            {line.slice(2)}
                          </h1>
                        )
                      }
                      if (line.startsWith("## ")) {
                        return (
                          <h2
                            key={index}
                            className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-purple-200 mt-3 sm:mt-4"
                          >
                            {line.slice(3)}
                          </h2>
                        )
                      }
                      if (line.startsWith("### ")) {
                        return (
                          <h3
                            key={index}
                            className="text-sm sm:text-base font-medium mb-1 sm:mb-2 text-blue-200 mt-2 sm:mt-3"
                          >
                            {line.slice(4)}
                          </h3>
                        )
                      }
                      if (line.startsWith("• ")) {
                        return (
                          <li key={index} className="ml-3 sm:ml-4 mb-1 text-gray-200 list-none">
                            {line}
                          </li>
                        )
                      }
                      if (line.trim() === "") {
                        return <br key={index} />
                      }
                      return (
                        <p key={index} className="mb-1 sm:mb-2 text-gray-100 leading-relaxed">
                          {line}
                        </p>
                      )
                    })}
                  </div>
                </Card>
              </div>

              {message.role === "user" && (
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border border-blue-400 flex-shrink-0 mt-1">
                  <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                    {(user.artist_name || user.name)?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 sm:gap-4 justify-start">
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border border-purple-400 flex-shrink-0 mt-1">
                <AvatarImage src="/images/armie-logo-icon.png" alt="ARMIE" />
                <AvatarFallback className="bg-purple-600 text-white text-xs font-bold">
                  <Music className="h-3 w-3 sm:h-4 sm:w-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-white/10 backdrop-blur-sm text-white border-white/20 p-3 sm:p-4">
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
                  <span className="text-xs sm:text-sm text-gray-300">ARMIE is thinking...</span>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Form */}
      <div className="p-3 sm:p-4 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-2 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm p-2 sm:p-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 sm:h-10 sm:w-10 p-0 text-gray-400 hover:text-white flex-shrink-0"
              disabled
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ARMIE about contracts, marketing, revenue, branding, or anything music industry related..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-white text-sm sm:text-base min-h-[2rem] sm:min-h-[2.5rem]"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e as any)
                }
              }}
            />

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 sm:h-10 sm:w-10 p-0 text-gray-400 hover:text-white flex-shrink-0"
              disabled
            >
              <Mic className="h-4 w-4" />
            </Button>

            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="sm"
              className="h-8 w-8 sm:h-10 sm:w-10 p-0 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between px-2 sm:px-3 mt-2">
            <p className="text-xs text-gray-400 truncate">ARMIE has comprehensive music industry knowledge</p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-gray-400 hover:text-white hidden sm:inline-flex"
                onClick={() => inputRef.current?.focus()}
              >
                Press Enter to send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
