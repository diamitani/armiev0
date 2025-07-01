"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import { useChat } from "ai/react"
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
  MessageSquare,
  Loader2,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { toast } from "sonner"

interface AssistantData {
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  assistantType: string
  welcomeMessage: string
}

const assistantData: Record<string, AssistantData> = {
  "lyric-generator": {
    name: "Lyric Generator",
    description: "Generate creative lyrics for any genre, mood, or theme",
    icon: Mic,
    color: "from-purple-500 to-pink-500",
    assistantType: "lyric-generator",
    welcomeMessage: "Hey! Ready to write some fire lyrics? 🎤 What's the vibe you're going for?",
  },
  "social-media-assistant": {
    name: "Social Media Assistant",
    description: "Create engaging social media content and strategies",
    icon: Share2,
    color: "from-blue-500 to-cyan-500",
    assistantType: "social-media-assistant",
    welcomeMessage: "What's up! 📱 Let's get your socials poppin'. What are you working on?",
  },
  "artist-bio-generator": {
    name: "Artist Bio Generator",
    description: "Craft compelling artist biographies and press materials",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    assistantType: "artist-bio-generator",
    welcomeMessage: "Hey there! ✍️ Let's craft your story. What makes your music journey unique?",
  },
  "analytics-advisor": {
    name: "Music Analytics Advisor",
    description: "Analyze streaming data and provide growth insights",
    icon: BarChart3,
    color: "from-orange-500 to-red-500",
    assistantType: "marketing",
    welcomeMessage: "Hey! 📊 Ready to dive into your numbers? What metrics are you curious about?",
  },
  "cover-art-creator": {
    name: "Cover Art Creator",
    description: "Design professional album covers and artwork",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    assistantType: "general",
    welcomeMessage: "What's good! 🎨 Let's brainstorm some sick cover art. What's your music's vibe?",
  },
  "collaboration-finder": {
    name: "Collaboration Finder",
    description: "Find and connect with potential collaborators",
    icon: Users,
    color: "from-indigo-500 to-purple-500",
    assistantType: "marketing",
    welcomeMessage: "Yo! 🤝 Looking to connect with other artists? What kind of collab are you thinking?",
  },
  "release-planner": {
    name: "Release Strategy Planner",
    description: "Plan optimal music release strategies",
    icon: Calendar,
    color: "from-teal-500 to-green-500",
    assistantType: "marketing",
    welcomeMessage: "Hey! 🚀 Got something dropping soon? Let's plan the perfect release strategy.",
  },
  "melody-composer": {
    name: "Melody Composer",
    description: "Generate original melodies and chord progressions",
    icon: Music,
    color: "from-violet-500 to-purple-500",
    assistantType: "general",
    welcomeMessage: "What's up! 🎵 Ready to cook up some melodies? What genre are we vibing with?",
  },
}

const suggestedPrompts: Record<string, string[]> = {
  "lyric-generator": [
    "Help me with a hook about chasing dreams",
    "I need a verse about heartbreak",
    "What rhymes with 'fire'?",
    "Write a bridge for my love song",
  ],
  "social-media-assistant": [
    "Caption ideas for my studio pic",
    "TikTok trends for musicians",
    "How to announce my new single?",
    "Instagram story ideas",
  ],
  "artist-bio-generator": [
    "Make my bio sound more interesting",
    "Help with my press kit",
    "What should I highlight about my story?",
    "EPK content ideas",
  ],
  "analytics-advisor": [
    "My streams dropped, what's up?",
    "Which platform should I focus on?",
    "How to read my Spotify data?",
    "Best times to release music",
  ],
  "cover-art-creator": [
    "Ideas for a hip-hop cover",
    "What colors work for sad songs?",
    "Minimalist album art concepts",
    "Typography for my EP",
  ],
  "collaboration-finder": [
    "Find producers in my city",
    "How to reach out to artists?",
    "Collab ideas for indie rock",
    "Building my network",
  ],
  "release-planner": [
    "When should I drop my single?",
    "Pre-release checklist",
    "How long before announcing?",
    "Release day strategy",
  ],
  "melody-composer": [
    "Chord progression for pop song",
    "Melody ideas for my lyrics",
    "What key works for my voice?",
    "Hook melody suggestions",
  ],
  default: [
    "Quick contract question",
    "Marketing tip for new artists",
    "How to price my music?",
    "Social media strategy help",
  ],
}

