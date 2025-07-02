"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/components/auth-provider"
import { useChat } from "ai/react"
import {
  Send,
  User,
  Sparkles,
  Music,
  TrendingUp,
  Users,
  FileText,
  Copy,
  Download,
  RefreshCw,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

export default function DashboardPage() {
  const { user } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat",
    body: {
      assistantType: "armie",
    },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: `Hey there! 👋 I'm ARMIE, your AI-powered artist development assistant. I'm here to help you build a sustainable music career with strategic insights, industry expertise, and actionable guidance.

What can I help you with today? I can assist with:
• **Artist Development** - Career roadmaps, business formation, brand strategy
• **Music Distribution** - DSP setup, metadata optimization, release planning  
• **Marketing & Promotion** - Social media strategies, playlist pitching, fan engagement
• **Financial Management** - Budgeting, revenue forecasting, grant opportunities
• **Industry Navigation** - Contracts, networking, partnership strategies

What's on your mind? 🎵`,
      },
    ],
    onError: (error) => {
      console.error("Chat error:", error)
      toast.error("Something went wrong. Let me try that again!")
    },
    onFinish: () => {
      setIsTyping(false)
    },
  })

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
    return () => clearTimeout(timer)
  }, [messages])

  // Handle form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setIsTyping(true)
    handleSubmit(e)
  }

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e as any)
    }
  }

  // Copy message to clipboard
  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast.success("Copied to clipboard! 📋")
    } catch (error) {
      toast.error("Couldn't copy that")
    }
  }

  // Clear chat and reset
  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Hey there! 👋 I'm ARMIE, your AI-powered artist development assistant. I'm here to help you build a sustainable music career with strategic insights, industry expertise, and actionable guidance.

What can I help you with today? I can assist with:
• **Artist Development** - Career roadmaps, business formation, brand strategy
• **Music Distribution** - DSP setup, metadata optimization, release planning  
• **Marketing & Promotion** - Social media strategies, playlist pitching, fan engagement
• **Financial Management** - Budgeting, revenue forecasting, grant opportunities
• **Industry Navigation** - Contracts, networking, partnership strategies

What's on your mind? 🎵`,
      },
    ])
    toast.success("Fresh start! Let's chat 🎉")
  }

  // Quick action prompts
  const quickActions = [
    {
      icon: Music,
      label: "Release Strategy",
      prompt: "Help me plan a release strategy for my new single",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      label: "Marketing Plan",
      prompt: "Create a marketing plan to grow my fanbase",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      label: "Social Media",
      prompt: "Give me social media content ideas for this week",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FileText,
      label: "Business Setup",
      prompt: "Walk me through setting up my music business (LLC, EIN, etc.)",
      color: "from-orange-500 to-red-500",
    },
  ]

  const handleQuickAction = (prompt: string) => {
    if (isLoading) return
    handleInputChange({ target: { value: prompt } } as any)
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as any)
      setIsTyping(true)
    }, 100)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-900">
      {/* Header */}
      <div className="flex-shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image src="/images/armie-logo.png" alt="ARMIE" width={40} height={40} className="rounded-lg" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
                  Chat with ARMIE
                </h1>
                <p className="text-sm text-muted-foreground">Your AI Artist Development Assistant</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Online
            </Badge>
            <Button variant="outline" size="sm" onClick={clearChat} disabled={isLoading}>
              <RefreshCw className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 p-4 lg:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Welcome Card - Only show when no user messages */}
            {messages.length <= 1 && (
              <Card className="border-2 border-dashed border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <Image src="/images/armie-logo.png" alt="ARMIE" width={60} height={60} className="rounded-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get started with these common requests, or ask me anything!
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto p-4 text-left justify-start bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-[1.02]"
                          onClick={() => handleQuickAction(action.prompt)}
                          disabled={isLoading}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mr-3 flex-shrink-0`}
                          >
                            <action.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-sm">{action.label}</div>
                            <div className="text-xs text-muted-foreground truncate">{action.prompt}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Messages */}
            {messages.map((message, index) => (
              <div
                key={message.id || index}
                className={`flex items-start space-x-4 ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                } animate-in slide-in-from-bottom-2 duration-300`}
              >
                <Avatar className="w-10 h-10 flex-shrink-0">
                  {message.role === "user" ? (
                    <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  ) : (
                    <AvatarImage src="/images/armie-logo.png" alt="ARMIE" />
                  )}
                </Avatar>
                <div className={`flex-1 min-w-0 ${message.role === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block p-4 rounded-2xl max-w-[85%] ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                  </div>
                  {message.role === "assistant" && (
                    <div className="flex items-center justify-start mt-2 space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyMessage(message.content)}
                        className="h-8 px-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {(isLoading || isTyping) && (
              <div className="flex items-start space-x-4 animate-in slide-in-from-bottom-2 duration-300">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/images/armie-logo.png" alt="ARMIE" />
                </Avatar>
                <div className="flex-1">
                  <div className="inline-block p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">ARMIE is thinking...</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="p-4 lg:p-6 max-w-4xl mx-auto">
            <form onSubmit={onSubmit} className="space-y-3">
              <div className="flex space-x-3">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask ARMIE anything about your music career..."
                  className="flex-1 min-h-[60px] max-h-32 resize-none bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                  disabled={isLoading}
                  rows={1}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="self-end h-[60px] px-6 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </Button>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Press Enter to send • Shift+Enter for new line</span>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Powered by AI</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