export default function AssistantChatPage() {
  const params = useParams()
  const { user } = useAuth()
  const slug = params.slug as string
  const assistant = assistantData[slug]
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"
  const isPremiumAssistant = [
    "analytics-advisor",
    "cover-art-creator",
    "collaboration-finder",
    "release-planner",
    "melody-composer",
  ].includes(slug)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat",
    body: {
      assistantType: assistant?.assistantType || "general",
    },
    initialMessages: assistant
      ? [
          {
            id: "welcome",
            role: "assistant",
            content: assistant.welcomeMessage,
          },
        ]
      : [],
    onError: (error) => {
      console.error("Chat error:", error)
      toast.error("Oops! Something went wrong. Try again?")
    },
  })

  // Smooth scroll to bottom with animation
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior,
        block: "end",
        inline: "nearest",
      })
    }
  }

  // Auto-scroll when new messages arrive
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100)
    return () => clearTimeout(timer)
  }, [messages])

  // Handle form submission with premium check
  const onSubmit = (e: React.FormEvent) => {
    if (isPremiumAssistant && !isPremiumUser) {
      e.preventDefault()
      toast.error("This assistant needs Pro - want to upgrade?")
      return
    }
    handleSubmit(e)
  }

  // Handle suggested prompts
  const handleSuggestedPrompt = (prompt: string) => {
    if (isPremiumAssistant && !isPremiumUser) {
      toast.error("This assistant needs Pro - want to upgrade?")
      return
    }
    handleInputChange({ target: { value: prompt } } as any)
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as any)
    }, 100)
  }

  // Copy message to clipboard
  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast.success("Copied! 📋")
    } catch (error) {
      toast.error("Couldn't copy that")
    }
  }

  // Clear chat and reset
  const clearChat = () => {
    if (assistant) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: assistant.welcomeMessage,
        },
      ])
      toast.success("Fresh start! 🎉")
    }
  }

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e as any)
    }
  }

  if (!assistant) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <Bot className="w-16 h-16 text-muted-foreground mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Hmm, can't find that assistant</h3>
              <p className="text-muted-foreground">
                Looks like this AI assistant doesn't exist or got moved somewhere else.
              </p>
            </div>
            <Link href="/dashboard/assistants">
              <Button className="w-full">
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
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-950/20 dark:to-orange-950/20 dark:border-yellow-800">
          <CardContent className="p-8 text-center space-y-6">
            <Crown className="w-20 h-20 text-yellow-500 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">This one's Pro only! ✨</h3>
              <p className="text-muted-foreground">
                This assistant has some premium features that need a Pro subscription. Want to unlock the full
                experience?
              </p>
            </div>
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Upgrade to Pro
              </Button>
              <Link href="/dashboard/assistants">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Check out free assistants
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/assistants">
              <Button variant="ghost" size="sm" className="lg:hidden">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hidden lg:flex">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Assistants
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-r ${assistant.color} flex items-center justify-center flex-shrink-0`}
              >
                <assistant.icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg lg:text-xl font-bold truncate">{assistant.name}</h1>
                <p className="text-xs lg:text-sm text-muted-foreground truncate hidden sm:block">
                  {assistant.description}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isPremiumAssistant && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hidden sm:flex">
                <Crown className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={clearChat} disabled={isLoading}>
              <RefreshCw className="w-4 h-4 mr-0 lg:mr-2" />
              <span className="hidden lg:inline">Fresh Start</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Messages - Scrollable */}
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="p-4 lg:p-6 space-y-4 lg:space-y-6 max-w-4xl mx-auto w-full">
            {messages.map((message, index) => (
              <div
                key={message.id || index}
                className={`flex items-start space-x-3 lg:space-x-4 ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse lg:space-x-reverse" : ""
                } animate-in slide-in-from-bottom-2 duration-300`}
              >
                <Avatar className="w-8 h-8 lg:w-10 lg:h-10 flex-shrink-0">
                  <AvatarFallback
                    className={
                      message.role === "user"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : `bg-gradient-to-r ${assistant.color} text-white`
                    }
                  >
                    {message.role === "user" ? "U" : <assistant.icon className="w-4 h-4 lg:w-5 lg:h-5" />}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 min-w-0 ${message.role === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block p-3 lg:p-4 rounded-2xl max-w-[85%] lg:max-w-3xl ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-muted border border-border/50"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm lg:text-base leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === "assistant" && (
                    <div className="flex items-center justify-start mt-2 space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyMessage(message.content)}
                        className="h-8 px-2 text-xs"
                      >
                        <Copy className="w-3 h-3" />
                        <span className="hidden lg:inline ml-1">Copy</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        <Download className="w-3 h-3" />
                        <span className="hidden lg:inline ml-1">Save</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator with streaming animation */}
            {isLoading && (
              <div className="flex items-start space-x-3 lg:space-x-4 animate-in slide-in-from-bottom-2 duration-300">
                <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
                  <AvatarFallback className={`bg-gradient-to-r ${assistant.color} text-white`}>
                    <assistant.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="inline-block p-3 lg:p-4 rounded-2xl bg-muted border border-border/50">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">thinking...</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested prompts - only show when chat is empty */}
            {messages.length <= 1 && !isLoading && (
              <div className="space-y-3 animate-in fade-in-50 duration-500">
                <p className="text-sm text-muted-foreground text-center">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Quick starters:
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                  {(suggestedPrompts[slug] || suggestedPrompts.default).map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto p-3 lg:p-4 text-xs lg:text-sm bg-card hover:bg-accent/50 transition-colors"
                      onClick={() => handleSuggestedPrompt(prompt)}
                      disabled={isLoading}
                    >
                      <span className="truncate">{prompt}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area - Fixed */}
        <div className="flex-shrink-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="p-4 lg:p-6 max-w-4xl mx-auto w-full">
            <form onSubmit={onSubmit} className="space-y-3">
              <div className="flex space-x-2 lg:space-x-3">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={`Chat with ${assistant.name}...`}
                  className="flex-1 min-h-[44px] lg:min-h-[60px] max-h-32 resize-none text-sm lg:text-base"
                  disabled={isLoading || (isPremiumAssistant && !isPremiumUser)}
                  rows={1}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading || (isPremiumAssistant && !isPremiumUser)}
                  className="self-end h-[44px] lg:h-[60px] px-3 lg:px-4"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Press Enter to send • Shift+Enter for new line
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
